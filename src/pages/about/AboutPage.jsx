import { practitioner, standards, story } from '../../content/about';
import { clinic } from '../../content/clinic';
import { credentials } from '../../content/credentials';
import { pressFeatures } from '../../content/press';
import usePageMeta from '../../lib/usePageMeta';
import BeginConsultation from '../../components/patterns/BeginConsultation';
import { ArrowLink, Container, Eyebrow, Heading, Section, Text } from '../../components/ui';
import './AboutPage.css';

export default function AboutPage() {
  usePageMeta({
    title: 'About the clinic',
    description: `${clinic.name} is a practitioner-led aesthetic clinic in ${clinic.address.area}, London, working across skin health, body contouring and wellbeing.`,
  });

  return (
    <>
      <Section spacing="compact" className="ap-about__head">
        <Container>
          <Eyebrow>About the clinic</Eyebrow>
          <Heading as="h1" size="l">
            Advanced aesthetics, practised carefully.
          </Heading>
          <Text size="lede">
            An award-winning clinic in {clinic.address.area}, offering non-invasive treatment for skin, body and
            wellbeing — planned around your concerns and confirmed at consultation.
          </Text>
        </Container>
      </Section>

      <Section spacing="compact" aria-labelledby="ap-about-story">
        <Container>
          <h2 className="ap-visually-hidden" id="ap-about-story">
            The clinic
          </h2>
          <div className="ap-about__story">
            {story.map((part) => (
              <section className="ap-about__part" key={part.id}>
                <h3 className="ap-about__part-title">{part.title}</h3>
                <Text>{part.body}</Text>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="stone" spacing="compact" aria-labelledby="ap-about-practitioner">
        <Container width="narrow">
          <h2 className="ap-about__heading" id="ap-about-practitioner">
            {practitioner.title}
          </h2>
          <Text size="lede">{practitioner.body}</Text>
        </Container>
      </Section>

      <Section spacing="compact" aria-labelledby="ap-about-credentials">
        <Container>
          <h2 className="ap-about__heading" id="ap-about-credentials">
            Credentials &amp; accreditations
          </h2>
          <ul className="ap-about__grid">
            {credentials.map((credential) => (
              <li className="ap-about__cell" key={credential.id}>
                <h3 className="ap-about__cell-title">{credential.title}</h3>
                <Text size="small">{credential.body}</Text>
                {credential.logo && (
                  <img
                    className="ap-about__logo"
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
        </Container>
      </Section>

      <Section tone="stone" spacing="compact" aria-labelledby="ap-about-award">
        <Container width="narrow">
          <h2 className="ap-about__heading" id="ap-about-award">
            Recognition
          </h2>
          <Text size="lede">{clinic.award.title}</Text>
          <Text>
            The {clinic.award.body} are run annually by Global Health &amp; Pharma, a UK trade publication covering the
            healthcare and pharmaceutical sectors. The award recognises the clinic&rsquo;s work in advanced skin and body
            treatment in London.
          </Text>
        </Container>
      </Section>

      {pressFeatures.length > 0 && (
        <Section spacing="compact" aria-labelledby="ap-about-press">
          <Container>
            <h2 className="ap-about__heading" id="ap-about-press">
              As featured in
            </h2>
            <ul className="ap-about__press">
              {pressFeatures.map((feature) => (
                <li key={feature.id}>
                  <ArrowLink href={feature.href} external>
                    {feature.name}
                    {feature.issue ? ` · ${feature.issue}` : ''}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section spacing="compact" aria-labelledby="ap-about-standards">
        <Container>
          <h2 className="ap-about__heading" id="ap-about-standards">
            Our standards
          </h2>
          <ul className="ap-about__grid ap-about__grid--standards">
            {standards.map((standard) => (
              <li className="ap-about__cell" key={standard.id}>
                <h3 className="ap-about__cell-title">{standard.title}</h3>
                <Text size="small">{standard.body}</Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <BeginConsultation id="about-begin" />
    </>
  );
}
