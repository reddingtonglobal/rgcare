/* RG Care — Home CRO additions: timed donate popup, founder's message, testimonials, donation trust */

/* ---- Timed donate popup: appears once per session after a short delay ---- */
function DonatePopup({ onDonate }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("rg-donate-popup")) return;
    const tmr = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(tmr);
  }, []);
  const dismiss = () => { setShow(false); sessionStorage.setItem("rg-donate-popup", "1"); };
  const donate = () => { dismiss(); onDonate(); };
  if (!show) return null;
  return (
    <div className="rg-modal-backdrop rg-dpop-backdrop" onClick={dismiss}>
      <div className="rg-dpop card" role="dialog" aria-label="Donate and save tax" onClick={(e) => e.stopPropagation()}>
        <button className="rg-dpop-x" onClick={dismiss} aria-label="Close"><Icon name="x" size={18} /></button>
        <img className="rg-dpop-photo" src="assets/popup-children.webp" alt="Children supported by RG Care Foundation" />
        <div className="rg-dpop-inner">
          <span className="rg-dpop-ic"><Icon name="heart-handshake" size={28} /></span>
          <h4 className="rg-dpop-h">Donate &amp; save tax</h4>
          <p className="rg-dpop-p">Your donations have helped <b>8,000+ children, women and families</b> in 2025–2026. Give today — and enjoy tax benefits under Section 80G.</p>
          <div className="rg-dpop-btns">
            <button className="btn btn-rose" onClick={donate}><Icon name="heart" size={16} /> Donate now</button>
            <button className="btn btn-ghost btn-sm" onClick={dismiss}>Maybe later</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Founder's message: emotional trust-builder ---- */
function FounderMessage() {
  const f = window.RG.founder;
  return (
    <section className="section rg-founder-sec" id="founder">
      <div className="wrap wrap-wide">
        <div className="rg-founder card">
          <div className="rg-founder-media">
            <Slot id={f.slot} label="Founder portrait (real photo)" radius={0}
                  style={{ width: "100%", height: "100%", minHeight: 380 }} />
          </div>
          <div className="rg-founder-body">
            <Eyebrow>A word from our founder</Eyebrow>
            <p className="rg-founder-tagline">Building hope, creating opportunities, and transforming lives — one smile at a time.</p>
            <Icon name="quote" size={34} cls="rg-founder-quote-ic" />
            <p className="rg-founder-msg">{f.message}</p>
            <div className="rg-founder-sign">
              <span className="rg-founder-signname">{f.name}</span>
              <span className="rg-founder-role">{f.role}</span>
            </div>
            <a href="about.html" className="btn btn-ghost"><Icon name="arrow-right" size={16} /> Read full message</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Supporter testimonials carousel ---- */
function Testimonials() {
  const items = window.RG.testimonials;
  const [i, setI] = useState(0);
  useEffect(() => {
    const tmr = setInterval(() => setI((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(tmr);
  }, [items.length]);
  const t = items[i];
  return (
    <section className="section rg-testi-sec">
      <div className="wrap rg-testi-wrap">
        <div className="rg-section-head">
          <Reveal><Eyebrow center>In their words</Eyebrow></Reveal>
          <Reveal delay={70} as="h2" className="rg-h2 is-center">Trusted by the people who give</Reveal>
        </div>
        <div className="rg-testi-card card">
          <span className="rg-testi-ic"><Icon name={t.ic} size={22} /></span>
          <p className="rg-testi-quote">“{t.quote}”</p>
          <div className="rg-testi-by">
            <span className="rg-testi-avatar">{t.name.trim().charAt(0)}</span>
            <div><b>{t.name}</b><span>{t.role}</span></div>
          </div>
          <div className="rg-testi-dots">
            {items.map((_, k) => (
              <button key={k} aria-label={"Testimonial " + (k + 1)}
                className={"rg-dot" + (k === i ? " is-on" : "")} onClick={() => setI(k)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Donation trust strip ---- */
function DonationTrust({ onDonate }) {
  const points = [
    ["receipt-indian-rupee", "80G tax exemption"],
    ["lock", "Secure donations"],
    ["eye", "Transparent utilization"],
    ["bar-chart-3", "Impact reporting"],
    ["heart-handshake", "Trusted by supporters"],
  ];
  return (
    <section className="section rg-dtrust-sec">
      <div className="wrap wrap-wide">
        <div className="rg-dtrust card">
          <div className="rg-dtrust-head">
            <Eyebrow>Donate with confidence</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12 }}>Every gift, accounted for.</h2>
            <p className="muted" style={{ marginTop: 10, maxWidth: 460 }}>
              Donations are voluntary and may qualify for tax benefits under Section 80G of the Income Tax Act, subject to applicable laws.
            </p>
            <button className="btn btn-rose btn-lg" style={{ marginTop: 22 }} onClick={onDonate}>
              <Icon name="heart" size={18} /> Donate today
            </button>
          </div>
          <div className="rg-dtrust-points">
            {points.map(([ic, label]) => (
              <div className="rg-dtrust-point" key={label}>
                <span className="rg-dtrust-ic"><Icon name={ic} size={20} /></span>
                <b>{label}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Self-contained FAQ accordion (home) ---- */
function HomeFAQ({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section rg-faq">
      <div className="wrap wrap-wide rg-faq-grid">
        <div className="rg-faq-head">
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="rg-h2" style={{ marginTop: 14 }}>Questions, answered</h2>
          <p className="muted rg-faq-sub">Everything you need to know about donating, volunteering and partnering with RG Care. Still curious? Message us anytime.</p>
        </div>
        <div className="rg-faq-list">
          {items.map((it, i) => (
            <div key={i} className={"rg-faq-item" + (open === i ? " is-open" : "")}>
              <button className="rg-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <span className="rg-faq-toggle"><Icon name="chevron-down" size={18} /></span>
              </button>
              <div className="rg-faq-a">
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- From-the-field video band (portrait teaser, autoplay 5s then freeze) ---- */
function FieldVideo({ onDonate }) {
  const vref = useRef(null);
  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    v.muted = true;
    const tmr = setTimeout(() => v.pause(), 5000);
    const onEnded = () => v.pause();
    v.addEventListener("ended", onEnded);
    const p = v.play && v.play();
    if (p && p.catch) p.catch(() => {});
    return () => { clearTimeout(tmr); v.removeEventListener("ended", onEnded); };
  }, []);
  return (
    <section className="section rg-fieldvid-sec" id="our-work">
      <div className="wrap wrap-wide rg-fieldvid">
        <div className="rg-fieldvid-media rg-fieldvid-portrait">
          <video ref={vref} className="rg-fieldvid-video" src="assets/field-film.mp4"
                 muted playsInline preload="auto"></video>
        </div>
        <div className="rg-fieldvid-body">
          <Eyebrow>From the field</Eyebrow>
          <h2 className="rg-h2" style={{ marginTop: 14 }}>See the work, not just the words.</h2>
          <p className="muted" style={{ marginTop: 14, fontSize: 18, lineHeight: 1.6 }}>
            A women's livelihood and literacy session, filmed on the ground. No stock footage,
            no staging — just the real communities your support reaches every day.
          </p>
          <div className="rg-fieldvid-points">
            {[
              ["map-pin", "Filmed on location with the women we work alongside"],
              ["scissors", "Tailoring &amp; skills training in progress"],
              ["book-open", "Literacy and learning, side by side"],
            ].map(([ic, txt]) => (
              <div className="rg-fieldvid-point" key={txt}>
                <span className="rg-fieldvid-ic"><Icon name={ic} size={18} /></span>
                <span dangerouslySetInnerHTML={{ __html: txt }} />
              </div>
            ))}
          </div>
          <button className="btn btn-rose btn-lg" style={{ marginTop: 26 }} onClick={onDonate}>
            <Icon name="heart" size={18} /> Support this work
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---- Field gallery: two landscape clips, zoom-cropped to remove black borders ---- */
function FieldGallery() {
  const clips = [
    { src: "assets/field-clip-1.mp4", cap: "Literacy session in progress" },
    { src: "assets/field-clip-2.mp4", cap: "A child recites before her class" },
  ];
  return (
    <section className="section rg-fgal-sec">
      <div className="wrap wrap-wide">
        <div className="rg-section-head">
          <Eyebrow center>Moments from our centres</Eyebrow>
          <h2 className="rg-h2 is-center" style={{ marginTop: 12 }}>Learning, in motion</h2>
        </div>
        <div className="rg-fgal-grid">
          {clips.map((c) => (
            <figure className="rg-fgal-item" key={c.src}>
              <div className="rg-fgal-frame">
                <video src={c.src} autoPlay muted loop playsInline preload="auto"></video>
              </div>
              <figcaption>{c.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DonatePopup, FounderMessage, Testimonials, DonationTrust, HomeFAQ, FieldVideo, FieldGallery });
