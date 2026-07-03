/* RG Care — About page */
function AboutPage() {
  const A = window.RGP.about;
  const O = window.RG.org;
  return (
    <>
      <Nav solid active="About" />
      <PageHero
        trail={[["Home", "/"], ["About"]]}
        eyebrow="About us"
        title="A movement for dignity, built on proof."
        lead="Reddington Global Care Foundation works on the ground to educate, heal and empower India's most underserved communities — with governance and measurable impact at its core."
        media="about-hero" mediaLabel="Team / beneficiaries (real photo)"
        actions={<>
          <a href="/donate" className="btn btn-primary btn-lg"><Icon name="heart" size={18} /> Support our work</a>
          <a href="/transparency" className="btn btn-ghost btn-lg">See our governance</a>
        </>}
      />

      {/* Our story */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide rg-split wide-right">
          <div className="rg-feature-media">
            <Slot id="about-story" label="Founding moment / field photo" radius={24} style={{ width: "100%", height: 420 }} />
          </div>
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12 }}>It started with one classroom.</h2>
            <div className="rg-prose" style={{ marginTop: 16 }}>
              <p>{O.about}</p>
              <p>We began with a simple conviction: talent is everywhere, but opportunity is not. What started as a single after-school centre grew into a nationwide effort spanning education, healthcare, skill development and community empowerment.</p>
              <p>Today we work across 100+ communities with field teams who live the mission daily — and with companies who trust us to deliver their CSR transparently and at scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide">
          <div className="rg-grid-2">
            <div className="card" style={{ padding: "34px 32px" }}>
              <span className="rg-iconcard-ic" style={{ background: "var(--blue-tint)", color: "var(--accent-deep)" }}><Icon name="compass" size={24} /></span>
              <h3 className="rg-h3" style={{ marginTop: 14 }}>Our mission</h3>
              <p className="rg-prose" style={{ marginTop: 10 }}>To unlock opportunity for the underprivileged through education, healthcare, skills and community empowerment — delivered with transparency, accountability and on-ground execution.</p>
            </div>
            <div className="card" style={{ padding: "34px 32px" }}>
              <span className="rg-iconcard-ic" style={{ background: "var(--rose-tint)", color: "var(--rose-deep)" }}><Icon name="telescope" size={24} /></span>
              <h3 className="rg-h3" style={{ marginTop: 14 }}>Our vision</h3>
              <p className="rg-prose" style={{ marginTop: 10 }}>A society where every child learns, every family can access care, and every community has the skills and agency to thrive on its own — no longer waiting for help to arrive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact journey stats */}
      <section className="section rg-band-blue">
        <div className="wrap wrap-wide">
          <SectionHead center light eyebrow="Impact journey" title="Five years, measurable change" />
          <StatRow light items={[
            { value: 52000, suffix: "+", label: "Lives impacted" },
            { value: 140, suffix: "+", label: "Communities reached" },
            { value: 26, suffix: "", label: "Ongoing programs" },
            { value: 1800, suffix: "+", label: "Active volunteers" },
          ]} />
        </div>
      </section>

      {/* Values */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Our values" title="What guides every decision" sub="Six principles that hold whether we're in a classroom, a clinic or a boardroom." />
          <div className="rg-grid-3" style={{ marginTop: 36 }}>
            {A.values.map((v) => <IconCard key={v.t} icon={v.icon} title={v.t} tone={v.icon === "heart-handshake" ? "rose" : "blue"}>{v.d}</IconCard>)}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section rg-band-cream">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <SectionHead center eyebrow="Our journey" title="How we grew" />
          <div style={{ marginTop: 40 }}><Timeline items={A.timeline} /></div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Leadership & team" title="The people behind the mission" sub="A committed team turning RG Care's vision into measurable impact on the ground." />
          <div className="rg-grid-3" style={{ marginTop: 36 }}>
            {A.leadership.map((p) => (
              <div className="rg-person card" key={p.name} style={{ padding: "24px 20px" }}>
                <Slot id={p.slot} label="Portrait" shape="circle" style={{ width: 110, height: 110 }} />
                <div className="rg-person-name">{p.name}</div>
                <div className="rg-person-role">{p.role}</div>
                <div className="rg-person-bio">{p.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide rg-split">
          <div>
            <Eyebrow>Governance</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12 }}>Accountable by design</h2>
            <p className="rg-prose" style={{ marginTop: 14, marginBottom: 22 }}>Strong governance isn't a footnote — it's how we earn trust. Our structure keeps us honest and our funders confident.</p>
            <CheckList items={A.governance} />
            <a href="/transparency" className="rg-textlink">View transparency & reports <Icon name="arrow-right" size={16} /></a>
          </div>
          <div className="rg-feature-media">
            <Slot id="about-gov" label="Board / office (real photo)" radius={24} style={{ width: "100%", height: 420 }} />
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="section rg-band-white">
        <div className="wrap" style={{ maxWidth: 880, textAlign: "center" }}>
          <SectionHead center eyebrow="Recognition & credentials" title="Registered, audited, trusted" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 28 }}>
            {A.recognition.map((r) => <span className="chip" key={r}><Icon name="badge-check" size={15} /> {r}</span>)}
          </div>
        </div>
      </section>

      <FAQ items={A.faqs} title="About RG Care — your questions" />

      <CTABand title="Be part of what comes next." text="Whether you give, volunteer or partner, you make the next classroom, clinic and livelihood possible."
        primary={["Donate now", "/donate"]} secondary={["Become a volunteer", "/volunteer"]} />

      <PageFoot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<AboutPage />);
