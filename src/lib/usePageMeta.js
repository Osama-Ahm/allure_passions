import { useEffect } from 'react';

const SITE_NAME = 'Allure Passions UK';

export const DEFAULT_DESCRIPTION =
  'Award-winning, practitioner-led aesthetic clinic in Fitzrovia, London, offering advanced non-invasive treatments for skin, body and wellbeing.';

function setMetaDescription(content) {
  let tag = document.head.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    document.head.append(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Sets the document title and meta description for the current page.
 * A page title of null gives the bare site title (used by the homepage).
 */
export default function usePageMeta({ title = null, description = DEFAULT_DESCRIPTION } = {}) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Advanced Aesthetic Clinic in Fitzrovia, London`;
    setMetaDescription(description);
  }, [title, description]);
}
