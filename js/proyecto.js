/* DURDUC · Página de caso de proyecto (proyecto.html?id=...) */
(function () {
  "use strict";
  var PROJ = window.DURDUC_PROYECTOS || [], main = document.querySelector("[data-case]");
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]; }); };
  var id = new URLSearchParams(location.search).get("id"), i = -1;
  PROJ.forEach(function (p, k) { if (p.id === id) i = k; });
  if (i < 0) {
    main.innerHTML = '<section class="cs-hero" style="padding-bottom:120px"><div class="wrap"><a class="cs-back" href="index.html#proyectos">← Todos los proyectos</a><h1 class="cs-title">Proyecto no encontrado</h1><p class="lead" style="margin:30px 0">Puede que el enlace haya cambiado.</p><a class="btn" href="index.html#proyectos">Ver proyectos <i class="arrow"></i></a></div></section>';
    return;
  }
  var p = PROJ[i], next = PROJ[(i + 1) % PROJ.length], c = p.carpeta;
  document.title = p.nombre + " · Caso de proyecto · DURDUC";
  var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", p.nombre + " — " + p.frase + " Proyecto de DURDUC · Jeniffer Durduc.");
  var og = document.querySelector('meta[property="og:title"]'); if (og) og.setAttribute("content", p.nombre + " · Caso de proyecto DURDUC");
  var host = p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  var style = "--c-bg:" + p.colorFondo + ";--c-fg:" + p.colorTexto + ";--c-ac:" + p.acento;

  var gallery = (p.video ? '<figure class="rv"><video src="' + esc(p.video) + '" poster="' + c + 'video-portada.jpg" muted loop playsinline autoplay preload="metadata" aria-label="Vídeo de portada de ' + esc(p.nombre) + '"></video><figcaption>Vídeo de portada</figcaption></figure>' : "") +
    p.galeria.map(function (g, k) {
      return '<figure class="rv ' + (g[2] || "") + '" style="--d:' + (k % 3) * .08 + 's"><img src="' + c + esc(g[0]) + '" alt="' + esc(g[1]) + '" loading="lazy" decoding="async"><figcaption>' + esc(g[1]) + "</figcaption></figure>";
    }).join("");

  main.setAttribute("style", style);
  main.innerHTML =
    '<section class="cs-hero"><div class="wrap">' +
      '<a class="cs-back" href="index.html#proyectos">← Todos los proyectos</a>' +
      '<p class="eyebrow rv"><b>' + ("0" + (i + 1)).slice(-2) + "</b> " + esc(p.sector) + "</p>" +
      '<h1 class="cs-title" data-split>' + esc(p.nombre) + "</h1>" +
      '<div class="cs-meta rv">' +
        "<div><small>Sector</small><span>" + esc(p.sector) + "</span></div>" +
        "<div><small>Dónde</small><span>" + esc(p.lugar) + "</span></div>" +
        "<div><small>Qué hice</small><span>" + p.servicios.map(esc).join(" · ") + "</span></div>" +
        '<div><small>Web</small><span><a class="link" style="font-size:11px" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(host.split("/")[0]) + " ↗</a></span></div>" +
      "</div>" +
      '<div class="cs-cover rv-img" style="' + style + '"><div class="shot-desk px" data-speed="0.04"><img src="' + c + 'web-ordenador.jpg" alt="Web de ' + esc(p.nombre) + ' en ordenador" width="1440" height="900"></div></div>' +
    "</div></section>" +
    '<section class="section--paper on-light"><div class="wrap">' +
      '<div class="cs-block"><div><span class="num">01</span><h2>El reto</h2></div><p>' + esc(p.reto) + "</p></div>" +
      '<div class="cs-block"><div><span class="num">02</span><h2>Qué quería conseguir</h2></div><p class="big rv">' + esc(p.objetivo) + "</p></div>" +
      '<div class="cs-block"><div><span class="num">03</span><h2>La idea</h2></div><p>' + esc(p.concepto) + "</p></div>" +
      '<div class="cs-block"><div><span class="num">04</span><h2>Qué hice</h2></div><ol class="cs-list">' + p.hice.map(function (h, k) { return '<li class="rv" style="--d:' + k * .05 + 's"><b>' + ("0" + (k + 1)).slice(-2) + "</b>" + esc(h) + "</li>"; }).join("") + "</ol></div>" +
      '<div class="cs-block"><div><span class="num">05</span><h2>Diseño</h2></div><div>' +
        '<div class="swatches">' + p.paleta.map(function (s) { var dark = /^#(0|1|2)/i.test(s[1]) || s[1].toLowerCase() === "#7c4b7a" || s[1].toLowerCase() === "#a8823a" || s[1].toLowerCase() === "#2d4d86"; return '<div class="swatch rv" style="background:' + s[1] + ";color:" + (dark ? "#f5f1e9" : "#221c19") + '"><b>' + esc(s[0]) + "</b>" + esc(s[1]) + "</div>"; }).join("") + "</div>" +
        '<div class="types">' + p.tipografias.map(function (t) { return '<div class="type rv"><big style="font-family:\'' + esc(t[0]) + '\',serif">Aa</big><small>' + esc(t[0]) + " · " + esc(t[1]) + "</small></div>"; }).join("") + "</div>" +
      "</div></div>" +
      '<div class="cs-gallery" style="' + style + '">' + gallery + "</div>" +
    "</div></section>" +
    '<section class="cs-result"><div class="wrap"><p class="eyebrow rv">Resultado</p><p class="rv">' + esc(p.resultado) + '</p><div class="actions rv">' +
      '<a class="btn magnetic" href="' + esc(p.url) + '" target="_blank" rel="noopener">Visitar la web <i class="arrow"></i></a>' +
      '<a class="btn btn--ghost magnetic" data-wa data-wa-text="Hola Jeniffer, he visto el proyecto de ' + esc(p.nombre) + ' y me gustaría algo así para mi negocio." href="#">Quiero algo así</a>' +
    "</div></div></section>" +
    (PROJ.length > 1 ? '<a class="cs-next" href="proyecto.html?id=' + encodeURIComponent(next.id) + '" data-cursor="view"><small>Siguiente proyecto</small><strong>' + esc(next.nombre) + "</strong></a>" : "");

  // Las fuentes de las tipografías del proyecto (para la muestra)
  var fams = p.tipografias.map(function (t) { return "family=" + t[0].replace(/ /g, "+"); }).join("&");
  var l = document.createElement("link"); l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?" + fams + "&display=swap"; document.head.appendChild(l);
})();
