/* cli-MATE UI behaviors (kept separate from reveal.js):
   1) transparent → solid header via a top sentinel
   2) scroll-pinned step → cross-fade the sticky media (optional polish)
   3) image fallback: a failed photo reveals the on-brand green tile beneath it
   All guarded for reduced-motion / missing IntersectionObserver. */
(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ---- 1) Header transparent → solid ---- */
  var header = document.querySelector(".topbar");
  var sentinel = document.getElementById("nav-sentinel");
  if (header && sentinel && hasIO) {
    new IntersectionObserver(
      function (entries) {
        header.classList.toggle("is-stuck", !entries[0].isIntersecting);
      },
      { threshold: 0 }
    ).observe(sentinel);
  } else if (header) {
    // No IO — just solidify the header so text stays legible.
    header.classList.add("is-stuck");
  }

  /* ---- 2) Cross-fade sticky how-it-works media per active step ---- */
  var steps = document.querySelectorAll("[data-step]");
  var media = document.querySelectorAll("[data-step-media]");
  if (steps.length && media.length && hasIO && !prefersReduced) {
    var stack = document.querySelector(".how-media-stack");
    if (stack) stack.classList.add("is-driven");
    var stepIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var idx = entry.target.getAttribute("data-step");
          media.forEach(function (m) {
            m.classList.toggle(
              "is-active",
              m.getAttribute("data-step-media") === idx
            );
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    steps.forEach(function (s) {
      stepIO.observe(s);
    });
  }

  /* ---- 3) Image fallback (failed photo → green tile) ---- */
  var imgs = document.querySelectorAll("img[data-fallback]");
  imgs.forEach(function (img) {
    function fail() {
      var tile = img.closest(".photo-tile, .lb-avatar, .hero__photo");
      if (tile) tile.classList.add("is-broken");
      img.style.display = "none";
    }
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  });
})();
