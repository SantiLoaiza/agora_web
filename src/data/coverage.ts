import type { Faq } from './site';

// Delivery-time zones as published on the home page (business days).
// TODO: confirm these times are measured from Bogotá (city pages state it that way).
export const zones = [
  {
    range: '1 – 2',
    places: ['Cali', 'Medellín', 'Bucaramanga', 'Barrancabermeja', 'Armenia', 'Pereira', 'Neiva', 'Tunja', 'Duitama', 'Sogamoso', 'Fusagasugá', 'Girardot', 'Espinal', 'Guaduas', 'Melgar', 'Villavicencio', 'La Dorada', 'Acacías', 'Puerto Boyacá'],
  },
  {
    range: '2 – 3',
    places: ['Chiquinquirá', 'Barbosa', 'Puerto López', 'Cumaral', 'Puerto Salgar', 'Garzón', 'Guamal', 'Saldaña', 'Granada', 'Puerto Lleras', 'Puerto Berrío'],
  },
  {
    range: '2 – 4',
    places: ['Barranquilla', 'Cartagena', 'Santa Marta', 'Valledupar', 'Montería', 'Sincelejo', 'Pasto', 'Ipiales', 'Cúcuta', 'Ocaña', 'Popayán', 'Florencia', 'Pitalito', 'Caucasia', 'Aguachica', 'Mocoa', 'Tame'],
  },
  {
    range: '3 – 5',
    places: ['Tumaco', 'Puerto Asís', 'Orito', 'Riohacha', 'Maicao', 'Quibdó', 'Istmina', 'Tibú', 'Apartadó', 'San Vicente del Caguán', 'Rubiales'],
  },
];

export const TRANSIT_NOTE =
  'Los tiempos se cuentan en días hábiles y están sujetos a condiciones climáticas, cierres viales y horarios de recepción. Para mercancía especial, refrigerada o sobredimensionada, el tiempo puede variar.';

export interface City {
  slug: string;
  name: string;
  department: string;
  /** Bogotá is the origin hub, every other page is "Bogotá → city". */
  isHub?: boolean;
  isPort?: boolean;
  title: string;
  description: string;
  h1: string;
  intro: string;
  services: string[];
}

export const cities: City[] = [
  {
    slug: 'bogota',
    name: 'Bogotá',
    department: 'Bogotá D.C.',
    isHub: true,
    title: 'Transporte de carga en Bogotá | AGORA STRATEGY',
    description:
      'Transporte de carga en Bogotá: distribución urbana con ventanas horarias y despachos a los 32 departamentos, desde Carry hasta tractomula.',
    h1: 'Transporte de carga en Bogotá',
    intro:
      'Bogotá es nuestra sede principal y el centro de operaciones desde donde despachamos a todo el país. Hacemos distribución urbana con ventanas horarias y viajes nacionales en vehículos desde Carry hasta tractomula.',
    services: ['transporte-urbano', 'carga-masiva', 'expresos', 'puerta-a-puerta-y-mudanzas'],
  },
  {
    slug: 'medellin',
    name: 'Medellín',
    department: 'Antioquia',
    title: 'Transporte de carga de Bogotá a Medellín | AGORA STRATEGY',
    description:
      'Transporte de carga de Bogotá a Medellín en 1 a 2 días hábiles, con distribución urbana en la ciudad y monitoreo satelital 24/7.',
    h1: 'Transporte de carga a Medellín',
    intro:
      'Medellín conecta con el noroccidente del país y el Eje Cafetero. Llegamos desde Bogotá en 1 a 2 días hábiles y también hacemos distribución urbana dentro de la ciudad.',
    services: ['carga-masiva', 'transporte-urbano', 'expresos', 'carga-consolidada'],
  },
  {
    slug: 'cali',
    name: 'Cali',
    department: 'Valle del Cauca',
    title: 'Transporte de carga de Bogotá a Cali | AGORA STRATEGY',
    description:
      'Transporte de carga de Bogotá a Cali en 1 a 2 días hábiles, con distribución urbana en la ciudad y monitoreo satelital 24/7.',
    h1: 'Transporte de carga a Cali',
    intro:
      'Cali es el punto estratégico para las operaciones del suroccidente colombiano. Llegamos desde Bogotá en 1 a 2 días hábiles y hacemos distribución urbana con ventanas horarias dentro de la ciudad.',
    services: ['carga-masiva', 'transporte-urbano', 'expresos', 'carga-consolidada'],
  },
  {
    slug: 'barranquilla',
    name: 'Barranquilla',
    department: 'Atlántico',
    isPort: true,
    title: 'Transporte de carga de Bogotá a Barranquilla',
    description:
      'Transporte de carga de Bogotá a Barranquilla en 2 a 4 días hábiles: carga masiva, expresos y carga hacia el puerto, con monitoreo 24/7.',
    h1: 'Transporte de carga a Barranquilla',
    intro:
      'Barranquilla es uno de los principales centros industriales y portuarios del Caribe colombiano. Despachamos carga desde Bogotá en 2 a 4 días hábiles, tanto para distribución comercial como para operaciones de importación y exportación.',
    services: ['carga-masiva', 'puertos-importacion-exportacion', 'expresos', 'carga-consolidada'],
  },
  {
    slug: 'cartagena',
    name: 'Cartagena',
    department: 'Bolívar',
    isPort: true,
    title: 'Transporte de carga de Bogotá a Cartagena',
    description:
      'Transporte de carga de Bogotá a Cartagena en 2 a 4 días hábiles: carga masiva, sobredimensionada y hacia el puerto, con monitoreo 24/7.',
    h1: 'Transporte de carga a Cartagena',
    intro:
      'Cartagena reúne una de las zonas portuarias e industriales más activas del país. Llegamos desde Bogotá en 2 a 4 días hábiles con carga masiva, semimasiva, sobredimensionada y despachos expresos.',
    services: ['puertos-importacion-exportacion', 'carga-masiva', 'expresos', 'carga-consolidada'],
  },
  {
    slug: 'santa-marta',
    name: 'Santa Marta',
    department: 'Magdalena',
    isPort: true,
    title: 'Transporte de carga de Bogotá a Santa Marta',
    description:
      'Transporte de carga de Bogotá a Santa Marta en 2 a 4 días hábiles, con carga masiva, expresos y conexión con el puerto. Monitoreo 24/7.',
    h1: 'Transporte de carga a Santa Marta',
    intro:
      'Santa Marta conecta al Magdalena con el comercio exterior a través de su puerto. Llegamos desde Bogotá en 2 a 4 días hábiles con carga masiva, semimasiva y despachos expresos.',
    services: ['carga-masiva', 'puertos-importacion-exportacion', 'expresos', 'carga-consolidada'],
  },
  {
    slug: 'bucaramanga',
    name: 'Bucaramanga',
    department: 'Santander',
    title: 'Transporte de carga de Bogotá a Bucaramanga',
    description:
      'Transporte de carga de Bogotá a Bucaramanga en 1 a 2 días hábiles: carga masiva, semimasiva, consolidada y expresos con monitoreo 24/7.',
    h1: 'Transporte de carga a Bucaramanga',
    intro:
      'Bucaramanga es el principal centro comercial de Santander y punto de paso hacia el nororiente del país. Llegamos desde Bogotá en 1 a 2 días hábiles.',
    services: ['carga-masiva', 'carga-consolidada', 'expresos', 'puerta-a-puerta-y-mudanzas'],
  },
];

