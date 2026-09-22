import { useEffect } from 'react';

const clamp01 = (value) => Math.min(1, Math.max(0, value));

/**
 * Drives a paused <video> from a 0..1 MotionValue so it plays with the scroll.
 *
 * Smoothness comes from four things working together:
 *  1. the file is encoded with every frame as a keyframe, so any seek decodes one frame;
 *  2. the whole file is fetched into memory first (blob URL), so seeks never wait on the network;
 *  3. only one seek is in flight at a time: the newest frame is requested once the
 *     previous seek has landed, so seeks never queue up behind a fast scroll;
 *  4. the requested time eases toward the scroll position (critically damped), so a
 *     wheel notch or a keyboard jump turns into a glide instead of a cut.
 */
export default function useScrubVideo({ videoRef, observeRef, progress, fps = 24, smoothing = 11, enabled = true }) {
  useEffect(() => {
    const video = videoRef.current;
    const observed = observeRef?.current || video;
    if (!enabled || !video || !observed) return undefined;

    let raf = 0;
    let last = 0;
    let eased = null;
    let lastFrame = -1;
    let pendingSince = 0;

    const reset = () => {
      lastFrame = -1;
      pendingSince = 0;
    };
    const onSeeked = () => {
      pendingSince = 0;
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
      last = now;

      const duration = video.duration;
      if (!duration || !Number.isFinite(duration) || video.readyState < 1) return;

      const maxTime = Math.max(0, duration - 1 / fps);
      const target = clamp01(progress.get()) * maxTime;
      if (eased === null) eased = target;
      eased += (target - eased) * (1 - Math.exp(-dt * smoothing));
      if (Math.abs(target - eased) < 1e-4) eased = target;

      // A seek that never reports back (rare, e.g. during a source swap) must not block forever.
      if (pendingSince && now - pendingSince > 300) pendingSince = 0;
      if (pendingSince || video.seeking) return;

      const frameIndex = Math.round(eased * fps);
      if (frameIndex === lastFrame) return;
      lastFrame = frameIndex;
      pendingSince = now;
      // Aim a little inside the frame so rounding never shows the previous one.
      video.currentTime = Math.min((frameIndex + 0.35) / fps, duration - 0.001);
    };

    const start = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Some mobile browsers only paint seeked frames once the element has played.
    const prime = () => {
      reset();
      const settle = () => {
        video.pause();
        reset(); // re-seek to the scroll position after the brief play
      };
      const attempt = video.play();
      if (attempt && typeof attempt.then === 'function') {
        attempt.then(settle).catch(reset);
      } else {
        settle();
      }
    };

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('loadeddata', prime);
    video.addEventListener('emptied', reset);

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      rootMargin: '10% 0px',
    });
    observer.observe(observed);

    return () => {
      stop();
      observer.disconnect();
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadeddata', prime);
      video.removeEventListener('emptied', reset);
    };
  }, [videoRef, observeRef, progress, fps, smoothing, enabled]);
}

/** Picks the scrub file for this screen: 1080p for large/dense displays, 720p otherwise. */
export function pickScrubSource(sources) {
  if (typeof window === 'undefined') return sources.small;
  const connection = navigator.connection;
  const constrained = connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || ''));
  const devicePixels = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  return !constrained && devicePixels > 1400 ? sources.large : sources.small;
}

/**
 * Loads a video file fully into memory and hands back an object URL, so every
 * seek is served from RAM. Falls back to the plain URL if fetching fails.
 */
export function useBlobSource({ videoRef, src, enabled = true }) {
  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video || !src) return undefined;
    const controller = new AbortController();
    let objectUrl = '';
    fetch(src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        video.load();
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        video.src = src;
        video.load();
      });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [videoRef, src, enabled]);
}
