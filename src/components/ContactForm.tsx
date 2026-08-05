import { useEffect, useState } from 'react';
import type { ChangeEvent, CSSProperties, FocusEvent, FormEvent } from 'react';

type Intent = 'logistica' | 'consultoria';

type FormValues = {
  nombre: string;
  empresa: string;
  cargo: string;
  ciudad: string;
  correo: string;
  telefono: string;
  tamano: string;
  urgencia: string;
  reto: string;
  carga: string;
  frecuencia: string;
  origen: string;
  destino: string;
  peso: string;
  fecha: string;
  obs: string;
  habeas: boolean;
};

const AREAS = [
  { id: 'estrategia', label: 'Estrategia' },
  { id: 'finanzas', label: 'Finanzas' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'procesos', label: 'Procesos' },
  { id: 'talento', label: 'Talento humano' },
  { id: 'rrpp', label: 'Relaciones públicas' },
];

const LABELS: Record<string, string> = {
  nombre: 'nombre', empresa: 'empresa', cargo: 'cargo', ciudad: 'ciudad',
  correo: 'correo', telefono: 'teléfono', tamano: 'tamaño', urgencia: 'urgencia',
  reto: 'reto', carga: 'tipo de carga', frecuencia: 'frecuencia',
  origen: 'origen', destino: 'destino', peso: 'peso', fecha: 'fecha',
};

const EMPTY: FormValues = {
  nombre: '', empresa: '', cargo: '', ciudad: '', correo: '', telefono: '',
  tamano: '', urgencia: '', reto: '', carga: '', frecuencia: '', origen: '',
  destino: '', peso: '', fecha: '', obs: '', habeas: false,
};

function validateField(name: string, values: FormValues, areas: string[]): string {
  const v = String((values as Record<string, unknown>)[name] ?? '').trim();
  if (name === 'correo') {
    if (!v) return 'Ingrese su correo corporativo.';
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) return 'Ingrese un correo válido, por ejemplo nombre@empresa.com';
    return '';
  }
  if (name === 'telefono') {
    if (!v) return 'Ingrese un número de contacto.';
    if (!/^\d{7,10}$/.test(v.replace(/\D/g, ''))) return 'Ingrese un número colombiano de 10 dígitos, sin el +57.';
    return '';
  }
  if (name === 'reto') {
    if (!v) return 'Cuéntenos brevemente el reto que quiere resolver.';
    if (v.length < 20) return 'Amplíe un poco más: mínimo 20 caracteres.';
    return '';
  }
  if (name === 'fecha') return v ? '' : 'Indique una fecha estimada de despacho.';
  if (name === 'areas') return areas.length ? '' : 'Seleccione al menos un área de interés.';
  if (name === 'habeas') return values.habeas ? '' : 'Debe autorizar el tratamiento de sus datos para continuar.';
  if (!v) return `Este campo es obligatorio: indique su ${LABELS[name] || 'dato'}.`;
  if (v.length < 2) return 'Revise este dato, parece incompleto.';
  return '';
}

function required(intent: Intent): string[] {
  const base = ['nombre', 'empresa', 'cargo', 'ciudad', 'correo', 'telefono'];
  return intent === 'consultoria'
    ? base.concat(['tamano', 'urgencia', 'reto'])
    : base.concat(['carga', 'frecuencia', 'origen', 'destino', 'peso', 'fecha']);
}

function validateAll(intent: Intent, values: FormValues, areas: string[]): Record<string, string> {
  const errors: Record<string, string> = {};
  required(intent).forEach((n) => {
    const m = validateField(n, values, areas);
    if (m) errors[n] = m;
  });
  if (intent === 'consultoria') {
    const m = validateField('areas', values, areas);
    if (m) errors.areas = m;
  }
  const h = validateField('habeas', values, areas);
  if (h) errors.habeas = h;
  return errors;
}

function inputStyle(hasError: boolean, focused: boolean, extra: CSSProperties = {}): CSSProperties {
  const borderColor = hasError ? '#9B2C2C' : focused ? '#BD9750' : '#6E7686';
  return {
    width: '100%', padding: '13px 14px', minHeight: 46, background: '#F7F5EF',
    borderWidth: 1, borderStyle: 'solid', borderColor, borderRadius: 0, fontSize: 14.5, fontWeight: 400,
    color: '#0C203E', outline: 'none', transition: 'border-color .2s ease, box-shadow .2s ease',
    ...extra,
  };
}

