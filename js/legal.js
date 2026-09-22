/* DURDUC · Rellena los datos de las páginas legales desde config.js */
(function () {
  var CFG = window.DURDUC_CONFIG || {}, L = CFG.legal || {}, C = CFG.contacto || {};
  document.querySelectorAll("[data-legal]").forEach(function (el) {
    var v = L[el.getAttribute("data-legal")];
    if (v) { el.textContent = v; el.classList.remove("pending"); }
  });
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    if (C.email) { el.textContent = C.email; el.classList.remove("pending"); }
  });
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
