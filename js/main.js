/* ==========================================================================
   DURDUC · Interacción y animaciones
   ========================================================================== */
(function () {
  "use strict";
  var CFG = window.DURDUC_CONFIG || {}, PROJ = window.DURDUC_PROYECTOS || [];
  var doc = document, root = doc.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var get = function (p) { return p.split(".").reduce(function (o, k) { return o && o[k]; }, CFG); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]; }); };
  var lerp = function (a, b, n) { return a + (b - a) * n; };

  /* ---------------- Contacto y enlaces ---------------- */
  function waUrl(msg) { var n = get("contacto.whatsapp"); return n ? "https://wa.me/" + n + "?text=" + encodeURIComponent(msg || get("contacto.whatsappMensaje") || "") : ""; }
  function bindLinks(scope) {
    $$("[data-wa]", scope).forEach(function (a) {
      var u = waUrl(a.getAttribute("data-wa-text"));
      if (!u) { a.hidden = true; return; }
      a.href = u; a.target = "_blank"; a.rel = "noopener";
    });
    $$("[data-mail]", scope).forEach(function (a) { var m = get("contacto.email"); if (m) a.href = "mailto:" + m + "?subject=" + encodeURIComponent("Proyecto para DURDUC"); });
    $$("[data-ig]", scope).forEach(function (a) { var u = get("contacto.instagram"); if (u) a.href = u; else a.hidden = true; });
    $$("[data-cfg]", scope).forEach(function (el) { var v = get(el.getAttribute("data-cfg")); if (v) el.textContent = v; });
    $$("[data-need]", scope).forEach(function (el) { if (!get(el.getAttribute("data-need"))) el.hidden = true; });
    $$("[data-year]", scope).forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------- Servicios ---------------- */
  var SERVICES = [
    { en: "WEB DESIGN", t: "Páginas web y experiencia digital", img: "assets/img/proyectos/aura/web-movil.jpg",
      p: "Tu web existe, pero no vende: se ve anticuada, no se entiende o nadie sabe qué hacer al entrar.",
      s: "No hago simplemente páginas bonitas. Creo una experiencia digital que hace que tu cliente entienda quién eres, qué ofreces y por qué debería elegirte.",
      tags: ["Webs a medida", "Tiendas online", "Landing pages", "Experiencia móvil"] },
    { en: "BRANDING", t: "Branding e identidad visual", img: "assets/img/proyectos/aura/packaging.jpg",
      p: "Tu negocio es bueno, pero su imagen no lo demuestra: cada cosa va por su lado y cuesta reconocerte.",
      s: "Construyo una identidad coherente —logo, colores, tipografías, fotografía y tono— para que te reconozcan a la primera y te perciban con el valor que tienes.",
      tags: ["Identidad visual", "Paleta y tipografías", "Tono de voz", "Imagen del negocio"] },
    { en: "STRATEGY", t: "Estrategia de marketing", img: "assets/img/jeniffer/jeniffer-retrato.jpg",
      p: "Haces muchas cosas, pero sin rumbo: publicas, pruebas, inviertes… y no sabes qué funciona.",
      s: "Defino a quién te diriges, qué mensaje necesitas y dónde tienes que estar. Un plan claro y realista, con ideas para atraer clientes y diferenciarte de tu competencia.",
      tags: ["Público y mensaje", "Diferenciación", "Ideas para atraer clientes"] },
    { en: "INSTAGRAM", t: "Redes sociales e Instagram", img: "assets/img/proyectos/aura/anuncio-regalo-story.jpg",
      p: "Tienes seguidores, pero no clientes. O no sabes qué publicar para que tu perfil trabaje por ti.",
      s: "Convierto tu perfil en un escaparate: biografía, estética, destacados y una estrategia de contenido que atrae, conecta y lleva a la compra.",
      tags: ["Estrategia de Instagram", "Optimización de perfil", "Calendario de contenidos"] },
    { en: "CONTENT", t: "Creación de contenido", img: "assets/img/proyectos/aura/pieza-orquidea-fucsia.jpg",
      p: "Sabes que tienes que comunicar, pero no encuentras las palabras ni las imágenes.",
      s: "Creo textos, ideas y piezas visuales con tu voz, que cuentan lo que haces de forma que apetece leerlo, verlo y compartirlo.",
      tags: ["Textos que venden", "Ideas para Reels", "Dirección de fotografía"] },
    { en: "CAMPAIGNS", t: "Campañas y promociones", img: "assets/img/proyectos/aura/anuncio-orquidea.jpg",
      p: "Lanzas una promoción y pasa sin pena ni gloria.",
      s: "Diseño campañas con un objetivo claro —fechas clave, lanzamientos, anuncios— y todas las piezas listas para Instagram, Facebook, TikTok y Google.",
      tags: ["Publicidad en redes", "Lanzamientos", "Fechas señaladas"] },
    { en: "SALES", t: "Ofertas y estrategias de venta", img: "assets/img/proyectos/aura/web-movil-producto.jpg",
      p: "La gente pregunta, mira… y se va sin comprar.",
      s: "Diseño ofertas que apetece aceptar y el camino para que decir «sí» sea fácil: qué ofreces, cómo lo presentas y qué paso das después.",
      tags: ["Diseño de ofertas", "Embudos de venta", "Llamadas a la acción"] },
    { en: "PRESENTATION", t: "Presentación de productos y servicios", img: "assets/img/proyectos/selvimar/web-movil.jpg",
      p: "Tu catálogo es un cajón desastre y el cliente no sabe por dónde empezar.",
      s: "Ordeno y presento lo que vendes para que se entienda, se desee y se elija: categorías, fichas, fotos y textos que venden por sí solos.",
      tags: ["Catálogos y cartas", "Fichas de producto", "Optimización de la imagen"] }
  ];
  function renderServices() {
    var box = $("[data-services]"); if (!box) return;
    box.innerHTML = SERVICES.map(function (s, i) {
      var n = ("0" + (i + 1)).slice(-2), id = "svc-" + n;
      return '<div class="svc rv" data-img="' + s.img + '">' +
        '<button class="svc-head" type="button" aria-expanded="false" aria-controls="' + id + '"><span class="svc-n">' + n + '</span><span class="svc-title"><small>' + s.en + "</small><strong>" + esc(s.t) + '</strong></span><span class="svc-plus" aria-hidden="true"></span></button>' +
        '<div class="svc-body" id="' + id + '"><div><div class="svc-inner"><span class="svc-spacer"></span>' +
        '<div class="svc-col problem"><h4>El problema</h4><p>' + esc(s.p) + "</p></div>" +
        '<div class="svc-col"><h4>Lo que hago</h4><p>' + esc(s.s) + '</p><div class="svc-tags">' + s.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div></div>" +
        "</div></div></div></div>";
    }).join("");
    box.addEventListener("click", function (e) {
      var h = e.target.closest(".svc-head"); if (!h) return;
      var item = h.parentNode, open = !item.classList.contains("is-open");
      $$(".svc.is-open", box).forEach(function (x) { if (x !== item) { x.classList.remove("is-open"); $(".svc-head", x).setAttribute("aria-expanded", "false"); } });
      item.classList.toggle("is-open", open); h.setAttribute("aria-expanded", open);
    });
    // Vista previa flotante que sigue al ratón (escritorio)
    var prev = $("[data-preview]"), pimg = $("[data-preview-img]");
    if (!finePointer || !prev) return;
    var px = 0, py = 0, tx = 0, ty = 0, on = false, raf;
    box.addEventListener("mousemove", function (e) { tx = e.clientX + 30; ty = e.clientY - 150; });
    box.addEventListener("mouseover", function (e) {
      var s = e.target.closest(".svc"); if (!s) return;
      var src = s.getAttribute("data-img"); if (pimg.getAttribute("src") !== src) pimg.src = src;
      if (!on) { on = true; px = tx; py = ty; prev.classList.add("is-on"); loop(); }
    });
    box.addEventListener("mouseleave", function () { on = false; prev.classList.remove("is-on"); });
    function loop() { px = lerp(px, tx, .14); py = lerp(py, ty, .14); prev.style.transform = "translate3d(" + px + "px," + py + "px,0) " + (on ? "scale(1)" : ""); if (on) raf = requestAnimationFrame(loop); }
  }

  /* ---------------- ¿No sé qué necesito? ---------------- */
  var PAINS = [
    ["Tengo seguidores, pero no clientes", "Revisaría tu perfil y tu contenido para que cada publicación acerque a la venta: biografía, destacados y llamadas a la acción."],
    ["Mi web no me representa", "Replantearía tu web para que en cinco segundos se entienda quién eres, qué ofreces y cómo contactarte."],
    ["No sé qué publicar", "Crearíamos una línea de contenido con temas, formatos y un calendario sencillo que puedas mantener."],
    ["Mi competencia parece más profesional", "Buscaría lo que te hace diferente y lo convertiría en una imagen de marca que te coloque por delante."],
    ["Vendo bien en persona, pero no online", "Trasladaría a lo digital lo que ya convence en persona: tu trato, tu producto y la confianza que generas."],
    ["Tengo una idea y no sé por dónde empezar", "Ordenaríamos la idea: a quién va dirigida, cómo se presenta y cuál es el primer paso para lanzarla."],
    ["Mi imagen está desordenada", "Unificaría logo, colores, fotos y tono para que todo lo que publiques se reconozca como tuyo."],
    ["Quiero lanzar algo nuevo", "Prepararíamos el lanzamiento: mensaje, piezas visuales y una campaña para que se note desde el primer día."]
  ];
  function renderChips() {
    var box = $("[data-chips]"); if (!box) return;
    var list = $("[data-diag-list]"), empty = $("[data-diag-empty]"), count = $("[data-diag-count]"), send = $("[data-diag-send]");
    box.innerHTML = PAINS.map(function (p, i) { return '<button class="chip" type="button" aria-pressed="false" data-i="' + i + '">' + esc(p[0]) + "</button>"; }).join("");
    function update() {
      var sel = $$('.chip[aria-pressed="true"]', box).map(function (b) { return PAINS[+b.getAttribute("data-i")]; });
      count.textContent = sel.length;
      empty.hidden = sel.length > 0;
      list.innerHTML = sel.map(function (p) { return "<li>" + esc(p[1]) + "</li>"; }).join("");
      var msg = sel.length
        ? "Hola Jeniffer, he visto DURDUC. En mi negocio me pasa esto:\n" + sel.map(function (p) { return "• " + p[0]; }).join("\n") + "\n¿Me ayudas a ver por dónde empezar?"
        : "Hola Jeniffer, he visto DURDUC. No sé exactamente qué necesito, pero siento que mi negocio puede estar mucho mejor. ¿Hablamos?";
      var u = waUrl(msg); if (u) send.href = u;
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true"); update();
    });
    update();
  }

  /* ---------------- Proyectos ---------------- */
  function renderWork() {
    var track = $("[data-work-track]"); if (!track) return;
    var total = PROJ.length;
    track.innerHTML = PROJ.map(function (p, i) {
      return '<article class="case" data-cursor="view" style="--c-bg:' + p.colorFondo + ";--c-fg:" + p.colorTexto + ";--c-ac:" + p.acento + '">' +
        '<div class="case-visual"><div class="shot-desk"><img src="' + p.carpeta + 'web-ordenador.jpg" alt="Web de ' + esc(p.nombre) + ' en ordenador" loading="lazy" decoding="async" width="1440" height="900"></div>' +
        '<div class="shot-mob"><img src="' + p.carpeta + 'web-movil.jpg" alt="Web de ' + esc(p.nombre) + ' en móvil" loading="lazy" decoding="async" width="600" height="1298"></div></div>' +
        '<div class="case-info"><div><p class="case-n">' + ("0" + (i + 1)).slice(-2) + " / " + ("0" + total).slice(-2) + '</p><h3 class="case-name">' + esc(p.nombre) + '</h3><p class="case-sector">' + esc(p.sector) + '</p><p class="case-frase">' + esc(p.frase) + "</p></div>" +
        '<div><div class="case-tags">' + p.servicios.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + '</div><span class="case-go"><i>→</i>Ver el caso</span></div></div>' +
        '<a class="case-link" href="proyecto.html?id=' + encodeURIComponent(p.id) + '" aria-label="Ver el caso de ' + esc(p.nombre) + '"></a></article>';
    }).join("") +
      '<article class="case case--next"><div class="inner"><p class="eyebrow">Próximo proyecto</p><h3 class="h2">¿Y si el siguiente caso <em>es tu marca?</em></h3><a class="btn magnetic" data-wa data-wa-text="Hola Jeniffer, he visto tus proyectos y quiero que el próximo sea el mío." href="#">Quiero ser el próximo <i class="arrow"></i></a></div></article>';
    bindLinks(track);
    pinWork();
  }
  function pinWork() {
    var pin = $("[data-work-pin]"), track = $("[data-work-track]"), bar = $("[data-work-bar]"), counter = $("[data-work-counter]");
    var desk = matchMedia("(min-width: 901px)"), dist = 0, ticking = false;
    function size() {
      if (!desk.matches || reduce) { pin.style.height = ""; track.style.transform = ""; return; }
      dist = Math.max(0, track.scrollWidth - innerWidth);
      pin.style.height = (innerHeight + dist) + "px";
      update();
    }
    function update() {
      ticking = false;
      if (!desk.matches || reduce) return;
      var r = pin.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / (dist || 1)));
      track.style.transform = "translate3d(" + (-p * dist).toFixed(1) + "px,0,0)";
      bar.style.transform = "scaleX(" + p.toFixed(3) + ")";
      var cards = PROJ.length + 1, n = Math.min(cards, Math.floor(p * (cards - .001)) + 1);
      counter.textContent = ("0" + n).slice(-2) + " — " + ("0" + cards).slice(-2);
    }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", size);
    addEventListener("load", size);
    size();
  }

  /* ---------------- Texto que aparece ---------------- */
  function splitWords(el, cls) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = doc.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(doc.createTextNode(" ")); return; }
            var o = doc.createElement("span");
            if (cls === "ln") { o.className = "ln"; var s = doc.createElement("span"); s.textContent = w; o.style.setProperty("--l", i++); o.appendChild(s); }
            else { o.className = "w"; o.textContent = w; i++; }
            frag.appendChild(o);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
    return i;
  }

  /* ---------------- Aparición al hacer scroll ---------------- */
  function reveals() {
    $$("[data-split]").forEach(function (el) { splitWords(el, "ln"); el.classList.add("split"); });
    var els = $$(".rv, .rv-img, .split");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -10% 0px", threshold: .08 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* Frase que se ilumina palabra a palabra con el scroll */
  function litWords() {
    var el = $("[data-words]"); if (!el) return;
    splitWords(el, "w"); var words = $$(".w", el);
    if (reduce) { words.forEach(function (w) { w.classList.add("lit"); }); return; }
    var t = false;
    function upd() {
      t = false; var r = el.getBoundingClientRect(), vh = innerHeight;
      var p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (vh * .55)));
      var n = Math.round(p * words.length);
      words.forEach(function (w, i) { w.classList.toggle("lit", i < n); });
    }
    addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
  }

  /* ---------------- Parallax de imágenes ---------------- */
  function parallax() {
    var els = $$(".px"); if (reduce || !els.length) return;
    var active = new Set(), t = false;
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { e.isIntersecting ? active.add(e.target) : active.delete(e.target); }); tick(); }, { rootMargin: "15% 0px" });
    els.forEach(function (e) { io.observe(e); });
    function upd() {
      t = false; var vh = innerHeight;
      active.forEach(function (el) {
        var r = el.parentNode.getBoundingClientRect(), sp = parseFloat(el.getAttribute("data-speed")) || .08;
        var d = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = "translate3d(0," + (-d * sp * 100 - sp * 50).toFixed(2) + "%,0)";
      });
    }
    function tick() { if (!t) { t = true; requestAnimationFrame(upd); } }
    addEventListener("scroll", tick, { passive: true }); addEventListener("resize", tick);
  }

  /* ---------------- Portada: ratón, brillo y carrusel ---------------- */
  function hero() {
    var hero = $(".hero"); if (!hero) return;
    var layers = $$(".depth", hero), glow = $("[data-glow]"), mx = 0, my = 0, cx = 0, cy = 0, running = false;
    if (finePointer && !reduce) {
      hero.addEventListener("mousemove", function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; if (!running) { running = true; loop(); } });
    }
    function loop() {
      cx = lerp(cx, mx, .06); cy = lerp(cy, my, .06);
      layers.forEach(function (l) { var d = parseFloat(l.getAttribute("data-depth")) || 0; l.style.translate = (cx * d * innerWidth).toFixed(1) + "px " + (cy * d * innerHeight).toFixed(1) + "px"; });
      if (glow) glow.style.transform = "translate3d(" + (cx * 16) + "vw," + (cy * 16) + "vh,0)";
      if (Math.abs(cx - mx) > .0005 || Math.abs(cy - my) > .0005) requestAnimationFrame(loop); else running = false;
    }
    // Carrusel de retratos con barrido
    var slides = $$(".slide", hero), count = $("[data-count]", hero), idx = 0, timer;
    if (slides.length < 2) return;
    function go() {
      var cur = slides[idx]; idx = (idx + 1) % slides.length; var nx = slides[idx];
      var img = $("img", nx); if (img.loading === "lazy") img.loading = "eager";
      cur.classList.remove("is-on"); cur.classList.add("is-out"); nx.classList.add("is-on");
      setTimeout(function () { cur.classList.remove("is-out"); }, 1400);
      if (count) count.textContent = ("0" + (idx + 1)).slice(-2) + " / " + ("0" + slides.length).slice(-2);
    }
    function start() { clearInterval(timer); if (!reduce) timer = setInterval(go, 4800); }
    doc.addEventListener("visibilitychange", function () { doc.hidden ? clearInterval(timer) : start(); });
    setTimeout(function () { $$("img", hero).forEach(function (i) { i.loading = "eager"; }); }, 2500);
    setTimeout(start, root.classList.contains("loaded-before") ? 2500 : 4200);
  }

  /* ---------------- Cursor y botones magnéticos ---------------- */
  function cursor() {
    if (!finePointer || reduce) return;
    root.classList.add("has-cursor");
    var c = $(".cursor"), ring = $(".cursor-ring", c), dot = $(".cursor-dot", c), x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener("mousemove", function (e) {
      if (!c.classList.contains("is-live")) { rx = e.clientX; ry = e.clientY; c.classList.add("is-live"); }
      x = e.clientX; y = e.clientY; dot.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    }, { passive: true });
    (function loop() { rx = lerp(rx, x, .18); ry = lerp(ry, y, .18); ring.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)"; requestAnimationFrame(loop); })();
    doc.addEventListener("mouseover", function (e) {
      var v = e.target.closest("[data-cursor='view']"), l = e.target.closest("a, button");
      c.classList.toggle("is-view", !!v); c.classList.toggle("is-link", !v && !!l);
    });
    doc.addEventListener("mouseleave", function () { c.style.opacity = 0; }); doc.addEventListener("mouseenter", function () { c.style.opacity = 1; });
    $$(".magnetic").forEach(magnet);
  }
  function magnet(b) {
    if (!finePointer || reduce) return;
    b.addEventListener("mousemove", function (e) { var r = b.getBoundingClientRect(); var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); b.style.transform = "translate(" + dx * .18 + "px," + dy * .28 + "px)"; });
    b.addEventListener("mouseleave", function () { b.style.transform = ""; });
  }

  /* ---------------- Cabecera, menú y botón flotante ---------------- */
  function chrome() {
    var h = $(".header"), last = 0, t = false, float = $("[data-float]"), contact = $("#contacto");
    function upd() {
      t = false; var y = scrollY;
      if (h) { h.classList.toggle("is-solid", y > 40); h.classList.toggle("is-hidden", y > 600 && y > last && !root.classList.contains("menu-open")); }
      if (float) { var near = contact && contact.getBoundingClientRect().top < innerHeight; float.classList.toggle("show", y > innerHeight * .9 && !near && innerWidth <= 900); }
      last = y;
    }
    addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
    var burger = $(".burger");
    if (burger) burger.addEventListener("click", function () { var o = root.classList.toggle("menu-open"); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Cerrar menú" : "Abrir menú"); });
    $$(".mmenu a").forEach(function (a) { a.addEventListener("click", function () { root.classList.remove("menu-open"); if (burger) burger.setAttribute("aria-expanded", "false"); }); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") root.classList.remove("menu-open"); });
    // Enlace activo del menú
    var links = $$(".nav a"); if (!links.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id); }); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var s = $(a.getAttribute("href")); if (s) io.observe(s); });
  }

  /* ---------------- Analítica con consentimiento ---------------- */
  function analytics() {
    var id = get("analitica.googleAnalyticsId"); if (!id) return;
    var k = "durduc_consent", v = null; try { v = localStorage.getItem(k); } catch (e) {}
    function load() { var s = doc.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id); doc.head.appendChild(s); window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", id); }
    if (v === "si") return load(); if (v === "no") return;
    var b = doc.createElement("div"); b.className = "consent";
    b.innerHTML = '<p>Uso Google Analytics para saber cómo se usa la web. Solo se activa si lo aceptas. <a href="privacidad.html" style="text-decoration:underline">Más información</a></p><div style="display:flex;gap:8px"><button class="btn btn--dark" data-c="si">Aceptar</button><button class="btn btn--ghost" style="--fg:#221c19" data-c="no">Rechazar</button></div>';
    doc.body.appendChild(b);
    b.addEventListener("click", function (e) { var c = e.target.getAttribute && e.target.getAttribute("data-c"); if (!c) return; try { localStorage.setItem(k, c); } catch (x) {} b.remove(); if (c === "si") load(); });
  }

  /* ---------------- Arranque ---------------- */
  function init() {
    bindLinks(doc);
    renderServices();
    renderChips();
    renderWork();
    reveals();
    litWords();
    parallax();
    hero();
    cursor();
    chrome();
    analytics();
    var ready = function () { root.classList.add("is-ready"); };
    if (doc.fonts && doc.fonts.ready) { Promise.race([doc.fonts.ready, new Promise(function (r) { setTimeout(r, 1200); })]).then(function () { requestAnimationFrame(ready); setTimeout(ready, 60); }); }
    else setTimeout(ready, 100);
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init); else init();
  window.DURDUC = { bindLinks: bindLinks, waUrl: waUrl, splitWords: splitWords, reveals: reveals, magnet: magnet, esc: esc, get: get };
})();