export const cityPath = (slug: string) => `/cobertura/${slug}`;

export function getCity(slug: string): City {
  const c = cities.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown city: ${slug}`);
  return c;
}

/** City name → page path, for linking place names in the zones table. */
export const cityPathByName = new Map(cities.map((c) => [c.name, cityPath(c.slug)]));

export function transitFor(cityName: string) {
  const zone = zones.find((z) => z.places.includes(cityName));
  if (!zone) return null;
  const [min, max] = zone.range.split('–').map((s) => s.trim());
  return { range: zone.range, min, max, neighbours: zone.places.filter((p) => p !== cityName) };
}

export function cityFaqs(city: City): Faq[] {
  const quote: Faq = {
    q: city.isHub ? '¿Cómo cotizo un transporte de carga en Bogotá?' : `¿Cómo cotizo un transporte de carga a ${city.name}?`,
    a: 'Escríbanos por WhatsApp con origen, destino, tipo de carga y fecha estimada. Le respondemos el mismo día hábil con franja tarifaria y disponibilidad de vehículo.',
  };
  const fleet: Faq = {
    q: city.isHub ? '¿Qué vehículos tienen en Bogotá?' : `¿Qué vehículos pueden ir a ${city.name}?`,
    a: 'Nuestra flota va desde el Carry (1.000 kg) y el NHR (2.700 kg) hasta la tractomula (28.000 kg), además de camabaja para maquinaria y carga sobredimensionada. Asignamos el vehículo según el peso, el volumen y el tipo de mercancía.',
  };

  if (city.isHub) {
    return [
      {
        q: '¿Hacen entregas dentro de Bogotá?',
        a: 'Sí. Hacemos distribución urbana en Bogotá con ventanas horarias y confirmación de entrega, en Carry, NHR o camión turbo según el volumen.',
      },
      {
        q: '¿A qué ciudades despachan desde Bogotá?',
        a: 'A los 32 departamentos del país, con más de 1.100 municipios atendidos, incluidas veredas y corregimientos. Ciudades como Medellín, Cali y Bucaramanga están a 1–2 días hábiles; la Costa Caribe, a 2–4 días hábiles.',
      },
      fleet,
      quote,
    ];
  }

  const t = transitFor(city.name);
  return [
    {
      q: `¿Cuánto tarda un envío de Bogotá a ${city.name}?`,
      a: t ? `Entre ${t.min} y ${t.max} días hábiles. ${TRANSIT_NOTE}` : TRANSIT_NOTE,
    },
    fleet,
    quote,
  ];
}
