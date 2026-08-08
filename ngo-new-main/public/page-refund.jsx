/* RG Care — Refund & Cancellation Policy Page */

function RefundPage() {
  const updated = "20 July 2026";

  const sections = [
    {
      ic: "heart-handshake",
      title: "1. Nature of Donations",
      body: `All donations made to RG Care Foundation (Reddington Global Care Foundation) through www.rgcare.in are voluntary charitable contributions. By completing a donation, you acknowledge that the funds are intended to support our humanitarian programs in education, healthcare, skill development and community empowerment.`
    },
    {
      ic: "x-circle",
      title: "2. General No-Refund Policy",
      body: `As a registered NGO, all donations received are deployed directly toward ongoing programs and beneficiaries. Accordingly, completed donations are generally non-refundable once processed and the funds have been applied to our charitable activities.\n\nThis policy is consistent with best practices for registered non-profit organisations operating under Indian law.`
    },
    {
      ic: "refresh-ccw",
      title: "3. Eligible Refund Situations",
      body: `Refunds or adjustments will be considered only in the following circumstances:`,
      list: [
        ["Duplicate payment", "If your payment gateway charged you more than once for the same transaction due to a technical error."],
        ["Wrong amount charged", "If a technical error caused an amount different from what you intended to be debited."],
        ["Unauthorised transaction", "If you believe your payment details were used without your authorisation."],
        ["Payment not acknowledged", "If payment was debited but you received no confirmation and the transaction does not appear in your bank records."],
      ]
    },
    {
      ic: "clock",
      title: "4. How to Request a Refund",
      body: `To raise a refund request, please contact us within 7 calendar days of the transaction date:`,
      list: [
        ["Email", "info@rgcare.in — Subject line: \"Refund Request — [Transaction Date]\""],
        ["Phone / WhatsApp", "+91 87965 08140"],
        ["Information required", "Your full name, registered email, transaction ID or payment reference, bank / UPI details, and reason for the request."],
      ]
    },
    {
      ic: "timer",
      title: "5. Processing Timeline",
      body: `Once we receive and verify your refund request:\n\n• We will acknowledge your request within 2 working days.\n• Verification and approval typically takes 5–7 working days.\n• Approved refunds are credited back to the original payment method within 7–10 working days, subject to your bank's processing time.\n\nWe will keep you informed at every step via email.`
    },
    {
      ic: "receipt-indian-rupee",
      title: "6. Tax Receipts (80G)",
      body: `If a refund is processed after we have issued a Form 10BE receipt under Section 80G, the receipt will be cancelled and the associated tax benefit will no longer be valid. Please factor this in before requesting a refund.`
    },
    {
      ic: "credit-card",
      title: "7. Payment Gateway Charges",
      body: `In the event of a verified refund, any payment gateway transaction fees (if non-recoverable) may be deducted from the refund amount. We will inform you of any such deduction before processing.`
    },
    {
      ic: "ban",
      title: "8. Non-Refundable Situations",
      body: `Refunds will not be processed for:`,
      list: [
        ["Change of mind", "After a donation has been processed and acknowledged."],
        ["Program outcome dissatisfaction", "Donations fund ongoing programs and outcomes cannot be guaranteed for individual contributions."],
        ["Late requests", "Requests submitted more than 7 days after the transaction date."],
        ["Completed recurring donations", "Individual instalments of recurring/monthly giving that have already been processed."],
      ]
    },
    {
      ic: "repeat",
      title: "9. Recurring / Monthly Giving Cancellations",
      body: `You may cancel a recurring donation mandate at any time by:\n\n• Emailing info@rgcare.in with your cancellation request, or\n• Cancelling the mandate directly through your UPI app, bank net banking, or card portal.\n\nCancellation applies to future charges only. Already-processed instalments are subject to the refund policy above.`
    },
    {
      ic: "mail",
      title: "10. Contact Us",
      body: `For any questions about refunds or cancellations, please reach out:\n\nRG Care Foundation\nEmail: info@rgcare.in\nPhone / WhatsApp: +91 87965 08140\nAddress: 750, Udyog Vihar Phase 5, Sector 19, Gurgaon, Haryana 122016, India\n\nWe respond to all emails within 2 working days (Monday–Friday, 11:00–20:00 IST).`
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
              <span className="rg-crumb-item"><span aria-current="page">Refund Policy</span></span>
            </nav>
            <Eyebrow>Legal</Eyebrow>
            <h1 className="rg-phero-title" style={{ marginTop: 10 }}>Refund & Cancellation Policy</h1>
            <p className="rg-phero-lead">How we handle donation refunds, duplicate payments and recurring giving cancellations.</p>
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
              <Icon name="heart-handshake" size={28} style={{ color: "var(--rose)" }} />
              <p>We believe in full transparency about how your money is used. Donations to RG Care Foundation are generally non-refundable, but we handle genuine errors and duplicate payments promptly and fairly. If you have a concern, please email <strong>info@rgcare.in</strong> within 7 days.</p>
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
              <span>This policy is governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Gurgaon, Haryana.</span>
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <StickyBar showWhatsapp={true} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<RefundPage />);
