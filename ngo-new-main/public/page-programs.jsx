/* RG Care — Programs page (deep per-program detail) */
const { education, healthcare, skills, community } = window.RGP.programDetail;
const PROGS = [education, healthcare, skills, community];
const PROG_IDS = ["education", "healthcare", "skills", "community"];

function ProgramBlock({ p, id, i }) {
  const flip = i % 2 === 1;
  const band = i % 2 === 0 ? "rg-band-white" : "rg-band-cream";
  return (
    <section className={"section rg-progblock " + band} id={id}>
      <div className="wrap wrap-wide">
        <div className={"rg-feature" + (flip ? " flip" : "")}>
          <div className="rg-feature-media">
            <Slot id={"prog-" + id} label={p.tag + " — real photo"} radius={24} style={{ width: "100%", height: 440 }} />
          </div>
          <div>
            <span className="chip" style={{ marginBottom: 14 }}><Icon name={p.icon} size={15} /> {p.tag}</span>
            <h2 className="rg-h2">{p.title}</h2>
            <p className="rg-lead" style={{ marginTop: 16 }}>The problem</p>
            <p className="rg-prose" style={{ marginTop: 6 }}>{p.problem}</p>
            <p className="rg-lead" style={{ marginTop: 20, marginBottom: 12 }}>What we set out to do</p>
            <CheckList items={p.objectives} />
          </div>
        </div>

        {/* methodology */}
        <div style={{ marginTop: "clamp(40px,5vw,64px)" }}>
          <h3 className="rg-h3">How it works</h3>
          <div className="rg-grid-2" style={{ marginTop: 20 }}>
            {p.methodology.map((m) => (
              <div className="card" key={m.t} style={{ padding: "22px 24px" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--brown-deep)" }}>{m.t}</h4>
                <p className="rg-prose" style={{ marginTop: 6 }}>{m.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* metrics */}
        <div className="card" style={{ marginTop: 28, padding: "10px 0", background: "var(--blue-darker)" }}>
          <StatRow light items={p.metrics} />
        </div>

        {/* mini faq + CTAs */}
        <div className="rg-split" style={{ marginTop: "clamp(36px,4vw,52px)", alignItems: "start" }}>
          <div>
            <h3 className="rg-h3" style={{ marginBottom: 16 }}>Good to know</h3>
            <div className="rg-faq-list">
              {p.faqs.map((f, k) => (
                <div className="rg-faq-item is-open" key={k} style={{ boxShadow: "var(--sh-sm)" }}>
                  <div className="rg-faq-q" style={{ cursor: "default", paddingBottom: 8 }}>{f.q}</div>
                  <div className="rg-faq-a" style={{ maxHeight: "none" }}><p style={{ paddingTop: 0 }}>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: "30px 28px", background: "var(--cream-soft)" }}>
            <h3 className="rg-h3">Help power {p.tag.toLowerCase()}</h3>
            <p className="rg-prose" style={{ marginTop: 8, marginBottom: 18 }}>Your support turns this program into real outcomes for real people.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="/donate" className="btn btn-primary"><Icon name="heart" size={17} /> Donate to this program</a>
              <a href="/volunteer" className="btn btn-ghost">Volunteer</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsPage() {
  return (
    <>
      <Nav solid active="Programs" />
      <PageHero
        trail={[["Home", "/"], ["Programs"]]}
        eyebrow="What we do"
        title="Four programs. One outcome: communities that thrive."
        lead="Each program is designed to compound — a child who stays in school, a mother who earns, a village that no longer waits for help to arrive."
        actions={<>
          <a href="/donate" className="btn btn-primary btn-lg"><Icon name="heart" size={18} /> Donate now</a>
          <a href="/csr" className="btn btn-ghost btn-lg">Partner with us</a>
        </>}
      />

      {/* program nav tabs */}
      <section style={{ padding: "34px 0 6px", background: "var(--white)" }}>
        <div className="wrap wrap-wide">
          <div className="rg-pill-tabs" style={{ justifyContent: "center" }}>
            {PROGS.map((p, i) => <a key={p.tag} href={"#" + PROG_IDS[i]} className="rg-pill-tab"><Icon name={p.icon} size={16} /> {p.tag}</a>)}
          </div>
        </div>
      </section>

      {PROGS.map((p, i) => <ProgramBlock key={PROG_IDS[i]} p={p} id={PROG_IDS[i]} i={i} />)}

      <CTABand title="Every program starts with a gift." text="Pick a cause that moves you, or let us direct your support where it's needed most this month."
        primary={["Donate now", "/donate"]} secondary={["See success stories", "/stories"]} />

      <PageFoot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<ProgramsPage />);
