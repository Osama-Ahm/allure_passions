import { credentials } from '../../../content/credentials';
import { pressFeatures } from '../../../content/press';
import { ArrowLink, Container, Eyebrow, Heading, Section, Text } from '../../../components/ui';
import './WhyAllure.css';

/**
 * Block 5 (plan §6): who we are, why we can be trusted and what we have been
 * recognised for, answered once. The press row appears only when the clinic has
 * supplied a link for each feature (D7), so it stays hidden until then.
 */
export default function WhyAllure() {
  return (
    <Section id="why-allure" aria-labelledby="ap-why-title">
      <Container>
        <div className="ap-why__welcome">
          <div className="ap-why__statement">
            <Eyebrow>Welcome to Allure Passions UK</Eyebrow>
            <Heading as="h2" size="m" id="ap-why-title">
              An award-winning clinic for advanced, non-invasive skin and body care.
            </Heading>
          </div>
          <div className="ap-why__intro">
            <Text>
              We work across skin health, body contouring, cellular health and wellbeing, planning treatment around what
              you would like to change rather than around what we happen to offer.
            </Text>
            <ArrowLink to="/about">Discover our approach</ArrowLink>
          </div>
        </div>

        <div className="ap-why__care">
          <Eyebrow as="h3" id="ap-why-care">
            Expert care you can trust
          </Eyebrow>
          <ul className="ap-why__grid" aria-labelledby="ap-why-care">
            {credentials.map((credential) => (
              <li className="ap-why__cell" key={credential.id}>
                <h4 className="ap-why__cell-title">{credential.title}</h4>
                <Text size="small">{credential.body}</Text>
                {credential.logo && (
                  <img
                    className="ap-why__logo"
                    src={credential.logo.src}
                    alt={credential.logo.alt}
                    width={credential.logo.width}
                    height={credential.logo.height}
                    loading="lazy"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {pressFeatures.length > 0 && (
          <div className="ap-why__press">
            <Eyebrow as="h3" id="ap-why-press">
              As featured in
            </Eyebrow>
            <ul className="ap-why__press-list" aria-labelledby="ap-why-press">
              {pressFeatures.map((feature) => (
                <li key={feature.id}>
                  <a className="ap-why__press-link" href={feature.href} target="_blank" rel="noopener noreferrer">
                    {feature.name}
                    <span className="ap-visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  );
}
