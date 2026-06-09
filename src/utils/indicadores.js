// Consulta a la API pública mindicador.cl
// Retorna UF, UTM y Euro en pesos chilenos

export async function fetchIndicadores() {
  try {
    const res = await fetch('https://mindicador.cl/api');
    if (!res.ok) throw new Error('Error HTTP ' + res.status);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('mindicador.cl error:', e);
    return null;
  }
}

// Convierte un monto en pesos a UF, UTM y Euro
export function convertirMontos(pesosCLP, indicadores) {
  if (!indicadores) return null;
  const uf   = indicadores.uf?.valor   || 0;
  const utm  = indicadores.utm?.valor  || 0;
  const euro = indicadores.euro?.valor || 0;
  return {
    uf:   uf   ? (pesosCLP / uf).toFixed(2)   : null,
    utm:  utm  ? (pesosCLP / utm).toFixed(2)  : null,
    euro: euro ? (pesosCLP / euro).toFixed(2) : null,
  };
}
