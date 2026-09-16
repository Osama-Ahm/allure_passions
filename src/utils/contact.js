import { clinic } from '../content/clinic';

/**
 * Builds the WhatsApp, phone and email links used across the site (plan §9).
 * Every message is written in the clinic's voice and stays consultation-led (§8.11, D9).
 */

export const telHref = `tel:${clinic.phone.dial}`;

/** wa.me link with the message pre-filled. */
export function whatsappHref(message = enquiryMessage.general) {
  return `https://wa.me/${clinic.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function emailHref(subject = 'Consultation enquiry') {
  return `mailto:${clinic.email}?subject=${encodeURIComponent(subject)}`;
}

/** Pre-filled openers, so an enquiry arrives with its context already in it. */
export const enquiryMessage = {
  general: 'Hello Allure Passions UK, I would like to request a consultation.',
  concern: (concern) => `Hello Allure Passions UK, I would like to discuss ${concern} and which treatments may help.`,
  treatment: (treatment) => `Hello Allure Passions UK, I would like to enquire about ${treatment}.`,
  programme: (programme) => `Hello Allure Passions UK, I would like to enquire about the ${programme} programme.`,
};
