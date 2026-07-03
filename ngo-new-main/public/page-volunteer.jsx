/* RG Care — Volunteer hub */
function VolunteerPage() {
  const V = window.RGP.volunteer;
  return (
    <>
      <Nav solid active="Volunteer" />
      <PageHero tint="blue"
        trail={[["Home", "/"], ["Volunteer"]]}
        eyebrow="Volunteer"
        title="Give your time. Change a life — including yours."
        lead="Teach a class, run a health camp, mentor a young person. Whatever your skill, there's a place for you among 1,800+ changemakers."
        actions={<>
          <a href="#apply" className="btn btn-primary btn-lg">Apply to volunteer</a>
          <a href="#opportunities" className="btn btn-ghost btn-lg">Explore roles</a>
        </>}
      />

      {/* opportunities */}
      <section className="section rg-band-white" id="opportunities">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Opportunities" title="Find your role" sub="On the ground or remote, a few hours or a regular commitment — we'll match you to where you're needed." />
          <div className="rg-grid-3" style={{ marginTop: 36 }}>
            {V.opportunities.map((o) => <IconCard key={o.t} icon={o.icon} title={o.t} tone="blue">{o.d}</IconCard>)}
          </div>
        </div>
      </section>

      {/* journey */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide rg-split">
          <div>
            <Eyebrow>The volunteer journey</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12, marginBottom: 24 }}>From sign-up to impact in five steps</h2>
            <Steps items={V.journey} />
          </div>
          <div className="rg-feature-media">
            <Slot id="vol-journey" label="Volunteers in action (real photo)" radius={24} style={{ width: "100%", height: 480 }} />
          </div>
        </div>
      </section>

      {/* training */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Training process" title="You'll never be thrown in cold" sub="Every volunteer is prepared and supported — no experience required." />
          <div className="rg-grid-3" style={{ marginTop: 36 }}>
            <IconCard icon="compass" title="Orientation" tone="blue">A short induction to our mission, values, safety norms and how we work on the ground.</IconCard>
            <IconCard icon="graduation-cap" title="Role-specific training" tone="blue">Practical preparation for your role — teaching methods, camp logistics or campaign tools.</IconCard>
            <IconCard icon="heart-handshake" title="Ongoing mentorship" tone="blue">A coordinator stays with you, answering questions and helping you grow into bigger roles.</IconCard>
          </div>
        </div>
      </section>

      {/* recognition */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Recognition program" title="Your contribution counts — and is counted" />
          <div className="rg-grid-3" style={{ marginTop: 36 }}>
            {V.recognition.map((r) => <IconCard key={r.t} icon={r.icon} title={r.t} tone="rose">{r.d}</IconCard>)}
          </div>
        </div>
      </section>

      {/* the application form (reused) */}
      <div id="apply"><Volunteer /></div>

      <FAQ items={V.faqs} title="Volunteering — your questions" />

      <CTABand title="Ready to make your weekends matter?" text="Join 1,800+ volunteers building a fairer future, one community at a time."
        primary={["Apply to volunteer", "#apply"]} secondary={["See success stories", "/stories"]} />

      <PageFoot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<VolunteerPage />);
