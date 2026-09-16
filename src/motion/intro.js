// Lifts the intro loader painted by index.html once the site is ready.
// The loader shows its full sequence on the first visit of a session and a
// brief fade on later reloads; index.html also carries a no-JS failsafe.

const MIN_FIRST_VISIT_MS = 2400;
const MIN_REPEAT_VISIT_MS = 350;
const READY_TIMEOUT_MS = 3200;

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const nextPaint = () =>
  new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

// The hero poster is the first thing revealed, so make sure it is decoded.
const heroPosterReady = () => {
  const poster = document.querySelector('video[poster]')?.getAttribute('poster');
  if (!poster) return Promise.resolve();
  const image = new Image();
  image.src = poster;
  return image.decode().catch(() => {});
};

export function playIntro() {
  const html = document.documentElement;
  const loader = document.getElementById('ap-loader');
  if (!loader) {
    html.removeAttribute('data-curtain');
    return;
  }

  const quick =
    html.classList.contains('ap-intro-quick') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elapsed = performance.now() - (window.__apIntroStart || 0);
  const minimum = Math.max(0, (quick ? MIN_REPEAT_VISIT_MS : MIN_FIRST_VISIT_MS) - elapsed);

  const ready = Promise.all([document.fonts?.ready, nextPaint().then(heroPosterReady)]);

  Promise.all([wait(minimum), Promise.race([ready, wait(READY_TIMEOUT_MS)])]).then(() => {
    loader.classList.add('is-leaving');

    // Start entrance animations just as the curtain begins to lift.
    window.setTimeout(() => html.setAttribute('data-curtain', 'opening'), quick ? 0 : 450);

    window.setTimeout(() => {
      loader.remove();
      if (html.getAttribute('data-curtain') === 'opening') html.removeAttribute('data-curtain');
      try {
        window.sessionStorage.setItem('ap-intro-seen', '1');
      } catch {
        // Storage can be unavailable (private mode); the intro simply replays.
      }
    }, quick ? 650 : 1800);
  });
}
