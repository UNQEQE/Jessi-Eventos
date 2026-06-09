import { useState } from 'react';
import { validateRut, formatRut, formatRutInput, cleanRut, calcEdad } from '../utils/rut';
import { CryptoUtils } from '../utils/crypto';
import { getUsers, saveUsers, saveSession } from '../utils/storage';

export default function Auth({ onLogin }) {
  const [tab, setTab]         = useState('login');
  const [lRut, setLRut]       = useState('');
  const [lPass, setLPass]     = useState('');
  const [lMsg, setLMsg]       = useState(null);

  const [rRut, setRRut]       = useState('');
  const [rNombre, setRNombre] = useState('');
  const [rApellido, setRApellido] = useState('');
  const [rFecha, setRFecha]   = useState('');
  const [rPass, setRPass]     = useState('');
  const [rPass2, setRPass2]   = useState('');
  const [rMsg, setRMsg]       = useState(null);
  const [edad, setEdad]       = useState(null);
  const today                 = new Date().toISOString().slice(0, 10);

  // ---- LOGIN ----
  const doLogin = () => {
    setLMsg(null);
    if (!validateRut(lRut)) { setLMsg({ type: 'error', text: '❌ RUT inválido' }); return; }
    const users = getUsers();
    const user  = users[cleanRut(lRut)];
    if (!user)  { setLMsg({ type: 'error', text: '❌ Usuario no encontrado' }); return; }
    const dec = CryptoUtils.decrypt(user.passToken, user.key);
    if (dec !== lPass) { setLMsg({ type: 'error', text: '❌ Contraseña incorrecta' }); return; }
    const session = { rut: user.rut, nombre: user.nombre, apellido: user.apellido, edad: user.edad, fecha: user.fecha };
    saveSession(session);
    onLogin(session);
  };

  // ---- REGISTRO ----
  const handleFecha = (f) => {
    setRFecha(f);
    const e = calcEdad(f);
    setEdad(e !== null ? e : null);
  };

  const doRegister = () => {
    setRMsg(null);
    if (!validateRut(rRut))              { setRMsg({ type: 'error', text: '❌ RUT inválido' }); return; }
    if (!rNombre.trim())                 { setRMsg({ type: 'error', text: '❌ Ingresa tu nombre' }); return; }
    if (/\d/.test(rNombre))             { setRMsg({ type: 'error', text: '❌ El nombre no puede contener números' }); return; }
    if (!rApellido.trim())               { setRMsg({ type: 'error', text: '❌ Ingresa tu apellido' }); return; }
    if (/\d/.test(rApellido))           { setRMsg({ type: 'error', text: '❌ El apellido no puede contener números' }); return; }
    if (!rFecha)                         { setRMsg({ type: 'error', text: '❌ Ingresa tu fecha de nacimiento' }); return; }
    const fechaNacimiento = new Date(rFecha);
    const fechaHoy = new Date();
    if (Number.isNaN(fechaNacimiento.getTime())) { setRMsg({ type: 'error', text: '❌ Fecha inválida' }); return; }
    if (fechaNacimiento > fechaHoy)      { setRMsg({ type: 'error', text: '❌ La fecha no puede ser futura' }); return; }
    if (edad < 0 || edad > 120)         { setRMsg({ type: 'error', text: '❌ No puede superar los 120 años' }); return; }
    if (rPass.length < 6)               { setRMsg({ type: 'error', text: '❌ Contraseña mínimo 6 caracteres' }); return; }
    if (rPass !== rPass2)               { setRMsg({ type: 'error', text: '❌ Las contraseñas no coinciden' }); return; }

    const users  = getUsers();
    const rutKey = cleanRut(rRut);
    if (users[rutKey]) { setRMsg({ type: 'error', text: '❌ Este RUT ya está registrado' }); return; }

    // Encriptar contraseña
    const key       = CryptoUtils.genKey();
    const passToken = CryptoUtils.encrypt(rPass, key);

    const rutFmt = formatRut(rRut);
    users[rutKey] = { rut: rutFmt, nombre: rNombre.trim(), apellido: rApellido.trim(), fecha: rFecha, edad, passToken, key };
    saveUsers(users);

    const session = { rut: rutFmt, nombre: rNombre.trim(), apellido: rApellido.trim(), edad, fecha: rFecha };
    saveSession(session);
    setRMsg({ type: 'success', text: `✅ Cuenta creada. Contraseña encriptada y guardada en localStorage.` });
    setTimeout(() => onLogin(session), 1200);
  };

  const rutValid = (r) => r.length > 6 ? (validateRut(r) ? '✅ RUT válido' : '❌ RUT inválido') : '';
  const rutColor = (r) => r.length > 6 ? (validateRut(r) ? '#afffaa' : '#ffaaaa') : 'transparent';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="glass" style={{ width: '100%', maxWidth: 480, padding: '40px 36px' }}>

        <h2 style={{ textAlign: 'center', marginBottom: 6, fontSize: '1.8rem' }}>
          Jessi<span style={{ color: '#b06aff' }}>Eventos</span>
        </h2>
        <p style={{ textAlign: 'center', opacity: .7, marginBottom: 28, fontSize: 14 }}>
          Punta Arenas, Región de Magallanes
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: 4, marginBottom: 28 }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '10px', border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, transition: 'all .2s',
              background: tab === t ? '#b06aff' : 'transparent',
              color: tab === t ? '#fff' : 'rgba(255,255,255,0.6)',
            }}>
              {t === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* LOGIN */}
        {tab === 'login' && (
          <div>
            <div className="form-group">
              <label>RUT</label>
              <input
                value={lRut}
                onChange={e => setLRut(formatRutInput(e.target.value))}
                placeholder="12.345.678-9"
              />
              <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: rutColor(lRut) }}>
                {rutValid(lRut)}
              </span>
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={lPass} onChange={e => setLPass(e.target.value)} placeholder="Tu contraseña" />
            </div>
            <button className="btn-green" style={{ width: '100%', fontSize: 16, padding: 14 }} onClick={doLogin}>
              Entrar
            </button>
            {lMsg && <div className={lMsg.type === 'error' ? 'alert-error' : 'alert-success'} style={{ marginTop: 14 }}>{lMsg.text}</div>}
          </div>
        )}

        {/* REGISTER */}
        {tab === 'register' && (
          <div>
            <div className="form-group">
              <label>RUT</label>
              <input
                value={rRut}
                onChange={e => setRRut(formatRutInput(e.target.value))}
                placeholder="12.345.678-9"
              />
              <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: rutColor(rRut) }}>
                {rutValid(rRut)}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>Nombre *</label>
                <input value={rNombre} onChange={e => setRNombre(e.target.value)} placeholder="Ej: Jessica" />
              </div>
              <div className="form-group">
                <label>Apellido *</label>
                <input value={rApellido} onChange={e => setRApellido(e.target.value)} placeholder="Ej: González" />
              </div>
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input type="date" max={today} value={rFecha} onChange={e => handleFecha(e.target.value)} />
            </div>
            {edad !== null && (
              <div style={{ background: 'rgba(176,106,255,0.2)', border: '1px solid #b06aff', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 14 }}>
                📅 Edad calculada: <strong>{edad} años</strong>
              </div>
            )}
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={rPass} onChange={e => setRPass(e.target.value)} placeholder="Mínimo 6 caracteres" />
            </div>
            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input type="password" value={rPass2} onChange={e => setRPass2(e.target.value)} placeholder="Repite tu contraseña" />
            </div>
            <button className="btn-green" style={{ width: '100%', fontSize: 16, padding: 14 }} onClick={doRegister}>
              Crear Cuenta
            </button>
            {rMsg && <div className={rMsg.type === 'error' ? 'alert-error' : 'alert-success'} style={{ marginTop: 14 }}>{rMsg.text}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
