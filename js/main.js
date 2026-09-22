/* ==========================================================================
   DURDUC · FUNCIONAMIENTO
   Pinta servicios y proyectos desde data.js, animaciones, filtros,
   ventana de proyecto y formulario. Normalmente no necesitas tocarlo.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.DURDUC_CONFIG || {};
  var DATA = window.DURDUC_DATA || { servicios: [], proyectos: [] };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o && o[k] != null ? o[k] : undefined; }, CFG);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn("[DURDUC]", e); } }

  var ICONS = {
    web: '<rect x="4" y="8" width="40" height="30" rx="1.5"/><path d="M4 15h40M9 11.5h1M13 11.5h1M17 11.5h1M16 43h16M24 38v5"/>',
    landing: '<rect x="11" y="4" width="26" height="40" rx="1.5"/><path d="M16 12h16M16 17h10M16 25h16v7H16zM20 38h8"/>',
    presencia: '<circle cx="24" cy="24" r="19"/><path d="M5 24h38M24 5c6 5.5 8 12 8 19s-2 13.5-8 19c-6-5.5-8-12-8-19s2-13.5 8-19z"/>',
    estrategia: '<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="11"/><circle cx="24" cy="24" r="4"/><path d="M24 24L40 8M34 8h6v6"/>',
    branding: '<path d="M24 5l5.5 11.5L42 18l-9 8.5 2.2 12.5L24 33l-11.2 6 2.2-12.5-9-8.5 12.5-1.5z"/>',
    redes: '<rect x="7" y="7" width="34" height="34" rx="9"/><circle cx="24" cy="24" r="8"/><circle cx="34" cy="14" r="1.2"/>',
    contenido: '<path d="M10 40l3-9L33 11a4.2 4.2 0 0 1 6 6L19 37z"/><path d="M29 15l6 6M10 44h28"/>',
    consultoria: '<path d="M6 10h26v18H18l-7 6v-6H6z"/><path d="M36 18h6v16h-4v5l-6-5H22v-2"/>'
  };
  var CAT_LABEL = { web: "Web", branding: "Branding", marketing: "Marketing" };

  /* ---------- 1. Configuración (contacto, analítica, datos estructurados) ---------- */
  function applyConfig() {
    var email = get("contacto.email"), insta = get("contacto.instagram");
    var instaUser = get("contacto.instagramUsuario") || "Instagram";
    $$("[data-show-if]").forEach(function (el) { el.hidden = !get(el.getAttribute("data-show-if")); });
    if (email) {
      $$("[data-mail]").forEach(function (a) { a.href = "mailto:" + email; a.textContent = email; });
      $$("[data-mail-plain]").forEach(function (a) { a.href = "mailto:" + email; });
    }
    if (insta) {
      $$("[data-insta]").forEach(function (a) { a.href = insta; a.textContent = instaUser; });
      $$("[data-insta-plain]").forEach(function (a) { a.href = insta; });
    }
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  function injectAnalytics() {
    var id = get("analitica.googleAnalyticsId");
    if (!id) return;
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });
  }

  function injectSchema() {
    var sameAs = [get("contacto.instagram")].filter(Boolean);
    var data = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "DURDUC",
      "description": "Marca de marketing digital: diseño y creación de páginas web, landing pages, branding, estrategia de marketing y presencia digital para negocios y profesionales.",
      "url": get("marca.url"),
      "image": (get("marca.url") || "") + "/assets/img/og-image.jpg",
      "founder": { "@type": "Person", "name": get("marca.creadora") || "Jeniffer" },
      "knowsAbout": DATA.servicios.map(function (s) { return s.titulo; })
    };
    if (get("contacto.email")) data.email = get("contacto.email");
    if (sameAs.length) data.sameAs = sameAs;
    var s = document.createElement("script");
    s.type = "application/ld+json"; s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- 2. Servicios ---------- */
  function renderServices() {
    var box = $("[data-services]"); if (!box) return;
    box.innerHTML = DATA.servicios.map(function (s, i) {
      return '<article class="svc reveal" style="--d:' + ((i % 4) * 0.07).toFixed(2) + 's">' +
        '<div class="svc-top"><span class="svc-n">' + String(i + 1).padStart(2, "0") + '</span>' +
        '<span class="svc-icon" aria-hidden="true"><svg viewBox="0 0 48 48">' + (ICONS[s.icono] || ICONS.web) + '</svg></span></div>' +
        '<h3>' + esc(s.titulo) + '</h3><p>' + esc(s.texto) + '</p></article>';
    }).join("");

    var sel = $("#f-need");
    if (sel) {
      DATA.servicios.forEach(function (s) { var o = document.createElement("option"); o.textContent = s.titulo; sel.appendChild(o); });
      ["Quiero mejorar mi negocio", "Aún no lo sé, necesito orientación"].forEach(function (t) {
        var o = document.createElement("option"); o.textContent = t; sel.appendChild(o);
      });
    }
  }

  /* ---------- 3. Proyectos, filtros y ventana ---------- */
  function renderProjects() {
    var box = $("[data-projects]"); if (!box) return;
    var html = DATA.proyectos.map(function (p) {
      var tags = (p.categorias || []).map(function (c) { return "<span>" + esc(CAT_LABEL[c] || c) + "</span>"; }).join("");
      return '<button type="button" class="project reveal' + (p.destacado ? " project--featured" : "") + '" data-id="' + esc(p.id) + '" data-cats="' + esc((p.categorias || []).join(" ")) + '" aria-haspopup="dialog">' +
        '<div class="project-media"><div class="project-shot"><img src="' + esc(p.imagen) + '" alt="Web de ' + esc(p.nombre) + '" width="1440" height="900" loading="lazy" decoding="async"></div>' +
        '<span class="project-view">Ver<br>proyecto</span></div>' +
        '<div class="project-info"><div><h3>' + esc(p.nombre) + '</h3><p>' + esc(p.resumen) + '</p></div><div class="project-tags">' + tags + '</div></div>' +
        '</button>';
    }).join("");
    html += '<article class="project project-next reveal" data-cats="web branding marketing">' +
      '<p class="eyebrow">Próximo proyecto</p><h3>Tu negocio podría ser <em>el siguiente.</em></h3>' +
      '<p>Cada proyecto de este portfolio empezó con una conversación. ¿Empezamos la tuya?</p>' +
      '<a class="btn btn--light" href="#contacto">Trabajemos juntos <i class="arr" aria-hidden="true"></i></a></article>';
    html += '<p class="work-empty" hidden>Los primeros proyectos de esta categoría están en camino. ¿Quieres que el tuyo sea uno de ellos?</p>';
    box.innerHTML = html;

    $$(".filters button").forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filter");
        $$(".filters button").forEach(function (x) { var on = x === b; x.classList.toggle("is-active", on); x.setAttribute("aria-pressed", on); });
        var shown = 0;
        $$(".project[data-id]", box).forEach(function (card) {
          var match = f === "todos" || (" " + card.getAttribute("data-cats") + " ").indexOf(" " + f + " ") > -1;
          card.classList.toggle("is-hidden", !match);
          if (match) { shown++; card.classList.add("is-in"); }
        });
        $(".work-empty", box).hidden = shown > 0;
      });
    });

    var modal = $("#project-modal");
    wireDialog(modal);
    $$(".project[data-id]", box).forEach(function (card) {
      card.addEventListener("click", function () {
        var p = DATA.proyectos.filter(function (x) { return x.id === card.getAttribute("data-id"); })[0];
        if (!p) return;
        $("#pm-sector").textContent = p.sector || "";
        $("#pm-title").textContent = p.nombre;
        $("#pm-desc").textContent = p.descripcion || p.resumen || "";
        $("#pm-work").innerHTML = (p.trabajo || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
        var im = $("#pm-img"); im.src = p.imagen; im.alt = "Captura de la web de " + p.nombre + " en ordenador";
        var imm = $("#pm-img-m"); imm.parentNode.hidden = !p.imagenMovil;
        if (p.imagenMovil) { imm.src = p.imagenMovil; imm.alt = "Captura de la web de " + p.nombre + " en móvil"; }
        var link = $("#pm-link"); link.hidden = !p.enlace; if (p.enlace) link.href = p.enlace;
        $("#pm-want").setAttribute("data-need", DATA.servicios[0] ? DATA.servicios[0].titulo : "");
        openDialog(modal);
      });
    });
    $("#pm-want").addEventListener("click", function (e) {
      e.preventDefault();
      closeDialog(modal);
      document.documentElement.style.overflow = "";
      setTimeout(function () { $("#contacto").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }, 60);
    });
  }

  var lastFocus = null;
  function openDialog(d) {
    lastFocus = document.activeElement;
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    document.documentElement.style.overflow = "hidden";
  }
  function closeDialog(d) {
    if (typeof d.close === "function") d.close(); else d.removeAttribute("open");
  }
  function wireDialog(d) {
    if (!d) return;
    $$("[data-close]", d).forEach(function (b) { b.addEventListener("click", function () { closeDialog(d); }); });
    d.addEventListener("click", function (e) { if (e.target === d) closeDialog(d); });
    d.addEventListener("close", function () { document.documentElement.style.overflow = ""; if (lastFocus) lastFocus.focus({ preventScroll: true }); });
  }

  /* ---------- 4. Cabecera y menú ---------- */
  function initHeader() {
    var header = $(".header"), burger = $(".burger");
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 30); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    function setMenu(open) {
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    }
    burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("nav-open")); });
    $$(".nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

    if (!("IntersectionObserver" in window)) return;
    var links = {};
    $$('.nav a:not(.btn)').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$(".nav a").forEach(function (a) { a.classList.remove("is-active"); });
        if (links[en.target.id]) links[en.target.id].classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { io.observe(s); });
  }

  /* ---------- 5. Animaciones ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  function initCounters() {
    var map = { projects: DATA.proyectos.length, services: DATA.servicios.length };
    var els = $$("[data-count], [data-count-to]");
    els.forEach(function (el) {
      var to = el.hasAttribute("data-count") ? map[el.getAttribute("data-count")] : +el.getAttribute("data-count-to");
      el.setAttribute("data-final", to);
      el.textContent = reduce ? pad(to) : "00";
    });
    function pad(n) { return String(n).padStart(2, "0"); }
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.textContent = pad(el.getAttribute("data-final")); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, to = +el.getAttribute("data-final"), t0 = null;
        (function step(t) {
          if (!t0) t0 = t;
          var k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
          el.textContent = pad(Math.round(to * e));
          if (k < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initTimeline() {
    var tl = $("[data-timeline]"); if (!tl) return;
    var steps = $$(".step", tl);
    var tick = function () {
      var r = tl.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height + vh * 0.25)));
      tl.style.setProperty("--progress", p.toFixed(3));
      steps.forEach(function (s, i) { s.classList.toggle("is-lit", p >= (i + 0.5) / steps.length); });
    };
    tick(); window.addEventListener("scroll", tick, { passive: true }); window.addEventListener("resize", tick);
  }

  function initTilt() {
    var el = $("[data-tilt]"); if (!el || reduce || !window.matchMedia("(hover: hover)").matches) return;
    var portrait = $(".portrait", el);
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      portrait.style.transform = "perspective(900px) rotateY(" + (x * 6).toFixed(2) + "deg) rotateX(" + (-y * 6).toFixed(2) + "deg)";
    });
    el.addEventListener("mouseleave", function () { portrait.style.transform = ""; });
  }

  /* ---------- 6. Formulario ---------- */
  function initForm() {
    var form = $("#contact-form"); if (!form) return;
    var msg = $("#form-msg"), btn = $("button[type=submit]", form);

    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("[data-need]"); if (!a) return;
      var v = a.getAttribute("data-need"), sel = $("#f-need");
      if (v && sel) $$("option", sel).forEach(function (o) { if (o.textContent === v) sel.value = o.textContent; });
    });

    function show(text, isErr) { msg.textContent = text; msg.hidden = false; msg.classList.toggle("is-error", !!isErr); }
    function validate() {
      var ok = true;
      $$(".field", form).forEach(function (f) { f.classList.remove("has-error"); });
      [["#f-nombre", function (v) { return v.length > 1; }], ["#f-email", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }], ["#f-need", function (v) { return !!v; }]].forEach(function (r) {
        var el = $(r[0], form); if (!r[1](el.value.trim())) { el.closest(".field").classList.add("has-error"); ok = false; }
      });
      var priv = $("#f-priv"); priv.closest(".consent").classList.toggle("has-error", !priv.checked); if (!priv.checked) ok = false;
      return ok;
    }
    var LABELS = { nombre: "Nombre", empresa: "Empresa / proyecto", email: "Email", telefono: "Teléfono", necesidad: "¿Qué necesita?", presupuesto: "Presupuesto aproximado", mensaje: "Mensaje" };
    function collect() {
      var d = {}; Object.keys(LABELS).forEach(function (k) { var el = form.elements[k]; if (el) d[k] = el.value.trim(); }); return d;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault(); msg.hidden = true;
      if (form.elements._gotcha.value) return;
      if (!validate()) { show("Revisa los campos marcados para poder enviar tu consulta.", true); return; }
      var data = collect(), endpoint = get("formulario.endpoint"), email = get("contacto.email");
      if (endpoint) {
        btn.disabled = true;
        fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); show("¡Gracias! He recibido tu consulta y te responderé muy pronto.", false); })
          .catch(function () { show("No se ha podido enviar. Inténtalo de nuevo en unos minutos.", true); })
          .then(function () { btn.disabled = false; });
        return;
      }
      if (email) {
        var body = Object.keys(LABELS).filter(function (k) { return data[k]; }).map(function (k) { return LABELS[k] + ": " + data[k]; }).join("\n");
        window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent("Consulta desde la web de DURDUC") + "&body=" + encodeURIComponent(body);
        show("Se ha abierto tu correo con la consulta preparada. Solo tienes que enviarla.", false);
        return;
      }
      show("El formulario aún no está conectado. Mientras tanto, escríbeme por Instagram o por email.", true);
    });
  }

  /* ---------- Arranque ---------- */
  safe(applyConfig);
  safe(renderServices);
  safe(renderProjects);
  safe(initHeader);
  safe(initReveal);
  safe(initCounters);
  safe(initTimeline);
  safe(initTilt);
  safe(initForm);
  safe(injectSchema);
  safe(injectAnalytics);
})();
