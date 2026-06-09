import diagrama1 from '../assets/Diagrama 2 Actualizado.png';
import diagrama2 from '../assets/Diagrama Actualizado.png';

const sections = [
  {
    title: 'Diagrama de Casos de Uso — Interacción del Cliente',
    img:   diagrama1,
    desc:  'Este diagrama se centra en la perspectiva del usuario final (el "Cliente") y lo que puede lograr al interactuar con la plataforma. Propósito: Muestra los límites del sistema "Jessi Eventos" y las funcionalidades a las que tiene acceso el actor principal. Acciones del Cliente: Autenticación con Registrarse/Iniciar sesión como punto de entrada. Proceso de Compra que engloba Ver producto, Agregar al Carrito y Realizar Compra, siguiendo el flujo lógico de un e-commerce. Funcionalidades de Soporte: Calcular UF/UTM/EURO (que coincide con la clase IndicadorAPI) y Contactar Empresa. Cumplimiento: El caso de uso Aceptar términos asegura un flujo legal/administrativo previo a las operaciones críticas.',
  },
  {
    title: 'Diagrama de Clases — Estructura de Datos y Lógica de Negocio',
    img:   diagrama2,
    desc:  'Este diagrama define la arquitectura interna del sistema, mostrando cómo se organizan los datos y cómo interactúan las diferentes entidades. Propósito: Define los objetos que compondrán la base de datos y la lógica del negocio. Componentes Clave: Jerarquía de Usuario/Persona con una relación de composición donde una Persona (rut, nombre, edad) tiene asociado un Usuario (password y key). Gestión de Ventas a través de Carrito y Venta, utilizando DetalleCarrito para gestionar la relación entre productos y cantidad. Integración Externa: IndicadorAPI consume servicios externos para obtener tasas de cambio (UF, UTM, Euro) y realizar conversiones de moneda. Encapsulamiento: Cada clase tiene sus propios atributos y métodos, como calcularTotal() en el carrito o generarVenta() en la venta.',
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
