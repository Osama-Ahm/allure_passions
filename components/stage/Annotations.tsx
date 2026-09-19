'use client';

import { concernGroups } from '@/content/concerns';
import { consultation } from '@/content/story';
import { annotations } from '@/lib/scene/annotations';

/**
 * Gold hairline labels over the 3D, in the page's serif and small caps.
 * Positioned every frame by the scene that owns them (lib/scene/annotations.ts):
 *
 * - over each concern droplet, its group, on a dotted leader down to a node;
 * - beside each consultation stone, its step.
 *
 * They repeat what the copy beside them already says, so they are hidden from
 * assistive technology, and on a phone (where the copy scrolls over the
 * models) they are not shown at all.
 */
export function Annotations() {
  return (
    <div aria-hidden="true" data-theme="light" className="pointer-events-none absolute inset-0 hidden md:block">
      {concernGroups.map((group, index) => (
        <div
          key={group.id}
          ref={(element) => {
            annotations.droplets[index] = element;
          }}
          className="absolute left-0 top-0 opacity-0"
        >
          <div className="flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-ink-muted">0{index + 1}</span>
            <span className="whitespace-nowrap font-serif text-lg font-light leading-tight">{group.name}</span>
            <span className="mt-2 h-8 border-l border-dotted border-gild" />
            <span className="h-1.5 w-1.5 rounded-full bg-gild" />
          </div>
        </div>
      ))}

      {consultation.steps.map((step, index) => (
        <div
          key={step.id}
          ref={(element) => {
            annotations.plan[index] = element;
          }}
          className="absolute left-0 top-0 opacity-0"
        >
          <div className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-accent">0{index + 1}</span>
            <span className="max-w-[9rem] font-serif text-base font-light leading-tight">{step.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
