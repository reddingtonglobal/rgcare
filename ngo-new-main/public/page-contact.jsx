/* RG Care — Contact */
function ContactPage() {
  const C = window.RGP.contact;
  const O = window.RG.org;
  return (
    <>
      <Nav solid active="Contact" />
      <PageHero tint="blue"
        trail={[["Home", "/"], ["Contact"]]}
        eyebrow="Contact us"
        title="We'd love to hear from you."
        lead="Whether you want to donate, partner, volunteer or just say hello — reach the right team below and we'll get back within two working days."
      />

      {/* departments */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="Departments" title="Reach the right team" />
          <div className="rg-grid-4" style={{ marginTop: 36 }}>
            {C.departments.map((d) => (
              <div className="rg-contact-card" key={d.t} style={{ flexDirection: "column" }}>
                <span className="rg-contact-ic"><Icon name={d.icon} size={22} /></span>
                <div>
                  <b>{d.t}</b>
                  <p>{d.d}</p>
                  <a href={"mailto:" + d.v}>{d.v}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* office + feedback */}
      <section className="section rg-band-cream">
        <div className="wrap wrap-wide rg-contact-grid">
          <div>
            <Eyebrow>Visit or call</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12, marginBottom: 22 }}>Our office</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="rg-contact-card">
                <span className="rg-contact-ic"><Icon name="map-pin" size={22} /></span>
                <div><b>Address</b><p>{O.address}</p></div>
              </div>
              <div className="rg-contact-card">
                <span className="rg-contact-ic"><Icon name="phone" size={22} /></span>
                <div><b>Phone</b><p><a href={"tel:" + O.phone}>{O.phone}</a></p></div>
              </div>
              <div className="rg-contact-card">
                <span className="rg-contact-ic"><Icon name="clock" size={22} /></span>
                <div><b>Opening hours</b><p>{O.hoursWeek}<br />{O.hoursWeekend}</p></div>
              </div>
              <div className="rg-contact-card">
                <span className="rg-contact-ic"><Icon name="globe" size={22} /></span>
                <div><b>Online</b><p><a href={"https://" + O.web} target="_blank" rel="noopener">{O.web}</a> · <a href={"mailto:" + O.email}>{O.email}</a></p></div>
              </div>
            </div>
            <a className="btn btn-primary" style={{ marginTop: 22 }} href={"https://wa.me/" + O.whatsapp} target="_blank" rel="noopener">
              <Icon name="message-circle" size={18} /> Chat on WhatsApp
            </a>
          </div>
          <div>
            <Eyebrow>Send a message</Eyebrow>
            <h2 className="rg-h2" style={{ marginTop: 12, marginBottom: 18 }}>Share your feedback</h2>
            <FeedbackCard />
          </div>
        </div>
      </section>

      <FAQ items={C.faqs} title="Contact — quick answers" />

      <CTABand title="Prefer to act right now?" text="You don't need to wait for a reply to make a difference today."
        primary={["Donate now", "donate.html"]} secondary={["Volunteer", "volunteer.html"]} />

      <PageFoot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<ContactPage />);
