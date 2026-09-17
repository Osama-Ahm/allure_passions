import { Mail, MessageCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { questionLabels, questionnaireSteps } from '../../content/questionnaire';
import { clinic } from '../../content/clinic';
import { emailHref, whatsappHref } from '../../utils/contact';
import { Button, Checkbox, Heading, Notice, RadioCards, Text, TextArea, TextField } from '../../components/ui';
import './PrescriptionQuestionnaire.css';

const REVIEW_STEP = questionnaireSteps.length;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s-]{9,}$/;

/** The answer that ended the flow, if any. */
function findStop(values) {
  for (const step of questionnaireSteps) {
    for (const field of step.fields) {
      const chosen = field.options?.find((option) => option.value === values[field.name]);
      if (chosen?.stop) return { field, message: chosen.stop };
    }
  }
  return null;
}

function validate(step, values) {
  const errors = {};

  for (const field of step.fields) {
    const value = (values[field.name] ?? '').trim?.() ?? values[field.name];
    if (field.required && !value) {
      errors[field.name] = 'Please answer this before continuing.';
      continue;
    }
    if (field.type === 'email' && value && !EMAIL_PATTERN.test(value)) {
      errors[field.name] = 'Please check this email address.';
    }
    if (field.type === 'tel' && value && !PHONE_PATTERN.test(value)) {
      errors[field.name] = 'Please check this phone number.';
    }
    if (field.type === 'date' && value) {
      const date = new Date(value);
      const age = (Date.now() - date.getTime()) / (365.25 * 24 * 3600 * 1000);
      if (Number.isNaN(date.getTime()) || age < 0) errors[field.name] = 'Please check this date.';
      else if (age < 18) errors[field.name] = 'We can only take this request from someone aged 18 or over.';
    }
  }

  return errors;
}

/** Turns the answers into the text the prescriber receives. */
function buildMessage(values, channel) {
  const answerFor = (field) => {
    const raw = values[field.name];
    if (!raw) return 'Not answered';
    const option = field.options?.find((item) => item.value === raw);
    return option ? option.label : raw;
  };

  const lines = ['Prescription skincare enquiry', ''];

  for (const step of questionnaireSteps) {
    lines.push(`— ${step.title} —`);
    for (const field of step.fields) {
      if (!field.required && !values[field.name]) continue;
      lines.push(`${questionLabels[field.name]} ${answerFor(field)}`);
    }
    lines.push('');
  }

  lines.push(
    `I have read the privacy notice and consent to ${clinic.name} receiving this information by ${channel}.`,
  );
  lines.push('I understand this is a request for assessment, not a purchase.');

  return lines.join('\n');
}

