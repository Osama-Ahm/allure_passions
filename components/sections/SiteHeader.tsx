import Image from 'next/image';
import { clinic } from '@/content/clinic';
import { navItems } from '@/lib/story/chapters';
import { ConsultationButton } from '@/components/ui/ConsultationButton';
import { MobileMenu } from '@/components/sections/MobileMenu';

/**
 * The header floats over the story with no bar, only a veil of the page's own
 * colour. It turns light or dark with the page (the story runtime sets
 * data-chrome on <html>), and the runtime marks the nav link for the chapter
 * in view with aria-current. Server-rendered; only the enquiry button and the
 * phone menu are client code.
 */
export function SiteHeader() {
  return (
    <header className="chrome fixed inset-x-0 top-0 z-50">
      {/* The page colour, solid behind the bar and fading out below it. The
          story runtime keeps --veil in step with the backdrop. */}
      <div
        id="chrome-veil"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[150%]"
        style={{ background: 'linear-gradient(to bottom, var(--veil, #F9F6F0) 55%, transparent)' }}
      />
      <div className="relative flex items-center justify-between gap-6 px-5 py-4 md:px-10 md:py-6">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <Image
            src="/assets/brand/ap-monogram.png"
            alt=""
            width={195}
            height={240}
            priority
            className="h-8 w-auto md:h-9"
          />
          <span className="sr-only">{clinic.legalName}, back to the top</span>
          <span
            aria-hidden="true"
            className="whitespace-nowrap font-serif text-[15px] uppercase tracking-[0.22em] md:text-base"
          >
            {clinic.name}
          </span>
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  data-nav-link={item.id}
                  className="relative py-2 font-sans text-label uppercase text-ink-muted transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-out-expo hover:text-ink aria-[current=true]:text-ink aria-[current=true]:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-6">
          <a
            href={'tel:' + clinic.phone.dial}
            className="hidden font-sans text-label uppercase text-ink-muted transition-colors hover:text-ink xl:block"
          >
            {clinic.phone.display}
          </a>
          <ConsultationButton variant="outline" className="hidden whitespace-nowrap px-5 py-2.5 sm:block">
            Request a consultation
          </ConsultationButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
