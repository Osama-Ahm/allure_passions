import { Award, GraduationCap, ShieldCheck, Star } from 'lucide-react';
import { clinic } from '../../../content/clinic';
import scrollToSection from '../../../lib/scrollToSection';
import { getReviewsSummary } from '../../../services/reviews';
import { Container, Icon } from '../../../components/ui';
import './CredentialsRibbon.css';

/**
 * Block 2 (plan §6): four facts on one hairline row, straight after the
 * promise. The reviews cell only shows a rating when a live provider is
 * connected (§8.11); until then it simply points to the reviews.
 */
export default function CredentialsRibbon() {
  const reviews = getReviewsSummary();

  const cells = [
    {
      id: 'award',
      icon: Award,
      title: clinic.award.title,
      detail: clinic.award.body,
      target: 'why-allure',
    },
    {
      id: 'jccp',
      icon: ShieldCheck,
      title: 'JCCP registered',
      detail: 'Joint Council for Cosmetic Practitioners',
    },
    {
      id: 'level6',
      icon: GraduationCap,
      title: 'Level 6 qualified practitioner',
      detail: 'Advanced aesthetic practitioner training',
    },
    {
      id: 'reviews',
      icon: Star,
      // No provider connected means no numbers, and nothing to link to either:
      // the reviews block itself does not render (§8.11).
      title: reviews.configured ? `${reviews.rating} on Google` : 'Patient reviews',
      detail: reviews.configured ? `${reviews.count} Google reviews` : 'In our patients’ own words',
      target: reviews.configured ? 'reviews' : null,
    },
  ];

  return (
    <section className="ap-ribbon" id="credentials" data-tone="stone" aria-label="Our credentials">
      <Container>
        <ul className="ap-ribbon__list">
          {cells.map((cell) => {
            const content = (
              <>
                <Icon icon={cell.icon} size={20} className="ap-ribbon__icon" />
                <span className="ap-ribbon__text">
                  <span className="ap-ribbon__title">{cell.title}</span>
                  <span className="ap-ribbon__detail">{cell.detail}</span>
                </span>
              </>
            );

            return (
              <li className="ap-ribbon__cell" key={cell.id}>
                {cell.target ? (
                  <a
                    className="ap-ribbon__link"
                    href={`#${cell.target}`}
                    onClick={(event) => {
                      if (scrollToSection(cell.target)) event.preventDefault();
                    }}
                  >
                    {content}
                  </a>
                ) : (
                  <span className="ap-ribbon__link">{content}</span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
