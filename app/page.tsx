import { ClinicChapter } from '@/components/chapters/ClinicChapter';
import { ConcernsChapter } from '@/components/chapters/ConcernsChapter';
import { ConsultationChapter } from '@/components/chapters/ConsultationChapter';
import { FaqChapter } from '@/components/chapters/FaqChapter';
import { HeroChapter } from '@/components/chapters/HeroChapter';
import { ProgrammesChapter } from '@/components/chapters/ProgrammesChapter';
import { SkincareChapter } from '@/components/chapters/SkincareChapter';
import { SurfaceChapter } from '@/components/chapters/SurfaceChapter';
import { TechnologiesChapter } from '@/components/chapters/TechnologiesChapter';
import { TrustChapter } from '@/components/chapters/TrustChapter';
import { VisitChapter } from '@/components/chapters/VisitChapter';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { Backdrop, Grain, ScrollRail } from '@/components/story/PageChrome';
import { Reveals } from '@/components/story/Reveals';
import { StoryRuntime } from '@/components/story/StoryRuntime';
import { StageMount } from '@/components/stage/StageMount';
import { ConsultationProvider } from '@/components/ui/ConsultationProvider';

/**
 * The homepage: one story in eleven chapters (docs/LANDING_3D_PLAN.md).
 *
 * Every word is here in ordinary server-rendered HTML, in reading order. The
 * 3D stage is fixed behind the chapters and only adds to them, so without
 * WebGL, with reduced motion, or for a search engine, the page is complete.
 *
 * Nothing wrapping the chapters may set a background, transform or z-index:
 * the canvas has to be able to sit between each chapter's back and front
 * layers (see "Chapters" in app/globals.css).
 */
export default function HomePage() {
  return (
    <ConsultationProvider>
      <Backdrop />
      <SiteHeader />
      <ScrollRail />
      <StageMount />

      <main id="main">
        <HeroChapter />
        <SurfaceChapter />
        <ConcernsChapter />
        <TechnologiesChapter />
        <ClinicChapter />
        <ConsultationChapter />
        <ProgrammesChapter />
        <TrustChapter />
        <SkincareChapter />
        <FaqChapter />
        <VisitChapter />
      </main>

      <Grain />
      <StoryRuntime />
      <Reveals />
    </ConsultationProvider>
  );
}
