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
  const [errors, setErrors]       = useState({});

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validateField = (k, v) => {
    let error = '';

    if (k === 'rut') {
      if (!v.trim()) error = 'RUT obligatorio';
      else if (!validateRut(v)) error = 'RUT inválido';
    }

    if (k === 'nombre') {
      if (!v.trim()) error = 'Nombre requerido';
      else if (/\d/.test(v)) error = 'El nombre no puede contener números';
    }

    if (k === 'correo') {
      if (!v.trim()) error = 'Correo requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) error = 'Correo inválido';
    }

    if (k === 'telefono' && v.trim()) {
      if (!/^[0-9+()\s-]{7,20}$/.test(v)) error = 'Teléfono inválido';
    }

    if (k === 'fecha' && v) {
      const fecha = new Date(v);
      if (Number.isNaN(fecha.getTime())) {
        error = 'Fecha inválida';
      } else {
        const hoy = new Date();
        const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        if (fecha > hoySinHora) {
          error = 'La fecha no puede ser futura';
        } else {
          const edadCalculada = calcEdad(v);
          if (edadCalculada > 120) error = 'No puede superar los 120 años';
        }
      }
    }

    setErrors(prev => ({ ...prev, [k]: error }));
    return error;
  };

  const validateForm = () => {
    const fields = ['rut', 'nombre', 'correo', 'telefono', 'fecha'];
    const newErrors = {};

    fields.forEach((key) => {
      const value = form[key] || '';
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (k, v) => {
    set(k, v);
    validateField(k, v);
  };

  const handleRut = (v) => {
    const formatted = formatRutInput(v);
    handleFieldChange('rut', formatted);
  };

  const handleFecha = (v) => {
    handleFieldChange('fecha', v);
    setEdad(calcEdad(v));
  };

  const rutStatus = () => {
    if (form.rut.length < 6) return null;
    return validateRut(form.rut);
  };

  const today = new Date().toISOString().slice(0, 10);

  const guardar = () => {
    setMsg(null);
    if (!validateForm()) {
      setMsg({ type: 'error', text: 'Por favor corrige los campos requeridos antes de continuar.' });
      return;
    }

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
              {(errors.rut || rs !== null) && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: errors.rut ? '#ffaaaa' : rs ? '#afffaa' : '#ffaaaa' }}>
                  {errors.rut || (rs ? '✅ RUT válido' : '❌ RUT inválido')}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Nombre *</label>
              <input value={form.nombre} onChange={e => handleFieldChange('nombre', e.target.value)} placeholder="Nombre completo" />
              {errors.nombre && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>
                  {errors.nombre}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Correo *</label>
              <input type="email" value={form.correo} onChange={e => handleFieldChange('correo', e.target.value)} placeholder="correo@ejemplo.com" />
              {errors.correo && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>
                  {errors.correo}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input value={form.telefono} onChange={e => handleFieldChange('telefono', e.target.value)} placeholder="+56 9 1234 5678" />
              {errors.telefono && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>
                  {errors.telefono}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input type="date" max={today} value={form.fecha} onChange={e => handleFecha(e.target.value)} />
              {errors.fecha && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>
                  {errors.fecha}
                </span>
              )}
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
