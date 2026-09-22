import TextReveal from '../../motion/TextReveal';
import { Reveal } from '../../motion/Reveal';

/**
 * The Figma heading pattern: serif words followed by a gold italic accent,
 * with optional supporting paragraphs underneath.
 *   <SectionHeading title="Expertise Behind" accent="Every Treatment" align="center"
 *     intro={['Choosing an aesthetic clinic…', 'It is about knowing…']} />
 * tone="dark" switches the serif to white for dark grounds.
 * `note` renders a gold-toned line after the intro (Figma uses this under several headings).
 */
export default function SectionHeading({
  as = 'h2',
  title,
  accent,
  accentFirst = false,
  align = 'left',
  tone = 'light',
  intro,
  note,
  className = '',
  titleClassName = '',
  id,
}) {
  const paragraphs = intro ? (Array.isArray(intro) ? intro : [intro]) : [];
  return (
    <div className={`ap-heading ap-heading--${align} ap-heading--${tone} ${className}`.trim()}>
      <TextReveal as={as} id={id} className={`ap-h2 ap-heading__title ${titleClassName}`.trim()}>
        {accentFirst ? (
          <>
            {accent ? <em className="ap-accent">{accent}</em> : null} {title}
          </>
        ) : (
          <>
            {title} {accent ? <em className="ap-accent">{accent}</em> : null}
          </>
        )}
      </TextReveal>
      {paragraphs.map((text, index) => (
        <Reveal as="p" key={index} delay={0.15 + index * 0.08} className="ap-lead ap-heading__intro">
          {text}
        </Reveal>
      ))}
      {note ? (
        <Reveal as="p" delay={0.2 + paragraphs.length * 0.08} className="ap-lead ap-heading__note">
          {note}
        </Reveal>
      ) : null}
    </div>
  );
}
