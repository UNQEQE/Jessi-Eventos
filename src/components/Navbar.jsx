export default function Navbar({ page, setPage, cartCount, session, onLogout }) {
  const links = [
    { id: 'inicio',         label: 'Inicio' },
    { id: 'personas',       label: 'Personas' },
    { id: 'productos',      label: 'Productos' },
    { id: 'contacto',       label: 'Contacto' },
    { id: 'terminos',       label: 'Términos' },
    { id: 'requerimientos', label: 'Requerimientos' },
    { id: 'venta',          label: '🛒' },
  ];

  return (
    <nav style={{
      background: '#111', height: 'var(--nav-h)', display: 'flex',
      alignItems: 'center', padding: '0 24px', position: 'sticky',
      top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
    }}>
      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>

        {/* Logo */}
        <span
          onClick={() => setPage('inicio')}
          style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#fff', cursor: 'pointer', marginRight: 'auto' }}
        >
          Jessi<span style={{ color: '#b06aff' }}>Eventos</span>
        </span>

        {/* Links */}
        {links.map(l => (
          <button
            key={l.id}
            className="btn-outline"
            onClick={() => setPage(l.id)}
            style={{
              fontWeight: page === l.id ? 700 : 400,
              borderColor: page === l.id ? '#b06aff' : undefined,
              color: page === l.id ? '#b06aff' : undefined,
            }}
          >
            {l.label}
          </button>
        ))}

        {/* Carrito */}
        <button className="btn-outline" onClick={() => setPage('carrito')} style={{ position: 'relative', padding: '8px 14px', display: 'none' }}>
          🛒
          <span className="badge-danger" style={{
            position: 'absolute', top: -6, right: -6,
            background: '#c53030', color: '#fff', borderRadius: '50%',
            width: 20, height: 20, fontSize: 11, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontWeight: 700,
          }}>
            {cartCount}
          </span>
        </button>

        {!session ? (
          <button
            className="btn-green"
            onClick={() => setPage('login')}
            style={{ marginLeft: 12 }}
          >
            Iniciar sesión
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
            <span style={{ fontSize: 13, opacity: .8 }}>
              Hola, {session.nombre && session.apellido ? `${session.nombre} ${session.apellido}` : ''}
            </span>
            <button
              onClick={onLogout}
              style={{ background: '#c53030', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontFamily: "'DM Sans',sans-serif" }}
            >
              Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
