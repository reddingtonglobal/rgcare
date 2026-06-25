/* RG Care — Nav + Hero (3 variants) + Trust bar + floating metrics */

function Logo({ onDark = false, href = "RG Care Foundation.html" }) {
  return (
    <a href={href} className="rg-logo" aria-label="RG Care Foundation home">
      <img className="rg-logo-mark" src="assets/rg-hands.png" alt="" width="50" height="34" />
      <span className="rg-logo-txt" style={{ color: onDark ? "#fff" : "var(--brown-deep)" }}>
        RG&nbsp;Care<small style={{ color: onDark ? "rgba(255,255,255,.75)" : "var(--brown-soft)" }}>Foundation</small>
      </span>
    </a>
  );
}

function Nav({ onDonate, solid = false, active = "" }) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (solid) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);
  const links = (window.RG && window.RG.nav) || [];
  return (
    <header className={"rg-nav" + (scrolled ? " is-solid" : "")}>
      <div className="wrap wrap-wide rg-nav-inner">
        <Logo onDark={!scrolled} />
        <nav className="rg-nav-links" aria-label="Primary">
          {links.map(([label, href]) => (
            <a key={label} href={href} className={"rg-nav-link" + (active === label ? " is-active" : "")}
               style={{ color: scrolled ? "var(--brown)" : "rgba(255,255,255,.92)" }}>{label}</a>
          ))}
        </nav>
        <div className="rg-nav-actions">
          {onDonate
            ? <button className="btn btn-rose btn-sm" onClick={onDonate}><Icon name="heart" size={16} /> Donate</button>
            : <a className="btn btn-rose btn-sm" href="donate.html"><Icon name="heart" size={16} /> Donate</a>}
          <button className="rg-burger" aria-label="Menu" onClick={() => setOpen(o => !o)}
                  style={{ color: scrolled ? "var(--brown-deep)" : "#fff" }}>
            <Icon name={open ? "x" : "menu"} size={24} />
          </button>
        </div>
      </div>
      {open && (
        <div className="rg-mobile-menu">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          {onDonate
            ? <button className="btn btn-rose" onClick={() => { setOpen(false); onDonate(); }} style={{ marginTop: 8 }}><Icon name="heart" size={16} /> Donate now</button>
            : <a className="btn btn-rose" href="donate.html" style={{ marginTop: 8 }}><Icon name="heart" size={16} /> Donate now</a>}
        </div>
      )}
    </header>
  );
}

function TrustBar({ items, onDark, center }) {
  const ic = ["lock", "file-bar-chart", "users-round", "shield-check"];
  return (
    <div className={"rg-trustbar" + (onDark ? " on-dark" : "") + (center ? " is-center" : "")}>
      {items.map((label, i) => (
        <span className="rg-trust-item" key={label}>
          <Icon name={ic[i % ic.length]} size={16} /> {label}
        </span>
      ))}
    </div>
  );
}

/* Formal compliance badges — prominent, verified feel */
function CredentialBadges({ onDark, center }) {
  const creds = [
    { ic: "shield-check", label: "Registered NGO" },
    { ic: "badge-check", label: "12A certified" },
    { ic: "receipt-indian-rupee", label: "80G tax benefits" },
    { ic: "eye", label: "Transparent NGO" },
    { ic: "lock", label: "Secure donations" },
    { ic: "users-round", label: "Community driven" },
  ];
  return (
    <div className={"rg-creds" + (onDark ? " on-dark" : "") + (center ? " is-center" : "")}>
      {creds.map((c) => (
        <span className="rg-cred" key={c.label}>
          <Icon name={c.ic} size={16} /> {c.label}
        </span>
      ))}
    </div>
  );
}

/* Secure-donation microcopy */
function SecureNote({ onDark, center }) {
  return (
    <p className={"rg-hero-secure" + (onDark ? " on-dark" : "") + (center ? " is-center" : "")}>
      <Icon name="lock" size={14} /> 100% secure donations · Transparent reporting
    </p>
  );
}

function FloatMetrics({ metrics, variant }) {
  return (
    <div className={"rg-floatmetrics v-" + variant}>
      {metrics.map((m, i) => (
        <Reveal as="div" delay={150 + i * 90} className="rg-metric" key={m.k}>
          <div className="rg-metric-num"><Counter to={m.value} suffix={m.suffix} /></div>
          <div className="rg-metric-label">{m.label}</div>
        </Reveal>
      ))}
    </div>
  );
}

