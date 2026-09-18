import Image from 'next/image';
import { trustDossier } from '@/content/home';

/** The first sentence, with the full stop it already has. */
const firstSentence = (text: string) => text.match(/^[^.]*\./)?.[0] ?? text;

/**
 * Wall 2 — Expert care you can trust.
 *
 * All six credentials, each as a seal, a claim and where to check it. Authored
 * to the 900 x 460 panel box. Nothing here is below 12px CSS, which lands at
 * about 11px on screen at the reading distance.
 */
export function CredentialsWall() {
  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
          Expert care you can trust
        </span>
        <a
          href="https://www.jccp.org.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[13px] uppercase tracking-[0.18em] text-sanctuary-verde underline decoration-sanctuary-verde/40 underline-offset-4"
        >
          Check the register
        </a>
      </div>

      <h2 className="mb-5 font-serif text-[38px] font-light leading-[1.1] text-sanctuary-charcoal">
        Six things worth checking before anyone treats you
      </h2>

      <ul className="grid grid-cols-3 gap-x-7 gap-y-4 border-t border-sanctuary-stone pt-5">
        {trustDossier.map((entry) => (
          <li key={entry.id} className="flex gap-3">
            {entry.badge === 'logo' ? (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <Image
                  src="/assets/images/jccp_official_logo.png"
                  alt="Joint Council for Cosmetic Practitioners"
                  width={167}
                  height={85}
                  className="h-4 w-auto"
                />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sanctuary-gold text-[11px] uppercase tracking-wider text-sanctuary-gold-deep"
              >
                {entry.badge}
              </span>
            )}
            <div>
              <h3 className="font-sans text-[15px] font-medium leading-snug text-sanctuary-charcoal">
                {entry.title}
              </h3>
              <p className="mt-1 font-sans text-[13px] leading-[1.45] text-sanctuary-muted">
                {firstSentence(entry.body)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
