import { MOBILE_MEDIA, mobileSources } from '../../utils/responsiveImages';

/**
 * An <img> (or motion.img via `as`) that offers right-sized AVIF/WebP copies of `src` through
 * <picture> sources below the 1280px desktop layout; from 1280px up the <img> loads the original
 * file as before. `sizes` describes the rendered width below 1280px (`imgSizes` is the <img>'s
 * own, for an <img> that has its own srcSet); images without copies render as a plain <img>.
 * <picture> is display: contents (index.css), so layout is unchanged.
 *   <ResponsiveImg src="/assets/images/concern_rosacea.jpg" sizes="300px" alt="…" loading="lazy" />
 */
export default function ResponsiveImg({ as: Img = 'img', src, sizes = '100vw', imgSizes, ...rest }) {
  const sources = mobileSources(src);
  if (!sources) return <Img src={src} sizes={imgSizes} {...rest} />;
  return (
    <picture>
      <source media={MOBILE_MEDIA} type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source media={MOBILE_MEDIA} type="image/webp" srcSet={sources.webp} sizes={sizes} />
      <Img src={src} sizes={imgSizes} {...rest} />
    </picture>
  );
}