function HeroButtons({ onDonate, onVolunteer, onWatch, dark }) {
  return (
    <div className="rg-hero-cta">
      <button className="btn btn-rose btn-lg" onClick={onDonate}>
        <Icon name="heart" size={19} /> Donate now
      </button>
      <button className={"btn btn-lg " + (dark ? "btn-on-dark" : "btn-ghost")} onClick={onVolunteer}>
        Become a volunteer
      </button>
    </div>
  );
}

function Hero({ t, onDonate, onVolunteer, onWatch }) {
  const v = t.heroVariant;
  const head = t.headline;
  const sub = t.subhead;
  // soft reassurance strip (formal compliance lives in CredentialBadges)
  const trust = ["Secure payments", "Transparent utilization", "Community driven"];

  if (v === "split") {
    return (
      <section className="rg-hero hero-split" id="top">
        <div className="wrap wrap-wide rg-hero-split-grid">
          <div className="rg-hero-split-text">
            <Reveal><Eyebrow>Reddington Global Care Foundation</Eyebrow></Reveal>
            <Reveal delay={80} as="h1" className="rg-hero-h">{head}</Reveal>
            <Reveal delay={150} as="p" className="rg-hero-sub">{sub}</Reveal>
            <Reveal delay={220}><HeroButtons onDonate={onDonate} onVolunteer={onVolunteer} onWatch={onWatch} /></Reveal>
            <Reveal delay={280}><CredentialBadges /></Reveal>
            <Reveal delay={330}><TrustBar items={trust} /></Reveal>
            <Reveal delay={370}><SecureNote /></Reveal>
          </div>
          <div className="rg-hero-split-media">
            <Slot id="hero-split-a" label="Hero — children / classroom (real photo)" radius={24}
                  style={{ width: "100%", height: "100%", minHeight: 460 }} />
            <div className="rg-hero-badge card">
              <span className="rg-hero-badge-num"><Counter to={52000} suffix="+" /></span>
              <span>lives changed across <b>140+</b> communities</span>
            </div>
          </div>
        </div>
        <div className="wrap wrap-wide"><FloatMetrics metrics={window.RG.metrics} variant="split" /></div>
      </section>
    );
  }

  if (v === "centered") {
    return (
      <section className="rg-hero hero-centered" id="top">
        <div className="wrap rg-hero-centered-inner">
          <Reveal><Eyebrow center>Education · Healthcare · Empowerment</Eyebrow></Reveal>
          <Reveal delay={80} as="h1" className="rg-hero-h is-center">{head}</Reveal>
          <Reveal delay={150} as="p" className="rg-hero-sub is-center">{sub}</Reveal>
          <Reveal delay={220}><div className="rg-hero-cta is-center"><HeroButtons onDonate={onDonate} onVolunteer={onVolunteer} onWatch={onWatch} /></div></Reveal>
          <Reveal delay={280}><CredentialBadges center /></Reveal>
          <Reveal delay={330}><SecureNote center /></Reveal>
        </div>
        <div className="wrap wrap-wide rg-hero-collage">
          <Slot id="hero-col-1" label="Children learning (real photo)" radius={20} style={{ height: 320 }} />
          <Slot id="hero-col-2" label="Community / volunteers (real photo)" radius={20} style={{ height: 320 }} />
        </div>
        <div className="wrap"><TrustBar items={trust} center /></div>
      </section>
    );
  }

  // default: full-bleed
  return (
    <section className="rg-hero hero-full" id="top">
      <video className="rg-hero-bg" src="assets/hero-bg.mp4" autoPlay muted loop playsInline
             ref={(el) => { if (el) { el.muted = true; const p = el.play && el.play(); if (p && p.catch) p.catch(() => {}); } }} aria-hidden="true"></video>
      <div className="rg-hero-scrim" />
      <div className="wrap wrap-wide rg-hero-full-inner">
        <div className="rg-hero-full-text">
          <Reveal><Eyebrow style={{ color: "#fff" }}>Reddington Global Care Foundation</Eyebrow></Reveal>
          <Reveal delay={80} as="h1" className="rg-hero-h on-dark">{head}</Reveal>
          <Reveal delay={150} as="p" className="rg-hero-sub on-dark">{sub}</Reveal>
          <Reveal delay={220}><HeroButtons onDonate={onDonate} onVolunteer={onVolunteer} onWatch={onWatch} dark /></Reveal>
          <Reveal delay={290}><CredentialBadges onDark /></Reveal>
          <Reveal delay={340}><TrustBar items={trust} onDark /></Reveal>
          <Reveal delay={380}><SecureNote onDark /></Reveal>
        </div>
        <FloatMetrics metrics={window.RG.metrics} variant="full" />
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Logo, TrustBar, CredentialBadges, SecureNote, FloatMetrics });
