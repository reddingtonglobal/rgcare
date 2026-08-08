/* RG Care — reusable page-shell components for standalone subpages */

function Breadcrumb({ trail }) {
  return (
    <nav className="rg-crumb" aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={i} className="rg-crumb-item">
          {t[1] ? <a href={t[1]}>{t[0]}</a> : <span aria-current="page">{t[0]}</span>}
          {i < trail.length - 1 && <Icon name="chevron-right" size={14} />}
        </span>
      ))}
    </nav>
  );
}

function PageHero({ eyebrow, title, lead, trail, actions, media, mediaLabel, tint = "blue", kicker }) {
  return (
    <header className={"rg-phero tint-" + tint + (media ? " has-media" : "")}>
      <div className="wrap wrap-wide rg-phero-inner">
        <div className="rg-phero-text">
          {trail && <Breadcrumb trail={trail} />}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="rg-phero-title">{title}</h1>
          {lead && <p className="rg-phero-lead">{lead}</p>}
          {kicker && <div className="rg-phero-kicker">{kicker}</div>}
          {actions && <div className="rg-phero-actions">{actions}</div>}
        </div>
        {media && (
          <div className="rg-phero-media">
            <Slot id={media} label={mediaLabel || "Real photo"} radius={20} style={{ width: "100%", height: 380 }} />
          </div>
        )}
      </div>
    </header>
  );
}

function SectionHead({ eyebrow, title, sub, center = false, light = false }) {
  return (
    <div className={"rg-section-head" + (center ? "" : " two")} style={center ? {} : { display: "block", maxWidth: 760 }}>
      {eyebrow && <Eyebrow center={center} style={light ? { color: "var(--cream)" } : {}}>{eyebrow}</Eyebrow>}
      <h2 className={"rg-h2" + (center ? " is-center" : "") + (light ? " on-dark" : "")} style={{ marginTop: 12 }}>{title}</h2>
      {sub && <p className={"rg-section-sub" + (center ? "" : " left") + (light ? " on-dark" : "")} style={{ marginTop: 12 }}>{sub}</p>}
    </div>
  );
}

function FAQ({ items, title = "Frequently asked questions", eyebrow = "FAQs" }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section rg-faq">
      <div className="wrap rg-faq-wrap">
        <div className="rg-faq-head">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="rg-h2" style={{ marginTop: 12 }}>{title}</h2>
        </div>
        <div className="rg-faq-list">
          {items.map((it, i) => (
            <div key={i} className={"rg-faq-item" + (open === i ? " is-open" : "")}>
              <button className="rg-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <Icon name={open === i ? "minus" : "plus"} size={20} />
              </button>
              <div className="rg-faq-a" style={{ maxHeight: open === i ? "400px" : "0" }}>
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand({ title, text, primary = ["Donate now", "/donate"], secondary, tone = "blue" }) {
  return (
    <section className="section rg-ctaband-sec">
      <div className="wrap wrap-wide">
        <div className={"rg-ctaband tone-" + tone}>
          <div>
            <h2 className="rg-h2 on-dark">{title}</h2>
            {text && <p className="rg-ctaband-text">{text}</p>}
          </div>
          <div className="rg-ctaband-btns">
            <a href={primary[1]} className="btn btn-rose btn-lg"><Icon name="heart" size={18} /> {primary[0]}</a>
            {secondary && <a href={secondary[1]} className="btn btn-on-dark btn-lg">{secondary[0]}</a>}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatRow({ items, light = false }) {
  return (
    <div className={"rg-statrow" + (light ? " is-light" : "")}>
      {items.map((s, i) => (
        <div className="rg-stat" key={i}>
          <div className="rg-stat-num">{typeof s.value === "number" ? <Counter to={s.value} suffix={s.suffix || ""} /> : s.value}</div>
          <div className="rg-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function IconCard({ icon, title, children, tone = "blue" }) {
  return (
    <div className={"rg-iconcard card tone-" + tone}>
      <span className="rg-iconcard-ic"><Icon name={icon} size={24} /></span>
      <h3 className="rg-iconcard-title">{title}</h3>
      <p className="rg-iconcard-text">{children}</p>
    </div>
  );
}

function CheckList({ items, columns = 1 }) {
  return (
    <ul className="rg-checklist" style={{ columns }}>
      {items.map((it, i) => (
        <li key={i}><span className="rg-check"><Icon name="check" size={14} /></span> {it}</li>
      ))}
    </ul>
  );
}

function Steps({ items }) {
  return (
    <div className="rg-steps-flow">
      {items.map((s, i) => (
        <div className="rg-stepflow" key={i}>
          <div className="rg-stepflow-num">{i + 1}</div>
          <div className="rg-stepflow-body">
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div className="rg-timeline">
      {items.map((t, i) => (
        <div className="rg-tl-item" key={i}>
          <div className="rg-tl-year">{t.year}</div>
          <div className="rg-tl-dot" />
          <div className="rg-tl-body card">
            <h4>{t.t}</h4>
            <p>{t.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PageFoot({ active }) {
  const goDonate = () => { window.location.href = "/donate"; };
  return (
    <>
      <Footer onDonate={goDonate} />
      <StickyBar onDonate={goDonate} showWhatsapp={true} />
    </>
  );
}

Object.assign(window, { Breadcrumb, PageHero, SectionHead, FAQ, CTABand, StatRow, IconCard, CheckList, Steps, Timeline, PageFoot });
