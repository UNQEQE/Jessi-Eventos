// Helpers de localStorage

export const LS = {
  get(k) {
    try { return JSON.parse(localStorage.getItem(k)); } catch { return null; }
  },
  set(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  },
  del(k) {
    localStorage.removeItem(k);
  },
};

// Carrito
export const getCart  = () => LS.get('je_carrito') || [];
export const saveCart = (c) => LS.set('je_carrito', c);

// Sesión
export const getSession  = () => LS.get('je_session');
export const saveSession = (s) => LS.set('je_session', s);
export const clearSession = () => LS.del('je_session');

// Usuarios
export const getUsers  = () => LS.get('je_users') || {};
export const saveUsers = (u) => LS.set('je_users', u);

// Personas (CRUD)
export const getPersonas  = () => LS.get('je_personas') || [];
export const savePersonas = (p) => LS.set('je_personas', p);

// Indicadores económicos
export const getIndicadores  = () => LS.get('je_indicadores');
export const saveIndicadores = (i) => LS.set('je_indicadores', i);
