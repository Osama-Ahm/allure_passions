// Contact hand-offs used by the homepage CTAs (client-accepted WhatsApp/email route).
import { CLINIC_INFO } from './treatmentData';

const WHATSAPP_NUMBER = '447342052249';

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const BOOK_CONSULTATION_URL = whatsappLink(
  'Hello Allure Passions UK, I would like to book a consultation.',
);

export const INSTAGRAM_URL = `https://www.instagram.com/${CLINIC_INFO.instagram.replace('@', '')}/`;
export const EMAIL_URL = `mailto:${CLINIC_INFO.email}`;
export const PHONE_URL = `tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`;
export const GOOGLE_REVIEWS_URL = `https://www.google.com/search?q=${encodeURIComponent('Allure Passions UK Aesthetic Clinic reviews')}`;
