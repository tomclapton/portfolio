(function () {
  "use strict";

  var grid = document.querySelector(".masonry");
  if (!grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll(".masonry-item"));

  var lightbox = document.getElementById("lightbox");
  var stage = lightbox ? lightbox.querySelector(".lightbox-stage") : null;
  var imgWrap = lightbox ? lightbox.querySelector(".lightbox-img-wrap") : null;
  var btnClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  var btnPrev = lightbox ? lightbox.querySelector(".lightbox-prev") : null;
  var btnNext = lightbox ? lightbox.querySelector(".lightbox-next") : null;

  var openIndex = -1;
  var lastFocused = null;

  function open(index) {
    if (!lightbox) return;
    var item = items[index];
    if (!item) return;
    openIndex = index;

    var tpl = item.querySelector(".lightbox-source");
    imgWrap.innerHTML = "";
    if (tpl) imgWrap.appendChild(tpl.content.cloneNode(true));

    lastFocused = document.activeElement;
    lightbox.classList.add("is-open");
    lightbox.removeAttribute("hidden");
    document.body.classList.add("lightbox-locked");
    btnClose.focus();

    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-locked");
    document.removeEventListener("keydown", onKeydown);
    window.setTimeout(function () {
      if (!lightbox.classList.contains("is-open")) {
        lightbox.setAttribute("hidden", "");
        imgWrap.innerHTML = "";
      }
    }, 300);
    if (lastFocused) lastFocused.focus();
  }

  function step(delta) {
    if (!items.length) return;
    open((openIndex + delta + items.length) % items.length);
  }

  function onKeydown(e) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "Tab") trapFocus(e);
  }

  function trapFocus(e) {
    var focusable = lightbox.querySelectorAll("button");
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest(".gallery-item-btn");
    if (!btn) return;
    var item = btn.closest(".masonry-item");
    var idx = items.indexOf(item);
    if (idx > -1) open(idx);
  });

  if (btnClose) btnClose.addEventListener("click", close);
  if (btnPrev) btnPrev.addEventListener("click", function () { step(-1); });
  if (btnNext) btnNext.addEventListener("click", function () { step(1); });

  if (stage) {
    stage.addEventListener("click", function (e) {
      if (e.target === stage) close();
    });
  }

  var touchStartX = null;
  if (lightbox) {
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) step(dx > 0 ? -1 : 1);
      touchStartX = null;
    }, { passive: true });
  }
})();
