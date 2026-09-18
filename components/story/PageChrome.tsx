/**
 * The fixed layers around the story that are not the header.
 *
 * The backdrop is the page colour. It sits behind everything and the story
 * runtime sets its background as the chapters change; nothing else on the page
 * owns a background, so the 3D canvas and the giant words can layer over it.
 */
export function Backdrop() {
  return <div id="backdrop" aria-hidden="true" className="fixed inset-0 -z-10 bg-sanctuary-alabaster" />;
}

/** A hairline down the right edge with a thumb that tracks the whole page. */
export function ScrollRail() {
  return (
    <div
      aria-hidden="true"
      className="chrome pointer-events-none fixed right-4 top-1/2 z-30 hidden h-[34vh] w-px -translate-y-1/2 bg-line md:block"
    >
      <div
        id="rail-thumb"
        className="absolute -left-px top-0 h-[16%] w-[3px] bg-ink transition-colors duration-500"
        // The thumb travels the track minus its own height: 84% of the track
        // is 5.25 of its own heights.
        style={{ translate: '0 calc(var(--rail, 0) * 525%)' }}
      />
    </div>
  );
}

/** Static film grain over the page (see .grain in globals.css). */
export function Grain() {
  return <div aria-hidden="true" className="grain" />;
}
