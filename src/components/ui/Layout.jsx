import cx from '../../lib/cx';
import { Eyebrow, Heading, Text } from './Typography';
import './Layout.css';

/** Centres content with the page padding. width: 'default' | 'narrow' | 'full' */
export function Container({ as: Tag = 'div', width = 'default', className, children, ...rest }) {
  return (
    <Tag className={cx('ap-container', width !== 'default' && `ap-container--${width}`, className)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Full-width band with vertical rhythm.
 * tone: 'canvas' | 'stone' | 'surface' | 'night' · spacing: 'default' | 'compact' | 'none'
 */
export function Section({ as: Tag = 'section', tone = 'canvas', spacing = 'default', className, children, ...rest }) {
  return (
    <Tag
      className={cx('ap-section', spacing !== 'default' && `ap-section--${spacing}`, className)}
      data-tone={tone}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Eyebrow + display title, with an optional lede and action.
 * layout: 'split' (title left, aside right on wide screens) | 'stack' | 'center'
 */
export function SectionHeader({
  eyebrow,
  title,
  titleAs = 'h2',
  titleSize = 'l',
  titleId,
  lede,
  action,
  layout = 'split',
  className,
}) {
  const hasAside = Boolean(lede || action);

  return (
    <header className={cx('ap-section-header', `ap-section-header--${layout}`, className)}>
      <div className="ap-section-header__main">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading as={titleAs} size={titleSize} id={titleId}>
          {title}
        </Heading>
      </div>
      {hasAside && (
        <div className="ap-section-header__aside">
          {lede && <Text size="lede">{lede}</Text>}
          {action}
        </div>
      )}
    </header>
  );
}

/** Hairline rule. strength: 'default' | 'strong' */
export function Divider({ strength = 'default', className, ...rest }) {
  return <hr className={cx('ap-divider', strength === 'strong' && 'ap-divider--strong', className)} {...rest} />;
}
