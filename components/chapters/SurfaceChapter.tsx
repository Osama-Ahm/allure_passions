import type { CSSProperties } from 'react';
import { surface } from '@/content/story';
import { ChapterFrame } from '@/components/story/ChapterFrame';

const at = (value: number) => ({ '--at': value }) as CSSProperties;

/**
 * Chapter 2 · Surface. The bridge from the bottle to the skin: the bottle
 * turns, the pipette lifts, a drop forms and falls. Two lines, revealed as the
 * chapter is scrolled (--p from the story runtime).
 *
 * Without WebGL the drop is drawn here instead, falling down a hairline.
 */
export function SurfaceChapter() {
  return (
    <ChapterFrame
      id="surface"
      frontMode="sticky"
      back={
        <div aria-hidden="true" className="stage-fallback absolute inset-y-[18%] left-1/2 w-px bg-line">
          <span
            className="absolute -left-[7px] top-0 block h-[18px] w-[15px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border border-gild"
            style={{ translate: '0 calc(var(--p, 0) * 60svh)' }}
          />
        </div>
      }
    >
      <div className="relative h-full px-5 md:px-10">
        <p
          className="reveal-at absolute right-5 top-[24%] max-w-[15ch] text-right font-serif text-display-md font-light md:right-[8vw] md:top-[26%]"
          style={at(0.02)}
        >
          {surface.first}
        </p>
        <p
          className="reveal-at absolute bottom-[16%] left-5 max-w-[17ch] font-serif text-display-md font-light italic md:bottom-[20%] md:left-[8vw]"
          style={at(0.12)}
        >
          {surface.second}
        </p>
      </div>
    </ChapterFrame>
  );
}
