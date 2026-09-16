import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  Check,
  CircleAlert,
  Clock,
  GraduationCap,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Pause,
  Phone,
  Play,
  Plus,
  PoundSterling,
  RefreshCw,
  ShieldCheck,
  Star,
  Timer,
  X,
} from 'lucide-react';
import BrandLockup from '../../components/brand/BrandLockup';
import Reveal from '../../components/motion/Reveal';
import {
  ArrowLink,
  Button,
  Chip,
  Container,
  Divider,
  Eyebrow,
  Heading,
  Icon,
  IconButton,
  SectionHeader,
  Tag,
  Text,
} from '../../components/ui';
import usePageMeta from '../../lib/usePageMeta';
import './StyleGuidePage.css';

const SECTIONS = [
  { id: 'brand', label: 'Brand' },
  { id: 'colour', label: 'Colour' },
  { id: 'typography', label: 'Typography' },
  { id: 'layout', label: 'Layout & spacing' },
  { id: 'shape', label: 'Shape & elevation' },
  { id: 'actions', label: 'Buttons & links' },
  { id: 'selection', label: 'Chips & tags' },
  { id: 'patterns', label: 'Section header' },
  { id: 'tones', label: 'Tones' },
  { id: 'icons', label: 'Icons' },
  { id: 'motion', label: 'Motion' },
];

const COLOUR_GROUPS = [
  {
    title: 'Surfaces',
    swatches: [
      { token: '--color-canvas', value: '#FAF7F2', use: 'Page background' },
      { token: '--color-surface', value: '#FFFFFF', use: 'Inputs and popovers' },
      { token: '--color-stone', value: '#F4EFE6', use: 'Tinted sections and panels' },
      { token: '--color-stone-strong', value: '#EAE3D6', use: 'Hover and pressed fills' },
      { token: '--color-night', value: '#141312', use: 'Footer and hero scrim' },
    ],
  },
  {
    title: 'Text',
    swatches: [
      { token: '--color-ink', value: '#1C1B18', use: 'Headings, primary text, primary buttons', contrast: '16.1:1 on canvas' },
      { token: '--color-ink-2', value: '#4A4740', use: 'Body copy', contrast: '8.7:1 on canvas' },
      { token: '--color-ink-3', value: '#6F6A62', use: 'Meta, captions, placeholders', contrast: '5.0:1 on canvas' },
      { token: '--color-on-night', value: '#F7F3EC', use: 'Text on night', contrast: '16.8:1 on night' },
    ],
  },
  {
    title: 'Accent',
    swatches: [
      { token: '--color-bronze', value: '#A87F3D', use: 'Icons, rules, focus ring, large accents', contrast: '3.4:1 · never small text' },
      { token: '--color-bronze-text', value: '#7F6029', use: 'Small bronze text and links', contrast: '5.5:1 on canvas' },
      { token: '--color-champagne', value: '#D6BD8A', use: 'Accents on night', contrast: '10.2:1 on night' },
    ],
  },
  {
    title: 'Lines & feedback',
    swatches: [
      { token: '--color-line', value: 'Ink at 12%', use: 'Hairlines and dividers' },
      { token: '--color-line-strong', value: 'Ink at 24%', use: 'Chip borders, stronger rules' },
      { token: '--color-field', value: '#8C877E', use: 'Input borders', contrast: '3.6:1 on white' },
      { token: '--color-error', value: '#9B3426', use: 'Form errors, questionnaire stops', contrast: '6.8:1 on canvas' },
    ],
  },
];

const TYPE_SCALE = [
  { name: 'Display XL', token: '--text-display-xl', spec: 'Newsreader · 44 → 88px · 1.02 · −0.02em', size: 'xl', sample: 'Advanced care for skin, body & wellbeing.' },
  { name: 'Display L', token: '--text-display-l', spec: 'Newsreader · 36 → 60px · 1.05 · −0.015em', size: 'l', sample: <>Advanced treatments. <em>Personalised</em> to you.</> },
  { name: 'Display M', token: '--text-display-m', spec: 'Newsreader · 28 → 40px · 1.15 · −0.01em', size: 'm', sample: 'An award-winning clinic for advanced, non-invasive skin and body care.' },
  { name: 'Title', token: '--text-title', spec: 'Newsreader · 22 → 26px · 1.2', size: 'title', sample: 'PicoWay — picosecond laser' },
];

