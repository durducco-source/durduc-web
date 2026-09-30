# DURDUC

Web de **DURDUC**, la marca de **Jeniffer Durduc**: marketing, creatividad y estrategia.
Página estática (HTML, CSS y JavaScript sin dependencias), publicada con GitHub Pages desde la rama `main`.

**Web:** https://durducco-source.github.io/durduc-web/

## Estructura

| Página | Qué es |
|---|---|
| `index.html` | Portada con retratos animados, quién soy, servicios (problema → solución), «¿no sé qué necesito?» con diagnóstico interactivo, proyectos con scroll horizontal, por qué yo, proceso y contacto |
| `proyecto.html?id=…` | Caso de cada proyecto: reto, objetivo, idea, qué hice, diseño (paleta y tipografías), galería y resultado |
| `aviso-legal.html`, `privacidad.html` | Páginas legales (se rellenan con `js/config.js`) |

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| WhatsApp, email, Instagram, Google Analytics, datos legales | `js/config.js` |
| **Añadir un proyecto** al portfolio | `js/proyectos.js` + imágenes en `assets/img/proyectos/<id>/` |
| Servicios y opciones del diagnóstico | `js/main.js` (listas `SERVICES` y `PAINS`) |
| Textos de las secciones | `index.html` |
| Colores y tipografías | `css/durduc.css` (variables al principio) |
| Fotos de Jeniffer | `assets/img/jeniffer/` |

## Añadir un proyecto

1. Crea `assets/img/proyectos/<id>/` con `web-ordenador.jpg` (1440×900), `web-movil.jpg` (≈600×1300) y las fotos del proyecto.
2. En `js/proyectos.js`, copia un bloque `{ … }`, pégalo debajo y cambia sus datos.
3. Aparece solo en la portada (scroll horizontal) y tiene su propia página en `proyecto.html?id=<id>`. Añádela también a `sitemap.xml`.

## Pendiente de completar

- Datos legales (nombre completo, NIF y ciudad) en `js/config.js` → `legal`.
- ID de Google Analytics si quieres medir visitas (se pide consentimiento automáticamente).
