/* RG Care — rich content for standalone subpages */
window.RGP = {
  /* ---------------- ABOUT ---------------- */
  about: {
    values: [
      { icon: "eye", t: "Transparency", d: "Every rupee is tracked from disbursal to delivery, with audited statements open to all." },
      { icon: "scale", t: "Accountability", d: "We measure what matters and report it honestly — the wins and the work still to do." },
      { icon: "heart-handshake", t: "Dignity first", d: "We build capability, not dependence. People are partners in change, never recipients of pity." },
      { icon: "users-round", t: "Community-led", d: "Programs are designed with communities, run by local teams, and owned by the people they serve." },
      { icon: "sprout", t: "Sustainability", d: "We invest in outcomes that compound — education, skills and health that outlast any single grant." },
      { icon: "shield-check", t: "Governance", d: "A professional board, clear policies and strong compliance underpin everything we do." },
    ],
    timeline: [
      { year: "2022", t: "RG Care is founded", d: "Reddington Global Care Foundation is founded on 15 June 2022 with a single after-school centre and a promise: educate the underprivileged, wherever they are." },
      { year: "2023", t: "Healthcare on wheels", d: "Our first mobile medical units reach villages with no nearby clinic, serving thousands in their first year." },
      { year: "2024", t: "Skilling at scale", d: "Vocational and digital-literacy programs launch across multiple states, partnering with industry for real jobs." },
      { year: "2025", t: "CSR partnerships grow", d: "Corporate partners join us for measurable, compliance-ready impact — multiplying reach into 100+ communities." },
      { year: "2026", t: "100+ communities", d: "A growing footprint with women-led self-help groups, scholarships and solar-skilling driving lasting change." },
    ],
    leadership: [
      { name: "Vishal Bora", role: "Founder & President", slot: "lead-1", bio: "Drives RG Care's vision of structured, measurable social impact with a focus on governance and on-ground execution." },
      { name: "Jyotsana Bora", role: "Director, Programs", slot: "lead-2", bio: "Leads program design across education, healthcare and women's empowerment with a community-first approach." },
      { name: "Sanskar Singh Thakur", role: "Field leader", slot: "lead-4", bio: "Plans and leads regional drives on the ground — turning program plans into delivery, and donations into classrooms, camps and livelihoods." },
    ],
    recognition: [
      "12A & 80G registered", "CSR-1 eligible", "Section 8 company", "Registered non-profit",
    ],
    governance: [
      "Independent board of trustees with defined roles and term limits.",
      "Annual external audit and publicly available financial statements.",
      "Documented policies on finance, procurement, child protection and POSH.",
      "Quarterly impact reporting with photo and GPS-tagged proof of work.",
      "Conflict-of-interest and whistle-blower mechanisms in place.",
    ],
    faqs: [
      { q: "What does RG Care actually do?", a: "We run on-the-ground programs in education, healthcare, skill development and community empowerment across India — and we partner with companies to deliver their CSR with full transparency." },
      { q: "Is RG Care a registered NGO?", a: "Yes. Reddington Global Care Foundation is a registered non-profit with 12A and 80G certification and CSR-1 eligibility. (Registration numbers are being finalised on this site and will be published here.)" },
      { q: "Where do you work?", a: "We operate across multiple Indian states, from Delhi-NCR and Haryana to Tamil Nadu, with field teams embedded in the communities we serve." },
      { q: "How can I verify your impact?", a: "We publish quarterly impact reports and audited statements on our Transparency page, with photo and location-tagged evidence of work delivered." },
    ],
  },

  /* ---------------- PROGRAMS (detail) ---------------- */
  programDetail: {
    education: {
      icon: "book-open", tag: "Education", title: "Education for every child",
      problem: "Millions of first-generation learners drop out before completing school — not for lack of ability, but lack of support, materials and a reason to stay.",
      objectives: ["Keep first-generation learners in school", "Improve learning outcomes with after-school support", "Remove cost barriers through kits and scholarships", "Build aspiration through mentorship"],
      methodology: [
        { t: "After-school learning centres", d: "Daily support classes near where children live, run by trained local educators." },
        { t: "Learning kits & uniforms", d: "Notebooks, stationery and uniforms that remove the everyday cost barriers to attendance." },
        { t: "Scholarships", d: "Direct financial support for weaker-section students to continue into higher grades." },
        { t: "Mentorship", d: "Role models and counselling that build aspiration and keep students on track." },
      ],
      metrics: [{ value: 18400, suffix: "+", label: "Children educated" }, { value: 2200, suffix: "+", label: "Scholarships funded" }, { value: 94, suffix: "%", label: "Retention rate" }],
      faqs: [
        { q: "Who qualifies for a scholarship?", a: "Students from economically weaker backgrounds, including single-parent and parentless households, reviewed case-by-case." },
        { q: "Can I sponsor a specific child or school?", a: "Yes — our team can match your gift to a child, a centre or a cohort, with progress updates." },
      ],
    },
    healthcare: {
      icon: "stethoscope", tag: "Healthcare", title: "Healthcare that reaches",
      problem: "For families in remote and underserved areas, the nearest clinic can be hours away — turning treatable conditions into emergencies.",
      objectives: ["Bring primary care to underserved villages", "Focus on maternal and child health", "Provide medicines and follow-up", "Run preventive health awareness"],
      methodology: [
        { t: "Mobile medical units", d: "Staffed with a doctor, pharmacist and social worker, reaching villages on a regular schedule." },
        { t: "Health camps", d: "Free check-ups, screening and medicines, often in partnership with local NGOs and hospitals." },
        { t: "Maternal & child care", d: "Antenatal checks, nutrition support and immunisation drives for mothers and children." },
        { t: "Awareness", d: "Sessions on hygiene, nutrition and preventive care to reduce avoidable illness." },
      ],
      metrics: [{ value: 31200, suffix: "+", label: "Beneficiaries" }, { value: 320, suffix: "+", label: "Health camps" }, { value: 12, suffix: "", label: "States reached" }],
      faqs: [
        { q: "Are the camps really free?", a: "Yes. Consultations, basic screening and essential medicines at our camps are provided free to beneficiaries." },
        { q: "Can a company sponsor a camp?", a: "Absolutely — sponsoring a camp or a mobile unit is one of our most popular CSR options, with full reporting." },
      ],
    },
    skills: {
      icon: "graduation-cap", tag: "Skill development", title: "Skills for livelihood",
      problem: "Young people in tier-2 and tier-3 towns have ambition but no access to job-ready training — so talent goes unemployed.",
      objectives: ["Make youth job-ready", "Align training to real market demand", "Include women and weaker sections", "Connect graduates to employers"],
      methodology: [
        { t: "Digital & vocational training", d: "Practical, certified courses in digital skills, trades and emerging technologies." },
        { t: "Solar & green skilling", d: "Training for India's clean-energy sector — theory plus hands-on technical work." },
        { t: "Placement linkage", d: "Industry partnerships that turn certificates into actual jobs." },
        { t: "Stipends & support", d: "Removing the cost of learning for those who need it most." },
      ],
      metrics: [{ value: 4300, suffix: "+", label: "Youth skilled" }, { value: 72, suffix: "%", label: "Placement rate" }, { value: 40, suffix: "+", label: "Industry partners" }],
      faqs: [
        { q: "What kind of jobs do graduates get?", a: "Roles across IT-enabled services, retail, solar installation and skilled trades, depending on the track." },
        { q: "Is training free for participants?", a: "Most programs are free or stipend-supported for eligible candidates, funded by donors and CSR partners." },
      ],
    },
    community: {
      icon: "sprout", tag: "Community", title: "Stronger communities",
      problem: "Without clean water, sanitation and economic agency, families stay trapped in cycles that no single intervention can break.",
      objectives: ["Improve water, sanitation & hygiene", "Enable women-led enterprise", "Build local resilience", "Strengthen civic awareness"],
      methodology: [
        { t: "WASH facilities", d: "Drinking water and gender-friendly sanitation, especially in schools — improving attendance for girls." },
        { t: "Women's self-help groups", d: "Savings, micro-credit and enterprise support that put income in women's hands." },
        { t: "Livelihood support", d: "Seed funding and training for micro-enterprises like tailoring and food units." },
        { t: "Awareness drives", d: "Sessions on rights, schemes and safe practices that build community agency." },
      ],
      metrics: [{ value: 5100, suffix: "+", label: "Women empowered" }, { value: 7600, suffix: "+", label: "Families supported" }, { value: 140, suffix: "+", label: "Communities" }],
      faqs: [
        { q: "How do self-help groups work?", a: "Women pool small savings, access micro-credit and run enterprises together, with training and mentorship from our team." },
        { q: "Do these programs reach the poorest?", a: "Yes — we deliberately target the most underserved households, including single-women and landless families." },
      ],
    },
  },

  /* ---------------- DONATE ---------------- */
  donate: {
    types: [
      { icon: "repeat", t: "Monthly giving", d: "Become a sustaining donor. A small amount each month funds year-round programs and lets us plan ahead." },
      { icon: "gift", t: "One-time gift", d: "Make an immediate difference with a single contribution, directed wherever it's needed most." },
      { icon: "graduation-cap", t: "Sponsor a child", d: "Fund a child's education for a term or a year and receive updates on their progress." },
      { icon: "building-2", t: "Corporate / CSR", d: "Partner with us to deliver measurable, compliance-ready impact at scale." },
    ],
    breakdown: [
      { amt: "₹500", d: "School supplies & a uniform for one child for a term" },
      { amt: "₹1,000", d: "A full check-up and medicines at a rural health camp" },
      { amt: "₹2,500", d: "One month of vocational training for a young adult" },
      { amt: "₹5,000", d: "Keeps a first-generation learner in school for three months" },
      { amt: "₹10,000", d: "Seeds a woman-led micro-enterprise for a whole family" },
    ],
    tax: [
      "80G certified — donations are eligible for tax deduction under the Income Tax Act.",
      "You receive a Form 10BE receipt by email for every contribution.",
      "Indian taxpayers can claim the eligible deduction in their annual return.",
      "Corporate donations qualify under CSR (Section 135) with full documentation.",
    ],
    faqs: [
      { q: "How do I get my 80G tax receipt?", a: "We email a Form 10BE receipt automatically after your donation is processed. Add your PAN at checkout so it's claim-ready." },
      { q: "Can I cancel a monthly donation?", a: "Yes, any time — there's no lock-in. You're always in control of your giving." },
      { q: "How much of my donation reaches programs?", a: "We keep overheads lean and publish our financials. The large majority of every rupee goes directly to program delivery." },
      { q: "Which payment methods can I use?", a: "UPI, credit/debit card, net banking, Razorpay and QR. International donors can reach our team for assistance." },
    ],
  },

  /* ---------------- VOLUNTEER ---------------- */
  volunteer: {
    opportunities: [
      { icon: "book-open", t: "Teaching & mentoring", d: "Support after-school centres, tutor students or mentor young people toward their goals." },
      { icon: "stethoscope", t: "Health camps", d: "Help organise and run free medical camps — logistics, registration and care support." },
      { icon: "laptop", t: "Skills & digital", d: "Train youth in digital literacy, soft skills or your professional trade." },
      { icon: "megaphone", t: "Fundraising & events", d: "Drive campaigns, organise events and grow our community of supporters." },
      { icon: "pen-line", t: "Content & design", d: "Tell our stories — writing, photography, design and social media." },
      { icon: "heart-handshake", t: "Community outreach", d: "Work with self-help groups and families on the ground in your region." },
    ],
    journey: [
      { t: "Apply", d: "Fill the short form and tell us where you'd like to help." },
      { t: "Connect", d: "Our team reaches out within 48 hours to understand your interests and availability." },
      { t: "Orient & train", d: "A short orientation and role-specific training prepares you for the field." },
      { t: "Contribute", d: "Start making an impact — in person or remotely, on your schedule." },
      { t: "Grow & lead", d: "Take on bigger roles, lead drives and earn recognition for your contribution." },
    ],
    recognition: [
      { icon: "award", t: "Certificates", d: "Verified certificates and letters of recommendation for your contribution." },
      { icon: "star", t: "Volunteer of the month", d: "Recognition for outstanding changemakers across our community." },
      { icon: "users-round", t: "Community", d: "Join 1,800+ volunteers and a network that lasts beyond any single project." },
    ],
    faqs: [
      { q: "Do I need experience to volunteer?", a: "No. We have roles for every skill level and provide orientation and training. Your time and commitment matter most." },
      { q: "Can I volunteer remotely?", a: "Yes — content, design, fundraising and mentoring roles can all be done remotely." },
      { q: "Is there a minimum time commitment?", a: "We're flexible. Tell us your availability and we'll match you to a role that fits." },
      { q: "Will I get a certificate?", a: "Yes, active volunteers receive verified certificates and references for their contribution." },
    ],
  },

  /* ---------------- CSR ---------------- */
  csr: {
    focusAreas: [
      { icon: "graduation-cap", t: "Education access", sdg: "SDG 4 · Quality education", problem: "Children lack materials and inclusive resources.", solution: "Scholarships, Braille books, digital learning.", target: "500+ students supported", tone: "blue" },
      { icon: "heart-pulse", t: "Healthcare & special needs", sdg: "SDG 3 · Good health", problem: "Limited access to care and assistive devices.", solution: "Medical aid, therapies, equipment.", target: "200+ patients treated", tone: "rose" },
      { icon: "briefcase", t: "Livelihood & women empowerment", sdg: "SDG 8 · Decent work", problem: "Underemployment for rural women.", solution: "Sewing machines, vocational training.", target: "300+ women trained", tone: "cream" },
      { icon: "sun", t: "Energy & essential access", sdg: "SDG 7 · Clean energy", problem: "Off-grid communities face energy poverty.", solution: "Solar panels for reliable electricity.", target: "50+ villages powered", tone: "gold" },
    ],
    impact: {
      total: "7,000+", note: "FY 2025–26 projected goal — figures are targets",
      mix: [["Education access", 35], ["Healthcare", 30], ["Livelihood", 20], ["Energy access", 15]],
      kpis: [["94%", "Enrollment retention"], ["450+", "Assistive devices"], ["280", "Self-employment"], ["650", "Households with power"]],
    },
    journey: [
      ["Discover", "Priorities, SDGs, locations, budget, timelines"],
      ["Co-design", "Needs assessment, KPIs, logframe, budget"],
      ["Approve", "Due-diligence, risk register, MoU / SLA"],
      ["Deploy", "Field kickoff, procurement, beneficiary selection"],
      ["Monitor", "Monthly reviews, quarterly dashboards, audits"],
      ["Evaluate", "Endline evaluation, case studies, scale-up"],
    ],
    options: [
      { t: "Program sponsorship", dur: "3–12 months", scope: "Single project, specific location", inv: "₹5L – ₹50L" },
      { t: "Thematic portfolio", dur: "6–18 months", scope: "Multi-site under one theme", inv: "₹25L – ₹1Cr" },
      { t: "Strategic alliance", dur: "2–3 years", scope: "Multi-year strategic partnership", inv: "₹1Cr – ₹5Cr" },
      { t: "Employee engagement", dur: "Ongoing", scope: "Volunteering, payroll giving", inv: "₹1L – ₹10L" },
    ],
    governance: [
      { icon: "git-branch", t: "Transparent fund flow", d: "CSR funds → dedicated project account → direct payments, with invoices archived and receipts verified." },
      { icon: "user-check", t: "Beneficiary verification", d: "Community referral, ID validation, needs assessment and multi-level approval." },
      { icon: "settings", t: "Execution controls", d: "Pre-vetted vendors, milestone-based disbursements and quality assurance." },
      { icon: "bar-chart-3", t: "Monitoring & reporting", d: "Real-time KPI dashboards, quarterly reports and impact analysis." },
      { icon: "shield-check", t: "Safeguarding", d: "Child-protection policies and data-privacy compliance." },
    ],
    models: [
      { icon: "target", t: "Program sponsorship", d: "Fund a specific program — a school, a health-camp series, a skilling cohort — and own its measurable outcomes." },
      { icon: "users", t: "Employee volunteering", d: "Engage your teams through structured volunteering days and payroll-giving campaigns." },
      { icon: "handshake", t: "Co-branded initiatives", d: "Multi-year flagship programs designed and delivered together, aligned to your CSR thesis." },
      { icon: "map-pin", t: "Geography-focused CSR", d: "Concentrate impact where your business operates, with local hiring and community ties." },
    ],
    reporting: [
      { t: "Baseline & targets", d: "We define measurable KPIs and a baseline before a rupee is spent." },
      { t: "Live tracking", d: "Dashboards and milestone updates give you end-to-end visibility into deployment." },
      { t: "Proof of work", d: "Photo and GPS-tagged evidence, beneficiary records and attendance data." },
      { t: "Impact reports", d: "Quarterly and annual reports, audit-ready, mapped to your CSR obligations." },
    ],
    compliance: [
      "CSR-1 registered entity, eligible under Section 135 of the Companies Act.",
      "12A and 80G certification for tax-efficient giving.",
      "Annual external audit and statutory financial statements.",
      "Form 10BE receipts and complete documentation for your filings.",
      "Defined policies on finance, procurement, child protection and POSH.",
    ],
    cases: [
      { tag: "Education", t: "10,000 learning kits in a year", d: "A corporate partner funded learning kits and uniforms across 60 centres, lifting attendance and retention.", slot: "csr-case-1" },
      { tag: "Healthcare", t: "Mobile units for rural districts", d: "Sponsored mobile medical units brought primary care to villages with no nearby clinic.", slot: "csr-case-2" },
      { tag: "Skilling", t: "Solar skilling for 500 youth", d: "A multi-year skilling partnership trained youth for India's clean-energy sector with placement linkage.", slot: "csr-case-3" },
    ],
    faqs: [
      { q: "Are you compliant for CSR under the Companies Act?", a: "Yes. We are CSR-1 registered and eligible under Section 135, with 12A/80G certification and audited financials for clean reporting." },
      { q: "What reporting will we receive?", a: "Baseline KPIs, live deployment tracking, photo/GPS-tagged proof of work, and audit-ready quarterly and annual impact reports." },
      { q: "Can we focus on a specific cause or geography?", a: "Yes — we design programs around your CSR thesis, cause area and the regions where your business operates." },
      { q: "How do we get started?", a: "Book a 30-minute consultation. We'll align on goals, propose a program and outline KPIs, budget and reporting." },
    ],
  },

  /* ---------------- TRANSPARENCY ---------------- */
  transparency: {
    docs: [
      { t: "Certificate of Incorporation", meta: "PDF · Section 8 company registration", ic: "scroll-text", href: "docs/RG-Care-Certificate-of-Incorporation.pdf" },
      { t: "12A Registration (Form 10AC)", meta: "PDF · URN AAOCR4691RE20251 · provisional", ic: "badge-check", href: "docs/RG-Care-12A.pdf" },
      { t: "80G Approval (Form 10AC)", meta: "PDF · URN AAOCR4691RF20251 · provisional", ic: "receipt-indian-rupee", href: "docs/RG-Care-80G.pdf" },
      { t: "NGO Darpan Registration", meta: "PDF · Darpan ID HR/2025/0641773", ic: "building-2", href: "docs/RG-Care-Darpan-ID.pdf" },
      { t: "PAN — AAOCR4691R", meta: "PDF · Statutory identifier", ic: "file-check", href: "docs/RG-Care-PAN.pdf" },
      { t: "Memorandum of Association", meta: "PDF · Founding document", ic: "file-text", href: "docs/RG-Care-MOA.pdf" },
      { t: "Articles of Association", meta: "PDF · Governing rules", ic: "file-text", href: "docs/RG-Care-AOA.pdf" },
    ],
    policies: [
      "Child protection policy", "Code of conduct", "Volunteer guidelines",
      "Data protection & privacy policy", "Anti-harassment (POSH) policy", "Whistle-blower policy",
      "Conflict-of-interest policy", "Refund & donation policy", "Terms & conditions",
    ],
  },

  /* ---------------- BLOG ---------------- */
  blog: {
    categories: ["All", "Impact stories", "Education", "Healthcare", "Skilling", "CSR", "Volunteering"],
    featured: { tag: "Impact story", t: "How a tailoring unit lifted 40 families in Sonipat", d: "When Sunita joined a women's self-help group, she didn't just learn to stitch — she built a business that now employs four women and sends a dozen children to school.", read: "6 min", slot: "blog-feat" },
    posts: [
      { tag: "Education", t: "Why first-generation learners drop out — and what actually works", read: "6 min", slot: "bp-1" },
      { tag: "CSR", t: "CSR done right: 5 questions to ask your NGO partner", read: "5 min", slot: "bp-2" },
      { tag: "Healthcare", t: "What a mobile health camp really delivers", read: "4 min", slot: "bp-3" },
      { tag: "Skilling", t: "From tier-3 towns to solar jobs: a skilling story", read: "5 min", slot: "bp-4" },
      { tag: "Volunteering", t: "A weekend that changed how I see my city", read: "3 min", slot: "bp-5" },
      { tag: "Impact stories", t: "Aarti's road from dropout to rank one", read: "4 min", slot: "bp-6" },
    ],
  },

  /* ---------------- CONTACT ---------------- */
  contact: {
    departments: [
      { icon: "heart", t: "Donations & 80G", d: "Receipts, recurring gifts and tax queries.", v: "care@rgcare.in" },
      { icon: "building-2", t: "CSR & partnerships", d: "Corporate partnerships and consultations.", v: "csr@rgcare.in" },
      { icon: "users-round", t: "Volunteering", d: "Opportunities and applications.", v: "volunteer@rgcare.in" },
      { icon: "newspaper", t: "Media & press", d: "Press, interviews and brand assets.", v: "media@rgcare.in" },
    ],
    faqs: [
      { q: "How quickly will you respond?", a: "We aim to reply to all enquiries within 2 working days. For donation receipts, expect an automated email immediately." },
      { q: "Can I visit your office?", a: "Yes — reach out to schedule a visit to our Gurgaon office during working hours (Mon–Fri, 11:00–20:00)." },
      { q: "How do I report an issue with a receipt?", a: "Email care@rgcare.in with your donation details and we'll resolve it promptly." },
    ],
  },
};
