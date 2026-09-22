/* ==========================================================================
   DURDUC · CONTENIDO AMPLIABLE
   --------------------------------------------------------------------------
   Para AÑADIR un proyecto: copia un bloque { ... } de "proyectos", pégalo
   debajo (separado por una coma) y cambia sus datos. Las capturas van en
   assets/img/proyectos/ (una de ordenador 1440x900 y otra de móvil 390x844).
   Categorías disponibles para los filtros: "web", "branding", "marketing".

   Para AÑADIR un servicio: copia un bloque de "servicios" y cambia sus textos.
   Iconos disponibles: web, landing, presencia, estrategia, branding, redes,
   contenido, consultoria.
   ========================================================================== */

window.DURDUC_DATA = {

  servicios: [
    {
      icono: "web",
      titulo: "Diseño y creación de páginas web",
      texto: "Webs a medida, rápidas y adaptadas a móvil, pensadas para que tu negocio se entienda en segundos y el visitante sepa cómo contactarte."
    },
    {
      icono: "landing",
      titulo: "Diseño de landing pages",
      texto: "Páginas con un único objetivo: presentar una oferta, un servicio o un lanzamiento y convertir visitas en contactos."
    },
    {
      icono: "presencia",
      titulo: "Presencia digital para negocios",
      texto: "Ordenamos cómo aparece tu negocio en internet (web, redes y ficha de Google) para que transmita una imagen coherente y profesional."
    },
    {
      icono: "estrategia",
      titulo: "Estrategia de marketing",
      texto: "Definimos a quién te diriges, qué mensaje necesitas y en qué canales tiene sentido estar, con un plan claro y realista."
    },
    {
      icono: "branding",
      titulo: "Branding e identidad visual",
      texto: "Colores, tipografías, tono y estilo visual para que tu marca sea reconocible y tenga una personalidad propia."
    },
    {
      icono: "redes",
      titulo: "Optimización de redes sociales",
      texto: "Perfiles cuidados y coherentes, con biografía, imagen, destacados y enlaces pensados para que quien te descubra quiera saber más."
    },
    {
      icono: "contenido",
      titulo: "Creación de contenido",
      texto: "Textos e ideas de contenido para web y redes que cuentan lo que haces con claridad y con tu propia voz."
    },
    {
      icono: "consultoria",
      titulo: "Consultoría inicial para negocios",
      texto: "Una primera conversación para entender tu negocio, detectar qué se puede mejorar y proponerte por dónde empezar."
    }
  ],

  proyectos: [
    {
      id: "selvimar",
      nombre: "Selvimar",
      sector: "Servicios de limpieza profesional",
      categorias: ["web", "marketing"],
      destacado: true,
      imagen: "assets/img/proyectos/selvimar-web-full.jpg",
      imagenMovil: "assets/img/proyectos/selvimar-web-movil.jpg",
      enlace: "https://durducco-source.github.io/selvimar-web/",
      resumen: "Web corporativa para una empresa de limpieza profesional de Lloret de Mar, orientada a hoteles, empresas y grandes espacios.",
      descripcion: "El reto era presentar a Selvimar como una empresa especializada en negocios y establecimientos, no como una limpieza doméstica. Reorientamos todo el contenido hacia sus servicios profesionales y elevamos la imagen con fotografía luminosa y de estilo premium.",
      trabajo: ["Diseño y desarrollo de la web", "Reposicionamiento del mensaje hacia empresas", "Textos y estructura SEO por servicio", "Formulario de presupuesto y contacto por WhatsApp", "Selección de fotografía de estilo premium"]
    }
  ]
};
