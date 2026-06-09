export default function Nosotros() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="glass" style={{ padding: 40, textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 16 }}>Quiénes Somos</h2>
          <p style={{ opacity: .85, lineHeight: 1.8, fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            Jessi Eventos es una empresa especializada en fotocabinas y decoración para eventos en Punta Arenas,
            Región de Magallanes. Nos apasiona hacer de cada celebración un momento único e irrepetible.
          </p>
        </div>

        <div className="grid-3" style={{ gap: 20 }}>
          {[
            { emoji: '🎯', title: 'Nuestra Misión', desc: 'Brindar servicios de alta calidad para que cada evento sea perfecto.' },
            { emoji: '🌟', title: 'Nuestra Visión',  desc: 'Ser la empresa líder en eventos de la Región de Magallanes.' },
            { emoji: '💎', title: 'Nuestros Valores', desc: 'Compromiso, creatividad y atención personalizada en cada servicio.' },
          ].map(c => (
            <div key={c.title} className="glass" style={{ padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{c.emoji}</div>
              <h3 style={{ marginBottom: 10, fontSize: '1.1rem' }}>{c.title}</h3>
              <p style={{ opacity: .8, fontSize: 14, lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
