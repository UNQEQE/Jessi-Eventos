// Validación y formateo de RUT chileno

export function cleanRut(r) {
  return r.replace(/[.\-\s]/g, '').toUpperCase();
}

export function validateRut(r) {
  const clean = cleanRut(r);
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  if (!/^\d+$/.test(body)) return false;
  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const expected = 11 - (sum % 11);
  const calc = expected === 11 ? '0' : expected === 10 ? 'K' : String(expected);
  return dv === calc;
}

export function formatRut(r) {
  const clean = cleanRut(r).replace(/[^0-9Kk]/g, '');
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  return body.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv.toUpperCase();
}

export function formatRutInput(v) {
  const raw = v.replace(/[^0-9Kk]/g, '');
  if (raw.length < 2) return raw;
  const body = raw.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return body + '-' + raw.slice(-1).toUpperCase();
}

export function calcEdad(fechaStr) {
  if (!fechaStr) return null;
  const hoy = new Date();
  const nac = new Date(fechaStr);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const m = hoy.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
  return edad;
}

export function hashRut(rut) {
  const clean = cleanRut(rut);
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = ((hash << 5) - hash) + clean.charCodeAt(i);
    hash = hash >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}
