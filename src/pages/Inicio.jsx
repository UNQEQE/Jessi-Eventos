import { useState, useEffect } from 'react';
import { hashRut } from '../utils/rut';
import hero1 from '../assets/evento1.jpg';
import hero2 from '../assets/evento2.jpg';
import hero3 from '../assets/evento3.jpg';
import c1 from '../assets/circulo1.jpg';
import c2 from '../assets/circulo2.jpg';
import c3 from '../assets/circulo3.jpg';
const slides=[
{image:hero1,title:'Matrimonios Inolvidables.',sub:'Organizamos el mejor día de tu vida en Punta Arenas.'},
{image:hero2,title:'Eventos Corporativos.',sub:'Profesionalismo y elegancia para tu empresa.'},
{image:hero3,title:'Fiestas de XV Años.',sub:'Momentos únicos con fotocabinas y más.'},
];

const circles=[
{image:c1,title:'Matrimonios',desc:'Organización completa para el día más special.'},
{image:c2,title:'Empresas',desc:'Eventos corporativos con la mejor elegancia.'},
{image:c3,title:'Licenciaturas',desc:'Celebraciones con todo incluido.'},
];

export default function Inicio({ setPage, session, cartCount }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div>
      <div style={{
        width: '100%', padding: '18px 20px', background: 'linear-gradient(90deg, rgba(176,106,255,0.95), rgba(61,139,54,0.95))',
        color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 700,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      }}>
        Hacemos la noche de tus sueños, una realidad
      </div>

      {/* Hero / Carrusel simulado */}
      <div style={{
        minHeight: 380, background: 'linear-gradient(135deg,rgba(42,10,69,0.9),rgba(106,58,170,0.8))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', textAlign: 'center', padding: '60px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden',
      }}>
        <img src={slide.image} alt={slide.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 960 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', marginBottom: 12, transition: 'all .4s' }}>
            {slide.title}
          </h1>
          <p style={{ opacity: .85, fontSize: 17, marginBottom: 18 }}>{slide.sub}</p>
          {session && (
            <p style={{ opacity: .7, fontSize: 14, marginBottom: 24 }}>
              Bienvenido/a, <strong style={{ color: '#b06aff' }}>
                {session.nombre && session.apellido ? `${session.nombre} ${session.apellido}` : 'Usuario'}
              </strong> · {session.edad} años
              {session.rut && (
                <span style={{ display: 'block', opacity: .8, marginTop: 6 }}>
                  RUT: {hashRut(session.rut)}
                </span>
              )}
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-green" onClick={() => setPage('productos')}>Ver Productos</button>
          <button className="btn-outline" onClick={() => setPage('carrito')}>
            🛒 Carrito ({cartCount})
          </button>
        </div>
        </div>
        {/* Indicadores de slide */}
        <div style={{ display: 'flex', gap: 8, position: 'absolute', bottom: 20 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: 4,
              background: i === current ? '#b06aff' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', transition: 'all .3s',
            }} />
          ))}
        </div>
      </div>

      {/* Sección de servicios */}
      <div className="container" style={{ padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 40, fontSize: '1.6rem' }}>Nuestros Servicios</h2>
        <div className="grid-3" style={{ gap: 36, textAlign: 'center' }}>
          {circles.map(c => (
            <div key={c.title}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%',
                overflow: 'hidden', margin: '0 auto 16px',
                border: '2px solid rgba(176,106,255,0.4)',
              }}>
                <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ marginBottom: 10 }}>{c.title}</h3>
              <p style={{ opacity: .8, fontSize: 15, marginBottom: 14 }}>{c.desc}</p>
              <button className="btn-outline" onClick={() => setPage('productos')}>Ver detalles »</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
