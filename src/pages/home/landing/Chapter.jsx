import { chapterIndex, chapters } from '../../../content/home';
import { pad2 } from './useLandingMotion';

/** The numbered divider that opens each chapter of the homepage story. */
export default function Chapter({ id, style }) {
  const index = chapterIndex[id];
  const chapter = chapters[index];

  return (
    <div className="ap-chapter" data-reveal style={style}>
      <span className="ap-chapter__no" aria-hidden="true">
        {pad2(index + 1)}
      </span>
      <div className="ap-chapter__txt">
        <p className="ap-chapter__name">{chapter.name}</p>
        <p className="ap-chapter__bridge">{chapter.bridge}</p>
      </div>
      <span className="ap-chapter__line" aria-hidden="true" />
    </div>
  );
}
