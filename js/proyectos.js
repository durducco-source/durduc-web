/* ==========================================================================
   DURDUC · PROYECTOS DEL PORTFOLIO
   --------------------------------------------------------------------------
   AÑADIR UN PROYECTO NUEVO
   1. Crea la carpeta assets/img/proyectos/<id>/ con sus imágenes:
      web-ordenador.jpg (1440×900) y web-movil.jpg (≈600×1300) + fotos del proyecto.
   2. Copia un bloque { ... } de "proyectos", pégalo debajo y cambia sus datos.
   3. Su página de caso se genera sola en proyecto.html?id=<id>
   ========================================================================== */

window.DURDUC_PROYECTOS = [
  {
    id: "aura-flowers",
    nombre: "Aura Flowers",
    sector: "Joyería artesanal con flores naturales",
    lugar: "Lloret de Mar",
    anio: "2026",
    servicios: ["Web y tienda online", "Dirección de arte", "Experiencia móvil", "Campañas y contenido"],
    frase: "Joyería con flores reales que por fin se ve como alta joyería.",
    url: "https://durducco-source.github.io/aura-flowers-web/",
    carpeta: "assets/img/proyectos/aura/",
    colorFondo: "#f8f4ed",
    colorTexto: "#241d1a",
    acento: "#a8823a",
    reto: "Amanda crea joyas únicas con orquídeas y flores naturales. Tenía talento, producto e historia, pero su web no transmitía el valor de cada pieza, no estaba preparada para vender y no aguantaba el tráfico que llega desde Instagram.",
    concepto: "Tratar cada pieza como alta joyería. Una estética editorial —marfil, oro y fotografía protagonista— y una web que se siente como abrir un estuche: vídeo a pantalla completa, la historia de Amanda contada en capítulos y una colección que también funciona como portfolio de piezas únicas.",
    objetivo: "Que quien llega desde un anuncio entienda en segundos que cada joya es irrepetible, se enamore de la historia y quiera encargar la suya.",
    hice: [
      "Dirección de arte e identidad digital a partir de su logotipo",
      "Portada con vídeo a pantalla completa, música y transiciones de entrada",
      "Historia de marca en cinco capítulos con sus fotografías de infancia",
      "Tienda sin precios con carrito, checkout y piezas únicas que pasan a «vendidas»",
      "Web preparada para campañas: píxeles, UTM y kit de anuncios con diseños y Reels",
      "Fotografía y vídeo optimizados para cargar rápido en el móvil"
    ],
    resultado: "Una marca que se presenta como lo que es: joyería de autor. Cada pieza tiene fotografía protagonista y su propia ficha, la historia de Amanda da sentido a todo lo que crea y la web está lista para convertir visitas de Instagram y TikTok en encargos.",
    paleta: [["Marfil", "#f8f4ed"], ["Oro", "#a8823a"], ["Tinta", "#241d1a"], ["Orquídea", "#7c4b7a"], ["Rubor", "#f1e2e0"]],
    tipografias: [["Cormorant Garamond", "Títulos"], ["Jost", "Textos"]],
    video: "https://durducco-source.github.io/aura-flowers-web/assets/video/aura-hero-720.mp4",
    galeria: [
      ["pieza-orquidea-fucsia.jpg", "Colgante de orquídea fucsia"],
      ["web-movil-producto.jpg", "Ficha de producto en móvil", "movil"],
      ["pieza-orquidea-burdeos.jpg", "Collar de orquídea burdeos"],
      ["anuncio-orquidea.jpg", "Diseño de anuncio para Instagram"],
      ["packaging.jpg", "Presentación y packaging"],
      ["anuncio-regalo-story.jpg", "Anuncio vertical para Stories y Reels"],
      ["pieza-narciso.jpg", "Colgante de narciso y libélula"]
    ]
  },
  {
    id: "selvimar",
    nombre: "Selvimar",
    sector: "Limpieza profesional para hoteles y empresas",
    lugar: "Lloret de Mar · Costa Brava",
    anio: "2026",
    servicios: ["Diseño web", "Posicionamiento del mensaje", "Textos y SEO", "Captación de clientes"],
    frase: "Una empresa de limpieza con la imagen de los hoteles que cuida.",
    url: "https://durducco-source.github.io/selvimar-web/",
    carpeta: "assets/img/proyectos/selvimar/",
    colorFondo: "#0e1a33",
    colorTexto: "#f5f1e9",
    acento: "#9db3da",
    reto: "Selvimar trabaja para hoteles, apartamentos turísticos, oficinas y grandes espacios, pero su imagen la confundía con una limpieza doméstica más. Necesitaba que los negocios la vieran como un proveedor profesional a su altura.",
    concepto: "Llevar a una empresa de limpieza la estética de la hostelería de lujo que atiende: fotografía luminosa, tipografía elegante y un mensaje que resume su forma de trabajar — «La excelencia se nota en cada detalle».",
    objetivo: "Que un director de hotel o una empresa entienda en un vistazo qué servicios ofrece Selvimar, confíe en ella y pida presupuesto sin esfuerzo.",
    hice: [
      "Diseño y desarrollo completo de la web",
      "Reposicionamiento del mensaje hacia hoteles y empresas",
      "Estructura de servicios con textos pensados para el posicionamiento en Google",
      "Formulario de presupuesto y contacto directo por WhatsApp",
      "Selección y tratamiento de fotografía de estilo premium"
    ],
    resultado: "Una imagen a la altura de los negocios que atiende. Cada servicio está explicado para su público, la marca transmite confianza desde la primera pantalla y el camino hasta pedir presupuesto es claro y directo.",
    paleta: [["Azul noche", "#0e1a33"], ["Azul", "#2d4d86"], ["Azul suave", "#9db3da"], ["Crema", "#f5f1e9"], ["Negro", "#0a0b0f"]],
    tipografias: [["Cormorant Garamond", "Títulos"], ["Jost", "Textos"]],
    galeria: [
      ["hero.jpg", "Fotografía principal de la marca", "ancha"],
      ["web-movil.jpg", "La web en el móvil", "movil"],
      ["hoteles.jpg", "Servicio para hoteles"],
      ["restaurante.jpg", "Restauración"],
      ["apartamento.jpg", "Apartamentos turísticos"],
      ["equipo.jpg", "Sobre la empresa"]
    ]
  }
];
