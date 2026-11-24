// Single source of truth for the company's contact details (NAP).
// Every phone, WhatsApp and email link on the site must come from here so they
// can never drift apart again.

export const SITE = {
  url: 'https://agoraservices.co',
  name: 'AGORA STRATEGY',
  legalName: 'AGORA STRATEGY S.A.S.',
  slogan: 'Moviendo al mundo con inteligencia',
  phone: '+573163174316',
  phoneDisplay: '+57 316 317 4316',
  whatsappNumber: '573163174316',
  // TODO: confirm the official mailbox — the site domain is agoraservices.co.
  email: 'contacto@agorastrategy.co',
  city: 'Bogotá',
  region: 'Bogotá D.C.',
  country: 'CO',
  foundingYear: '2025',
} as const;

/** JSON-LD node ids, so page-level nodes can reference the company. */
export const ORG_ID = `${SITE.url}/#organization`;
export const BUSINESS_ID = `${SITE.url}/#business`;

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, quiero cotizar un transporte de carga o una asesoría empresarial.';

export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Crumb {
  name: string;
  href: string;
}
