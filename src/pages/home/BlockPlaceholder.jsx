import { Container, Eyebrow, Heading, Section, Text } from '../../components/ui';
import cx from '../../lib/cx';
import './BlockPlaceholder.css';

/**
 * Development-only stand-in for a homepage block that hasn't been built yet,
 * so the new flow can be reviewed as modules land. Renders nothing in production.
 */
export default function BlockPlaceholder({ id, number, act, name, purpose, module, tone = 'canvas', size = 'default' }) {
  if (!import.meta.env.DEV) return null;

  return (
    <Section
      id={id}
      tone={tone}
      spacing="compact"
      className={cx('ap-block-placeholder', size === 'hero' && 'ap-block-placeholder--hero')}
      aria-label={`${name} (not built yet)`}
    >
      <Container>
        <div className="ap-block-placeholder__frame">
          <span className="ap-block-placeholder__number ap-nums" aria-hidden="true">
            {String(number).padStart(2, '0')}
          </span>
          <div className="ap-block-placeholder__body">
            <Eyebrow>
              {act} · Module {module}
            </Eyebrow>
            <Heading as="h2" size="m">
              {name}
            </Heading>
            <Text tone="muted">{purpose}</Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
