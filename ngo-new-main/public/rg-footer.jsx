/* RG Care — Insights, Transparency, Footer (+feedback), Sticky CTA, WhatsApp, Exit-intent */

function Insights() {
  const posts = [
    { tag: "Impact story", ic: "sparkles", title: "How a tailoring unit lifted 40 families in Sonipat", read: "4 min" },
    { tag: "Education", ic: "book-open", title: "Why first-generation learners drop out — and what actually works", read: "6 min" },
    { tag: "CSR", ic: "handshake", title: "CSR done right: 5 questions to ask your NGO partner", read: "5 min" },
  ];
  return (
    <section className="section rg-insights" id="blog">
      <div className="wrap wrap-wide">
        <div className="rg-section-head two">
          <div>
            <Reveal><Eyebrow>From the field</Eyebrow></Reveal>
            <Reveal delay={70} as="h2" className="rg-h2">Notes & guides from the ground</Reveal>
          </div>
          <Reveal delay={120}><a href="blog.html" className="rg-textlink">All articles <Icon name="arrow-right" size={16} /></a></Reveal>
        </div>
        <div className="rg-insights-grid">
          {posts.map((p, i) => (
            <Reveal as="article" delay={i * 80} className="rg-post card is-text" key={p.title}>
              <span className="rg-post-kicker"><Icon name={p.ic} size={18} /> {p.tag}</span>
              <h3 className="rg-post-title">{p.title}</h3>
              <div className="rg-post-foot">
                <span className="rg-post-read"><Icon name="clock" size={14} /> {p.read} read</span>
                <a href="blog.html" className="rg-textlink sm">Read <Icon name="arrow-right" size={15} /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Transparency() {
  const o = window.RG.org;
  const docs = [
    ["Registration & trust deed", "scroll-text"],
    ["12A & 80G certificates", "badge-check"],
    ["CSR-1 registration", "building-2"],
    ["Child protection policy", "shield-check"],
    ["Code of conduct", "file-text"],
    ["Data protection & privacy", "lock"],
  ];
  return (
    <section className="rg-transp" id="transparency">
      <div className="wrap wrap-wide rg-transp-inner">
        <div className="rg-transp-left">
          <Eyebrow style={{ color: "var(--brown)" }}>Transparency</Eyebrow>
          <h2 className="rg-h3" style={{ marginTop: 12 }}>Built on good governance from day one.</h2>
          <p className="muted" style={{ marginTop: 8, maxWidth: 460 }}>
            We're a registered NGO with the certifications, policies and safeguards already in place — so you can give, and partner, with confidence.
          </p>
          <div className="rg-transp-chips">
            {[o.reg, o.g80, o.a12, o.csr1].map((c) => (
              <span className="chip" key={c}><Icon name="badge-check" size={15} /> {c}</span>
            ))}
          </div>
          <a href="transparency.html" className="rg-textlink">See all documents & policies <Icon name="arrow-right" size={16} /></a>
        </div>
        <div className="rg-transp-right">
          {docs.map(([t, ic]) => (
            <a href="transparency.html" className="rg-transp-dl card" key={t}>
              <span className="rg-transp-dl-ic"><Icon name={ic} size={20} /></span>
              <b>{t}</b>
              <Icon name="chevron-right" size={18} cls="rg-transp-dl-arr" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeedbackCard() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", msg: "" });
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (form.name && form.msg) setDone(true); };
  return (
    <div className="rg-feedback card">
      {done ? (
        <div className="rg-feedback-done">
          <div className="rg-done-check sm"><Icon name="check" size={28} /></div>
          <h4>Thank you{form.name ? ", " + form.name.split(" ")[0] : ""}!</h4>
          <p className="muted">We read every message and usually reply within 2 working days.</p>
          <button className="btn btn-ghost btn-sm" onClick={() => { setForm({ name: "", email: "", phone: "", msg: "" }); setDone(false); }}>Send another</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <h4 className="rg-feedback-h">Share your feedback</h4>
          <p className="rg-feedback-sub">Ideas, questions or just hello — we'd love to hear from you.</p>
          <div className="rg-fields">
            <label className="rg-field"><span className="sr-only">Name</span>
              <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <div className="rg-fields-2">
              <label className="rg-field"><span className="sr-only">Email</span>
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              <label className="rg-field"><span className="sr-only">Phone</span>
                <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
            </div>
            <label className="rg-field"><span className="sr-only">Feedback</span>
              <textarea rows="3" placeholder="Your feedback" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} /></label>
          </div>
          <button type="submit" className="btn btn-rose" style={{ width: "100%" }}>Submit feedback</button>
        </form>
      )}
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="rg-news">
      <h4>Get impact stories in your inbox</h4>
      <p>One thoughtful email a month. No spam, ever.</p>
      {done ? (
        <div className="rg-news-done"><Icon name="check" size={16} /> You're subscribed!</div>
      ) : (
        <form className="rg-news-form" onSubmit={(e) => { e.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) setDone(true); }}>
          <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn btn-primary btn-sm"><Icon name="arrow-right" size={16} /></button>
        </form>
      )}
    </div>
  );
}

function Footer({ onDonate }) {
  const o = window.RG.org;
  const cols = [
    ["Programs", ["Education", "Healthcare", "Skill development", "Community & women"]],
    ["Get involved", ["Donate", "Volunteer", "CSR partnership", "Fundraise"]],
    ["Useful links", ["Home", "About us", "Impact", "Stories", "Transparency", "Contact us"]],
  ];
  return (
    <footer className="rg-footer" id="contact">
      <div className="wrap wrap-wide">
        <div className="rg-footer-top">
          <div className="rg-footer-brand">
            <Logo onDark />
            <p className="rg-footer-csr">{o.tagline}</p>
            <p className="rg-footer-tag">{o.about}</p>
            <div className="rg-footer-contact">
              <span><Icon name="map-pin" size={16} /> {o.address}</span>
              <a href={"tel:" + o.phone}><Icon name="phone" size={16} /> {o.phone}</a>
              <a href={"https://" + o.web} target="_blank" rel="noopener"><Icon name="globe" size={16} /> {o.web}</a>
              <span className="rg-hours"><Icon name="clock" size={16} /> {o.hoursWeek} · {o.hoursWeekend}</span>
            </div>
            <div className="rg-socials">
              {["instagram", "facebook", "linkedin", "twitter", "youtube"].map((s) => (
                <a key={s} href="#" aria-label={s} className="rg-social"><Brand name={s} size={17} /></a>
              ))}
            </div>
            <Newsletter />
          </div>
          <div className="rg-footer-cols">
            {cols.map(([h, items]) => (
              <div className="rg-footer-col" key={h}>
                <h5>{h}</h5>
                {items.map((it) => <a href={(window.RG_FOOTER_HREFS && window.RG_FOOTER_HREFS[it]) || "#"} key={it}>{it}</a>)}
              </div>
            ))}
          </div>
          <FeedbackCard />
        </div>

        <div className="rg-footer-cta card">
          <div>
            <h3 className="rg-h3">Ready to change a life today?</h3>
            <p className="muted">It takes two minutes and a {"₹500"} gift to start.</p>
          </div>
          <button className="btn btn-rose btn-lg" onClick={onDonate}><Icon name="heart" size={18} /> Donate now</button>
        </div>

        <div className="rg-footer-compliance">
          <div className="rg-compliance-row">
            <span><b>PAN</b> {o.pan}</span>
            <span><b>12A</b> AAOCR4691RE20251</span>
            <span><b>80G</b> AAOCR4691RF20251</span>
            <span><b>NGO Darpan</b> {o.darpan}</span>
            <span><b>CSR</b> {o.csr1}</span>
          </div>
          <p className="rg-compliance-note">
            Registered office: {o.regOffice} · 12A &amp; 80G provisional registrations granted 17 Jun 2025 (valid AY 2026–27 to 2028–29).
            Donations are voluntary and may qualify for tax benefits under Section 80G of the Income Tax Act, subject to applicable laws.
          </p>
          <p className="rg-compliance-note">
            RG Care Foundation (Reddington Global Care Foundation) is a registered non-profit organization. Information provided on this website is for awareness and charitable purposes only.
          </p>
        </div>

        <div className="rg-footer-bottom">
          <span>© {new Date().getFullYear()} {o.legal}. All rights reserved.</span>
          <div className="rg-footer-legal">
            <a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="donate.html">Refund policy</a><a href="transparency.html">Compliance &amp; documents</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyBar({ onDonate, showWhatsapp }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const wa = window.RG.org.whatsapp;
  return (
    <>
      {showWhatsapp && (
        <a className="rg-whatsapp" href={"https://wa.me/" + wa} target="_blank" rel="noopener" aria-label="Message us">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><line x1="8.5" y1="10.5" x2="15.5" y2="10.5"/><line x1="8.5" y1="13.5" x2="13" y2="13.5"/></svg>
        </a>
      )}
    </>
  );
}

function ExitIntent() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("rg-exit")) return;
    const onLeave = (e) => {
      if (e.clientY <= 0) { setShow(true); sessionStorage.setItem("rg-exit", "1"); }
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);
  if (!show) return null;
  return (
    <div className="rg-modal-backdrop" onClick={() => setShow(false)}>
      <div className="rg-exit card no-media" onClick={(e) => e.stopPropagation()}>
        <button className="rg-modal-close" onClick={() => setShow(false)}><Icon name="x" size={20} /></button>
        <div className="rg-exit-body">
          <Eyebrow>Before you go</Eyebrow>
          <h3 className="rg-h3" style={{ marginTop: 10 }}>One email a month. A lifetime of impact.</h3>
          <p className="muted" style={{ marginTop: 8 }}>Join our growing community of supporters who follow our work from the field.</p>
          {done ? (
            <div className="rg-news-done" style={{ marginTop: 16 }}><Icon name="check" size={16} /> You're subscribed — thank you!</div>
          ) : (
            <form className="rg-exit-form" onSubmit={(e) => { e.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) setDone(true); }}>
              <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn btn-primary">Keep me posted</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Insights, Transparency, Footer, StickyBar, ExitIntent, FeedbackCard, Newsletter });
