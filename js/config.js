/* ==========================================================================
   DURDUC · CONFIGURACIÓN
   --------------------------------------------------------------------------
   Datos de contacto, redes y herramientas. Respeta las comillas "" y las comas.
   Si dejas un valor vacío (""), el enlace correspondiente se oculta solo.
   ========================================================================== */

window.DURDUC_CONFIG = {

  marca: {
    nombre: "DURDUC",
    creadora: "Jeniffer",
    // Dirección pública de la web (sin barra final). Cámbiala si usas un dominio propio.
    url: "https://durducco-source.github.io/durduc-web"
  },

  contacto: {
    // Email público de contacto. Ejemplo: "hola@durduc.com"
    email: "",
    // Enlace completo a tu perfil. Ejemplo: "https://www.instagram.com/durduc"
    instagram: "",
    // Nombre de usuario que se muestra junto al icono. Ejemplo: "@durduc"
    instagramUsuario: ""
  },

  formulario: {
    // Para recibir las consultas en tu correo sin abrir el programa de email:
    //   1) Crea una cuenta gratuita en https://formspree.io
    //   2) Crea un formulario y pega aquí su dirección (https://formspree.io/f/xxxxxx)
    // Si lo dejas vacío, el formulario abre el correo del visitante con la consulta ya escrita.
    endpoint: ""
  },

  analitica: {
    // Google Analytics 4: pega tu ID de medición (empieza por "G-"). Vacío = desactivado.
    googleAnalyticsId: ""
    // Google Search Console: se verifica con una etiqueta <meta> en index.html (busca "search console").
  },

  legal: {
    // Datos de la titular para las páginas legales
    nombreCompleto: "",
    nif: "",
    ciudad: ""
  }
};
