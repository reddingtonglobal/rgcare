/* RG Care — Success stories slider, Volunteer funnel, CSR section */

function Stories() {
  const stories = window.RG.stories;
  const [i, setI] = useState(0);
  const go = (d) => setI((p) => (p + d + stories.length) % stories.length);
  const s = stories[i];
  return (
    <section className="section rg-stories" id="stories">
      <div className="wrap wrap-wide">
        <div className="rg-section-head two">
          <div>
            <Reveal><Eyebrow>Success stories</Eyebrow></Reveal>
            <Reveal delay={70} as="h2" className="rg-h2">Change has a face — and a name.</Reveal>
          </div>
          <div className="rg-stories-nav">
            <button aria-label="Previous" onClick={() => go(-1)}><Icon name="arrow-left" size={20} /></button>
            <button aria-label="Next" onClick={() => go(1)}><Icon name="arrow-right" size={20} /></button>
          </div>
        </div>
        <div className="rg-testi card">
          <span className="chip">{s.program}</span>
          <Icon name="quote" size={32} cls="rg-testi-quote-ic" />
          <p className="rg-testi-quote">{s.quote}</p>
          <div className="rg-testi-avatar"><Slot id={s.slot} label={s.slotLabel} shape="circle" style={{ width: 64, height: 64 }} /></div>
          <div className="rg-testi-name">{s.name}</div>
          <div className="rg-testi-place"><Icon name="map-pin" size={15} /> {s.place}</div>
          <div className="rg-testi-result"><Icon name="trending-up" size={17} /> {s.result}</div>
          <div className="rg-testi-foot">
            <div className="rg-testi-dots">
              {stories.map((_, k) => (
                <button key={k} aria-label={"Story " + (k + 1)}
                  className={"rg-dot" + (k === i ? " is-on" : "")} onClick={() => setI(k)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Volunteer({ layout = "framed" }) {
  const interests = window.RG.interests;
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: interests[0], msg: "", resume: "" });
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitErr, setSubmitErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Valid email needed";
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, "").slice(-10))) er.phone = "10-digit phone";
    setErr(er);
    if (Object.keys(er).length > 0) return;

    setBusy(true);
    setSubmitErr("");
    try {
      const res = await fetch(window.RG_API + "/volunteer-with-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.interest,
          note: form.msg || "Interested in volunteering",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setDone(true);
    } catch (e) {
      setSubmitErr("Could not submit. Please email us at care@rgcare.in");
    } finally {
      setBusy(false);
    }
  };
  const benefits = [
    ["users-round", "Community", "Join 1,800+ changemakers"],
    ["sparkles", "Real experience", "Field skills & certificates"],
    ["heart", "Purpose", "See your impact first-hand"],
    ["award", "Recognition", "References & awards"],
  ];
  const isPhoto = layout === "photo";
  const isLight = layout === "light";
  const onDark = !isLight;
  return (
    <section className={"section rg-volunteer rg-vol-" + layout} id="volunteer">
      {isPhoto && <>
        <Slot id="vol-bg" label="Volunteers in action (real photo, full width)" radius={0} className="rg-vol-bg" />
        <div className="rg-vol-scrim" />
      </>}
      <div className="wrap wrap-wide rg-vol-grid">
        <div className="rg-vol-intro">
          {isLight && (
            <div className="rg-vol-photo-card">
              <Slot id="vol-bg" label="Volunteers in action (real photo)" radius={0} style={{ width: "100%", height: "100%" }} />
            </div>
          )}
          <div className="rg-vol-copy">
            <Eyebrow style={onDark ? { color: "#fff" } : null}>Volunteer</Eyebrow>
            <h2 className={"rg-h2" + (onDark ? " on-dark" : "")} style={{ marginTop: 14 }}>Be the reason someone<br/>smiles today.</h2>
            <p className="rg-vol-sub">Teach a class, run a health camp, mentor a young person. Whatever your skill, there's a place for you here.</p>
            <div className="rg-vol-benefits">
              {benefits.map(([ic, t, d]) => (
                <div className="rg-vol-benefit" key={t}>
                  <span className="rg-vol-benefit-ic"><Icon name={ic} size={20} /></span>
                  <div><b>{t}</b><span>{d}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rg-vol-card card">
          {done ? (
            <div className="rg-vol-done">
              <div className="rg-done-check"><Icon name="check" size={38} /></div>
              <h3 className="rg-donate-h">You're in, {form.name.split(" ")[0]}!</h3>
              <p className="rg-donate-sub">Our volunteer team will reach out within 48 hours about <b>{form.interest}</b> opportunities near you.</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setForm({ name: "", email: "", phone: "", interest: interests[0], msg: "", resume: "" }); setDone(false); }}>Submit another</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 className="rg-donate-h">Become a volunteer</h3>
              <p className="rg-donate-sub">Takes 60 seconds. No experience needed.</p>
              <div className="rg-fields">
                {[["name", "Full name", "text", "Your name"],
                  ["email", "Email", "email", "you@email.com"],
                  ["phone", "Phone", "tel", "98765 43210"]].map(([k, label, type, ph]) => (
                  <label className={"rg-field" + (err[k] ? " has-err" : "")} key={k}>
                    <span>{label}</span>
                    <input type={type} placeholder={ph} value={form[k]}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
                    {err[k] && <em>{err[k]}</em>}
                  </label>
                ))}
                <label className="rg-field">
                  <span>Area of interest</span>
                  <div className="rg-select">
                    <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                      {interests.map((x) => <option key={x}>{x}</option>)}
                    </select>
                    <Icon name="chevron-down" size={16} />
                  </div>
                </label>
                <label className="rg-field rg-file">
                  <span>Resume (optional)</span>
                  <div className={"rg-upload" + (form.resume ? " has-file" : "")}>
                    <Icon name={form.resume ? "file-check" : "upload"} size={18} />
                    <span>{form.resume || "Drop a PDF or click to upload"}</span>
                    <input type="file" accept=".pdf,.doc,.docx"
                      onChange={(e) => setForm({ ...form, resume: e.target.files[0]?.name || "" })} />
                  </div>
                </label>
                <label className="rg-field">
                  <span>Message (optional)</span>
                  <textarea rows="2" placeholder="What would you like to help with?" value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })} />
                </label>
              </div>
              <button type="submit" className="btn btn-primary rg-donate-go" disabled={busy}>
                {busy ? "Submitting…" : <><span>Submit application</span> <Icon name="arrow-right" size={18} /></>}
              </button>
              {submitErr && <p style={{ color: "#c0392b", fontSize: 13, marginTop: 8 }}>{submitErr}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function CSR() {
  const points = window.RG.csrPoints;
  return (
    <section className="section rg-csr" id="csr">
      <div className="wrap wrap-wide">
        <div className="rg-section-head">
          <Reveal><Eyebrow center style={{ color: "var(--cream)" }}>CSR partnerships</Eyebrow></Reveal>
          <Reveal delay={70} as="h2" className="rg-h2 on-dark is-center">A CSR partner your board can trust</Reveal>
          <Reveal delay={130} as="p" className="rg-section-sub on-dark">
            Compliance-ready and measurable. We turn your CSR budget into outcomes you can report with confidence.
          </Reveal>
        </div>
        <div className="rg-csr-grid">
          {points.map((p, i) => (
            <Reveal as="div" delay={i * 80} className="rg-csr-card" key={p.title}>
              <span className="rg-csr-ic"><Icon name={p.icon} size={24} /></span>
              <h3 className="rg-csr-title">{p.title}</h3>
              <p className="rg-csr-desc">{p.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <div className="rg-csr-cta">
            <div>
              <h3 className="rg-csr-cta-h">Let's build a measurable impact program together.</h3>
              <p>Download our CSR deck or book a 30-minute consultation with our partnerships team.</p>
            </div>
            <div className="rg-csr-cta-btns">
              <button className="btn btn-rose btn-lg"><Icon name="calendar" size={18} /> Schedule consultation</button>
              <a href="csr.html" className="btn btn-on-dark btn-lg"><Icon name="arrow-right" size={18} /> Explore CSR partnerships</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Stories, Volunteer, CSR });