function errStyle(hasError: boolean, extra: CSSProperties = {}): CSSProperties {
  return {
    margin: 0, fontSize: 12, fontWeight: 400, lineHeight: 1.5, color: '#9B2C2C',
    ...extra,
    display: hasError ? undefined : 'none',
  };
}

function cardStyle(active: boolean, tone: string): CSSProperties {
  return {
    display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left', padding: 22,
    cursor: 'pointer', minHeight: 44,
    background: active ? '#0C203E' : tone,
    color: active ? '#F7F5EF' : '#2B3446',
    border: `1px solid ${active ? '#0C203E' : 'rgba(12,32,62,0.22)'}`,
    boxShadow: active ? 'inset 0 0 0 1px rgba(189,151,80,0.55)' : 'none',
  };
}

interface FieldProps {
  id: string;
  name: keyof FormValues;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  values: FormValues;
  errors: Record<string, string>;
  focus: string | null;
  onField: (ev: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (ev: FocusEvent<HTMLInputElement>) => void;
  onFocus: (name: string) => void;
  extraStyle?: CSSProperties;
  prefix?: string;
}

function TextField({ id, name, label, type = 'text', autoComplete, placeholder, values, errors, focus, onField, onBlur, onFocus, extraStyle = {}, prefix }: FieldProps) {
  const hasError = !!errors[name];
  const input = (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      inputMode={name === 'telefono' ? 'numeric' : undefined}
      value={String(values[name])}
      onChange={onField}
      onBlur={onBlur}
      onFocus={() => onFocus(name)}
      style={inputStyle(hasError, focus === name, extraStyle)}
    />
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label htmlFor={id} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#0C203E' }}>{label}</label>
      {prefix ? (
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', padding: '0 12px', border: '1px solid #6E7686', borderRight: 0, background: '#EFEBE0', fontSize: 14, color: '#0C203E' }}>{prefix}</span>
          {input}
        </div>
      ) : input}
      <p aria-live="polite" style={errStyle(hasError)}>{errors[name]}</p>
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  name: keyof FormValues;
  label: string;
  options: { value: string; label: string }[];
  values: FormValues;
  errors: Record<string, string>;
  focus: string | null;
  onField: (ev: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (ev: FocusEvent<HTMLSelectElement>) => void;
  onFocus: (name: string) => void;
}

function SelectField({ id, name, label, options, values, errors, focus, onField, onBlur, onFocus }: SelectFieldProps) {
  const hasError = !!errors[name];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label htmlFor={id} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#0C203E' }}>{label}</label>
      <select
        id={id}
        name={name}
        value={String(values[name])}
        onChange={onField}
        onBlur={onBlur}
        onFocus={() => onFocus(name)}
        style={inputStyle(hasError, focus === name)}
      >
        <option value="">Seleccione</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <p aria-live="polite" style={errStyle(hasError)}>{errors[name]}</p>
    </div>
  );
}

interface TextAreaFieldProps {
  id: string;
  name: keyof FormValues;
  label: string;
  rows?: number;
  placeholder?: string;
  values: FormValues;
  errors: Record<string, string>;
  focus: string | null;
  onField: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (ev: FocusEvent<HTMLTextAreaElement>) => void;
  onFocus: (name: string) => void;
}

function TextAreaField({ id, name, label, rows = 3, placeholder, values, errors, focus, onField, onBlur, onFocus }: TextAreaFieldProps) {
  const hasError = !!errors[name];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label htmlFor={id} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#0C203E' }}>{label}</label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={String(values[name])}
        onChange={onField}
        onBlur={onBlur}
        onFocus={() => onFocus(name)}
        style={inputStyle(hasError, focus === name, { resize: 'vertical', lineHeight: 1.6, fontWeight: 300 })}
      />
      <p aria-live="polite" style={errStyle(hasError)}>{errors[name]}</p>
    </div>
  );
}

export default function ContactForm({ simboloSrc }: { simboloSrc: string }) {
  const [intent, setIntentState] = useState<Intent | null>(null);
  const [values, setValues] = useState<FormValues>({ ...EMPTY });
  const [areas, setAreas] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [focus, setFocus] = useState<string | null>(null);
  const [intentError, setIntentError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Intent | null>(null);

  const setIntent = (next: Intent) => {
    setIntentState(next);
    setIntentError('');
    setErrors({});
    setTouched({});
    const el = document.getElementById('contacto');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  useEffect(() => {
    const handler = (ev: Event) => {
      const detail = (ev as CustomEvent<string>).detail;
      if (detail === 'logistica' || detail === 'consultoria') setIntent(detail);
    };
    window.addEventListener('agora:pick-intent', handler);
    return () => window.removeEventListener('agora:pick-intent', handler);
  }, []);

  const change = (name: string, value: string | boolean) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value } as FormValues;
      if (touched[name] || errors[name]) {
        const m = validateField(name, next, areas);
        setErrors((prevErrors) => {
          const e = { ...prevErrors };
          if (m) e[name] = m; else delete e[name];
          return e;
        });
      }
      return next;
    });
  };

  const onField = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    change(ev.target.name, ev.target.value);
  };
  const onCheck = (ev: ChangeEvent<HTMLInputElement>) => change(ev.target.name, ev.target.checked);
  const onBlurField = (ev: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = ev.target.name;
    setValues((currentValues) => {
      const m = validateField(name, currentValues, areas);
      setErrors((prev) => {
        const e = { ...prev };
        if (m) e[name] = m; else delete e[name];
        return e;
      });
      return currentValues;
    });
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFocus(null);
  };

  const toggleArea = (id: string) => {
    setAreas((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : prev.concat([id]);
      if (next.length) {
        setErrors((prevErrors) => {
          const e = { ...prevErrors };
          delete e.areas;
          return e;
        });
      }
      return next;
    });
  };

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!intent) {
      setIntentError('Seleccione una opción para continuar.');
      return;
    }
    const validationErrors = validateAll(intent, values, areas);
    if (Object.keys(validationErrors).length) {
      const newlyTouched: Record<string, boolean> = {};
      Object.keys(validationErrors).forEach((k) => { newlyTouched[k] = true; });
      setErrors(validationErrors);
      setTouched((prev) => ({ ...prev, ...newlyTouched }));
      const k = Object.keys(validationErrors)[0];
      const first = k === 'habeas' ? document.getElementById('ag2-hab') : k === 'areas' ? null : document.getElementById(`ag2-${k}`);
      first?.focus();
      return;
    }
    setSending(true);
    setErrors({});
    setTimeout(() => {
      setSending(false);
      setSent(intent);
    }, 900);
  };

  const reset = () => {
    setSent(null);
    setIntentState(null);
    setAreas([]);
    setErrors({});
    setTouched({});
    setValues({ ...EMPTY });
  };

  const isLogistica = intent === 'logistica';
  const isConsultoria = intent === 'consultoria';
  const hasIntent = !!intent;
  const slaCopy = intent === 'consultoria'
    ? 'Le respondemos en máximo 48 horas hábiles.'
    : 'Le respondemos con franja tarifaria en cuatro horas hábiles.';
  const successCopy = sent === 'logistica'
    ? 'Un coordinador de operaciones revisa su ruta y le envía la franja tarifaria preliminar junto con la disponibilidad de vehículo.'
    : 'Un consultor sénior revisa su caso y le propone una primera reunión de diagnóstico de 45 minutos, sin costo.';

  if (sent) {
    return (
      <div className="pop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18, padding: 'clamp(20px,3vw,40px) 0' }}>
        <img className="arrow-drift" src={simboloSrc} alt="" width={72} height={52} style={{ display: 'block', width: 72, height: 'auto' }} />
        <h3 style={{ margin: 0, fontFamily: 'Montserrat,sans-serif', fontWeight: 400, fontSize: 26, lineHeight: 1.25, letterSpacing: '-0.4px', color: '#0C203E' }}>Recibimos su solicitud</h3>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#4A5262', maxWidth: '42ch' }}>{successCopy}</p>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 400, lineHeight: 1.7, color: '#6E7686' }}>Si necesita atención inmediata, escríbanos al +57 316 317 4316.</p>
        <button type="button" onClick={reset} style={{ marginTop: 8, background: 'none', border: '1px solid #0C203E', color: '#0C203E', fontSize: 11, fontWeight: 600, letterSpacing: '1.8px', textTransform: 'uppercase', padding: '16px 28px', minHeight: 44, cursor: 'pointer' }}>Enviar otra solicitud</button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ padding: 0, margin: '0 0 14px', fontSize: 10.5, fontWeight: 600, letterSpacing: '2.4px', textTransform: 'uppercase', color: '#8A7238' }}>Paso 1 · ¿En qué podemos ayudarle?</legend>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
          <button type="button" className="intent-card" aria-pressed={isLogistica} onClick={() => setIntent('logistica')} style={cardStyle(isLogistica, '#EFEBE0')}>
            <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 17, fontWeight: 500, lineHeight: 1.3 }}>Necesito mover carga</span>
            <span style={{ fontSize: 12.5, fontWeight: 300, lineHeight: 1.6, color: 'inherit', opacity: 0.72 }}>Transporte y operación</span>
          </button>
          <button type="button" className="intent-card" aria-pressed={isConsultoria} onClick={() => setIntent('consultoria')} style={cardStyle(isConsultoria, '#FFFDF8')}>
            <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 17, fontWeight: 500, lineHeight: 1.3 }}>Quiero asesoría</span>
            <span style={{ fontSize: 12.5, fontWeight: 300, lineHeight: 1.6, color: 'inherit', opacity: 0.72 }}>Consultoría de gestión</span>
          </button>
        </div>
        <p aria-live="polite" style={{ margin: '12px 0 0', fontSize: 12, lineHeight: 1.5, color: '#9B2C2C', display: intentError ? undefined : 'none' }}>{intentError}</p>
      </fieldset>

      {hasIntent && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, borderTop: '1px solid rgba(12,32,62,0.12)', paddingTop: 26 }}>
          <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, letterSpacing: '2.4px', textTransform: 'uppercase', color: '#8A7238' }}>Paso 2 · Sus datos</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18 }}>
            <TextField id="ag2-nombre" name="nombre" label="Nombre completo" autoComplete="name" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
            <TextField id="ag2-empresa" name="empresa" label="Empresa" autoComplete="organization" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
            <TextField id="ag2-cargo" name="cargo" label="Cargo" autoComplete="organization-title" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
            <TextField id="ag2-ciudad" name="ciudad" label="Ciudad" autoComplete="address-level2" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
            <TextField id="ag2-correo" name="correo" label="Correo corporativo" type="email" autoComplete="email" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
            <TextField id="ag2-telefono" name="telefono" label="Teléfono" type="tel" autoComplete="tel-national" prefix="+57" extraStyle={{ borderLeftWidth: 0 }} values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
          </div>
        </div>
      )}

      {isLogistica && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, borderTop: '1px solid rgba(12,32,62,0.12)', paddingTop: 26 }}>
          <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, letterSpacing: '2.4px', textTransform: 'uppercase', color: '#8A7238' }}>Paso 3 · Detalle de la carga</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18 }}>
            <SelectField id="ag2-carga" name="carga" label="Tipo de carga" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} options={[
              { value: 'general', label: 'Carga general' },
              { value: 'refrigerada', label: 'Refrigerada' },
              { value: 'extradimensionada', label: 'Extradimensionada' },
              { value: 'valores', label: 'Valores' },
              { value: 'peligrosa', label: 'Mercancía peligrosa' },
            ]} />
            <SelectField id="ag2-frecuencia" name="frecuencia" label="Frecuencia" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} options={[
              { value: 'spot', label: 'Spot, un despacho puntual' },
              { value: 'recurrente', label: 'Recurrente' },
            ]} />
            <TextField id="ag2-origen" name="origen" label="Origen" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
            <TextField id="ag2-destino" name="destino" label="Destino" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
            <TextField id="ag2-peso" name="peso" label="Peso o volumen aproximado" placeholder="Ej. 12 toneladas · 18 estibas" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
            <TextField id="ag2-fecha" name="fecha" label="Fecha estimada de despacho" type="date" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
          </div>
          <TextAreaField id="ag2-obs" name="obs" label="Observaciones" rows={3} placeholder="Condiciones de cargue, horarios, requisitos especiales." values={values} errors={errors} focus={focus} onField={onField} onFocus={setFocus} />
        </div>
      )}

      {isConsultoria && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, borderTop: '1px solid rgba(12,32,62,0.12)', paddingTop: 26 }}>
          <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, letterSpacing: '2.4px', textTransform: 'uppercase', color: '#8A7238' }}>Paso 3 · Su necesidad de asesoría</p>
          <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
            <legend style={{ padding: 0, margin: '0 0 12px', fontSize: 11, fontWeight: 600, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#0C203E' }}>Áreas de interés</legend>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {AREAS.map((a) => {
                const on = areas.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    className="chip"
                    data-area={a.id}
                    aria-pressed={on}
                    onClick={() => toggleArea(a.id)}
                    style={{
                      padding: '11px 18px', minHeight: 44, cursor: 'pointer', fontSize: 12.5, fontWeight: 500, letterSpacing: '0.4px',
                      background: on ? '#0C203E' : 'transparent', color: on ? '#F7F5EF' : '#0C203E', border: `1px solid ${on ? '#0C203E' : '#6E7686'}`,
                    }}
                  >{a.label}</button>
                );
              })}
            </div>
            <p aria-live="polite" style={{ margin: '12px 0 0', fontSize: 12, lineHeight: 1.5, color: '#9B2C2C', display: errors.areas ? undefined : 'none' }}>{errors.areas}</p>
          </fieldset>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18 }}>
            <SelectField id="ag2-tamano" name="tamano" label="Tamaño de la empresa" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} options={[
              { value: '1-10', label: '1 a 10 empleados' },
              { value: '11-50', label: '11 a 50 empleados' },
              { value: '51-200', label: '51 a 200 empleados' },
              { value: '201-500', label: '201 a 500 empleados' },
              { value: '500+', label: 'Más de 500 empleados' },
            ]} />
            <SelectField id="ag2-urgencia" name="urgencia" label="Urgencia" values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} options={[
              { value: 'inmediata', label: 'Inmediata, ya está afectando el negocio' },
              { value: 'trimestre', label: 'Este trimestre' },
              { value: 'semestre', label: 'En los próximos seis meses' },
              { value: 'explorando', label: 'Estoy explorando opciones' },
            ]} />
          </div>
          <TextAreaField id="ag2-reto" name="reto" label="Reto principal" rows={4} values={values} errors={errors} focus={focus} onField={onField} onBlur={onBlurField} onFocus={setFocus} />
        </div>
      )}

      {hasIntent && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderTop: '1px solid rgba(12,32,62,0.12)', paddingTop: 26 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <input id="ag2-hab" name="habeas" type="checkbox" checked={values.habeas} onChange={onCheck} style={{ width: 20, height: 20, minWidth: 20, marginTop: 2, accentColor: '#0C203E', cursor: 'pointer' }} />
            <label htmlFor="ag2-hab" style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: '#4A5262' }}>Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y a la <a href="#politica" style={{ color: '#8A7238', borderBottom: '1px solid #BD9750' }}>política de privacidad</a> de AGORA STRATEGY SAS.</label>
          </div>
          <p aria-live="polite" style={{ margin: '-8px 0 0', fontSize: 12, lineHeight: 1.5, color: '#9B2C2C', display: errors.habeas ? undefined : 'none' }}>{errors.habeas}</p>
          <button
            type="submit"
            disabled={sending}
            style={{
              alignSelf: 'flex-start', background: sending ? '#3A4A66' : '#0C203E', color: '#F7F5EF', border: '1px solid #0C203E',
              fontSize: 11.5, fontWeight: 600, letterSpacing: '1.8px', textTransform: 'uppercase', padding: '19px 36px', minHeight: 44,
              cursor: sending ? 'wait' : 'pointer', transition: 'background-color .25s ease',
            }}
          >
            {sending && <span className="sending-dot"></span>}
            {sending ? 'Enviando…' : intent === 'consultoria' ? 'Enviar solicitud' : 'Solicitar cotización'}
          </button>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 300, lineHeight: 1.6, color: '#6E7686' }}>{slaCopy}</p>
        </div>
      )}
    </form>
  );
}
