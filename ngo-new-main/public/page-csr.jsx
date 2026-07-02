/* RG Care — CSR partnerships microsite */
function ConsultForm() {
  const [f, setF] = useState({ name: "", company: "", email: "", phone: "", budget: "", msg: "" });
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitErr, setSubmitErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name || !f.company || !/^\S+@\S+\.\S+$/.test(f.email)) return;
    setBusy(true);
    setSubmitErr("");
    try {
      const res = await fetch(window.RG_API + "/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          phone: f.phone,
          subject: "CSR Partnership Consultation – " + f.company,
          message: [
            "Company: " + f.company,
            f.budget ? "Budget: " + f.budget : "",
            f.msg ? "Message: " + f.msg : "",
          ].filter(Boolean).join("\n"),
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setDone(true);
    } catch (e) {
      setSubmitErr("Could not submit. Please email partnerships@rgcare.in");
    } finally {
      setBusy(false);
    }
  };
  if (done) return (
    <div className="rg-vol-done" style={{ textAlign: "center", padding: 20 }}>
      <div className="rg-done-check"><Icon name="check" size={38} /></div>
      <h3 className="rg-donate-h">Thanks, {f.name.split(" ")[0]}!</h3>
      <p className="rg-donate-sub">Our partnerships team will reach out to {f.company} within one business day to schedule your consultation.</p>
    </div>
  );
  return (
    <form onSubmit={submit}>
      <h3 className="rg-donate-h">Book a 30-minute consultation</h3>
      <p className="rg-donate-sub">Tell us about your CSR goals — we'll come prepared with ideas.</p>
      <div className="rg-fields">
        <div className="rg-fields-2">
          <label className="rg-field"><span>Name</span><input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" /></label>
          <label className="rg-field"><span>Company</span><input value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} placeholder="Company" /></label>
        </div>
        <div className="rg-fields-2">
          <label className="rg-field"><span>Work email</span><input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@company.com" /></label>
          <label className="rg-field"><span>Phone</span><input type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="98765 43210" /></label>
        </div>
        <label className="rg-field"><span>Indicative CSR budget (optional)</span>
          <div className="rg-select">
            <select value={f.budget} onChange={(e) => setF({ ...f, budget: e.target.value })}>
              <option value="">Select a range</option>
              <option>Under ₹10 lakh</option><option>₹10–50 lakh</option><option>₹50 lakh – 1 crore</option><option>₹1 crore+</option>
            </select>
            <Icon name="chevron-down" size={16} />
          </div>
        </label>
        <label className="rg-field"><span>What would you like to achieve?</span><textarea rows="3" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} placeholder="Cause areas, geographies, timelines…" /></label>
      </div>
      {submitErr && <p style={{ color: "#c0392b", fontSize: 13, margin: "6px 0" }}>{submitErr}</p>}
      <button type="submit" className="btn btn-primary rg-donate-go" disabled={busy}>
        <Icon name="calendar" size={18} /> {busy ? "Sending…" : "Request consultation"}
      </button>
    </form>
  );
}

