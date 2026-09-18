import Image from 'next/image';
import { clinic } from '@/content/clinic';

/**
 * Wall 7 — Inside the clinic.
 *
 * The brief asks for a live Instagram feed. No provider is connected, so this
 * wall carries the clinic's own photography and its real handle, and the feed
 * replaces the strip when a token is available. The images are the clinic's
 * own rooms and treatments — nothing here implies a result.
 */
const FRAMES = [
  { src: '/assets/images/site/why-clinic-room.webp', alt: 'A treatment room at the clinic' },
  { src: '/assets/images/site/consultation-table.webp', alt: 'A consultation table set for an appointment' },
  { src: '/assets/images/site/treatment-sofwave.webp', alt: 'A Sofwave treatment in progress' },
  { src: '/assets/images/site/why-detail-hands.webp', alt: 'A practitioner preparing a treatment tray' },
];

export function SocialWall() {
  const instagram = clinic.social.find((channel) => channel.id === 'instagram');

  return (
    <div className="flex h-[460px] w-[900px] flex-col justify-center px-12">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="font-sans text-[16px] uppercase tracking-[0.32em] text-sanctuary-gold-deep">
          Inside the clinic
        </span>
        {instagram ? (
          <a
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[14px] tracking-[0.06em] text-sanctuary-verde underline decoration-sanctuary-verde/40 underline-offset-4"
          >
            {instagram.handle}
          </a>
        ) : null}
      </div>

      <h2 className="mb-5 font-serif text-[40px] font-light leading-[1.1] text-sanctuary-charcoal">
        The rooms, the technology, the day to day
      </h2>

      <ul className="grid grid-cols-4 gap-3">
        {FRAMES.map((frame) => (
          <li key={frame.src} className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image src={frame.src} alt={frame.alt} fill sizes="200px" className="object-cover" />
          </li>
        ))}
      </ul>

      <p className="mt-4 font-sans text-[12.5px] leading-snug text-sanctuary-muted">
        Photographs of the clinic and its technology. Treatment results are shown only on their own
        pages, with consent and under the same lighting.
      </p>
    </div>
  );
}