const TEXT_SCALE = [
  { name: 'Lede', token: '--text-lede', spec: 'Instrument Sans · 18 → 20px · 1.6', size: 'lede', sample: 'Choose a concern to see treatments that may help. Your plan is always confirmed at consultation.' },
  { name: 'Body', token: '--text-body', spec: 'Instrument Sans · 16 → 17px · 1.65', size: 'body', sample: 'Every treatment begins with a consultation. We take a full medical history, assess your skin and talk through what is realistic, so your plan is built around you rather than a single device.' },
  { name: 'Small', token: '--text-small', spec: 'Instrument Sans · 14px · 1.5', size: 'small', sample: 'Prices are confirmed at consultation. Payment is taken in clinic.' },
];

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160];

const ICONS = [
  { icon: Award, name: 'Award' },
  { icon: ShieldCheck, name: 'Registration' },
  { icon: GraduationCap, name: 'Qualification' },
  { icon: Star, name: 'Rating' },
  { icon: Clock, name: 'Duration' },
  { icon: Timer, name: 'Downtime' },
  { icon: RefreshCw, name: 'Sessions' },
  { icon: PoundSterling, name: 'Price' },
  { icon: MessageCircle, name: 'WhatsApp' },
  { icon: Phone, name: 'Call' },
  { icon: Mail, name: 'Email' },
  { icon: MapPin, name: 'Address' },
  { icon: CalendarDays, name: 'Hours' },
  { icon: Info, name: 'Information' },
  { icon: CircleAlert, name: 'Important' },
  { icon: Check, name: 'Included' },
  { icon: Plus, name: 'Expand' },
  { icon: Minus, name: 'Collapse' },
  { icon: ArrowRight, name: 'Go' },
  { icon: ArrowUpRight, name: 'External' },
  { icon: Pause, name: 'Pause' },
  { icon: Play, name: 'Play' },
  { icon: Menu, name: 'Menu' },
  { icon: X, name: 'Close' },
];

const MOTION_TOKENS = [
  { token: '--dur-quick', value: '150ms', use: 'Hover and colour changes' },
  { token: '--dur-base', value: '250ms', use: 'Tabs, chips, accordion, menus' },
  { token: '--dur-reveal', value: '500ms', use: 'Content revealed on first scroll into view' },
  { token: '--ease-out', value: 'cubic-bezier(0.2, 0, 0, 1)', use: 'Entrances' },
  { token: '--ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', use: 'Exits' },
  { token: 'Page transition', value: '200ms cross-fade', use: 'Route changes (View Transitions)' },
];

const CONCERN_GROUPS = ['Skin', 'Pigmentation', 'Laser', 'Skin tightening', 'Body', 'Wellness'];

function StyleSection({ id, title, intro, children }) {
  return (
    <section id={id} className="sg-section" aria-labelledby={`${id}-title`}>
      <div className="sg-section__head">
        <Heading as="h2" size="m" id={`${id}-title`}>
          {title}
        </Heading>
        {intro && <Text>{intro}</Text>}
      </div>
      {children}
    </section>
  );
}

function SubHeading({ children }) {
  return <h3 className="sg-subheading">{children}</h3>;
}

function ChipDemo() {
  const [selected, setSelected] = useState('Pigmentation');

  return (
    <div className="sg-demo-row" aria-label="Concern groups">
      {CONCERN_GROUPS.map((group) => (
        <Chip key={group} selected={selected === group} aria-pressed={selected === group} onClick={() => setSelected(group)}>
          {group}
        </Chip>
      ))}
    </div>
  );
}

