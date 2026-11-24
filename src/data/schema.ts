// Builders for page-level JSON-LD nodes. The Organization / LocalBusiness nodes
// live in Layout.astro; these reference them by @id.
import { SITE, BUSINESS_ID, type Crumb, type Faq } from './site';

const abs = (path: string) => new URL(path, SITE.url).href;

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; areaServed?: string }) {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    serviceType: 'Transporte de carga',
    provider: { '@id': BUSINESS_ID },
    areaServed: opts.areaServed
      ? { '@type': 'City', name: opts.areaServed }
      : { '@type': 'Country', name: 'Colombia' },
  };
}
