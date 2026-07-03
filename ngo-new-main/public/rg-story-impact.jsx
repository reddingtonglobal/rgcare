/* RG Care — About (problem), Impact counters, Programs */

function About() {
  return (
    <section className="section rg-about" id="about">
      <div className="wrap wrap-wide rg-about-grid">
        <div className="rg-about-media">
          <Slot id="about-main" label="Real beneficiary — child or family" radius={24}
                style={{ width: "100%", height: 440 }} />
          <div className="rg-about-float card">
            <Icon name="quote" size={20} cls="rg-about-quote-ic" />
            <p className="serif-q rg-about-quote">“We don't hand out charity. We build the conditions for dignity.”</p>
            <span className="rg-about-quote-by">— RG Care field team</span>
          </div>
        </div>
        <div className="rg-about-text">
          <Reveal><Eyebrow>Why we exist</Eyebrow></Reveal>
          <Reveal delay={70} as="h2" className="rg-h2">Talent is everywhere. Opportunity is not.</Reveal>
          <Reveal delay={130} as="p" className="rg-about-lead">
            Across India, millions of children leave school early, families go without basic
            healthcare, and young people have skills the market never sees. The gap isn't
            ability — it's access.
          </Reveal>
          <Reveal delay={190} as="p" className="muted" style={{ marginTop: 14 }}>
            RG Care works on the ground in the communities that need it most — with strong
            governance, measurable outcomes and proof of every rupee spent. We focus on four
            things that compound: education, healthcare, skills and community.
          </Reveal>
          <Reveal delay={250}>
            <div className="rg-about-points">
              {[
                ["map-pin", "On-the-ground execution", "Field teams in 140+ communities"],
                ["line-chart", "Measurable outcomes", "Tracked and openly reported"],
                ["heart-handshake", "Dignity-first", "Empowerment, never hand-outs"],
              ].map(([ic, t, d]) => (
                <div className="rg-point" key={t}>
                  <span className="rg-point-ic"><Icon name={ic} size={20} /></span>
                  <div><b>{t}</b><span>{d}</span></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={310}>
            <a href="#programs" className="rg-textlink">See how we work <Icon name="arrow-right" size={16} /></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const data = window.RG.impact;
  return (
    <section className="section rg-impact" id="impact">
      <div className="wrap wrap-wide">
        <div className="rg-section-head">
          <Reveal><Eyebrow center>Our impact</Eyebrow></Reveal>
          <Reveal delay={70} as="h2" className="rg-h2 is-center">Proof, not promises</Reveal>
          <Reveal delay={130} as="p" className="rg-section-sub">
            Real numbers from the communities where we work — and we report on every one of them.
          </Reveal>
        </div>
        <div className="rg-impact-grid">
          {data.map((d, i) => (
            <Reveal as="div" delay={i * 70} className="rg-impact-card card" key={d.label}>
              <span className="rg-impact-ic"><Icon name={d.icon} size={24} /></span>
              <div className="rg-impact-num"><Counter to={d.value} suffix={d.suffix} /></div>
              <div className="rg-impact-label">{d.label}</div>
              <div className="rg-impact-note">{d.note}</div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="rg-impact-foot">
            <span><Icon name="map" size={18} /> Active across <b>12 states</b> from Delhi to Tamil Nadu</span>
            <a href="/transparency" className="rg-textlink sm">See our credentials <Icon name="arrow-right" size={15} /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Programs() {
  const progs = window.RG.programs;
  return (
    <section className="section rg-programs" id="programs">
      <div className="wrap wrap-wide">
        <div className="rg-section-head two">
          <div>
            <Reveal><Eyebrow>What we do</Eyebrow></Reveal>
            <Reveal delay={70} as="h2" className="rg-h2">Four programs, one outcome:<br/>communities that thrive on their own.</Reveal>
          </div>
          <Reveal delay={130} as="p" className="rg-section-sub left">
            Each program is designed to compound — a child who stays in school, a mother who earns,
            a village that no longer waits for help to arrive.
          </Reveal>
        </div>
        <div className="rg-programs-grid">
          {progs.map((p, i) => (
            <Reveal as="article" delay={i * 80} className="rg-prog card" key={p.title}>
              <div className="rg-prog-body">
                <span className="rg-prog-ic"><Icon name={p.icon} size={26} /></span>
                <h3 className="rg-prog-title">{p.title}</h3>
                <p className="rg-prog-blurb">{p.blurb}</p>
                <a href="#stories" className="rg-textlink sm">See the impact <Icon name="arrow-right" size={15} /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About, Impact, Programs });