function RevealDemo() {
  const [run, setRun] = useState(0);
  const steps = ['Get in touch', 'Consultation & skin assessment', 'Your personalised plan', 'Treatment & aftercare'];

  return (
    <div className="sg-reveal">
      <Button variant="secondary" size="sm" icon={RefreshCw} iconPosition="start" onClick={() => setRun((count) => count + 1)}>
        Replay reveal
      </Button>
      <Reveal key={run} stagger className="sg-reveal__list">
        {steps.map((step, index) => (
          <div key={step} className="sg-reveal__item">
            <span className="sg-reveal__number ap-nums">{String(index + 1).padStart(2, '0')}</span>
            <span>{step}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

function TonePanel({ tone, label }) {
  return (
    <div className="sg-tone" data-tone={tone}>
      <Eyebrow>{label}</Eyebrow>
      <Heading as="h3" size="title">
        Your treatment starts with a conversation.
      </Heading>
      <Text>Consultation first, then a plan built around you. Payment is taken in clinic.</Text>
      <div className="sg-demo-row">
        <Button icon={ArrowRight}>Request a consultation</Button>
        <Button variant="secondary">View pricing</Button>
      </div>
      <div className="sg-demo-row">
        <ArrowLink href="#tones">Discover our approach</ArrowLink>
        <IconButton icon={Plus} label="Expand" />
      </div>
      <div className="sg-demo-row">
        <Chip selected aria-pressed>
          Pigmentation
        </Chip>
        <Chip aria-pressed={false}>Body</Chip>
        <Tag>Acne scarring</Tag>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  usePageMeta({ title: 'Design system' });

  return (
    <div className="sg">
      <header className="sg-header" data-tone="night">
        <Container>
          <div className="sg-header__inner">
            <BrandLockup size="md" />
            <div className="sg-header__title">
              <Eyebrow>Redesign · Module 1 foundation</Eyebrow>
              <Heading as="h1" size="xl">
                Design system
              </Heading>
              <Text size="lede">
                Tokens and primitives for the new Allure Passions UK website: a type-led, image-light language built on the
                clinic's cream, ink and bronze palette.
              </Text>
            </div>
            <dl className="sg-header__meta">
              <div>
                <dt>Display</dt>
                <dd>Newsreader</dd>
              </div>
              <div>
                <dt>Interface</dt>
                <dd>Instrument Sans</dd>
              </div>
              <div>
                <dt>Standard</dt>
                <dd>WCAG 2.2 AA</dd>
              </div>
              <div>
                <dt>Reference</dt>
                <dd>docs/REDESIGN_PLAN.md §8</dd>
              </div>
            </dl>
          </div>
        </Container>
      </header>

      <Container className="sg-body">
        <nav className="sg-nav" aria-label="Design system sections">
          <ul role="list">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sg-content">
          <StyleSection
            id="brand"
            title="Brand"
            intro="The AP monogram beside a live-text wordmark set in Newsreader. If the clinic has an official wordmark file, it replaces the text version."
          >
            <div className="sg-lockups">
              {['canvas', 'stone', 'night'].map((tone) => (
                <div key={tone} className="sg-lockups__item" data-tone={tone}>
                  <BrandLockup size="md" />
                  <span className="sg-caption">{tone}</span>
                </div>
              ))}
            </div>
            <div className="sg-lockup-sizes">
              <BrandLockup size="lg" />
              <BrandLockup size="sm" />
              <BrandLockup size="sm" showPlace={false} />
            </div>
          </StyleSection>

          <StyleSection
            id="colour"
            title="Colour"
            intro="The existing palette, rationalised into tokens. Components use semantic tokens (--fg, --bg, --rule, --accent) so they adapt automatically on stone and night."
          >
            {COLOUR_GROUPS.map((group) => (
              <div key={group.title} className="sg-group">
                <SubHeading>{group.title}</SubHeading>
                <ul className="sg-swatches" role="list">
                  {group.swatches.map((swatch) => (
                    <li key={swatch.token} className="sg-swatch">
                      <span className="sg-swatch__chip" style={{ '--swatch': `var(${swatch.token})` }} />
                      <code className="sg-swatch__token">{swatch.token}</code>
                      <span className="sg-swatch__value">{swatch.value}</span>
                      <span className="sg-swatch__use">{swatch.use}</span>
                      {swatch.contrast && <span className="sg-swatch__contrast">{swatch.contrast}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StyleSection>

          <StyleSection
            id="typography"
            title="Typography"
            intro="Newsreader carries hierarchy at display sizes, with optical sizing switched on; Instrument Sans handles everything functional. Headings use light weights and tight tracking; labels are small, uppercase and widely tracked."
          >
            <div className="sg-families">
              <div className="sg-family sg-family--display">
                <span className="sg-family__glyphs" aria-hidden="true">
                  Aa<em>Aa</em>
                </span>
                <div>
                  <p className="sg-family__name">Newsreader</p>
                  <Text size="small" tone="muted">
                    Display & headings · variable 200–800 · optical sizes 6–72 · italic
                  </Text>
                </div>
              </div>
              <div className="sg-family sg-family--sans">
                <span className="sg-family__glyphs" aria-hidden="true">
                  Aa
                </span>
                <div>
                  <p className="sg-family__name">Instrument Sans</p>
                  <Text size="small" tone="muted">
                    Interface & body · variable 400–700 · italic
                  </Text>
                </div>
              </div>
            </div>

            <div className="sg-type-scale">
              {TYPE_SCALE.map((style) => (
                <div key={style.name} className="sg-type-row">
                  <div className="sg-type-row__meta">
                    <span className="sg-type-row__name">{style.name}</span>
                    <code>{style.token}</code>
                    <span>{style.spec}</span>
                  </div>
                  <Heading as="p" size={style.size}>
                    {style.sample}
                  </Heading>
                </div>
              ))}
              {TEXT_SCALE.map((style) => (
                <div key={style.name} className="sg-type-row">
                  <div className="sg-type-row__meta">
                    <span className="sg-type-row__name">{style.name}</span>
                    <code>{style.token}</code>
                    <span>{style.spec}</span>
                  </div>
                  <Text size={style.size}>{style.sample}</Text>
                </div>
              ))}
              <div className="sg-type-row">
                <div className="sg-type-row__meta">
                  <span className="sg-type-row__name">Label</span>
                  <code>--text-label</code>
                  <span>Instrument Sans · 12px · uppercase · 0.14em · 500</span>
                </div>
                <Eyebrow>Signature treatments</Eyebrow>
              </div>
              <div className="sg-type-row">
                <div className="sg-type-row__meta">
                  <span className="sg-type-row__name">Numerals</span>
                  <code>.ap-nums</code>
                  <span>Tabular figures for prices, steps and ratings</span>
                </div>
                <div className="sg-numerals">
                  <span className="sg-numerals__display ap-nums">£329 · £1,159 · £2,469</span>
                  <span className="sg-numerals__sans ap-nums">01 · 02 · 03 · 04 · 5.0 ★</span>
                </div>
              </div>
            </div>
          </StyleSection>

          <StyleSection
            id="layout"
            title="Layout & spacing"
            intro="A 12-column grid with 1320px of content, fluid page padding and generous section rhythm. Spacing tokens are named by their pixel value."
          >
            <div className="sg-group">
              <SubHeading>Grid · 12 columns · 24px gaps (16px on mobile)</SubHeading>
              <div className="sg-grid-demo" aria-hidden="true">
                {Array.from({ length: 12 }, (_, index) => (
                  <span key={index}>{index + 1}</span>
                ))}
              </div>
            </div>
            <div className="sg-group">
              <SubHeading>Spacing scale</SubHeading>
              <ul className="sg-spacing" role="list">
                {SPACING.map((value) => (
                  <li key={value} className="sg-spacing__row">
                    <code>--space-{value}</code>
                    <span className="ap-nums">{value}px</span>
                    <span className="sg-spacing__bar" style={{ '--size': `var(--space-${value})` }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="sg-group">
              <SubHeading>Rhythm</SubHeading>
              <dl className="sg-facts">
                <div>
                  <dt>Section padding</dt>
                  <dd>72 → 144px</dd>
                </div>
                <div>
                  <dt>Header to content</dt>
                  <dd>48 → 64px</dd>
                </div>
                <div>
                  <dt>Page padding</dt>
                  <dd>20 → 64px</dd>
                </div>
                <div>
                  <dt>Breakpoints</dt>
                  <dd>480 · 768 · 1024 · 1200 · 1440</dd>
                </div>
              </dl>
            </div>
          </StyleSection>

          <StyleSection
            id="shape"
            title="Shape & elevation"
            intro="Square geometry for structure, pills only for chips and tags, round only for icon buttons. Hairlines do the work of boxes; shadows appear only on floating layers."
          >
            <div className="sg-shapes">
              <figure className="sg-shape">
                <div className="sg-shape__demo">
                  <span className="sg-shape__panel" />
                </div>
                <figcaption>Panels, buttons, inputs · radius 0</figcaption>
              </figure>
              <figure className="sg-shape">
                <div className="sg-shape__demo">
                  <Tag>Acne scarring</Tag>
                </div>
                <figcaption>Chips and tags · pill</figcaption>
              </figure>
              <figure className="sg-shape">
                <div className="sg-shape__demo">
                  <IconButton icon={Plus} label="Expand" />
                </div>
                <figcaption>Icon buttons · round</figcaption>
              </figure>
              <figure className="sg-shape">
                <div className="sg-shape__demo">
                  <span className="sg-shape__float" />
                </div>
                <figcaption>Floating layers only · --shadow-float</figcaption>
              </figure>
            </div>
            <div className="sg-group">
              <SubHeading>Hairlines</SubHeading>
              <div className="sg-rules">
                <Divider />
                <span className="sg-caption">--color-line · dividers and rows</span>
                <Divider strength="strong" />
                <span className="sg-caption">--color-line-strong · emphasis</span>
              </div>
            </div>
          </StyleSection>

          <StyleSection
            id="actions"
            title="Buttons & links"
            intro="One primary action per view. Labels are short, uppercase and specific. Text links carry an arrow; external links show ↗ and announce that they open a new tab."
          >
            <div className="sg-group">
              <SubHeading>Buttons</SubHeading>
              <div className="sg-demo-row">
                <Button icon={ArrowRight}>Request a consultation</Button>
                <Button variant="secondary">View pricing</Button>
                <Button variant="secondary" size="sm">
                  Small
                </Button>
                <Button disabled>Unavailable</Button>
              </div>
            </div>
            <div className="sg-group">
              <SubHeading>Links</SubHeading>
              <div className="sg-demo-row">
                <ArrowLink href="#actions">Discover our approach</ArrowLink>
                <ArrowLink href="https://www.jccp.org.uk" external>
                  JCCP register
                </ArrowLink>
              </div>
            </div>
            <div className="sg-group">
              <SubHeading>Icon buttons</SubHeading>
              <div className="sg-demo-row">
                <IconButton icon={ArrowRight} label="Next" />
                <IconButton icon={Pause} label="Pause video" />
                <IconButton icon={X} label="Close" variant="ghost" />
              </div>
            </div>
            <div className="sg-group">
              <SubHeading>Focus state · shown on keyboard focus</SubHeading>
              <div className="sg-demo-row">
                <span className="sg-focus-demo">
                  <Button tabIndex={-1}>Request a consultation</Button>
                </span>
                <Text size="small" tone="muted">
                  2px bronze outline, 3px offset, on every interactive element.
                </Text>
              </div>
            </div>
          </StyleSection>

          <StyleSection
            id="selection"
            title="Chips & tags"
            intro="Chips select (try them); tags only describe. Selected chips invert to ink."
          >
            <div className="sg-group">
              <SubHeading>Chips</SubHeading>
              <ChipDemo />
            </div>
            <div className="sg-group">
              <SubHeading>Tags</SubHeading>
              <div className="sg-demo-row">
                <Tag>Pigmentation</Tag>
                <Tag>Acne scarring</Tag>
                <Tag>Tattoo removal</Tag>
              </div>
            </div>
          </StyleSection>

          <StyleSection
            id="patterns"
            title="Section header"
            intro="The opening of most sections: eyebrow and display title on the left, lede and action on the right on wide screens; stacked on mobile."
          >
            <div className="sg-frame">
              <SectionHeader
                eyebrow="Signature treatments"
                title="Advanced treatments. Personalised to you."
                titleAs="h3"
                lede="Six technologies at the heart of the clinic, each chosen for the concerns it can address."
                action={<ArrowLink href="#patterns">View all treatments</ArrowLink>}
              />
            </div>
          </StyleSection>

          <StyleSection
            id="tones"
            title="Tones"
            intro="The same components on each surface. Semantic tokens switch automatically, so nothing needs a dark-mode variant."
          >
            <div className="sg-tones">
              <TonePanel tone="canvas" label="Canvas" />
              <TonePanel tone="stone" label="Stone" />
              <TonePanel tone="night" label="Night" />
            </div>
          </StyleSection>

          <StyleSection
            id="icons"
            title="Icons"
            intro="Lucide at a true 1.25px stroke, in bronze (champagne on night). Icons label information; they are never decoration."
          >
            <ul className="sg-icons" role="list">
              {ICONS.map(({ icon, name }) => (
                <li key={name} className="sg-icons__item">
                  <Icon icon={icon} size={22} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </StyleSection>

          <StyleSection
            id="motion"
            title="Motion"
            intro="Calm and quick. Content rises 12px as it enters, once; hover responds in 150ms; pages cross-fade in 200ms. Reduced-motion settings turn all of it off."
          >
            <table className="sg-table">
              <thead>
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">Value</th>
                  <th scope="col">Use</th>
                </tr>
              </thead>
              <tbody>
                {MOTION_TOKENS.map((row) => (
                  <tr key={row.token}>
                    <td>
                      <code>{row.token}</code>
                    </td>
                    <td>{row.value}</td>
                    <td>{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="sg-motion-demos">
              <div className="sg-group">
                <SubHeading>Reveal</SubHeading>
                <RevealDemo />
              </div>
              <div className="sg-group">
                <SubHeading>Row hover</SubHeading>
                <div className="sg-rows">
                  {['PicoWay', 'Morpheus8', 'Sofwave'].map((name, index) => (
                    <a key={name} href="#motion" className="sg-row">
                      <span className="sg-row__number ap-nums">{String(index + 1).padStart(2, '0')}</span>
                      <span className="sg-row__name">{name}</span>
                      <ArrowRight className="sg-row__icon" aria-hidden="true" size={18} strokeWidth={1.25} absoluteStrokeWidth />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </StyleSection>
        </div>
      </Container>
    </div>
  );
}
