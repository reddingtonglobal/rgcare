/* RG Care — Transparency & reports */
function FinanceBar({ label, value, suffix, tone }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontWeight: 600, color: "var(--brown-deep)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: tone }}>{value}{suffix}</span>
      </div>
      <div style={{ height: 12, borderRadius: 999, background: "var(--cream-soft)", overflow: "hidden" }}>
        <div style={{ width: value + "%", height: "100%", borderRadius: 999, background: tone }} />
      </div>
    </div>
  );
}

function TransparencyPage() {
  const T = window.RGP.transparency;
  const O = window.RG.org;
  const tones = ["var(--accent)", "var(--rose)", "var(--brown)"];
  return (
    <>
      <Nav solid />
      <PageHero tint="blue"
        trail={[["Home", "/"], ["Transparency"]]}
        eyebrow="Transparency"
        title="Built on good governance from day one."
        lead="We're a registered NGO with our certifications, policies and safeguards already in place. Verify our credentials and read every policy that governs how we work."
        actions={<a href="#documents" className="btn btn-primary btn-lg"><Icon name="file-check" size={18} /> View documents</a>}
      />

      {/* registrations */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Registrations & credentials" title="Registered and certified" sub="Our legal standing and certifications, available for verification." />
          <div className="rg-grid-4" style={{ marginTop: 36 }}>
            {[["Registered NGO", O.reg, "badge-check"], ["80G certified", O.g80, "receipt-indian-rupee"], ["12A registered", O.a12, "file-check"], ["CSR-1 eligible", O.csr1, "building-2"]].map(([t, v, ic]) => (
              <div className="card" key={t} style={{ padding: "24px 22px", textAlign: "center" }}>
                <span className="rg-iconcard-ic" style={{ background: "var(--blue-tint)", color: "var(--accent-deep)", margin: "0 auto 12px" }}><Icon name={ic} size={22} /></span>
                <b style={{ display: "block", color: "var(--brown-deep)" }}>{t}</b>
                <span className="muted" style={{ fontSize: 13 }}>{v}</span>
              </div>
            ))}
          </div>
          <p className="muted" style={{ textAlign: "center", marginTop: 20, fontSize: 13.5 }}>Registration numbers are being finalised for publication on this site.</p>
        </div>
      </section>

      {/* documents */}
      <section className="section rg-band-cream" id="documents">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Documents & policies" title="Registered and certified" sub="Our legal registration, certifications and policies — available for verification." />
          <div className="rg-grid-2" style={{ marginTop: 36 }}>
            {T.docs.map((d) => (
              <a href={d.href || "#"} target="_blank" rel="noopener" className="rg-doc" key={d.t}>
                <span className="rg-doc-ic"><Icon name={d.ic} size={20} /></span>
                <span className="rg-doc-meta"><b>{d.t}</b><span>{d.meta}</span></span>
                <Icon name="download" size={18} cls="rg-doc-arr" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* policies + governance */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide rg-split">
          <div>
            <Eyebrow>Policies</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12, marginBottom: 20 }}>Documented and enforced</h2>
            <CheckList items={T.policies} columns={1} />
          </div>
          <div>
            <Eyebrow>Governance</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12, marginBottom: 20 }}>How we stay accountable</h2>
            <CheckList items={window.RGP.about.governance} />
            <a href="/about" className="rg-textlink">Meet our leadership <Icon name="arrow-right" size={16} /></a>
          </div>
        </div>
      </section>

      <CTABand title="Transparency is a promise we keep." text="Give with confidence — and verify it any time."
        primary={["Donate now", "/donate"]} secondary={["Talk to us", "/contact"]} />

      <PageFoot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<TransparencyPage />);
