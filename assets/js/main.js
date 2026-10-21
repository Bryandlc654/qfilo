/* ==========================================================================
   Q'filo — interactions
   Vanilla JS. No dependencies. Respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Editable configuration
     Replace these values with real business data when available.
     ---------------------------------------------------------------------- */
  var CONFIG = {
    // Full WhatsApp deep link, e.g. "https://wa.me/51999999999".
    // Leave empty and the button gracefully falls back to the contact section.
    whatsapp: "",
    // URL that receives the newsletter form (POST, field "email"), e.g. a
    // Mailchimp / Brevo / Formspree endpoint. Empty = form shows a "coming soon" note.
    newsletter: ""
  };

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var onReady = function (fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  };

  onReady(function () {
    /* --------------------------------------------------------------------
       Config-driven links & dynamic content
       -------------------------------------------------------------------- */
    var waLinks = document.querySelectorAll("[data-whatsapp]");
    waLinks.forEach(function (wa) {
      if (CONFIG.whatsapp) {
        wa.setAttribute("href", CONFIG.whatsapp);
        wa.setAttribute("target", "_blank");
        wa.setAttribute("rel", "noopener");
      } else {
        wa.setAttribute("href", "#contacto");
        wa.removeAttribute("target");
        wa.removeAttribute("rel");
      }
    });

    document.querySelectorAll("[data-field]").forEach(function (el) {
      var key = el.getAttribute("data-field");
      var value = CONFIG[key];
      if (value && String(value).trim()) el.textContent = value;
    });

    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    /* --------------------------------------------------------------------
       Header: transparent over hero, solid once scrolled
       -------------------------------------------------------------------- */
    var header = document.querySelector("[data-header]");
    if (header) {
      var setHeaderState = function () {
        if (window.scrollY > 40) header.classList.add("is-stuck");
        else header.classList.remove("is-stuck");
      };
      setHeaderState();
      window.addEventListener("scroll", setHeaderState, { passive: true });
    }

    /* --------------------------------------------------------------------
       Mobile navigation
       -------------------------------------------------------------------- */
    var menu = document.getElementById("mobile-menu");
    var openBtn = document.getElementById("menu-toggle");
    var closeBtn = document.getElementById("menu-close");
    var lastFocused = null;

    var openMenu = function () {
      if (!menu) return;
      lastFocused = document.activeElement;
      menu.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      if (openBtn) openBtn.setAttribute("aria-expanded", "true");
      var first = menu.querySelector("a, button");
      if (first) first.focus();
      document.addEventListener("keydown", onKeydown);
    };

    var closeMenu = function () {
      if (!menu) return;
      menu.classList.add("hidden");
      document.body.style.overflow = "";
      if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
      document.removeEventListener("keydown", onKeydown);
    };

    var onKeydown = function (e) {
      if (e.key === "Escape") closeMenu();
    };

    if (openBtn) openBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (menu) {
      menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });
    }

    /* --------------------------------------------------------------------
       Scroll reveal
       -------------------------------------------------------------------- */
    var revealTargets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    // Ensure every target carries the animatable class.
    revealTargets.forEach(function (el) {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });

    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

      revealTargets.forEach(function (el) {
        // Elements already in the first viewport reveal immediately.
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) el.classList.add("is-visible");
        else revealObserver.observe(el);
      });
    }

    /* --------------------------------------------------------------------
       Parallax (subtle, rAF-throttled, disabled for reduced motion / touch)
       -------------------------------------------------------------------- */
    var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    var isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!prefersReduced && isFinePointer && parallaxEls.length) {
      var ticking = false;

      var applyParallax = function () {
        var vh = window.innerHeight;
        parallaxEls.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) return;
          var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
          var center = rect.top + rect.height / 2;
          var offset = (center - vh / 2) * speed;
          el.style.transform = "translate3d(0," + offset.toFixed(2) + "px,0)";
        });
        ticking = false;
      };

      var requestParallax = function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(applyParallax);
        }
      };

      applyParallax();
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.addEventListener("resize", requestParallax, { passive: true });
    }

    /* --------------------------------------------------------------------
       Vive la experiencia: vertical videos
       Play on hover (mouse) or on tap (button). Cards whose video file is
       missing keep their poster and hide the play button.
       -------------------------------------------------------------------- */
    document.querySelectorAll("[data-exp]").forEach(function (card) {
      var video = card.querySelector("video");
      var btn = card.querySelector(".exp-play");
      if (!video) return;

      var sources = video.querySelectorAll("source");
      var last = sources[sources.length - 1];
      if (last) last.addEventListener("error", function () { card.classList.add("no-video"); });

      var play = function () {
        if (card.classList.contains("no-video")) return;
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      };
      var pause = function () { video.pause(); };

      video.addEventListener("play", function () {
        card.classList.add("is-playing");
        if (btn) btn.setAttribute("aria-label", "Pausar video");
      });
      video.addEventListener("pause", function () {
        card.classList.remove("is-playing");
        if (btn) btn.setAttribute("aria-label", "Reproducir video");
      });

      if (btn) btn.addEventListener("click", function () { video.paused ? play() : pause(); });
      if (isFinePointer && !prefersReduced) {
        card.addEventListener("mouseenter", play);
        card.addEventListener("mouseleave", pause);
      }
    });

    /* --------------------------------------------------------------------
       Reviews slider
       -------------------------------------------------------------------- */
    document.querySelectorAll("[data-reviews]").forEach(function (root) {
      var slides = root.querySelectorAll("[data-review]");
      var dotsWrap = root.querySelector("[data-review-dots]");
      if (slides.length < 2) return;
      var index = 0;
      var timer = null;
      var dots = [];

      var show = function (i) {
        index = (i + slides.length) % slides.length;
        slides.forEach(function (s, n) { s.classList.toggle("is-active", n === index); });
        dots.forEach(function (d, n) { d.setAttribute("aria-current", n === index ? "true" : "false"); });
      };
      var restart = function () {
        if (prefersReduced) return;
        window.clearInterval(timer);
        timer = window.setInterval(function () { show(index + 1); }, 7000);
      };

      slides.forEach(function (_, n) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "review-dot";
        d.setAttribute("aria-label", "Ver opinión " + (n + 1));
        d.addEventListener("click", function () { show(n); restart(); });
        if (dotsWrap) dotsWrap.appendChild(d);
        dots.push(d);
      });

      var prev = root.querySelector("[data-review-prev]");
      var next = root.querySelector("[data-review-next]");
      if (prev) prev.addEventListener("click", function () { show(index - 1); restart(); });
      if (next) next.addEventListener("click", function () { show(index + 1); restart(); });
      root.addEventListener("mouseenter", function () { window.clearInterval(timer); });
      root.addEventListener("mouseleave", restart);

      show(0);
      restart();
    });

    /* --------------------------------------------------------------------
       Newsletter form
       -------------------------------------------------------------------- */
    document.querySelectorAll("[data-newsletter]").forEach(function (form) {
      var msg = form.parentNode.querySelector("[data-newsletter-msg]");
      var say = function (text) { if (msg) msg.textContent = text; };

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input[type=email]");
        if (!input || !input.checkValidity()) {
          say("Escribe un correo válido, por favor.");
          if (input) input.focus();
          return;
        }
        if (!CONFIG.newsletter) {
          say("¡Muy pronto podrás suscribirte! Estamos preparando las ofertas.");
          return;
        }
        var data = new FormData(form);
        fetch(CONFIG.newsletter, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (res) {
            if (!res.ok) throw new Error(res.status);
            form.reset();
            say("¡Listo! Ya estás en la lista de ofertas calientes.");
          })
          .catch(function () { say("No pudimos registrarte ahora. Inténtalo de nuevo en un rato."); });
      });
    });
  });
})();
