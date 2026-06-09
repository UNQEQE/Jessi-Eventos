import { useState } from 'react';

const empty = { nombre: '', correo: '', motivo: '', mensaje: '' };

export default function Contacto() {
  const [form,     setForm]     = useState(empty);
  const [terminos, setTerminos] = useState(false);
  const [msg,      setMsg]      = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = () => {
    setMsg(null);
    if (!form.nombre || !form.correo || !form.motivo || !form.mensaje) {
      setMsg({ type: 'error', text: '❌ Completa todos los campos' }); return;
    }
    if (/\d/.test(form.nombre)) {
      setMsg({ type: 'error', text: '❌ El nombre no puede contener números' }); return;
    }
    if (!terminos) {
      setMsg({ type: 'error', text: '❌ Acepta los términos y condiciones' }); return;
    }
    setMsg({ type: 'success', text: `✅ ¡Gracias por contactarnos, ${form.nombre}! Te responderemos pronto.` });
    setForm(empty);
    setTerminos(false);
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 640 }}>

        {/* Formulario */}
        <div className="glass" style={{ padding: '36px 30px', marginBottom: 28 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 28, fontSize: '1.8rem' }}>Contáctanos</h2>

          <div className="form-group">
            <label>Nombre</label>
            <input value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Tu nombre completo" />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" value={form.correo} onChange={e => set('correo', e.target.value)} placeholder="nombre@ejemplo.com" />
          </div>
          <div className="form-group">
            <label>Motivo de Contacto</label>
            <select value={form.motivo} onChange={e => set('motivo', e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option>Consulta de Disponibilidad</option>
              <option>Presupuesto para Empresa</option>
              <option>Soporte Técnico</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Mensaje</label>
            <textarea rows={4} value={form.mensaje} onChange={e => set('mensaje', e.target.value)} placeholder="¿En qué podemos ayudarte?" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <input type="checkbox" id="term-cont" checked={terminos}
              onChange={e => setTerminos(e.target.checked)} style={{ width: 'auto' }} />
            <label htmlFor="term-cont" style={{ margin: 0 }}>Acepto los términos y condiciones</label>
          </div>

          <button className="btn-green" style={{ width: '100%', fontSize: 16, padding: 14 }} onClick={submit}>
            Enviar Mensaje
          </button>

          {msg && (
            <div className={msg.type === 'error' ? 'alert-error' : 'alert-success'} style={{ marginTop: 16 }}>
              {msg.text}
            </div>
          )}
        </div>

        {/* Mapa */}
        <div className="glass" style={{ padding: '28px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: 10 }}>📍 Nuestra Ubicación</h3>
          <p style={{ opacity: .8, marginBottom: 16 }}>Encuéntranos en Punta Arenas, Región de Magallanes.</p>
          <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d-70.91!3d-53.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDA5JzM2LjAiUyA3MMKwNTQnMzYuMCJX!5e0!3m2!1ses-419!2scl!4v1683000000000!5m2!1ses-419!2scl"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Mapa Punta Arenas"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