export default function PrescriptionQuestionnaire() {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const headingRef = useRef(null);

  const stop = findStop(values);
  const step = questionnaireSteps[stepIndex];

  const setValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const goTo = (index) => {
    setStepIndex(index);
    // Move focus to the new step, so the change is not silent.
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  const onNext = () => {
    const found = validate(step, values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.querySelector('.ap-field.is-invalid input, .ap-field.is-invalid textarea')?.focus();
      return;
    }
    goTo(stepIndex + 1);
  };

  const onSend = (channel) => (event) => {
    if (consent) return true;
    event.preventDefault();
    setConsentError('Please confirm you are happy for us to receive this by ' + channel + '.');
    return false;
  };

  if (stop) {
    return (
      <div className="ap-questionnaire" id="questionnaire">
        <Notice tone="important" title="We cannot continue with this request">
          <p>{stop.message}</p>
        </Notice>
        <div className="ap-questionnaire__actions">
          <Button
            href={whatsappHref(`Hello ${clinic.name}, I would like to talk about skincare options that would suit me.`)}
            external
            icon={MessageCircle}
            iconPosition="start"
          >
            Talk to us about alternatives
          </Button>
          <Button variant="secondary" onClick={() => setValue(stop.field.name, '')}>
            Change my answer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ap-questionnaire" id="questionnaire">
      <ol className="ap-questionnaire__steps" aria-label="Questionnaire progress">
        {questionnaireSteps.map((item, index) => (
          <li
            className="ap-questionnaire__step"
            key={item.id}
            aria-current={index === stepIndex ? 'step' : undefined}
            data-state={index < stepIndex ? 'done' : index === stepIndex ? 'current' : 'todo'}
          >
            <span className="ap-nums">{index + 1}</span>
            {item.title}
          </li>
        ))}
        <li className="ap-questionnaire__step" aria-current={stepIndex === REVIEW_STEP ? 'step' : undefined} data-state={stepIndex === REVIEW_STEP ? 'current' : 'todo'}>
          <span className="ap-nums">{REVIEW_STEP + 1}</span>
          Review &amp; send
        </li>
      </ol>

      {stepIndex < REVIEW_STEP ? (
        <div className="ap-questionnaire__panel">
          <Heading as="h3" size="title" ref={headingRef} tabIndex={-1}>
            {step.title}
          </Heading>
          {step.intro && <Text size="small">{step.intro}</Text>}

          <div className="ap-questionnaire__fields">
            {step.fields.map((field) => {
              const shared = {
                label: field.label,
                help: field.help,
                error: errors[field.name],
                required: field.required,
              };

              if (field.type === 'radio') {
                return (
                  <RadioCards
                    key={field.name}
                    {...shared}
                    name={field.name}
                    options={field.options}
                    value={values[field.name] ?? ''}
                    onChange={(value) => setValue(field.name, value)}
                  />
                );
              }
              if (field.type === 'textarea') {
                return (
                  <TextArea
                    key={field.name}
                    {...shared}
                    value={values[field.name] ?? ''}
                    onChange={(event) => setValue(field.name, event.target.value)}
                  />
                );
              }
              return (
                <TextField
                  key={field.name}
                  {...shared}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={values[field.name] ?? ''}
                  onChange={(event) => setValue(field.name, event.target.value)}
                />
              );
            })}
          </div>

          <div className="ap-questionnaire__actions">
            {stepIndex > 0 && (
              <Button variant="secondary" onClick={() => goTo(stepIndex - 1)}>
                Back
              </Button>
            )}
            <Button onClick={onNext}>{stepIndex === REVIEW_STEP - 1 ? 'Review answers' : 'Continue'}</Button>
          </div>
        </div>
      ) : (
        <div className="ap-questionnaire__panel">
          <Heading as="h3" size="title" ref={headingRef} tabIndex={-1}>
            Review &amp; send
          </Heading>
          <Text size="small">
            Check your answers, then choose how to send them. Sending is a request for assessment — it is not a purchase,
            and nothing is dispensed until our prescriber has confirmed it is suitable for you.
          </Text>

          <dl className="ap-questionnaire__review">
            {questionnaireSteps.flatMap((item) =>
              item.fields
                .filter((field) => values[field.name])
                .map((field) => (
                  <div key={field.name}>
                    <dt>{field.label}</dt>
                    <dd>
                      {field.options?.find((option) => option.value === values[field.name])?.label ?? values[field.name]}
                    </dd>
                  </div>
                )),
            )}
          </dl>

          <Checkbox
            checked={consent}
            error={consentError}
            onChange={(event) => {
              setConsent(event.target.checked);
              setConsentError('');
            }}
            label={
              <>
                I consent to {clinic.name} receiving the health information above through the channel I choose, and I
                have read the <Link to="/privacy">privacy notice</Link>.
              </>
            }
          />

          <div className="ap-questionnaire__actions">
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
              href={`${emailHref('Prescription skincare enquiry')}&body=${encodeURIComponent(buildMessage(values, 'email'))}`}
              variant="secondary"
              icon={Mail}
              iconPosition="start"
              onClick={onSend('email')}
            >
              Send via email
            </Button>
            <Button variant="secondary" onClick={() => goTo(REVIEW_STEP - 1)}>
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
