import { useState } from 'react';
import { saveCart } from '../utils/storage';
import { fetchIndicadores, convertirMontos } from '../utils/indicadores';
import { saveIndicadores } from '../utils/storage';

export default function Carrito({ cart, setCart, setPage, indicadores, setIndicadores }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const total = cart.reduce((s, i) => s + i.precio, 0);

  const remove = (idx) => {
    const updated = cart.filter((_, i) => i !== idx);
    setCart(updated);
    saveCart(updated);
  };

  const cargarIndicadores = async () => {
    setLoading(true);
    setError(null);
    const data = await fetchIndicadores();
    if (data) {
      saveIndicadores(data);
      setIndicadores(data);
    } else {
      setError('No se pudo conectar a mindicador.cl. Intenta más tarde.');
    }
    setLoading(false);
  };

  const conv = total > 0 ? convertirMontos(total, indicadores) : null;

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 800 }}>
        <div className="glass" style={{ padding: '32px 28px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 28, fontSize: '1.8rem' }}>🛒 Detalle de tu Pedido</h2>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th style={{ textAlign: 'right' }}>Precio</th>
                <th style={{ textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: 30, opacity: .6 }}>
                    Tu carrito está vacío
                  </td>
                </tr>
              ) : (
                cart.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.nombre}</td>
                    <td style={{ textAlign: 'right' }}>${item.precio.toLocaleString('es-CL')}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => remove(idx)}
                        style={{ background: '#c53030', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 13 }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Total en pesos */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,.2)', paddingTop: 20, marginTop: 16, fontSize: '1.2rem', fontWeight: 700 }}>
            <span>Total a Pagar:</span>
            <span>${total.toLocaleString('es-CL')}</span>
          </div>

          {/* Conversiones UF / UTM / Euro */}
          {total > 0 && (
            <div style={{ marginTop: 20 }}>
              {conv ? (
                <>
                  <p style={{ opacity: .7, fontSize: 13, marginBottom: 10 }}>
                    💱 Equivalencias (datos mindicador.cl):
                  </p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {conv.uf && (
                      <ConvBox label="UF" value={`${conv.uf} UF`} />
                    )}
                    {conv.utm && (
                      <ConvBox label="UTM" value={`${conv.utm} UTM`} />
                    )}
                    {conv.euro && (
                      <ConvBox label="Euro" value={`€ ${conv.euro}`} />
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <button
                    className="btn-outline"
                    onClick={cargarIndicadores}
                    disabled={loading}
                    style={{ fontSize: 14 }}
                  >
                    {loading ? '⏳ Consultando mindicador.cl...' : '💱 Calcular en UF / UTM / Euro'}
                  </button>
                  {error && <div className="alert-error" style={{ marginTop: 10 }}>❌ {error}</div>}
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
            <button className="btn-outline" onClick={() => setPage('productos')}>Seguir Arrendando</button>
            <button className="btn-warning" onClick={() => setPage('venta')}>Proceder al Pago</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConvBox({ label, value }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 12, padding: '10px 16px', minWidth: 110,
    }}>
      <span style={{ fontSize: 11, opacity: .65, textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 4 }}>{label}</span>
      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#b06aff' }}>{value}</span>
    </div>
  );
}
