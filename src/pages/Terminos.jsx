export default function Terminos() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 900 }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 28 }}>Términos y Condiciones</h2>
        <div className="glass" style={{ padding: 28, lineHeight: 1.8, fontSize: 15 }}>
          <p>
            Bienvenido a JessiEventos. Al usar este sitio web aceptas los siguientes términos y condiciones, que
            regulan el uso de nuestra plataforma y los servicios que ofrecemos.
          </p>
          <h3 style={{ marginTop: 24 }}>Uso del sitio</h3>
          <p>
            El sitio está destinado a la presentación de servicios de organización de eventos y el arrendamiento de
            productos relacionados. Toda la información ofrecida es de carácter informativo y puede variar sin previo aviso.
          </p>
          <h3 style={{ marginTop: 24 }}>Registro y datos</h3>
          <p>
            Los usuarios deben registrarse con datos veraces y mantener su información actualizada. Los datos almacenados
            se guardan en <strong>localStorage</strong> para permitir el ingreso y la sesión dentro del navegador.
          </p>
          <h3 style={{ marginTop: 24 }}>Precios y moneda</h3>
          <p>
            Los precios mostrados en el catálogo son referenciales. Se puede cambiar la visualización entre Pesos Chilenos,
            UF, UTM y Euro. Las conversiones se calculan con indicadores públicos y pueden no corresponder al tipo de cambio
            exacto aplicado por bancos o instituciones financieras.
          </p>
          <h3 style={{ marginTop: 24 }}>Responsabilidad</h3>
          <p>
            JessiEventos no se hace responsable de errores en la información, la disponibilidad de productos o cambios de
            última hora en precios. El uso del sitio implica la aceptación de esta limitación de responsabilidad.
          </p>
          <h3 style={{ marginTop: 24 }}>Derechos de autor</h3>
          <p>
            El contenido del sitio, incluyendo textos, imágenes y diseños, es propiedad de JessiEventos o de sus
            colaboradores. Queda prohibida la reproducción total o parcial sin autorización.
          </p>
          <h3 style={{ marginTop: 24 }}>Contacto</h3>
          <p>
            Para dudas sobre estos términos puedes usar la sección de contacto del sitio.
          </p>
          <p style={{ marginTop: 24, opacity: .9, fontSize: 13 }}>
            Última actualización: junio 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
