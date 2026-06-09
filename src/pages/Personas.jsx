import { useState } from 'react';
import { validateRut, formatRut, formatRutInput, cleanRut, calcEdad, hashRut } from '../utils/rut';
import { getPersonas, savePersonas } from '../utils/storage';

const emptyForm = { rut: '', nombre: '', correo: '', telefono: '', fecha: '' };

export default function Personas() {
  const [personas, setPersonas]   = useState(getPersonas());
  const [form, setForm]           = useState(emptyForm);
  const [editIdx, setEditIdx]     = useState(null);
  const [msg, setMsg]             = useState(null);
  const [edad, setEdad]           = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleRut = (v) => set('rut', formatRutInput(v));

  const handleFecha = (v) => {
    set('fecha', v);
    setEdad(calcEdad(v));
  };

  const rutStatus = () => {
    if (form.rut.length < 6) return null;
    return validateRut(form.rut);
  };

  const guardar = () => {
    setMsg(null);
    if (!validateRut(form.rut))       { setMsg({ type: 'error', text: '❌ RUT inválido' }); return; }
    if (!form.nombre.trim())          { setMsg({ type: 'error', text: '❌ Nombre requerido' }); return; }
    if (/\d/.test(form.nombre))       { setMsg({ type: 'error', text: '❌ El nombre no puede contener números' }); return; }
    if (!form.correo.trim())          { setMsg({ type: 'error', text: '❌ Correo requerido' }); return; }

    const edadStr = edad !== null ? `${edad} años` : '';
    const persona = { ...form, rut: formatRut(form.rut), edad: edadStr };

    let updated = [...personas];
    if (editIdx !== null) {
      updated[editIdx] = persona;
      setMsg({ type: 'success', text: '✅ Persona actualizada' });
    } else {
      if (personas.some(p => cleanRut(p.rut) === cleanRut(form.rut))) {
        setMsg({ type: 'error', text: '❌ Este RUT ya está registrado' }); return;
      }
      updated.push(persona);
      setMsg({ type: 'success', text: '✅ Persona agregada' });
    }

    savePersonas(updated);
    setPersonas(updated);
    setForm(emptyForm);
    setEditIdx(null);
    setEdad(null);
  };

  const editar = (i) => {
    setForm({ ...personas[i], rut: personas[i].rut });
    setEditIdx(i);
    setEdad(calcEdad(personas[i].fecha));
    setMsg(null);
    window.scrollTo(0, 0);
  };

  const eliminar = (i) => {
    if (!confirm('¿Eliminar esta persona?')) return;
    const updated = personas.filter((_, idx) => idx !== i);
    savePersonas(updated);
    setPersonas(updated);
    if (editIdx === i) { setForm(emptyForm); setEditIdx(null); }
  };

  const cancelar = () => { setForm(emptyForm); setEditIdx(null); setEdad(null); setMsg(null); };

  const rs = rutStatus();

  return (
    <div className="page">
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 32 }}>👥 Gestión de Personas</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }} className="grid-personas">

          {/* FORMULARIO */}
          <div className="glass" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>
              {editIdx !== null ? '✏️ Editar Persona' : '➕ Agregar Persona'}
            </h3>

            <div className="form-group">
              <label>RUT *</label>
              <input value={form.rut} onChange={e => handleRut(e.target.value)} placeholder="12.345.678-9" />
              {rs !== null && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: rs ? '#afffaa' : '#ffaaaa' }}>
                  {rs ? '✅ RUT válido' : '❌ RUT inválido'}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Nombre *</label>
              <input value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Nombre completo" />
            </div>

            <div className="form-group">
              <label>Correo *</label>
              <input type="email" value={form.correo} onChange={e => set('correo', e.target.value)} placeholder="correo@ejemplo.com" />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="+56 9 1234 5678" />
            </div>

            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input type="date" value={form.fecha} onChange={e => handleFecha(e.target.value)} />
            </div>

            {edad !== null && (
              <div style={{ background: 'rgba(176,106,255,0.15)', border: '1px solid #b06aff', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 14 }}>
                📅 Edad calculada: <strong>{edad} años</strong>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-green" style={{ flex: 1 }} onClick={guardar}>
                {editIdx !== null ? '💾 Actualizar' : '➕ Agregar'}
              </button>
              {editIdx !== null && (
                <button className="btn-outline" onClick={cancelar}>Cancelar</button>
              )}
            </div>

            {msg && (
              <div className={msg.type === 'error' ? 'alert-error' : 'alert-success'} style={{ marginTop: 14 }}>
                {msg.text}
              </div>
            )}
          </div>

          {/* TABLA */}
          <div className="glass" style={{ padding: 28, overflowX: 'auto' }}>
            <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>
              📋 Personas Registradas ({personas.length})
            </h3>

            {personas.length === 0 ? (
              <p style={{ opacity: .6, textAlign: 'center', padding: 30 }}>No hay personas registradas aún.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>RUT</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Edad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {personas.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <span style={{ background: 'rgba(176,106,255,0.2)', border: '1px solid #b06aff', borderRadius: 20, padding: '2px 10px', fontSize: 12 }}>
                          {hashRut(p.rut)}
                        </span>
                      </td>
                      <td>{p.nombre}</td>
                      <td style={{ fontSize: 13, opacity: .8 }}>{p.correo}</td>
                      <td>{p.edad || '—'}</td>
                      <td style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => editar(i)}
                          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 13 }}
                        >✏️</button>
                        <button
                          onClick={() => eliminar(i)}
                          style={{ background: '#c53030', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 13 }}
                        >🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
