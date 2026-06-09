import { useState, useEffect } from 'react';
import { fetchIndicadores } from '../utils/indicadores';
import { getIndicadores, saveIndicadores } from '../utils/storage';
import espejoImg from '../assets/espejo.png';
import domoImg from '../assets/domo.png';
import tres60Img from '../assets/360.png';
import empresaImg from '../assets/empresa.png';
import circulo3Img from '../assets/circulo3.jpg';

const PRODUCTS = [
  { emoji: '🎭', tag: 'Más Popular', tagColor: '#b06aff', name: 'Foto Cabina Espejo',  desc: 'Foto cabina con espejo para capturar momentos únicos.',       price: 200000, image: espejoImg },
  { emoji: '🔮', tag: 'Popular',     tagColor: '#3d8b36', name: 'Fotocabina + Domo',   desc: 'Fotocabina con domo para crear un ambiente único.',            price: 120000, image: domoImg },
  { emoji: '🌀', tag: 'Popular',     tagColor: '#3d8b36', name: 'Cabina 360°',          desc: 'Videos con vista de 360 grados para tu evento.',              price: 170000, image: tres60Img },
];

const COTIZACIONES = [
  { emoji: '🏢', name: 'Decoración para Empresa',    desc: 'Ambiente profesional para eventos corporativos.', image: empresaImg },
  { emoji: '🎓', name: 'Decoración para Graduación', desc: 'Decoración festiva para un día memorable.', image: circulo3Img },
];

const MONEDAS = ['PESO CHILENO', 'UF', 'UTM', 'EURO'];

export default function Productos({ onAdd, setPage }) {
  const [currency, setCurrency] = useState('PESO CHILENO');
  const [indicadores, setIndicadores] = useState(getIndicadores());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!indicadores) {
      loadIndicadores();
    }
  }, []);

  const loadIndicadores = async () => {
    setLoading(true);
    setError(null);
    const data = await fetchIndicadores();
    setLoading(false);
    if (data) {
      setIndicadores(data);
      saveIndicadores(data);
    } else {
      setError('No se pudo cargar los indicadores.');
    }
  };

  const formatPrice = (price) => {
    if (currency === 'PESO CHILENO') {
      return `$${price.toLocaleString('es-CL')}`;
    }
    if (!indicadores) {
      return 'Cargando...';
    }

    const uf   = indicadores.uf?.valor   || 0;
    const utm  = indicadores.utm?.valor  || 0;
    const euro = indicadores.euro?.valor || 0;

    if (currency === 'UF') {
      return uf ? `${(price / uf).toFixed(2)} UF` : 'N/A';
    }
    if (currency === 'UTM') {
      return utm ? `${(price / utm).toFixed(2)} UTM` : 'N/A';
    }
    if (currency === 'EURO') {
      return euro ? `€ ${ (price / euro).toFixed(2) }` : 'N/A';
    }
    return `$${price.toLocaleString('es-CL')}`;
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: 0 }}>Catálogo de Arriendos</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ opacity: .85, fontSize: 14 }}>Mostrar precios en:</span>
            <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)', color: '#fff' }}>
              {MONEDAS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {currency !== 'PESO CHILENO' && !indicadores && (
              <button className="btn-outline" onClick={loadIndicadores} style={{ whiteSpace: 'nowrap' }}>
                {loading ? '⏳ Cargando...' : 'Actualizar indicadores'}
              </button>
            )}
          </div>
        </div>
        {error && <div className="alert-error" style={{ marginBottom: 20 }}>{error}</div>}

        <div className="grid-3">
          {PRODUCTS.map(p => (
            <div key={p.name} className="glass" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: 200, background: 'rgba(176,106,255,0.15)',
                borderRadius: '18px 18px 0 0', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {p.image ? (
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '5rem' }}>{p.emoji}</span>
                )}
              </div>
              <div style={{ padding: '20px 20px 0', flexGrow: 1, textAlign: 'center' }}>
                <span style={{
                  background: `${p.tagColor}33`, border: `1px solid ${p.tagColor}`,
                  color: '#fff', borderRadius: 20, padding: '3px 10px',
                  fontSize: 12, fontWeight: 600, display: 'inline-block', marginBottom: 10,
                }}>
                  {p.tag}
                </span>
                <h5 style={{ marginBottom: 8, fontSize: '1.05rem' }}>{p.name}</h5>
                <p style={{ opacity: .7, fontSize: 14, marginBottom: 12 }}>{p.desc}</p>
                <p style={{ fontWeight: 700, fontSize: '1.3rem' }}>{formatPrice(p.price)}</p>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <button className="btn-green" style={{ width: '100%' }} onClick={() => onAdd(p.name, p.price)}>
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}

          {COTIZACIONES.map(c => (
            <div key={c.name} className="glass" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: 200, background: 'rgba(240,165,0,0.12)',
                borderRadius: '18px 18px 0 0', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {c.image ? (
                  <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '5rem' }}>{c.emoji}</span>
                )}
              </div>
              <div style={{ padding: '20px 20px 0', flexGrow: 1, textAlign: 'center' }}>
                <h5 style={{ marginBottom: 8, fontSize: '1.05rem' }}>{c.name}</h5>
                <p style={{ opacity: .7, fontSize: 14, marginBottom: 12 }}>{c.desc}</p>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', opacity: .8 }}>Pide tu Presupuesto</p>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <button className="btn-outline" style={{ width: '100%' }} onClick={() => setPage('contacto')}>
                  Cotizar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
