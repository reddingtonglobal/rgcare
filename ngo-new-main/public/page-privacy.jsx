/* RG Care — Privacy Policy Page */

function PrivacyPage() {
  const o = window.RG.org;
  const updated = "20 July 2026";

  const sections = [
    {
      ic: "info",
      title: "1. Who We Are",
      body: `RG Care Foundation (legally registered as Reddington Global Care Foundation, PAN: AAOCR4691R, NGO Darpan: HR/2025/0641773) is a registered non-profit organisation headquartered in Gurgaon, Haryana, India. Our website is www.rgcare.in. You can reach our data team at info@rgcare.in or call +91 87965 08140.`
    },
    {
      ic: "database",
      title: "2. Information We Collect",
      body: null,
      list: [
        ["Contact details", "Name, email address, phone number — provided when you fill out a contact, volunteer, or feedback form."],
        ["Donation information", "Name, email, PAN (where required for 80G receipts), and payment confirmation details. We do not store full card numbers — payments are processed by our certified payment partner."],
        ["Usage data", "Pages visited, browser type, device, approximate location (city level), and referral source — collected automatically via Google Analytics and Google Tag Manager."],
        ["Cookies", "Session cookies for site functionality and analytics cookies (Google Analytics). You may disable cookies in your browser settings at any time."],
        ["Voluntarily submitted content", "Messages, stories, or photos you choose to share with us."],
      ]
    },
    {
      ic: "target",
      title: "3. How We Use Your Information",
      body: null,
      list: [
        ["Processing donations", "To complete your donation, issue 80G tax receipts, and send impact updates."],
        ["Responding to enquiries", "To answer your questions, volunteer applications, and CSR partnership requests."],
        ["Sending communications", "Newsletters and impact reports — only if you have opted in. You can unsubscribe at any time."],
        ["Improving our website", "Analytics data helps us understand which content is most useful and improve the site experience."],
        ["Legal & compliance", "To meet obligations under the Income Tax Act, FCRA, and other applicable Indian laws."],
      ]
    },
    {
      ic: "share-2",
      title: "4. Sharing Your Information",
      body: `We do not sell, rent, or trade your personal information. We may share it only with:`,
      list: [
        ["Payment processors", "Certified payment gateways to complete donation transactions securely."],
        ["Email service providers", "To deliver newsletters and receipts on our behalf."],
        ["Government / regulatory bodies", "If required by law (e.g., Income Tax, MHA/FCRA filings)."],
        ["Auditors", "Our chartered accountants for statutory audits — under strict confidentiality."],
      ]
    },
    {
      ic: "clock",
      title: "5. Data Retention",
      body: `We retain your personal data for as long as necessary to fulfil the purpose for which it was collected — typically 7 years for donation/financial records (as required under Indian law). Analytics data is retained for 26 months. You may request deletion of non-statutory data at any time.`
    },
    {
      ic: "shield",
      title: "6. Data Security",
      body: `We use industry-standard safeguards including HTTPS encryption, restricted staff access, and secure servers. While no method of transmission over the internet is 100% secure, we take reasonable technical and organisational measures to protect your data.`
    },
    {
      ic: "user-check",
      title: "7. Your Rights",
      body: `You have the right to:`,
      list: [
        ["Access", "Request a copy of the personal data we hold about you."],
        ["Correction", "Ask us to correct inaccurate or incomplete data."],
        ["Deletion", "Request deletion of your data where it is not required to be retained by law."],
        ["Opt-out", "Unsubscribe from marketing emails at any time via the link in any email, or by contacting us."],
        ["Withdraw consent", "Where processing is based on consent, withdraw it at any time."],
      ]
    },
    {
      ic: "cookie",
      title: "8. Cookies",
      body: `Our website uses cookies to enhance your experience and collect anonymous analytics. Strictly necessary cookies cannot be disabled as they are required for the site to function. Analytics cookies (Google Analytics) can be disabled by adjusting your browser settings or using the Google Analytics Opt-out Browser Add-on.`
    },
    {
      ic: "external-link",
      title: "9. Third-Party Links",
      body: `Our website may contain links to external websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read their privacy policies.`
    },
    {
      ic: "baby",
      title: "10. Children's Privacy",
      body: `Our website is not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has submitted data, please contact us immediately.`
    },
    {
      ic: "refresh-cw",
      title: "11. Changes to This Policy",
      body: `We may update this Privacy Policy from time to time. The revised date will be updated at the top of this page. Continued use of the website after changes constitutes acceptance of the updated policy.`
    },
    {
      ic: "mail",
      title: "12. Contact Us",
      body: `For any privacy-related questions, data requests, or concerns, please contact:\n\nRG Care Foundation — Data & Privacy\nEmail: info@rgcare.in\nPhone: +91 87965 08140\nAddress: 750, Udyog Vihar Phase 5, Sector 19, Gurgaon, Haryana 122016, India`
    },
  ];

  return (
    <>
      <Nav solid active="" />
      <main>
        <header className="rg-legal-hero">
          <div className="wrap">
            <nav className="rg-crumb" aria-label="Breadcrumb">
              <span className="rg-crumb-item"><a href="/">Home</a><Icon name="chevron-right" size={14} /></span>
              <span className="rg-crumb-item"><span aria-current="page">Privacy Policy</span></span>
            </nav>
            <Eyebrow>Legal</Eyebrow>
            <h1 className="rg-phero-title" style={{ marginTop: 10 }}>Privacy Policy</h1>
            <p className="rg-phero-lead">How RG Care Foundation collects, uses and protects your personal information.</p>
            <p className="rg-legal-updated"><Icon name="calendar" size={14} /> Last updated: {updated}</p>
          </div>
        </header>

        <div className="wrap rg-legal-body">
          <aside className="rg-legal-toc">
            <p className="rg-legal-toc-title">On this page</p>
            {sections.map((s) => (
              <a key={s.title} href={"#" + s.title.replace(/\s+/g, "-").toLowerCase()} className="rg-legal-toc-link">
                {s.title}
              </a>
            ))}
          </aside>

          <article className="rg-legal-content">
            <div className="rg-legal-intro card">
              <Icon name="shield-check" size={28} style={{ color: "var(--blue)" }} />
              <p>RG Care Foundation is committed to protecting your privacy. We collect only what we need, use it only as described here, and never sell it. This policy applies to all visitors of <strong>www.rgcare.in</strong> and anyone who interacts with our services.</p>
            </div>

            {sections.map((s) => (
              <section key={s.title} id={s.title.replace(/\s+/g, "-").toLowerCase()} className="rg-legal-section">
                <div className="rg-legal-section-head">
                  <span className="rg-legal-ic"><Icon name={s.ic} size={20} /></span>
                  <h2 className="rg-h3">{s.title}</h2>
                </div>
                {s.body && s.body.split("\n\n").map((para, i) => (
                  <p key={i} className="rg-legal-p">{para}</p>
                ))}
                {s.list && (
                  <ul className="rg-legal-list">
                    {s.list.map(([term, def]) => (
                      <li key={term}><strong>{term}:</strong> {def}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="rg-legal-footer-note">
              <Icon name="info" size={16} />
              <span>This privacy policy is governed by the laws of India. For disputes, the courts of Gurgaon, Haryana shall have jurisdiction.</span>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <StickyBar showWhatsapp={true} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PrivacyPage />);
