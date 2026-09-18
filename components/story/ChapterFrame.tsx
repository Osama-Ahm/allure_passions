import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { chapter as chapterData, type ChapterId } from '@/lib/story/chapters';

type LayerMode = 'sticky' | 'sticky-md' | 'flow';

const MODE: Record<LayerMode, string> = {
  sticky: 'layer-sticky',
  'sticky-md': 'layer-sticky-md',
  flow: 'layer-flow',
};

/**
 * One chapter of the story: a single grid cell holding a back layer (behind the
 * 3D canvas) and a front layer (in front of it). See the "Chapters" block in
 * app/globals.css for why they are separate siblings.
 *
 * Its length, colour, theme and nav link come from lib/story/chapters.ts and
 * are written as data attributes, which is how the story runtime reads them.
 */
export function ChapterFrame({
  id,
  anchor,
  labelledBy,
  back,
  backMode = 'sticky',
  backClassName,
  children,
  frontMode = 'flow',
  frontClassName,
  className,
}: {
  id: ChapterId;
  /** The element id links point at, when it differs from the chapter id. */
  anchor?: string;
  labelledBy?: string;
  back?: ReactNode;
  backMode?: LayerMode;
  backClassName?: string;
  children: ReactNode;
  frontMode?: LayerMode;
  frontClassName?: string;
  className?: string;
}) {
  const chapter = chapterData[id];
  const style = {
    '--len': chapter.length,
    '--len-m': chapter.lengthMobile ?? chapter.length,
  } as CSSProperties;

  return (
    <section
      id={anchor ?? id}
      aria-labelledby={labelledBy}
      data-chapter={id}
      data-theme={chapter.theme}
      data-bg={chapter.bg}
      data-bg-via={chapter.via}
      data-nav={chapter.nav}
      data-solid={chapter.solid ? 'true' : undefined}
      style={style}
      className={cx('chapter', chapter.flow ? 'chapter-min' : 'chapter-len', className)}
    >
      {back ? <div className={cx('layer layer-back', MODE[backMode], backClassName)}>{back}</div> : null}
      <div className={cx('layer layer-front', MODE[frontMode], frontClassName)}>{children}</div>
    </section>
  );
}
