import { addressText, clinic } from './clinic';

/**
 * Homepage FAQ (plan §6, Block 10). Answers are drafts for the clinic's
 * sign-off (§11.11) and follow §8.11: no guarantees, no figures we cannot
 * source, and the prescription route described without naming the medicine (P5).
 */
export const faqs = [
  {
    id: 'consultation-fee',
    question: 'Is there a consultation fee?',
    answer:
      'Ask us when you get in touch and we will confirm the fee before you book, along with whether it comes off the cost of treatment.',
  },
  {
    id: 'what-happens',
    question: 'What happens at my consultation?',
    answer:
      'We talk through what you would like to change and take a medical history, then assess your skin or the area concerned. You leave with a plan setting out what is suitable, how many sessions it typically takes and what it costs. Nothing is treated on the same day unless you are happy to go ahead.',
  },
  {
    id: 'who-treats',
    question: 'Who will carry out my treatment?',
    answer:
      'A Level 6 qualified aesthetic practitioner, registered with the Joint Council for Cosmetic Practitioners and trained by the manufacturer on each device used.',
  },
  {
    id: 'how-many-sessions',
    question: 'How many sessions will I need?',
    answer:
      'It depends on the concern and on how your skin or body responds. Most courses run to between three and ten sessions. We set out a realistic number at consultation and review it as you go, rather than asking you to commit to a figure on a website.',
  },
  {
    id: 'downtime',
    question: 'Is there any downtime?',
    answer:
      'Most of our treatments are non-invasive and people return to their day afterwards. Some, such as radiofrequency microneedling, leave the skin red for a day or two. We tell you what to expect for your treatment before you decide.',
  },
  {
    id: 'payment',
    question: 'How do I pay?',
    answer:
      'Payment is taken in clinic. Courses and programmes can be paid for in full or by instalment — ask us what suits you.',
  },
  {
    id: 'prescription',
    question: 'How does prescription skincare work?',
    answer:
      'Prescription skincare is only available after a medical consultation. You complete a medical questionnaire, a practitioner reviews whether treatment is suitable for you, we confirm in writing what has been agreed, and payment and collection happen in clinic. Nothing prescription-only is ever sold online.',
  },
  {
    id: 'location',
    question: 'Where is the clinic, and how do I get there?',
    answer: `We are at ${addressText}, a short walk from ${clinic.stations.join(' and ')} stations. Get in touch if you need directions or step-free access information.`,
  },
];
