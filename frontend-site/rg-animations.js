/* RG Care Foundation — GSAP animation layer (v2 — fixed selectors, no popup conflict)
   Strategy:
   - NEVER touch .rg-dpop or .rg-modal-backdrop — they have their own CSS keyframe animations
   - Guard every animation block with querySelector check before creating tweens
   - once:true on all ScrollTriggers — plays once, no re-fire
   - Safety net at end: force-clear any leftover opacity:0 inline styles after 5s */

(function () {
  var reduced = false;

  function boot() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("[RGAnim] GSAP not loaded");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    runHeroAnimations();
    if (!reduced) {
      runScrollAnimations();
    }
    runAlwaysOn(); // hover effects, btn pulse — always

    // Safety net: after 5s, clear any inline opacity:0 only on viewport-visible elements
    // (prevents stuck-invisible content while preserving below-fold hidden state)
    setTimeout(function () {
      document.querySelectorAll("*").forEach(function (el) {
        if (el.style && el.style.opacity === "0") {
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.style.opacity = "";
            el.style.transform = "";
          }
        }
      });
      ScrollTrigger.refresh();
    }, 5000);
  }

  /* ═══════════════════════════════════════════════════════════
     HERO — runs on load, no scroll trigger needed
  ═══════════════════════════════════════════════════════════ */
  function runHeroAnimations() {
    // Nav slide down
    var nav = document.querySelector(".rg-nav");
    if (nav) {
      gsap.from(nav, { y: -70, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.05 });
    }

    // Hero: stagger all direct children text elements
    var heroReveals = gsap.utils.toArray(".rg-hero .rg-hero-full-inner > *, .rg-hero .rg-hero-split-text > *, .rg-hero .rg-hero-centered-inner > *");
    if (heroReveals.length) {
      gsap.from(heroReveals, {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        stagger: 0.1, delay: 0.2,
      });
    }

    // Float metrics
    var metrics = gsap.utils.toArray(".rg-floatmetrics .rg-metric");
    if (metrics.length) {
      gsap.from(metrics, {
        y: 30, opacity: 0, scale: 0.88, duration: 0.7, ease: "back.out(1.5)",
        stagger: 0.14, delay: 0.6,
      });
    }

    // Hero split badge
    var badge = document.querySelector(".rg-hero-badge");
    if (badge) {
      gsap.from(badge, { scale: 0.5, opacity: 0, duration: 0.9, ease: "back.out(2)", delay: 1.1 });
    }

    // Page sub-page hero (rg-phero / .rg-page-hero)
    var pheroInner = gsap.utils.toArray(".rg-phero > *, .rg-page-hero-inner > *");
    if (pheroInner.length) {
      gsap.from(pheroInner, {
        y: 35, opacity: 0, duration: 0.72, ease: "power3.out",
        stagger: 0.1, delay: 0.15,
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     SCROLL-TRIGGERED
  ═══════════════════════════════════════════════════════════ */
  function st(trigger, vars) {
    // Helper: only create ScrollTrigger if trigger element exists
    var el = typeof trigger === "string" ? document.querySelector(trigger) : trigger;
    if (!el) return null;
    return Object.assign({ trigger: el, start: "top 86%", toggleActions: "play none none none", once: true }, vars);
  }

  function runScrollAnimations() {

    /* ── Hero video parallax ──────────────────────────────── */
    var heroBg = document.querySelector(".rg-hero-bg");
    if (heroBg) {
      gsap.to(heroBg, {
        y: "22%", ease: "none",
        scrollTrigger: { trigger: ".rg-hero", start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }

    /* ── Section headings ────────────────────────────────── */
    gsap.utils.toArray(".rg-h2, .rg-h3").forEach(function (el) {
      gsap.from(el, {
        y: 38, opacity: 0, duration: 0.75, ease: "power3.out",
        scrollTrigger: st(el, { start: "top 90%" }),
      });
    });

    gsap.utils.toArray(".eyebrow").forEach(function (el) {
      gsap.from(el, {
        x: -20, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: st(el, { start: "top 92%" }),
      });
    });

    gsap.utils.toArray(".rg-section-sub").forEach(function (el) {
      gsap.from(el, {
        y: 22, opacity: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: st(el, { start: "top 91%" }),
      });
    });

    /* ── ABOUT: split reveal ──────────────────────────────── */
    if (document.querySelector(".rg-about-media")) {
      gsap.from(".rg-about-media", {
        x: -60, opacity: 0, duration: 0.95, ease: "power3.out",
        scrollTrigger: st(".rg-about", { start: "top 82%" }),
      });
      gsap.from(".rg-about-text", {
        x: 60, opacity: 0, duration: 0.95, ease: "power3.out",
        scrollTrigger: st(".rg-about", { start: "top 82%" }),
      });
    }

    // About points stagger
    if (document.querySelector(".rg-about-points")) {
      gsap.from(".rg-point", {
        x: -26, opacity: 0, duration: 0.48, ease: "power2.out", stagger: 0.09,
        scrollTrigger: st(".rg-about-points", { start: "top 88%" }),
      });
    }

    /* ── IMPACT cards ─────────────────────────────────────── */
    var impactCards = gsap.utils.toArray(".rg-impact-grid .rg-impact-card");
    if (impactCards.length && document.querySelector(".rg-impact")) {
      gsap.from(impactCards, {
        y: 52, opacity: 0, scale: 0.9, duration: 0.68, ease: "back.out(1.4)",
        stagger: 0.1,
        scrollTrigger: st(".rg-impact", { start: "top 82%" }),
      });
    }

    /* ── PROGRAMS cards ───────────────────────────────────── */
    var progCards = gsap.utils.toArray(".rg-programs-grid .rg-prog");
    if (progCards.length && document.querySelector(".rg-programs")) {
      gsap.from(progCards, {
        y: 50, opacity: 0, duration: 0.65, ease: "power3.out", stagger: 0.1,
        scrollTrigger: st(".rg-programs", { start: "top 82%" }),
      });
    }

    /* ── STORIES slider card ──────────────────────────────── */
    if (document.querySelector(".rg-stories .rg-testi")) {
      gsap.from(".rg-stories .rg-testi", {
        y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: st(".rg-stories", { start: "top 82%" }),
      });
    }

    /* ── FIELD VIDEO section ──────────────────────────────── */
    if (document.querySelector(".rg-fieldvid-sec")) {
      gsap.from(".rg-fieldvid-media", {
        x: -50, opacity: 0, scale: 0.95, duration: 0.8, ease: "power2.out",
        scrollTrigger: st(".rg-fieldvid-sec", { start: "top 84%" }),
      });
      gsap.from(".rg-fieldvid-body", {
        x: 50, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: st(".rg-fieldvid-sec", { start: "top 84%" }),
      });
    }

    /* ── FIELD GALLERY clips ──────────────────────────────── */
    var galItems = gsap.utils.toArray(".rg-fgal-grid .rg-fgal-item");
    if (galItems.length) {
      gsap.from(galItems, {
        scale: 0.9, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.14,
        scrollTrigger: st(".rg-fgal-sec", { start: "top 84%" }),
      });
    }

    /* ── FOUNDER: dramatic split ──────────────────────────── */
    if (document.querySelector(".rg-founder-media")) {
      gsap.from(".rg-founder-media", {
        x: -70, opacity: 0, duration: 1.0, ease: "power3.out",
        scrollTrigger: st(".rg-founder-sec", { start: "top 82%" }),
      });
      gsap.from(".rg-founder-body", {
        x: 70, opacity: 0, duration: 1.0, ease: "power3.out",
        scrollTrigger: st(".rg-founder-sec", { start: "top 82%" }),
      });
      gsap.from(".rg-founder-quote-ic", {
        scale: 0.3, rotate: -20, opacity: 0, duration: 0.7, ease: "back.out(2)",
        scrollTrigger: st(".rg-founder-body", { start: "top 85%" }),
      });
    }

    /* ── TESTIMONIALS (rg-testi-sec) ──────────────────────── */
    if (document.querySelector(".rg-testi-sec .rg-testi-card")) {
      gsap.from(".rg-testi-sec .rg-testi-card", {
        y: 35, opacity: 0, scale: 0.94, duration: 0.65, ease: "back.out(1.3)",
        scrollTrigger: st(".rg-testi-sec", { start: "top 82%" }),
      });
    }

    /* ── DONATION TRUST ───────────────────────────────────── */
    if (document.querySelector(".rg-dtrust")) {
      gsap.from(".rg-dtrust-head", {
        x: -50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: st(".rg-dtrust-sec", { start: "top 82%" }),
      });
      gsap.from(".rg-dtrust-points", {
        x: 50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: st(".rg-dtrust-sec", { start: "top 82%" }),
      });
    }

    /* ── VOLUNTEER card ───────────────────────────────────── */
    if (document.querySelector(".rg-vol-card")) {
      gsap.from(".rg-vol-intro", {
        x: -50, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: st(".rg-volunteer", { start: "top 82%" }),
      });
      gsap.from(".rg-vol-card", {
        x: 50, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: st(".rg-volunteer", { start: "top 82%" }),
      });
    }

    /* ── CSR section ──────────────────────────────────────── */
    if (document.querySelector(".rg-csr")) {
      gsap.from(".rg-csr .rg-section-head", {
        y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: st(".rg-csr", { start: "top 82%" }),
      });
    }

    /* ── HOME FAQ ─────────────────────────────────────────── */
    var faqItems = gsap.utils.toArray(".rg-faq-item");
    if (faqItems.length && document.querySelector(".rg-faq")) {
      gsap.from(faqItems, {
        y: 22, opacity: 0, duration: 0.48, ease: "power2.out", stagger: 0.07,
        scrollTrigger: st(".rg-faq", { start: "top 84%" }),
      });
    }

    /* ── INSIGHTS posts ───────────────────────────────────── */
    var posts = gsap.utils.toArray(".rg-insights-grid .rg-post");
    if (posts.length && document.querySelector(".rg-insights")) {
      gsap.from(posts, {
        y: 40, opacity: 0, duration: 0.65, ease: "power3.out", stagger: 0.1,
        scrollTrigger: st(".rg-insights", { start: "top 84%" }),
      });
    }

    /* ── TRANSPARENCY doc links ───────────────────────────── */
    var transDocs = gsap.utils.toArray(".rg-transp-dl");
    if (transDocs.length && document.querySelector(".rg-transp")) {
      gsap.from(transDocs, {
        x: 30, opacity: 0, duration: 0.5, ease: "power2.out", stagger: 0.07,
        scrollTrigger: st(".rg-transp", { start: "top 84%" }),
      });
    }
    if (document.querySelector(".rg-transp-left")) {
      gsap.from(".rg-transp-left", {
        x: -40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: st(".rg-transp", { start: "top 84%" }),
      });
    }

    /* ── FOOTER ───────────────────────────────────────────── */
    if (document.querySelector(".rg-footer")) {
      gsap.from(".rg-footer-brand", {
        y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: st(".rg-footer", { start: "top 95%" }),
      });
      gsap.from(".rg-footer-cols > *", {
        y: 30, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.09,
        scrollTrigger: st(".rg-footer", { start: "top 95%" }),
      });
    }

    // Credential badges stagger
    if (document.querySelector(".rg-creds")) {
      gsap.from(".rg-creds .rg-cred", {
        y: 14, opacity: 0, duration: 0.42, ease: "power2.out", stagger: 0.06,
        scrollTrigger: st(".rg-creds", { start: "top 91%" }),
      });
    }

    ScrollTrigger.refresh();
  }

  /* ═══════════════════════════════════════════════════════════
     ALWAYS-ON: button pulse + hover effects (no scroll trigger)
  ═══════════════════════════════════════════════════════════ */
  function runAlwaysOn() {
    // Warm pulse glow on primary CTAs
    gsap.to(".btn-rose", {
      keyframes: [
        { boxShadow: "0 0 0 0 rgba(200,112,112,0.6)", duration: 0.01 },
        { boxShadow: "0 0 0 12px rgba(200,112,112,0)", duration: 1.1, ease: "power2.out" },
      ],
      repeat: -1, repeatDelay: 2.2,
    });

    // Button scale on hover — attach once
    function attachHover(btn) {
      if (btn.dataset.rgHover) return;
      btn.dataset.rgHover = "1";
      btn.addEventListener("mouseenter", function () {
        gsap.to(btn, { scale: 1.06, duration: 0.2, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
      });
    }

    document.querySelectorAll(".btn-rose, .btn-blue, .btn-primary").forEach(attachHover);

    // Image slot hover scale
    document.querySelectorAll("image-slot").forEach(function (slot) {
      if (slot.dataset.rgHover) return;
      slot.dataset.rgHover = "1";
      slot.addEventListener("mouseenter", function () {
        gsap.to(slot, { scale: 1.03, duration: 0.35, ease: "power2.out" });
      });
      slot.addEventListener("mouseleave", function () {
        gsap.to(slot, { scale: 1, duration: 0.35, ease: "power2.out" });
      });
    });

    // FAQ item: animate open/close icon rotation
    document.querySelectorAll(".rg-faq-item").forEach(function (item) {
      var btn = item.querySelector(".rg-faq-q");
      var toggle = item.querySelector(".rg-faq-toggle");
      if (!btn || !toggle) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        gsap.to(toggle, {
          rotate: isOpen ? 0 : 180,
          duration: 0.3, ease: "power2.inOut",
        });
      });
    });

    // MutationObserver: attach hover to dynamically added buttons
    // and animate donate modal (NOT the popup — that has CSS animation)
    var mo = new MutationObserver(function () {
      document.querySelectorAll(".btn-rose:not([data-rg-hover]), .btn-primary:not([data-rg-hover])").forEach(attachHover);

      // Donate modal inner panel only (not backdrop, not dpop)
      var modal = document.querySelector(".rg-donation-modal:not([data-rg-gsap]), .rg-donate-modal:not([data-rg-gsap])");
      if (modal) {
        modal.dataset.rgGsap = "1";
        gsap.from(modal, { y: 35, opacity: 0, scale: 0.97, duration: 0.42, ease: "power3.out" });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ─── Boot: wait for Babel→React to actually render ────────
     Babel standalone fetches JSX files via async XHR, so React
     renders AFTER window.load in most cases. We watch #root for
     children instead of relying on a fixed timeout.          */
  function waitForReact(cb) {
    var root = document.getElementById("root");
    if (!root) { setTimeout(cb, 800); return; }
    // Already rendered (cached/fast)
    if (root.children.length > 0) { setTimeout(cb, 60); return; }
    var mo = new MutationObserver(function () {
      if (root.children.length > 0) {
        mo.disconnect();
        // Let React finish painting
        requestAnimationFrame(function () { requestAnimationFrame(cb); });
      }
    });
    mo.observe(root, { childList: true });
    // Hard fallback: if nothing renders in 8s, still run (shows hover/pulse at least)
    setTimeout(function () { mo.disconnect(); cb(); }, 8000);
  }

  window.addEventListener("load", function () {
    waitForReact(boot);
  });
})();
