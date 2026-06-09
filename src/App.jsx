import { useState } from 'react';
import './index.css';

import Navbar         from './components/Navbar';
import Auth           from './pages/Auth';
import Inicio         from './pages/Inicio';
import Nosotros       from './pages/Nosotros';
import Personas       from './pages/Personas';
import Productos      from './pages/Productos';
import Carrito        from './pages/Carrito';
import Venta          from './pages/Venta';
import Contacto       from './pages/Contacto';
import Requerimientos from './pages/Requerimientos';
import Terminos       from './pages/Terminos';

import { getCart, saveCart, getSession, clearSession, getIndicadores } from './utils/storage';

export default function App() {
  const [page,        setPage]        = useState('inicio');
  const [cart,        setCart]        = useState(getCart());
  const [session,     setSession]     = useState(getSession());
  const [indicadores, setIndicadores] = useState(getIndicadores());

  // ---- Sesión ----
  const handleLogin = (sess) => {
    setSession(sess);
    setPage('inicio');
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setCart([]);
    saveCart([]);
    setPage('login');
  };

  // ---- Carrito ----
  const addToCart = (nombre, precio) => {
    const updated = [...cart, { id: Date.now(), nombre, precio }];
    setCart(updated);
    saveCart(updated);
  };

  const renderPage = () => {
    if (!session && page === 'login') {
      return <Auth onLogin={handleLogin} />;
    }

    switch (page) {
      case 'inicio':         return <Inicio setPage={setPage} session={session} cartCount={cart.length} />;
      case 'nosotros':       return <Nosotros />;
      case 'personas':       return <Personas />;
      case 'productos':      return <Productos onAdd={addToCart} setPage={setPage} />;
      case 'carrito':        return <Carrito cart={cart} setCart={setCart} setPage={setPage} indicadores={indicadores} setIndicadores={setIndicadores} />;
      case 'venta':          return <Venta cart={cart} setCart={setCart} setPage={setPage} indicadores={indicadores} setIndicadores={setIndicadores} />;
      case 'contacto':       return <Contacto />;
      case 'requerimientos': return <Requerimientos />;
      case 'terminos':       return <Terminos />;
      case 'login':          return <Auth onLogin={handleLogin} />;
      default:               return <Inicio setPage={setPage} session={session} cartCount={cart.length} />;
    }
  };

  return (
    <>
      <Navbar
        page={page}
        setPage={setPage}
        cartCount={cart.length}
        session={session}
        onLogout={handleLogout}
      />
      {renderPage()}
    </>
  );
}
