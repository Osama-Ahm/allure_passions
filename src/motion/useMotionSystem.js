import { useLayoutEffect } from 'react';

// Shared cards and editorial headings reveal automatically wherever they appear.
const AUTO_REVEAL_SELECTOR = '.card-white-elevation, .editorial-card, .heading-xl, .heading-lg';
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 6;

const inViewport = (element) => element.getBoundingClientRect().top < window.innerHeight;

// Elements (including the node itself) matching a selector inside a subtree.
const collect = (node, selector) => {
  const matches = [...node.querySelectorAll(selector)];
  return node.matches(selector) ? [node, ...matches] : matches;
};

/**
 * Site-wide motion controller, mounted once in App:
 * - reveals [data-reveal] elements as they scroll into view, staggering
 *   whatever enters together (see src/motion/motion.css for the variants)
 * - tags children of [data-reveal-children] and shared card/heading classes
 * - fades lazy images in once they have loaded
 * - drives [data-parallax] images relative to their frame
 * Does nothing when the visitor prefers reduced motion.
 */
export default function useMotionSystem() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const root = document.getElementById('root');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || prefersReducedMotion || !('IntersectionObserver' in window)) return undefined;

    html.setAttribute('data-motion', 'on');

    const markRevealed = (element, order) => {
      element.style.setProperty('--reveal-delay', `${Math.min(order, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
      element.setAttribute('data-revealed', '');
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const rowGap = a.boundingClientRect.top - b.boundingClientRect.top;
            return Math.abs(rowGap) > 8 ? rowGap : a.boundingClientRect.left - b.boundingClientRect.left;
          })
          .forEach((entry, order) => {
            markRevealed(entry.target, order);
            revealObserver.unobserve(entry.target);
          });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    const parallaxInView = new Set();
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) parallaxInView.add(entry.target);
          else parallaxInView.delete(entry.target);
        });
      },
      { rootMargin: '25% 0px' }
    );

    const prepareImage = (image) => {
      if (image.complete || image.hasAttribute('data-img-pending') || image.closest('[data-reveal="image"]')) return;
      image.setAttribute('data-img-pending', '');
      const settle = () => {
        image.removeAttribute('data-img-pending');
        image.setAttribute('data-img-loaded', '');
      };
      image.addEventListener('load', settle, { once: true });
      image.addEventListener('error', settle, { once: true });
    };

    const scan = (node) => {
      if (!(node instanceof Element)) return;

      collect(node, AUTO_REVEAL_SELECTOR).forEach((element) => {
        if (!element.hasAttribute('data-reveal') && !element.parentElement?.closest('[data-reveal]')) {
          element.setAttribute('data-reveal', 'up');
        }
      });

      const tagChild = (child, container) => {
        if (!child.hasAttribute('data-reveal')) {
          child.setAttribute('data-reveal', container.getAttribute('data-reveal-children') || 'up');
        }
      };
      collect(node, '[data-reveal-children]').forEach((container) => {
        [...container.children].forEach((child) => tagChild(child, container));
      });
      if (node.parentElement?.hasAttribute('data-reveal-children')) tagChild(node, node.parentElement);

      collect(node, '[data-reveal]:not([data-revealed])').forEach((element) => revealObserver.observe(element));
      collect(node, '[data-parallax]').forEach((element) => parallaxObserver.observe(element));
      collect(node, 'img').forEach(prepareImage);
    };

    scan(root);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach(scan));
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    // Remove the word masks once a heading has settled (restores crisp text rendering).
    const handleAnimationEnd = (event) => {
      if (event.animationName !== 'apWordUp') return;
      const heading = event.target.closest('[data-reveal="words"], .hero-title');
      if (!heading || heading.hasAttribute('data-settled')) return;
      const words = heading.querySelectorAll('.ap-word > span');
      if (event.target === words[words.length - 1]) heading.setAttribute('data-settled', '');
    };
    document.addEventListener('animationend', handleAnimationEnd);

    let frame = 0;
    const update = () => {
      frame = 0;

      parallaxInView.forEach((element) => {
        const frameRect = (element.parentElement || element).getBoundingClientRect();
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.08;
        const limit = frameRect.height * 0.07;
        const offset = -(frameRect.top + frameRect.height / 2 - window.innerHeight / 2) * speed;
        element.style.translate = `0 ${Math.max(-limit, Math.min(limit, offset)).toFixed(1)}px`;
      });

      // Content sitting in the last sliver of the page can never cross the reveal
      // line, so reveal whatever is left once the visitor reaches the bottom.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        [...root.querySelectorAll('[data-reveal]:not([data-revealed])')]
          .filter(inViewport)
          .forEach((element, order) => {
            markRevealed(element, order);
            revealObserver.unobserve(element);
          });
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      revealObserver.disconnect();
      parallaxObserver.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener('animationend', handleAnimationEnd);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      cancelAnimationFrame(frame);
      html.removeAttribute('data-motion');
    };
  }, []);
}
