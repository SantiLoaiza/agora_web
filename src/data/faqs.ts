import type { Faq } from './site';

// General FAQ shown on the home page. Every answer restates facts already
// published elsewhere on the site.
// TODO: add "¿La carga va asegurada?" once the insurance policy is confirmed.
export const homeFaqs: Faq[] = [
  {
    q: '¿A qué ciudades y municipios llegan?',
    a: 'Tenemos cobertura en los 32 departamentos de Colombia y atendemos más de 1.100 municipios, incluidas veredas y corregimientos. Nuestra sede principal está en Bogotá.',
  },
  {
    q: '¿Cuánto tarda un envío?',
    a: 'Depende del destino: ciudades como Medellín, Cali o Bucaramanga están a 1–2 días hábiles; la Costa Caribe, Cúcuta o Pasto, a 2–4 días hábiles; y zonas como Quibdó, Riohacha o Tumaco, a 3–5 días hábiles. Los tiempos están sujetos a condiciones climáticas, cierres viales y horarios de recepción.',
  },
  {
    q: '¿Qué tipos de vehículos tienen?',
    a: 'Carry (1.000 kg), NHR (2.700 kg), turbo (5.000 kg), sencillo (7.000 kg), camabaja (20.000 kg, para carga sobredimensionada) y tractomula (28.000 kg).',
  },
  {
    q: '¿Cómo solicito una cotización?',
    a: 'Escríbanos por WhatsApp con origen, destino, tipo de carga y fecha estimada. Le devolvemos franja tarifaria y disponibilidad de vehículo el mismo día hábil.',
  },
  {
    q: '¿Puedo hacer seguimiento a mi carga?',
    a: 'Sí. Todos los envíos tienen monitoreo satelital 24/7 y alertas automáticas en cada etapa. También puede consultar su número de guía en nuestra página de inicio.',
  },
  {
    q: '¿Hacen mudanzas?',
    a: 'Sí. Hacemos mudanzas de hogar y de empresa, además de transporte puerta a puerta.',
  },
  {
    q: '¿Están habilitados para transportar carga?',
    a: 'Sí. AGORA STRATEGY S.A.S. es una empresa habilitada por el Ministerio de Transporte.',
  },
  {
    q: '¿Qué horario de atención tienen?',
    a: 'Atendemos de lunes a sábado por WhatsApp, teléfono y correo.',
  },
];
