import { Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { allConcerns } from '../../content/concerns';
import { clinic } from '../../content/clinic';
import { signatureTreatments } from '../../content/treatments';
import { emailHref, whatsappHref } from '../../utils/contact';
import { Button, Checkbox, RadioCards, Select, TextArea, TextField } from '../../components/ui';
import './EnquiryForm.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s-]{9,}$/;

const INTERESTS = [
  { value: '', label: 'Choose one' },
  { value: 'not-sure', label: 'I am not sure yet' },
  ...allConcerns.map((concern) => ({ value: `concern:${concern.name}`, label: `Concern — ${concern.name}` })),
  ...signatureTreatments.map((treatment) => ({ value: `treatment:${treatment.name}`, label: `Treatment — ${treatment.name}` })),
];

const CONTACT_METHODS = [
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Phone', label: 'Phone' },
  { value: 'Email', label: 'Email' },
];

const EMPTY = { name: '', phone: '', email: '', interest: '', method: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.phone.trim()) errors.phone = 'Please give us a phone number.';
  else if (!PHONE_PATTERN.test(values.phone)) errors.phone = 'Please check this phone number.';
  if (!values.email.trim()) errors.email = 'Please give us an email address.';
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Please check this email address.';
  if (!values.interest) errors.interest = 'Please choose what your enquiry is about.';
  if (!values.method) errors.method = 'Please tell us how you would like us to reply.';
  return errors;
}

function buildMessage(values, channel) {
  const [kind, subject] = values.interest.includes(':') ? values.interest.split(':') : ['', 'Not sure yet'];

  const lines = [
    'Consultation enquiry',
    '',
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `About: ${kind ? `${kind === 'concern' ? 'Concern' : 'Treatment'} — ${subject}` : subject}`,
    `Preferred reply: ${values.method}`,
  ];

  if (values.message.trim()) lines.push('', 'Message:', values.message.trim());
  lines.push('', `I have read the privacy notice and consent to ${clinic.name} receiving this enquiry by ${channel}.`);

  return lines.join('\n');
}

/**
 * Consultation enquiry (plan §7.8). Nothing is posted to a server: the form
 * composes a WhatsApp message or an email, which keeps the hand-off in the
 * patient's own hands and the submit step pluggable if a backend follows (R2).
 */
export default function EnquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState('');

  const setValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onSend = (channel) => (event) => {
    const found = validate(values);
    setErrors(found);
    if (!consent) setConsentError(`Please confirm you are happy for us to receive this by ${channel}.`);

    if (Object.keys(found).length > 0 || !consent) {
      event.preventDefault();
      document
        .querySelector('.ap-enquiry .ap-field.is-invalid input, .ap-enquiry .ap-field.is-invalid select, .ap-enquiry .ap-field.is-invalid textarea')
        ?.focus();
    }
  };

  return (
    <form className="ap-enquiry" noValidate aria-labelledby="ap-enquiry-title">
      <h2 className="ap-enquiry__title" id="ap-enquiry-title">
        Send an enquiry
      </h2>

      <div className="ap-enquiry__grid">
        <TextField
          label="Your name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(event) => setValue('name', event.target.value)}
        />
        <TextField
          label="Phone number"
          type="tel"
          required
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(event) => setValue('phone', event.target.value)}
        />
        <TextField
          label="Email address"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(event) => setValue('email', event.target.value)}
        />
        <Select
          label="What is your enquiry about?"
          required
          options={INTERESTS}
          value={values.interest}
          error={errors.interest}
          onChange={(event) => setValue('interest', event.target.value)}
        />
      </div>

      <RadioCards
        label="How would you like us to reply?"
        required
        name="method"
        className="ap-enquiry__methods"
        options={CONTACT_METHODS}
        value={values.method}
        error={errors.method}
        onChange={(value) => setValue('method', value)}
      />

      <TextArea
        label="Anything you would like to add?"
        help="Please leave out medical details you would rather not send by message — we take a full history at your consultation."
        value={values.message}
        onChange={(event) => setValue('message', event.target.value)}
      />

      <Checkbox
        checked={consent}
        error={consentError}
        onChange={(event) => {
          setConsent(event.target.checked);
          setConsentError('');
        }}
        label={
          <>
            I consent to {clinic.name} receiving this enquiry through the channel I choose, and I have read the{' '}
            <Link to="/privacy">privacy notice</Link>.
          </>
        }
      />

      <div className="ap-enquiry__actions">
        <Button
          href={whatsappHref(buildMessage(values, 'WhatsApp'))}
          external
          icon={MessageCircle}
          iconPosition="start"
          onClick={onSend('WhatsApp')}
        >
          Send via WhatsApp
        </Button>
        <Button
          href={`${emailHref('Consultation enquiry')}&body=${encodeURIComponent(buildMessage(values, 'email'))}`}
          variant="secondary"
          icon={Mail}
          iconPosition="start"
          onClick={onSend('email')}
        >
          Send by email
        </Button>
      </div>
    </form>
  );
}