function CSRPage() {
  const C = window.RGP.csr;
  return (
    <>
      <Nav solid active="CSR" />
      <PageHero tint="blue"
        trail={[["Home", "RG Care Foundation.html"], ["CSR Partnerships"]]}
        eyebrow="CSR partnerships"
        title="A CSR partner your board can trust."
        lead="Compliance-ready, transparent and measurable. We turn your CSR budget into outcomes you can report with confidence."
        actions={<>
          <a href="#consult" className="btn btn-primary btn-lg"><Icon name="calendar" size={18} /> Book a consultation</a>
          <a href="#focus" className="btn btn-ghost btn-lg"><Icon name="compass" size={18} /> Explore our programs</a>
        </>}
      />

      {/* trust stats */}
      <section className="section rg-band-blue" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="wrap wrap-wide">
          <StatRow light items={[
            { value: 50000, suffix: "+", label: "Lives impacted" },
            { value: 100, suffix: "%", label: "Audit-ready reporting" },
            { value: 12, suffix: "", label: "States of delivery" },
          ]} />
        </div>
      </section>

      {/* focus areas — SDG framework */}
      <section className="section rg-band-white" id="focus">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Focus areas" title="Problem → solution, mapped to the SDGs" sub="Every program is built around a measurable problem and aligned to a UN Sustainable Development Goal." />
          <div className="rg-focus-grid" style={{ marginTop: 36 }}>
            {C.focusAreas.map((f) => (
              <div className="card rg-focus" key={f.t}>
                <div className="rg-focus-top">
                  <div className="rg-focus-id">
                    <span className={"rg-focus-ic " + f.tone}><Icon name={f.icon} size={26} /></span>
                    <div><div className="rg-focus-name">{f.t}</div><div className="rg-focus-sdg">{f.sdg}</div></div>
                  </div>
                </div>
                <div className="rg-ba">
                  <div className="b"><div className="lab">Problem</div><div className="txt">{f.problem}</div></div>
                  <div className="a"><div className="lab">Solution</div><div className="txt">{f.solution}</div></div>
                </div>
                <span className="rg-focus-target"><Icon name="target" size={16} /> Target: {f.target}</span>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 24, fontSize: 15, display: "flex", alignItems: "center", gap: 9, justifyContent: "center" }}>
            <Icon name="info" size={16} /> Projects mapped to SDGs 3, 4, 5, 7, 8 &amp; 10 with measurable KPIs.
          </p>
        </div>
      </section>

      {/* impact targets */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Impact targets · FY 2025–26" title="7,000+ lives — our projected goal" sub={C.impact.note} />
          <div className="rg-impact-csr" style={{ marginTop: 36 }}>
            <div className="card rg-impact-total">
              <div className="eyebrow" style={{ color: "var(--blue-deep)" }}>Total beneficiaries (projected)</div>
              <div className="n" style={{ marginTop: 12 }}>{C.impact.total}</div>
              <div className="rg-impact-bars">
                {C.impact.mix.map(([label, pct]) => (
                  <div className="row" key={label}>
                    <div><span>{label}</span><span>{pct}%</span></div>
                    <div className="rg-impact-bar"><i style={{ width: pct + "%" }}></i></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rg-kpi-grid">
              {C.impact.kpis.map(([n, l]) => (
                <div className="card rg-kpi" key={l}><div className="n">{n}</div><div className="l">{l}</div></div>
              ))}
            </div>
          </div>
          <p className="muted" style={{ marginTop: 22, fontSize: 15, display: "flex", alignItems: "center", gap: 9, justifyContent: "center" }}>
            <Icon name="info" size={16} /> Impact-tracking framework in development · baseline data collection ongoing · quarterly reporting planned.
          </p>
        </div>
      </section>

      {/* why partner */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Why partner with us" title="Why companies choose RG Care" sub="A partner built for boards, auditors and stakeholders — not just good intentions." />
          <div className="rg-grid-3" style={{ marginTop: 36 }}>
            <IconCard icon="shield-check" title="Compliance-ready from day one" tone="blue">CSR-1 eligible, Section 8 and 80G in place — partner with confidence and none of the legal friction.</IconCard>
            <IconCard icon="eye" title="You see where every rupee goes" tone="blue">Invoice-level documentation, field proof and reporting designed to satisfy your auditors.</IconCard>
            <IconCard icon="target" title="Built around your CSR thesis" tone="blue">Custom programs mapped to the SDGs and the focus areas your company cares about most.</IconCard>
          </div>
        </div>
      </section>

      {/* partnership models */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Partnership models" title="Ways to work together" sub="Pick a model — or we'll design a custom program around your CSR thesis." />
          <div className="rg-grid-4" style={{ marginTop: 36 }}>
            {C.models.map((m) => <IconCard key={m.t} icon={m.icon} title={m.t} tone="blue">{m.d}</IconCard>)}
          </div>
          <div className="card" style={{ marginTop: 28, padding: "30px 32px" }}>
            <Eyebrow>Partnership options</Eyebrow>
            <div className="rg-opt-wrap" style={{ marginTop: 18 }}>
              <table className="rg-opt-table">
                <thead><tr><th>Option type</th><th>Duration</th><th>Scope</th><th>Investment</th></tr></thead>
                <tbody>
                  {C.options.map((o) => (
                    <tr key={o.t}><td className="name">{o.t}</td><td>{o.dur}</td><td>{o.scope}</td><td className="inv">{o.inv}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* engagement journey */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Engagement journey" title="From discovery to scale-up" sub="A clear six-step process, with you in the loop at every stage." />
          <div className="rg-journey" style={{ marginTop: 36 }}>
            {C.journey.map(([t, d], i) => (
              <div className="card step" key={t}>
                <div className="h"><span className="n">{i + 1}</span><span className="t">{t}</span></div>
                <p className="rg-prose">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* compliance */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide rg-split">
          <div className="rg-feature-media">
            <Slot id="csr-compliance" label="Field work / documentation (real photo)" radius={24} style={{ width: "100%", height: 420 }} />
          </div>
          <div>
            <Eyebrow>CSR compliance</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12, marginBottom: 20 }}>Eligible, certified, clean</h2>
            <CheckList items={C.compliance} />
            <a href="transparency.html" className="rg-textlink">See our registrations &amp; audits <Icon name="arrow-right" size={16} /></a>
          </div>
        </div>
      </section>

      {/* reporting framework */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Trust & governance" title="Five core pillars of accountability" sub="The framework that keeps every rupee traceable — from your account to the beneficiary." />
          <div className="rg-grid-4" style={{ marginTop: 36 }}>
            {C.governance.map((g) => <IconCard key={g.t} icon={g.icon} title={g.t} tone="blue">{g.d}</IconCard>)}
          </div>
          <p className="muted" style={{ marginTop: 24, fontSize: 15, display: "flex", alignItems: "center", gap: 9, justifyContent: "center" }}>
            <Icon name="info" size={16} /> Governance framework implementation in progress · external audit planned for FY 2026–27.
          </p>
        </div>
      </section>

      {/* consultation booking */}
      <section className="section rg-band-cream" id="consult">
        <div className="wrap wrap-wide rg-split">
          <div>
            <Eyebrow>Let's talk</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12 }}>Build a measurable impact program together</h2>
            <p className="rg-prose" style={{ marginTop: 14 }}>Book a 30-minute consultation with our partnerships team. We'll align on goals, propose a program and outline KPIs, budget and reporting — no obligation.</p>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12 }}>
              <span className="rg-trust-item"><Icon name="badge-check" size={18} /> CSR-1 registered · Section 135 eligible</span>
              <span className="rg-trust-item"><Icon name="file-bar-chart" size={18} /> Audit-ready quarterly reporting</span>
              <span className="rg-trust-item"><Icon name="map-pin" size={18} /> Delivery across 12 states</span>
            </div>
          </div>
          <div className="card" style={{ padding: "32px 30px" }}><ConsultForm /></div>
        </div>
      </section>

      <FAQ items={C.faqs} title="CSR partnership questions" />

      <CTABand tone="brown" title="Turn your CSR budget into outcomes you can stand behind." text="Compliance, transparency and measurable impact — the partner your stakeholders expect."
        primary={["Book a consultation", "#consult"]} secondary={["Email the team", "contact.html"]} />

      <PageFoot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<CSRPage />);
