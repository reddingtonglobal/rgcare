/* RG Care — shared building blocks (exported to window) */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- Lucide icon ---- */
function Icon({ name, size = 20, color, cls = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = `<i data-lucide="${name}" style="width:100%;height:100%"></i>`;
    if (window.lucide) window.lucide.createIcons();
  }, [name]);
  return (
    <span ref={ref} aria-hidden="true" className={"ico " + cls}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
               width: size, height: size, color, flexShrink: 0, ...style }} />
  );
}

/* ---- In-view hook (kept for optional use) ---- */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(true);
  return [ref, seen];
}

/* ---- Animated counter (final value guaranteed even if rAF is throttled) ---- */
function Counter({ to, suffix = "", dur = 1700, format = true }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.hidden) { setN(to); return; }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const start = setTimeout(() => { raf = requestAnimationFrame(tick); }, 220);
    const safety = setTimeout(() => setN(to), 1900); // ensures final value if rAF is paused
    return () => { clearTimeout(start); clearTimeout(safety); cancelAnimationFrame(raf); };
  }, [to, dur]);
  return <span>{format ? n.toLocaleString("en-IN") : n}{suffix}</span>;
}

/* ---- Reveal: CSS load animation (always ends visible) ---- */
function Reveal({ children, delay = 0, y = 22, className = "", style = {}, as = "div" }) {
  const Tag = as;
  return (
    <Tag className={"rg-reveal " + className}
      style={{ ...style, animationDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ---- image-slot wrapper ---- */
function Slot({ id, label = "Drop a real photo", shape = "rounded", radius = 16, className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("placeholder", label);
    el.setAttribute("shape", shape);
    el.setAttribute("radius", radius);
  }, [label, shape, radius]);
  return <image-slot ref={ref} id={id} className={className} style={style}></image-slot>;
}

/* ---- Eyebrow ---- */
function Eyebrow({ children, center = false, style }) {
  return <span className={"eyebrow" + (center ? " is-center" : "")} style={style}>{children}</span>;
}

/* ---- Brand/social icons (lucide dropped these) ---- */
const BRAND_PATHS = {
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.3" fill="currentColor"/>',
  facebook: '<path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/>',
  linkedin: '<path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z"/>',
  twitter: '<path fill="currentColor" d="M18.24 2h3.3l-7.21 8.24L22.85 22h-6.64l-5.2-6.8L5.06 22H1.75l7.71-8.81L1.4 2h6.81l4.7 6.21L18.24 2Zm-1.16 18h1.83L7.01 3.88H5.04L17.08 20Z"/>',
  youtube: '<path fill="currentColor" d="M23.5 6.5a3 3 0 0 0-2.11-2.12C19.5 3.87 12 3.87 12 3.87s-7.5 0-9.39.51A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.11 2.12c1.89.51 9.39.51 9.39.51s7.5 0 9.39-.51A3 3 0 0 0 23.5 17.5C24 15.6 24 12 24 12s0-3.6-.5-5.5ZM9.6 15.6V8.4l6.25 3.6-6.25 3.6Z"/>',
};
function Brand({ name, size = 18, style = {} }) {
  return <span aria-hidden="true" style={{ display: "inline-flex", width: size, height: size, ...style }}
    dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24" width="${size}" height="${size}">${BRAND_PATHS[name] || ""}</svg>` }} />;
}

Object.assign(window, { Icon, useInView, Counter, Reveal, Slot, Eyebrow, Brand,
  useState, useEffect, useRef, useCallback });
