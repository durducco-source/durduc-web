/* DURDUC · Rellena las páginas legales con los datos de config.js */
(function () {
  var CFG = window.DURDUC_CONFIG || {}, L = CFG.legal || {}, C = CFG.contacto || {};
  document.querySelectorAll("[data-legal]").forEach(function (el) {
    var v = L[el.getAttribute("data-legal")];
    if (v) el.textContent = v; else { el.textContent = "pendiente de completar"; el.className = "pending"; }
  });
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = el.getAttribute("data-cfg").split(".").reduce(function (o, k) { return o && o[k]; }, CFG);
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-mail]").forEach(function (a) { if (C.email) a.href = "mailto:" + C.email; });
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
