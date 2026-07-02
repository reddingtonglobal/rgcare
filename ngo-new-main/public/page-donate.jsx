/* RG Care — Donate page (full fundraising ecosystem) */
function DonatePage() {
  const D = window.RGP.donate;
  return (
    <>
      <Nav solid />
      <PageHero tint="rose"
        trail={[["Home", "/"], ["Donate"]]}
        eyebrow="Donate"
        title="Your gift becomes a school day, a check-up, a fresh start."
        lead="Every contribution is tracked end-to-end and backed by audited reporting. Give once or monthly — and see exactly what your money does."
        actions={<>
          <a href="#give" className="btn btn-rose btn-lg"><Icon name="heart" size={18} /> Give now</a>
          <a href="transparency" className="btn btn-ghost btn-lg">See where it goes</a>
        </>}
      />

      {/* the working donation widget + rail */}
      <div id="give"><DonateSection style="tiered" /></div>

      {/* donation types */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Ways to give" title="Choose the way that fits you" sub="However you give, it's secure, transparent and 80G tax-deductible." />
          <div className="rg-grid-4" style={{ marginTop: 36 }}>
            {D.types.map((t) => <IconCard key={t.t} icon={t.icon} title={t.t} tone="rose">{t.d}</IconCard>)}
          </div>
        </div>
      </section>

      {/* impact breakdown */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide rg-split">
          <div>
            <Eyebrow>Impact breakdown</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12 }}>See what each amount does</h2>
            <p className="rg-prose" style={{ marginTop: 14 }}>No vague promises. Here's the real-world value of your gift — the same costs our field teams work with every day.</p>
            <div className="rg-feature-media" style={{ marginTop: 20 }}>
              <Slot id="donate-breakdown" label="Beneficiary photo" radius={20} style={{ width: "100%", height: 240 }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {D.breakdown.map((b) => (
              <div className="card" key={b.amt} style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--accent-deep)", minWidth: 92 }}>{b.amt}</span>
                <span style={{ fontSize: 15, color: "var(--ink)" }}>{b.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tax + transparency */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide rg-split">
          <div>
            <Eyebrow>Tax benefits</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12, marginBottom: 20 }}>Give more, because it gives back</h2>
            <CheckList items={D.tax} />
          </div>
          <div className="card" style={{ padding: "32px 30px", background: "var(--blue-tint)", border: "none" }}>
            <span className="rg-iconcard-ic" style={{ background: "#fff", color: "var(--accent-deep)" }}><Icon name="shield-check" size={24} /></span>
            <h3 className="rg-h3" style={{ marginTop: 14 }}>Transparency you can verify</h3>
            <p className="rg-prose" style={{ marginTop: 10, marginBottom: 18 }}>We publish audited statements and quarterly impact reports. Every rupee is accounted for, from disbursal to delivery.</p>
            <a href="transparency" className="btn btn-primary">View reports &amp; registrations</a>
          </div>
        </div>
      </section>

      {/* monthly + sponsor */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide">
          <div className="rg-grid-2">
            <div className="card" style={{ padding: "34px 32px" }}>
              <span className="rg-iconcard-ic" style={{ background: "var(--rose-tint)", color: "var(--rose-deep)" }}><Icon name="repeat" size={24} /></span>
              <h3 className="rg-h3" style={{ marginTop: 14 }}>Become a monthly giver</h3>
              <p className="rg-prose" style={{ marginTop: 10, marginBottom: 18 }}>A small amount each month is the most powerful way to help — it funds year-round programs and lets us plan ahead. Cancel anytime, no lock-in.</p>
              <a href="#give" className="btn btn-rose"><Icon name="heart" size={17} /> Start monthly giving</a>
            </div>
            <div className="card" style={{ padding: "34px 32px" }}>
              <span className="rg-iconcard-ic" style={{ background: "var(--blue-tint)", color: "var(--accent-deep)" }}><Icon name="graduation-cap" size={24} /></span>
              <h3 className="rg-h3" style={{ marginTop: 14 }}>Sponsor a program</h3>
              <p className="rg-prose" style={{ marginTop: 10, marginBottom: 18 }}>Fund a child's education, a health camp or a skilling cohort — and receive updates on the people your gift supports.</p>
              <a href="contact" className="btn btn-ghost">Talk to our team</a>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={D.faqs} title="Donation questions, answered" />

      <CTABand tone="rose" title="Two minutes. A lifetime of impact." text="Join hundreds of donors funding this month's relief drive."
        primary={["Donate now", "#give"]} secondary={["Become a volunteer", "volunteer.html"]} />

      <PageFoot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<DonatePage />);
