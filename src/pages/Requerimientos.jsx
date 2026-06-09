import diagrama1 from '../assets/diagrama1.png';
import diagrama2 from '../assets/Diagrama Actualizado.png';

const sections = [
  {
    title: 'Diagrama de Casos de Uso — Interacción del Cliente',
    img:   diagrama1,
    desc:  'Representa las interacciones del actor Cliente con el sistema Jessi Eventos: visualización de productos, carrito de compras, finalización de pedido y contacto con la empresa.',
  },
  {
    title: 'Diagrama de Clases — Estructura de Datos y Lógica de Negocio',
    img:   diagrama2,
    desc:  'Define las clases principales: Cliente, Producto, Carrito y Venta. Incluye atributos (string, int) y métodos como calcularTotal() y generarVenta().',
  },
];

const actividades = [
  { ok: true,  t: 'Actividad 1 — CRUD + RUT',        d: 'CRUD completo de personas con validación del dígito verificador chileno, formateo automático y detección de duplicados.' },
  { ok: true,  t: 'Actividad 2 — API mindicador.cl',  d: 'Consulta de UF, UTM y Euro en pesos desde la API pública. Resultados visibles en Carrito y Venta.' },
  { ok: true,  t: 'Actividad 3a — Calculadora de edad', d: 'Calcula la edad automáticamente al seleccionar fecha de nacimiento, tanto en el registro como en el CRUD.' },
  { ok: true,  t: 'Actividad 3b — Encriptación',      d: 'Contraseña encriptada con XOR simétrico + base64 (tipo Fernet). Clave aleatoria de 32 bytes por usuario, guardada en localStorage.' },
  { ok: true,  t: 'Sesión con RUT validado',          d: 'Login/Registro con RUT chileno validado, edad calculada, contraseña encriptada y sesión persistente en localStorage.' },
  { ok: true,  t: 'Carrito con conversión de monedas', d: 'Precios en CLP con equivalencias en UF, UTM y Euro vía mindicador.cl, disponibles en el carrito y al finalizar la compra.' },
];

export default function Requerimientos() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 820 }}>

        {sections.map(s => (
          <div key={s.title} className="glass" style={{ padding: 32, marginBottom: 24 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20, fontSize: '1.3rem' }}>{s.title}</h2>
            <div style={{ textAlign: 'center' }}>
              <img src={s.img} alt={s.title}
                style={{ maxWidth: '100%', borderRadius: 10, border: '1px solid rgba(255,255,255,.2)' }} />
            </div>
            <div style={{ background: 'rgba(255,255,255,.07)', borderRadius: 10, padding: '16px 20px', marginTop: 18 }}>
              <p style={{ opacity: .85, lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
            </div>
          </div>
        ))}
          </div>
        </div>
  );
}
