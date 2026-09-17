import { ArrowRight } from 'lucide-react';
import { ArrowLink, Button, Container, Eyebrow, Heading, Section, Text } from '../components/ui';
import usePageMeta from '../lib/usePageMeta';
import './NotFoundPage.css';

export default function NotFoundPage() {
  usePageMeta({ title: 'Page not found' });

  return (
    <Section className="ap-not-found" aria-labelledby="not-found-title">
      <Container width="narrow">
        <div className="ap-not-found__inner">
          <Eyebrow>Page not found</Eyebrow>
          <Heading as="h1" size="l" id="not-found-title">
            We couldn’t find that page.
          </Heading>
          <Text size="lede">The link may be out of date, or the page may have moved.</Text>
          <div className="ap-not-found__actions">
            <Button to="/" icon={ArrowRight}>
              Back to home
            </Button>
            <ArrowLink to="/treatments">Explore treatments</ArrowLink>
            <ArrowLink to="/pricing">View pricing</ArrowLink>
            <ArrowLink to="/contact">Contact the clinic</ArrowLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
