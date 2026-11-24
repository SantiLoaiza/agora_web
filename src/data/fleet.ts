import type { Faq } from './site';

export interface Vehicle {
  slug: string;
  name: string;
  /** Article used in running text: "un turbo", "una tractomula". */
  article: 'un' | 'una';
  capacity: string;
  volume: string;
  text: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  uses: string[];
}

// Capacity, volume and `text` are the figures already published on the home page.
// TODO: confirm body type (furgón, estacas, plataforma) and usable dimensions per vehicle.
export const vehicles: Vehicle[] = [
  {
    slug: 'carry',
    name: 'Carry',
    article: 'un',
    capacity: '1.000 kg',
    volume: '4,5 m³',
    text: 'Paquetería y entregas rápidas en ciudad.',
    title: 'Vehículo Carry para paquetería y entregas urbanas',
    description:
      'Vehículo Carry de 1.000 kg y 4,5 m³ para paquetería y entregas rápidas en Bogotá, Cali y Medellín, con monitoreo 24/7 y confirmación de entrega.',
    h1: 'Carry para paquetería y entregas rápidas en ciudad',
    intro:
      'El Carry es nuestro vehículo más ágil: lleva hasta 1.000 kg y 4,5 m³, y se mueve con facilidad en el tráfico urbano para entregas pequeñas y urgentes.',
    uses: [
      'Paquetería y envíos pequeños dentro de la ciudad.',
      'Entregas rápidas puerta a puerta.',
      'Reposición en punto de venta.',
    ],
  },
  {
    slug: 'nhr',
    name: 'NHR',
    article: 'un',
    capacity: '2.700 kg',
    volume: '14 m³',
    text: 'Distribución urbana y regional.',
    title: 'Camión NHR para distribución urbana y regional',
    description:
      'Camión NHR de 2.700 kg y 14 m³ para distribución urbana y regional, con ventanas horarias, monitoreo satelital 24/7 y confirmación de entrega.',
    h1: 'Camión NHR para distribución urbana y regional',
    intro:
      'El NHR combina buena capacidad —2.700 kg y 14 m³— con un tamaño que le permite entrar a la ciudad. Es la opción habitual para rutas de distribución y despachos regionales.',
    uses: [
      'Distribución urbana con ventanas horarias.',
      'Despachos regionales de volumen medio.',
      'Carga consolidada y mudanzas pequeñas.',
    ],
  },
  {
    slug: 'turbo',
    name: 'Turbo',
    article: 'un',
    capacity: '5.000 kg',
    volume: '22 m³',
    text: 'Carga mediana y entregas regionales.',
    title: 'Camión turbo de 5 toneladas para transporte de carga',
    description:
      'Camión turbo de 5.000 kg y 22 m³ para carga mediana y entregas regionales en Colombia, con monitoreo 24/7 y conductores certificados.',
    h1: 'Camión turbo de 5 toneladas para carga mediana',
    intro:
      'El turbo lleva hasta 5.000 kg y 22 m³. Es un camión rígido pensado para carga semimasiva y entregas regionales, cuando el volumen supera a un NHR pero no justifica un vehículo mayor.',
    uses: [
      'Carga semimasiva y entregas regionales.',
      'Distribución a mayoristas y puntos de venta.',
      'Mudanzas de hogar y de oficina.',
    ],
  },
  {
    slug: 'sencillo',
    name: 'Sencillo',
    article: 'un',
    capacity: '7.000 kg',
    volume: '30 m³',
    text: 'Carga voluminosa y distribución regional.',
    title: 'Camión sencillo de 7 toneladas para transporte de carga',
    description:
      'Camión sencillo de 7.000 kg y 30 m³ para carga voluminosa y distribución regional en los 32 departamentos, con monitoreo satelital 24/7.',
    h1: 'Camión sencillo de 7 toneladas para carga voluminosa',
    intro:
      'El sencillo carga hasta 7.000 kg y 30 m³. Es el camión rígido de mayor capacidad de nuestra flota y cubre viajes entre ciudades con carga voluminosa.',
    uses: [
      'Carga voluminosa entre ciudades.',
      'Distribución regional de alto volumen.',
      'Mudanzas empresariales y de gran tamaño.',
    ],
  },
  {
    slug: 'camabaja',
    name: 'Camabaja',
    article: 'una',
    capacity: '20.000 kg',
    volume: 'Sobredimensionada',
    text: 'Maquinaria, equipos y carga extradimensionada.',
    title: 'Camabaja para maquinaria y carga sobredimensionada',
    description:
      'Transporte en camabaja de hasta 20.000 kg para maquinaria, equipos y carga extradimensionada en Colombia, con monitoreo satelital 24/7.',
    h1: 'Camabaja para maquinaria y carga sobredimensionada',
    intro:
      'La camabaja tiene una plataforma baja que permite mover hasta 20.000 kg de maquinaria, equipos y piezas que por su tamaño no caben en un vehículo convencional.',
    uses: [
      'Maquinaria pesada y equipos de obra.',
      'Carga extradimensionada.',
      'Equipos industriales y del sector energético.',
    ],
  },
  {
    slug: 'tractomula',
    name: 'Tractomula',
    article: 'una',
    capacity: '28.000 kg',
    volume: '53 m³',
    text: 'Gran volumen y largas distancias.',
    title: 'Tractomula para transporte de carga de 28 toneladas',
    description:
      'Tractomula de 28.000 kg y 53 m³ para carga masiva y viajes de larga distancia en Colombia, con monitoreo 24/7 y cobertura en los 32 departamentos.',
    h1: 'Tractomula para transporte de carga masiva',
    intro:
      'La tractomula es el vehículo de mayor capacidad de nuestra flota: hasta 28.000 kg y 53 m³ por viaje. Es la opción para carga masiva y largas distancias entre regiones.',
    uses: [
      'Carga masiva de gran volumen.',
      'Viajes de larga distancia entre regiones.',
      'Carga desde y hacia los puertos del país.',
      'Materias primas e insumos industriales.',
    ],
  },
];

export const vehiclePath = (slug: string) => `/flota/${slug}`;

export function getVehicle(slug: string): Vehicle {
  const v = vehicles.find((x) => x.slug === slug);
  if (!v) throw new Error(`Unknown vehicle: ${slug}`);
  return v;
}

/** Name as used mid-sentence: proper names keep their casing ("un NHR", "una tractomula"). */
export const vehicleNoun = (v: Vehicle) =>
  v.name === 'Carry' || v.name === 'NHR' ? v.name : v.name.toLowerCase();

export function vehicleFaqs(v: Vehicle): Faq[] {
  const noun = vehicleNoun(v);
  const load =
    v.volume === 'Sobredimensionada'
      ? `hasta ${v.capacity} de carga, incluida carga sobredimensionada`
      : `hasta ${v.capacity} y ${v.volume} de volumen`;
  return [
    {
      q: `¿Cuánta carga lleva ${v.article} ${noun}?`,
      a: `${v.article === 'un' ? 'Un' : 'Una'} ${noun} de nuestra flota lleva ${load}.`,
    },
    {
      q: `¿Para qué tipo de carga sirve ${v.article} ${noun}?`,
      a: `${v.text} Usos habituales: ${v.uses.map((u) => u.replace(/\.$/, '').toLowerCase()).join('; ')}.`,
    },
    {
      q: '¿Cómo reservo el vehículo?',
      a: 'Escríbanos por WhatsApp con origen, destino, tipo de carga y fecha estimada. Le confirmamos franja tarifaria y disponibilidad de vehículo el mismo día hábil.',
    },
  ];
}
