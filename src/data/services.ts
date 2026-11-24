import type { Faq } from './site';

export interface Service {
  slug: string;
  name: string;
  /** Text of the card on the home page. */
  summary: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  includes: string[];
  /** Fleet slugs best suited to this service. */
  vehicles: string[];
  /** Coverage slugs to highlight; defaults to the main cities. */
  cities?: string[];
  faqs: Faq[];
  whatsapp: string;
}

// Content is built only from what the site already states (home page cards,
// fleet, coverage and technology sections). Anything not confirmed is a TODO.
export const services: Service[] = [
  {
    slug: 'carga-masiva',
    name: 'Carga masiva y semimasiva',
    summary:
      'Tractomulas de hasta 28 toneladas y camiones rígidos para volumen intermedio, con cubrimiento nacional.',
    title: 'Transporte de carga masiva y semimasiva | AGORA STRATEGY',
    description:
      'Carga masiva en tractomulas de hasta 28 toneladas y semimasiva en camiones rígidos, con cobertura en los 32 departamentos y monitoreo 24/7.',
    h1: 'Transporte de carga masiva y semimasiva',
    intro:
      'Movemos grandes volúmenes en tractomulas de hasta 28 toneladas y cargas intermedias en camiones rígidos, con cubrimiento nacional y seguimiento de cada viaje de principio a fin.',
    includes: [
      'Tractomulas de hasta 28.000 kg y 53 m³ para viajes de volumen completo.',
      'Camiones turbo y sencillo para cargas semimasivas.',
      'Monitoreo satelital 24/7 y alertas automáticas en cada etapa del viaje.',
      'Vehículos con mantenimiento preventivo programado y conductores certificados.',
      'Cobertura en los 32 departamentos, incluidas veredas y corregimientos.',
      'Informes de sus envíos para la toma de decisiones.',
    ],
    vehicles: ['tractomula', 'sencillo', 'turbo'],
    faqs: [
      {
        q: '¿Qué diferencia hay entre carga masiva y semimasiva?',
        a: 'La carga masiva ocupa un vehículo de gran capacidad, como una tractomula de hasta 28.000 kg. La semimasiva corresponde a volúmenes intermedios que se mueven en camiones rígidos, como el turbo (5.000 kg) o el sencillo (7.000 kg).',
      },
      {
        q: '¿Cuánto tarda un despacho de carga masiva?',
        a: 'Depende del destino. Ciudades como Medellín, Cali o Bucaramanga están a 1–2 días hábiles; la Costa Caribe, a 2–4 días hábiles. Los tiempos están sujetos a condiciones climáticas, cierres viales y horarios de recepción.',
      },
    ],
    whatsapp: 'Hola, quiero cotizar un transporte de carga masiva o semimasiva.',
  },
  {
    slug: 'puerta-a-puerta-y-mudanzas',
    name: 'Puerta a puerta y mudanzas',
    summary:
      'Recogemos y entregamos donde usted lo necesite. Mudanzas de hogar y de empresa con cuidado de cada pieza.',
    title: 'Transporte puerta a puerta y mudanzas | AGORA STRATEGY',
    description:
      'Transporte puerta a puerta y mudanzas de hogar y de empresa: recogemos y entregamos donde lo necesite, con seguimiento y confirmación de entrega.',
    h1: 'Transporte puerta a puerta y mudanzas',
    intro:
      'Recogemos la carga en la dirección que usted indique y la entregamos en el destino final. También hacemos mudanzas de hogar y de empresa, con cuidado de cada pieza.',
    // TODO: confirm whether packing, loading/unloading and cargo insurance are included.
    includes: [
      'Recogida en la dirección de origen y entrega en la dirección de destino.',
      'Mudanzas residenciales y empresariales.',
      'Vehículo según el volumen: desde Carry y NHR hasta camiones sencillos.',
      'Seguimiento del trayecto y confirmación de entrega.',
      'Servicio urbano en Bogotá, Cali y Medellín, y despachos a todo el país.',
    ],
    vehicles: ['carry', 'nhr', 'turbo', 'sencillo'],
    faqs: [
      {
        q: '¿Hacen mudanzas de empresa?',
        a: 'Sí. Hacemos mudanzas de hogar y de empresa, con el vehículo adecuado según el volumen y seguimiento durante todo el trayecto.',
      },
      {
        q: '¿Qué información necesito para cotizar una mudanza?',
        a: 'Dirección de origen y de destino, fecha estimada y un listado o volumen aproximado de lo que va a trasladar. Con eso le confirmamos franja tarifaria y disponibilidad el mismo día hábil.',
      },
    ],
    whatsapp: 'Hola, quiero cotizar un transporte puerta a puerta o una mudanza.',
  },
  {
    slug: 'expresos',
    name: 'Expresos',
    summary: 'Envíos urgentes con vehículo dedicado, tiempos competitivos y tarifa cerrada desde el despacho.',
    title: 'Transporte expreso de carga | AGORA STRATEGY',
    description:
      'Transporte expreso de carga con vehículo dedicado: el camión que carga hace la entrega, sin transbordos, con tarifa cerrada desde el despacho.',
    h1: 'Transporte expreso de carga con vehículo dedicado',
    intro:
      'Para envíos urgentes asignamos un vehículo exclusivo: el mismo camión que carga hace la entrega, sin pasar su mercancía por centros logísticos de terceros.',
    includes: [
      'Vehículo dedicado solo a su carga, de origen a destino.',
      'Sin transbordos ni paso por centros logísticos de terceros.',
      'Tarifa cerrada desde el despacho.',
      'Tiempos competitivos para envíos urgentes.',
      'Monitoreo satelital 24/7 y alertas automáticas.',
    ],
    vehicles: ['carry', 'nhr', 'sencillo', 'tractomula'],
    faqs: [
      {
        q: '¿Qué es un transporte expreso?',
        a: 'Es un viaje con vehículo dedicado solo a su carga. Sale del origen directo al destino, sin transbordos ni paso por bodegas de terceros: el mismo vehículo que carga hace la entrega.',
      },
      {
        q: '¿La tarifa de un expreso puede cambiar durante el viaje?',
        a: 'No. En los expresos la tarifa queda cerrada desde el despacho.',
      },
    ],
    whatsapp: 'Hola, quiero cotizar un transporte expreso.',
  },
  {
    slug: 'carga-consolidada',
    name: 'Carga consolidada',
    summary:
      'Distribución de volúmenes menores compartiendo ruta, con el mismo control y trazabilidad de un viaje completo.',
    title: 'Transporte de carga consolidada | AGORA STRATEGY',
    description:
      'Carga consolidada para volúmenes menores: su mercancía comparte ruta con otros despachos, con el mismo control y trazabilidad de un viaje completo.',
    h1: 'Transporte de carga consolidada',
    intro:
      'Si su volumen no llena un vehículo, lo movemos compartiendo ruta con otros despachos, con el mismo control y la misma trazabilidad de un viaje completo.',
    includes: [
      'Distribución de volúmenes menores compartiendo ruta.',
      'Mismo control y trazabilidad que un viaje completo.',
      'Monitoreo satelital 24/7 y alertas automáticas.',
      'Informes y reportes de sus envíos.',
      'Cobertura en los 32 departamentos.',
    ],
    vehicles: ['nhr', 'turbo', 'sencillo'],
    faqs: [
      {
        q: '¿Cuándo conviene la carga consolidada?',
        a: 'Cuando su carga no ocupa un vehículo completo y no necesita un viaje exclusivo. Si requiere rapidez o exclusividad, el servicio expreso es la mejor opción.',
      },
      {
        q: '¿Puedo hacer seguimiento a una carga consolidada?',
        a: 'Sí. Tiene el mismo monitoreo 24/7 y las mismas alertas que un viaje completo, y puede consultar su guía desde nuestra página de inicio.',
      },
    ],
    whatsapp: 'Hola, quiero cotizar un envío de carga consolidada.',
  },
  {
    slug: 'transporte-urbano',
    name: 'Transportes urbanos',
    summary: 'Distribución en Bogotá, Cali y Medellín con ventanas horarias y confirmación de entrega.',
    title: 'Transporte urbano de carga en Bogotá, Cali y Medellín',
    description:
      'Distribución urbana de carga en Bogotá, Cali y Medellín con ventanas horarias, confirmación de entrega y vehículos ágiles para la ciudad.',
    h1: 'Transporte urbano de carga',
    intro:
      'Hacemos distribución dentro de Bogotá, Cali y Medellín con ventanas horarias y confirmación de cada entrega, en vehículos ágiles para moverse en la ciudad.',
    includes: [
      'Entregas con ventanas horarias acordadas.',
      'Confirmación de cada entrega.',
      'Carry para paquetería y entregas rápidas; NHR para rutas de distribución.',
      'Distribución para canal mayorista y punto de venta.',
      'Monitoreo satelital 24/7.',
    ],
    vehicles: ['carry', 'nhr', 'turbo'],
    cities: ['bogota', 'medellin', 'cali'],
    faqs: [
      {
        q: '¿En qué ciudades hacen distribución urbana?',
        a: 'En Bogotá, Cali y Medellín.',
      },
      {
        q: '¿Qué vehículos usan para entregas en ciudad?',
        a: 'Principalmente Carry (hasta 1.000 kg y 4,5 m³) para paquetería y entregas rápidas, y NHR (hasta 2.700 kg y 14 m³) para rutas de distribución. Para volúmenes mayores usamos camión turbo.',
      },
    ],
    whatsapp: 'Hola, quiero cotizar distribución urbana de carga.',
  },
  {
    slug: 'puertos-importacion-exportacion',
    name: 'Puertos, importación y exportación',
    summary:
      'Conexión con los principales puertos del país y acompañamiento en cada etapa del proceso de comercio exterior.',
    title: 'Transporte de carga a puertos y comercio exterior',
    description:
      'Transporte terrestre de carga desde y hacia los principales puertos de Colombia, con acompañamiento en cada etapa del proceso de comercio exterior.',
    h1: 'Transporte de carga para importación y exportación',
    intro:
      'Conectamos su operación con los principales puertos del país y lo acompañamos en cada etapa del proceso de comercio exterior, con monitoreo de la carga durante todo el trayecto.',
    // TODO: confirm container sizes handled (20'/40') and whether customs brokerage is offered.
    includes: [
      'Transporte terrestre desde y hacia los principales puertos del país.',
      'Acompañamiento en cada etapa del proceso de comercio exterior.',
      'Tractomulas para carga de gran volumen.',
      'Camabaja para maquinaria y carga sobredimensionada.',
      'Monitoreo satelital 24/7 durante el trayecto.',
    ],
    vehicles: ['tractomula', 'camabaja'],
    cities: ['barranquilla', 'cartagena', 'santa-marta'],
    faqs: [
      {
        q: '¿Con qué puertos trabajan?',
        a: 'Atendemos los principales puertos del país. En la Costa Caribe, Barranquilla, Cartagena y Santa Marta están a 2–4 días hábiles.',
      },
      {
        q: '¿Pueden mover maquinaria importada?',
        a: 'Sí. Para maquinaria y carga sobredimensionada usamos camabaja, con capacidad de hasta 20.000 kg.',
      },
    ],
    whatsapp: 'Hola, quiero cotizar un transporte de carga para importación o exportación.',
  },
];

export const servicePath = (slug: string) => `/servicios/${slug}`;

export function getService(slug: string): Service {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
}
