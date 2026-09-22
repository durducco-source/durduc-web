# DURDUC

Web de la marca personal DURDUC: marketing digital, diseño web y presencia digital.
Página estática (HTML, CSS y JavaScript sin dependencias), publicada con GitHub Pages.

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Email, Instagram, formulario, Google Analytics, datos legales | `js/config.js` |
| Añadir o editar **proyectos** del portfolio y **servicios** | `js/data.js` |
| Textos de las secciones (sobre mí, proceso, valores…) | `index.html` |
| Colores, tipografías y diseño | `css/styles.css` (variables al principio) |
| Verificación de Google Search Console | etiqueta `<meta>` comentada en `index.html` |

## Añadir un proyecto

1. Guarda dos capturas en `assets/img/proyectos/`: una de ordenador (1440×900) y otra de móvil (390×844).
2. En `js/data.js`, copia uno de los bloques de `proyectos`, pégalo debajo y cambia sus datos.
3. `categorias` admite `"web"`, `"branding"` y `"marketing"` (se usan en los filtros).
