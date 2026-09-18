'use client';

import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { CameraRig } from '@/components/canvas/CameraRig';
import { HallwayEnvironment } from '@/components/canvas/Hallway';
import { WallBoundary } from '@/components/canvas/WallBoundary';
import { WallPanel } from '@/components/canvas/WallPanel';
import { BeginWall } from '@/components/walls/BeginWall';
import { ConcernsWall } from '@/components/walls/ConcernsWall';
import { CredentialsWall } from '@/components/walls/CredentialsWall';
import { ProgrammesWall } from '@/components/walls/ProgrammesWall';
import { RecognitionWall } from '@/components/walls/RecognitionWall';
import { ReviewsWall } from '@/components/walls/ReviewsWall';
import { SkincareWall } from '@/components/walls/SkincareWall';
import { SocialWall } from '@/components/walls/SocialWall';
import { TreatmentsWall } from '@/components/walls/TreatmentsWall';
import { WelcomeWall } from '@/components/walls/WelcomeWall';
import { useConsultation } from '@/components/ui/ConsultationProvider';
import { SCROLL_VH, progressForStop, stops } from '@/lib/hallway';
import { useIsMobile } from '@/lib/useEnvironment';
import { useSmoothScroll } from '@/lib/useSmoothScroll';

/**
 * The hallway walk.
 *
 * Only the panels within one stop of the camera are mounted. That keeps the
 * DOM small, keeps CSS-transformed content from showing through walls it is
 * nowhere near, and means the cost of a wall is paid only while you are at it.
 */
type WallProps = { onEnquire?: () => void };

const WALL_CONTENT: Record<string, React.ComponentType<WallProps>> = {
  welcome: WelcomeWall,
  credentials: CredentialsWall,
  treatments: TreatmentsWall,
  concerns: ConcernsWall,
  recognition: RecognitionWall,
  reviews: ReviewsWall,
  social: SocialWall,
  programmes: ProgrammesWall,
  skincare: SkincareWall,
  begin: BeginWall,
};

export function HallwayExperience() {
  const scrollProgress = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const isMobile = useIsMobile();

  // Read out here, in the DOM renderer, and handed to the walls as a prop.
  // React context does not cross into the canvas reconciler.
  const { open: openEnquiry } = useConsultation();

  // Mounted only when the walk can actually run; LandingExperience decides.
  const lenis = useSmoothScroll(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => '+=' + (window.innerHeight * SCROLL_VH) / 100,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        refreshPriority: 2,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });
      triggerRef.current = trigger;
    }, rootRef);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, []);

  /** Fly to a wall by scrolling to the point in the timeline where it is read. */
  const jumpTo = useCallback(
    (index: number) => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const target = trigger.start + (trigger.end - trigger.start) * progressForStop(index);
      // Through Lenis, so its own scroll position stays authoritative.
      lenis.current?.scrollTo(target, { duration: 1.4 });
    },
    [lenis]
  );

  const visible = stops.filter((_, index) => Math.abs(index - activeIndex) <= 1);

  return (
    <div ref={rootRef}>
      <div ref={pinRef} id="hallway" className="relative h-screen w-full overflow-hidden">
        <Canvas
          shadows={isMobile ? false : 'percentage'}
          dpr={isMobile ? [1, 1.2] : [1, 1.75]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 1.65, 7], fov: 50 }}
          className="h-full w-full"
        >
          <color attach="background" args={['#F9F6F0']} />
          <fog attach="fog" args={['#F4EFE6', 26, 70]} />

          <Suspense fallback={null}>
            <HallwayEnvironment quality={isMobile ? 'low' : 'high'} />
            {visible.map((stop) => {
              const Content = WALL_CONTENT[stop.id];
              if (!Content) return null;
              return (
                <WallPanel key={stop.id} stop={stop}>
                  <WallBoundary wallId={stop.id}>
                    <Content onEnquire={() => openEnquiry()} />
                  </WallBoundary>
                </WallPanel>
              );
            })}
          </Suspense>

          <CameraRig scrollProgress={scrollProgress} onStopChange={setActiveIndex} />
        </Canvas>

        {/* Jump nav */}
        <nav
          aria-label="Sections"
          className="pointer-events-auto absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex"
        >
          {stops.map((stop, index) => (
            <button
              key={stop.id}
              type="button"
              onClick={() => jumpTo(index)}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="group flex items-center gap-3 rounded-full py-1 pl-3 pr-1 font-sans text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              <span
                className={
                  index === activeIndex
                    ? 'text-sanctuary-charcoal'
                    : 'text-sanctuary-muted/70 opacity-0 transition-opacity group-hover:opacity-100'
                }
              >
                {stop.label}
              </span>
              <span
                className={
                  'h-1.5 w-1.5 shrink-0 rounded-full transition-all ' +
                  (index === activeIndex
                    ? 'scale-150 bg-sanctuary-gold-deep'
                    : 'bg-sanctuary-muted/40 group-hover:bg-sanctuary-gold')
                }
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
