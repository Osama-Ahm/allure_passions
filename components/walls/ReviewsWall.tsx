import { clinic } from '@/content/clinic';

/**
 * Wall 6 — Patient reviews.
 *
 * The brief asks for Google reviews displayed live rather than typed in by
 * hand. No reviews provider is connected yet, so this wall shows what is
 * actually true today and sends people to the clinic's own Google profile.
 *
 * Nothing here is a written-out review. Inventing one, or retyping a real one
 * without consent, would be a fabricated endorsement — and under the UK
 * Digital Markets, Competition and Consumers Act, publishing fake reviews is
 * an offence. The live feed drops into this same wall once the clinic supplies
 * its Google Place ID.
 */
export function ReviewsWall() {
  const isDev = process.env.NODE_ENV !== 'production';
  const googleProfile =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(clinic.legalName + ', ' + clinic.address.street + ', London');

  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <span className="mb-3 block font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
        Patient reviews
      </span>

      <h2 className="mb-5 font-serif text-[40px] font-light leading-[1.1] text-sanctuary-charcoal">
        In our patients&rsquo; own words
      </h2>

      <p className="mb-7 max-w-[700px] font-sans text-[19px] leading-[1.55] text-sanctuary-muted">
        Every review on our Google profile is written by someone who has been treated here. We do
        not edit them, and we do not publish anything a patient has not chosen to say publicly.
      </p>

      <div className="flex items-center gap-8 border-t border-sanctuary-stone pt-6">
        <a
          href={googleProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-sanctuary-verde px-7 py-3.5 font-sans text-[13px] uppercase tracking-[0.18em] text-white"
        >
          Read our reviews on Google
        </a>
        <p className="max-w-[360px] font-sans text-[13px] leading-snug text-sanctuary-muted">
          Reviews open on Google, where you can see every one of them rather than a selection.
        </p>
      </div>

      {isDev ? (
        <p className="mt-5 rounded border border-dashed border-sanctuary-muted/40 px-3 py-2 font-sans text-[12px] uppercase tracking-[0.16em] text-sanctuary-muted/80">
          Development only — live Google feed needs the clinic&rsquo;s Place ID
        </p>
      ) : null}
    </div>
  );
}
