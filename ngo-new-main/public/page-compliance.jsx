/* RG Care — Compliance & Documents Page */

function CompliancePage() {
  const o = window.RG.org;
  const updated = "20 July 2026";

  const registrations = [
    { ic: "badge-check", label: "Legal Name", value: "Reddington Global Care Foundation" },
    { ic: "file-text",   label: "PAN",         value: o.pan },
    { ic: "shield-check",label: "NGO Darpan",  value: o.darpan },
    { ic: "receipt-indian-rupee", label: "80G Registration", value: "AAOCR4691RF20251 (valid AY 2026–27 to 2028–29)" },
    { ic: "badge-check", label: "12A Registration", value: "AAOCR4691RE20251 (valid AY 2026–27 to 2028–29)" },
    { ic: "briefcase",   label: "CSR-1 Filing", value: "CSR-1 eligible — MCA registered" },
    { ic: "calendar",    label: "Registration Date", value: "Provisional 12A/80G granted 17 June 2025" },
  ];

  const policies = [
    { ic: "users-round",    title: "Child Protection Policy",       desc: "Safeguarding framework covering all interactions with minors across our education and healthcare programs. All staff and volunteers are briefed and trained." },
    { ic: "shield",         title: "Data Protection & Privacy",      desc: "Governs how we collect, store, use and delete personal data of donors, beneficiaries and volunteers. Aligned with IT Act 2000 and DPDP Act 2023.", link: "privacy.html" },
    { ic: "file-text",      title: "Terms of Use",                   desc: "Conditions governing access to and use of www.rgcare.in.", link: "terms.html" },
    { ic: "refresh-ccw",    title: "Refund & Cancellation Policy",   desc: "Our policy on donation refunds, duplicate payments and recurring giving cancellations.", link: "refund.html" },
    { ic: "alert-triangle", title: "Anti-Harassment (POSH) Policy", desc: "Zero-tolerance policy against sexual harassment in the workplace, compliant with POSH Act 2013." },
    { ic: "eye",            title: "Whistle-blower Policy",          desc: "Provides a safe, confidential channel for staff and stakeholders to report financial or ethical concerns without fear of retaliation." },
    { ic: "landmark",       title: "Financial Control Policy",       desc: "Internal controls governing fund authorisation, disbursement, vendor payments and bank reconciliation procedures." },
    { ic: "scale",          title: "Code of Conduct",                desc: "Ethical standards for board members, staff, volunteers and partner organisations working with RG Care Foundation." },
  ];

  const governance = [
    { ic: "file-bar-chart", title: "Annual Report", period: "FY 2025–26", status: "In preparation" },
    { ic: "file-bar-chart", title: "Audited Financial Statements", period: "FY 2025–26", status: "In preparation" },
    { ic: "chart-pie",      title: "Impact Report", period: "Q1 2026", status: "Available on request" },
    { ic: "receipt-indian-rupee", title: "80G Receipts / Form 10BE", period: "Ongoing", status: "Issued per donation" },
    { ic: "file-check",     title: "Utilisation Certificate", period: "FY 2025–26", status: "Available for CSR partners" },
  ];

  const sections = [
    "1. Statutory Registrations",
    "2. Governance Policies",
    "3. Financial Documents",
    "4. Contact for Compliance",
  ];

  return (
    <>
      <Nav solid active="" />
      <main>
        <header className="rg-legal-hero">
          <div className="wrap">
            <nav className="rg-crumb" aria-label="Breadcrumb">
              <span className="rg-crumb-item"><a href="/">Home</a><Icon name="chevron-right" size={14} /></span>
              <span className="rg-crumb-item"><span aria-current="page">Compliance & Documents</span></span>
            </nav>
            <Eyebrow>Governance & Transparency</Eyebrow>
            <h1 className="rg-phero-title" style={{ marginTop: 10 }}>Compliance & Documents</h1>
            <p className="rg-phero-lead">Our registrations, policies, financial documents and governance framework — all in one place.</p>
            <p className="rg-legal-updated"><Icon name="calendar" size={14} /> Last updated: {updated}</p>
          </div>
        </header>

        <div className="wrap rg-legal-body">
          <aside className="rg-legal-toc">
            <p className="rg-legal-toc-title">On this page</p>
            {sections.map((s) => (
              <a key={s} href={"#" + s.replace(/\s+/g, "-").toLowerCase()} className="rg-legal-toc-link">{s}</a>
            ))}
          </aside>

          <article className="rg-legal-content">

            {/* Intro */}
            <div className="rg-legal-intro card">
              <Icon name="shield-check" size={28} style={{ color: "var(--blue)" }} />
              <p>RG Care Foundation is committed to full legal compliance and financial transparency. All statutory registrations are current and in good standing. For any verification or document requests, email <strong>info@rgcare.in</strong>.</p>
            </div>

            {/* Registrations */}
            <section id="1.-statutory-registrations" className="rg-legal-section">
              <div className="rg-legal-section-head">
                <span className="rg-legal-ic"><Icon name="landmark" size={20} /></span>
                <h2 className="rg-h3">1. Statutory Registrations</h2>
              </div>
              <div className="rg-compliance-regs">
                {registrations.map((r) => (
                  <div className="rg-compliance-reg card" key={r.label}>
                    <span className="rg-compliance-reg-ic"><Icon name={r.ic} size={20} /></span>
                    <div>
                      <p className="rg-compliance-reg-label">{r.label}</p>
                      <p className="rg-compliance-reg-value">{r.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rg-legal-footer-note" style={{ marginTop: 20 }}>
                <Icon name="info" size={16} />
                <span>All registrations are provisional grants under the Income Tax Act, 1961. Details are verifiable on the Income Tax e-Filing portal and NGO Darpan.</span>
              </div>
            </section>

            {/* Policies */}
            <section id="2.-governance-policies" className="rg-legal-section">
              <div className="rg-legal-section-head">
                <span className="rg-legal-ic"><Icon name="scroll-text" size={20} /></span>
                <h2 className="rg-h3">2. Governance Policies</h2>
              </div>
              <p className="rg-legal-p muted">The following policies govern our operations, conduct and stakeholder protection.</p>
              <div className="rg-compliance-policies">
                {policies.map((p) => (
                  <div className="rg-compliance-policy card" key={p.title}>
                    <div className="rg-compliance-policy-head">
                      <span className="rg-legal-ic"><Icon name={p.ic} size={18} /></span>
                      <b>{p.title}</b>
                      {p.link && <a href={p.link} className="rg-legal-toc-link" style={{ marginLeft: "auto", fontSize: 13 }}>View <Icon name="arrow-right" size={13} /></a>}
                    </div>
                    <p className="muted" style={{ fontSize: 14, margin: "8px 0 0", lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Financial documents */}
            <section id="3.-financial-documents" className="rg-legal-section">
              <div className="rg-legal-section-head">
                <span className="rg-legal-ic"><Icon name="file-bar-chart" size={20} /></span>
                <h2 className="rg-h3">3. Financial Documents</h2>
              </div>
              <p className="rg-legal-p muted">Annual reports, audited statements and utilisation certificates are available to donors and CSR partners on request.</p>
              <div className="rg-compliance-docs">
                {governance.map((g) => (
                  <div className="rg-compliance-doc card" key={g.title}>
                    <span className="rg-legal-ic"><Icon name={g.ic} size={18} /></span>
                    <div style={{ flex: 1 }}>
                      <b style={{ fontSize: 15, color: "var(--brown-deep)" }}>{g.title}</b>
                      <p className="muted" style={{ fontSize: 13, margin: "3px 0 0" }}>{g.period}</p>
                    </div>
                    <span className="chip" style={{ fontSize: 12, background: "var(--blue-tint)", color: "var(--blue-deep)", border: "1px solid var(--blue-tint-2)" }}>
                      {g.status}
                    </span>
                  </div>
                ))}
              </div>
              <p className="rg-legal-p" style={{ marginTop: 20 }}>
                To request any document, email <a href="mailto:info@rgcare.in" style={{ color: "var(--blue)" }}>info@rgcare.in</a> with your name, organisation and intended use.
              </p>
            </section>

            {/* Contact */}
            <section id="4.-contact-for-compliance" className="rg-legal-section">
              <div className="rg-legal-section-head">
                <span className="rg-legal-ic"><Icon name="mail" size={20} /></span>
                <h2 className="rg-h3">4. Contact for Compliance</h2>
              </div>
              <div className="rg-legal-contact-card card">
                <div className="rg-legal-contact-row">
                  <Icon name="mail" size={18} style={{ color: "var(--blue)" }} />
                  <span><b>Email:</b> <a href="mailto:info@rgcare.in">info@rgcare.in</a></span>
                </div>
                <div className="rg-legal-contact-row">
                  <Icon name="phone" size={18} style={{ color: "var(--blue)" }} />
                  <span><b>Phone / WhatsApp:</b> <a href="tel:+918796508140">+91 87965 08140</a></span>
                </div>
                <div className="rg-legal-contact-row">
                  <Icon name="map-pin" size={18} style={{ color: "var(--blue)" }} />
                  <span><b>Registered Office:</b> D-002, Tulip Ivory, Sector 70, Badshahpur, Gurgaon, Haryana 122101, India</span>
                </div>
                <div className="rg-legal-contact-row">
                  <Icon name="map-pin" size={18} style={{ color: "var(--blue)" }} />
                  <span><b>Corporate Office:</b> 750, Udyog Vihar Phase 5, Sector 19, Gurgaon, Haryana 122016, India</span>
                </div>
                <div className="rg-legal-contact-row">
                  <Icon name="clock" size={18} style={{ color: "var(--blue)" }} />
                  <span><b>Hours:</b> Monday–Friday, 11:00–20:00 IST</span>
                </div>
              </div>
            </section>

            <div className="rg-legal-footer-note">
              <Icon name="info" size={16} />
              <span>This page is governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Gurgaon, Haryana.</span>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <StickyBar showWhatsapp={true} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CompliancePage />);
