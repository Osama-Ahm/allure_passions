import { isRouteErrorResponse, useRouteError } from 'react-router';
import { Button, Container, Eyebrow, Heading, Section, Text } from '../components/ui';
import usePageMeta from '../lib/usePageMeta';
import NotFoundPage from '../pages/NotFoundPage';

export default function RouteError() {
  const error = useRouteError();
  usePageMeta({ title: 'Something went wrong' });

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;

  return (
    <Section className="ap-not-found" aria-labelledby="route-error-title">
      <Container width="narrow">
        <div className="ap-not-found__inner">
          <Eyebrow>Something went wrong</Eyebrow>
          <Heading as="h1" size="l" id="route-error-title">
            This page didn't load properly.
          </Heading>
          <Text size="lede">Please refresh the page. If the problem continues, contact the clinic directly.</Text>
          <div className="ap-not-found__actions">
            <Button onClick={() => window.location.reload()}>Refresh the page</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
