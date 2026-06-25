/* RG Care Foundation — content model (plain data on window) */
window.RG = {
  org: {
    name: "RG Care Foundation",
    legal: "Reddington Global Care Foundation",
    tagline: "Your Trusted CSR Partner for Meaningful Social Impact",
    about: "Reddington Global Care Foundation is focussed towards a noble cause of educating maximum underprivileged citizens of the world.",
    phone: "+91 87458 72617",
    whatsapp: "918745872617",
    email: "care@rgcare.in",
    web: "www.rgcare.in",
    address: "750, Udyog Vihar Phase 5, Sector 19, Gurgaon, Haryana 122016, India",
    regOffice: "D-002, Tulip Ivory, Sector 70, Badshahpur, Gurgaon, Haryana 122101, India",
    city: "Gurgaon, Haryana",
    hoursWeek: "Mon – Fri · 11:00 – 20:00",
    hoursWeekend: "Sat & Sun · Closed",
    // Verified registration details (provisional 12A/80G granted 17 Jun 2025)
    pan: "AAOCR4691R",
    darpan: "HR/2025/0641773",
    reg: "NGO Darpan HR/2025/0641773",
    g80: "80G: AAOCR4691RF20251",
    a12: "12A: AAOCR4691RE20251",
    csr1: "CSR-1 eligible",
  },

  // floating hero metrics + impact section counters
  metrics: [
    { k: "lives",        value: 50000, suffix: "+", label: "Lives impacted" },
    { k: "beneficiaries", value: 8000, suffix: "+", label: "Beneficiaries supported" },
    { k: "communities", value: 100,   suffix: "+", label: "Communities reached" },
    { k: "years",       value: 4,     suffix: "+", label: "Years of service" },
  ],

  impact: [
    { icon: "graduation-cap", value: 18400, suffix: "+", label: "Children educated", note: "Scholarships, after-school centres & learning kits" },
    { icon: "heart-pulse",    value: 31200, suffix: "+", label: "Healthcare beneficiaries", note: "Mobile health camps & maternal care" },
    { icon: "users-round",    value: 7600,  suffix: "+", label: "Families supported", note: "Rations, livelihoods & emergency relief" },
    { icon: "wrench",         value: 4300,  suffix: "+", label: "Youth skilled", note: "Digital, vocational & solar training" },
    { icon: "venus",          value: 5100,  suffix: "+", label: "Women empowered", note: "Self-help groups & micro-enterprise" },
    { icon: "award",          value: 2200,  suffix: "+", label: "Scholarships funded", note: "Direct support to weaker-section students" },
  ],

  programs: [
    { icon: "book-open", title: "Education for every child",
      blurb: "After-school centres, scholarships and learning kits that keep first-generation learners in school.",
      slot: "prog-education", slotLabel: "Classroom / children learning",
      tag: "Education" },
    { icon: "stethoscope", title: "Healthcare that reaches",
      blurb: "Mobile medical units, free camps and maternal-child care for villages with no nearby clinic.",
      slot: "prog-health", slotLabel: "Health camp / mobile clinic",
      tag: "Healthcare" },
    { icon: "graduation-cap", title: "Skills for livelihood",
      blurb: "Digital, vocational and solar-energy training that turns unemployed youth into earners.",
      slot: "prog-skills", slotLabel: "Skill / vocational training",
      tag: "Skill development" },
    { icon: "sprout", title: "Stronger communities",
      blurb: "Clean water, sanitation and women-led self-help groups that build lasting local resilience.",
      slot: "prog-community", slotLabel: "Community / women's group",
      tag: "Community" },
  ],

  // Donation tiers with concrete impact
  tiers: [
    { amount: 500,   label: "School supplies",   desc: "Notebooks, kits & uniforms for 1 child for a term", icon: "pencil" },
    { amount: 1000,  label: "Healthcare support", desc: "A full check-up & medicines at a rural health camp", icon: "heart-pulse" },
    { amount: 2500,  label: "Skill training",     desc: "One month of vocational training for a young adult", icon: "wrench" },
    { amount: 5000,  label: "A term of school",   desc: "Keeps a first-generation learner in class for 3 months", icon: "graduation-cap" },
    { amount: 10000, label: "Empower a family",   desc: "Seed a woman-led micro-enterprise for a whole family", icon: "users-round" },
  ],

  stories: [
    { name: "Aarti, 13", place: "Bawana, Delhi", slot: "story-aarti", slotLabel: "Portrait — girl student",
      quote: "I thought I'd leave school to work. Now I top my class and want to be a doctor.",
      result: "Back in school · Rank 1 in Grade 8", program: "Education" },
    { name: "Sunita Devi", place: "Sonipat, Haryana", slot: "story-sunita", slotLabel: "Portrait — woman entrepreneur",
      quote: "The tailoring unit changed everything. I earn, I save, and my daughters study.",
      result: "Runs a 4-woman tailoring unit", program: "Women empowerment" },
    { name: "Ramesh, 22", place: "Virudhunagar, TN", slot: "story-ramesh", slotLabel: "Portrait — young man / trainee",
      quote: "The solar course gave me a real trade. I was hired within a month of finishing.",
      result: "Employed solar technician", program: "Skill development" },
  ],

  csrPoints: [
    { icon: "shield-check", title: "Compliance-ready",   desc: "12A, 80G and CSR-1 registered, with audited statements and Form 10BE receipts." },
    { icon: "bar-chart-3",  title: "Measurable outcomes", desc: "Dashboards and quarterly impact reports with photo & GPS-tagged proof of work." },
    { icon: "eye",          title: "End-to-end visibility", desc: "Every rupee tracked from disbursal to delivery — full deployment transparency." },
    { icon: "handshake",    title: "Flexible models",    desc: "Program sponsorship, employee volunteering or co-branded multi-year initiatives." },
  ],

  trust: [
    "Registered NGO", "80G tax benefits", "12A certified", "CSR-1 eligible", "Audited & transparent",
  ],

  interests: ["Education", "Healthcare", "Skill development", "Community & women", "Events & fundraising", "Wherever I'm needed"],

  founder: {
    name: "Vishal & Jyotsana Bora",
    role: "Founders, RG Care Foundation",
    slot: "founder-photo",
    message: "We started RG Care Foundation in 2022 with one belief — that every person deserves the dignity of opportunity. Behind every number on this page is a real child back in school, a mother earning for the first time, a family with light in their home. We promise to treat your support the way we'd want ours treated: with care, with proof, and with a smile at the other end.",
  },

  testimonials: [
    { name: "Priya Mehta", role: "Monthly donor", quote: "I get a photo update every month showing exactly where my contribution went. That transparency is why I keep giving.", ic: "heart" },
    { name: "Rohan Kapoor", role: "CSR lead, mid-size IT firm", quote: "RG Care made our CSR reporting effortless — clear documentation, real field proof, and a team that actually answers the phone.", ic: "briefcase" },
    { name: "Ananya Singh", role: "Volunteer, 6 months", quote: "I came to teach one weekend and never left. Seeing the kids' progress first-hand changed how I see my own work.", ic: "users-round" },
    { name: "Suresh Iyer", role: "First-time donor", quote: "Donating took two minutes and the 80G receipt arrived the same day. Simple, secure, and it clearly matters.", ic: "shield-check" },
  ],

  homeFaq: [
    { q: "What causes does RG Care Foundation support?", a: "RG Care Foundation focuses on education, healthcare, skill development, and community welfare initiatives for underserved communities. Through sustainable social impact programs, we strive to improve access to quality education, essential healthcare, and livelihood opportunities across India." },
    { q: "How can I contribute to RG Care Foundation's mission?", a: "You can support RG Care Foundation by making a donation, volunteering your time, spreading awareness, or partnering with us. Every contribution helps strengthen our educational, healthcare, and community development programs for underprivileged children and families." },
    { q: "How are donations utilized by RG Care Foundation?", a: "We follow a transparent and accountable approach to ensure donations are directed towards educational support, healthcare assistance, skill development initiatives, school supplies, and community welfare programs that create long-term and measurable social impact." },
    { q: "Does RG Care Foundation provide scholarships for students?", a: "Yes. Our scholarship and sponsorship programs help deserving students continue their education by supporting school fees, uniforms, books, and other academic essentials, enabling children from economically disadvantaged backgrounds to pursue brighter futures." },
    { q: "Who can benefit from RG Care Foundation's programs?", a: "Our programs primarily serve underprivileged children, youth, women, and marginalized communities. We focus on improving educational access, healthcare awareness, vocational training, and sustainable livelihood opportunities to foster inclusive community development." },
    { q: "Can individuals volunteer with RG Care Foundation?", a: "Absolutely. We welcome passionate volunteers who wish to contribute to education, awareness campaigns, fundraising, and community outreach activities. Volunteering with RG Care Foundation enables individuals to participate directly in meaningful social change initiatives." },
    { q: "What skill development programs does RG Care Foundation offer?", a: "RG Care Foundation conducts vocational and skill development programs designed to enhance employability and financial independence. Training areas include computer literacy, tailoring, hospitality, and other livelihood-focused skills that promote sustainable economic growth." },
    { q: "How does RG Care Foundation ensure transparency and accountability?", a: "Integrity and transparency are core values of our organization. We maintain responsible utilization of resources and focus on creating sustainable outcomes through ethical practices, community partnerships, and impact-driven social development programs." },
    { q: "Does RG Care Foundation collaborate with corporates and organizations?", a: "Yes. We actively collaborate with corporates, institutions, and like-minded organizations through CSR partnerships, volunteering initiatives, and strategic alliances to maximize community impact and deliver sustainable development outcomes." },
    { q: "Why is education a primary focus area for RG Care Foundation?", a: "We believe education is the foundation of long-term social transformation. By providing learning support, scholarships, school supplies, and community learning programs, we empower children with the knowledge and opportunities needed to break the cycle of poverty." },
  ],

  nav: [
    ["About", "about.html"], ["Programs", "programs.html"], ["Stories", "stories.html"],
    ["Volunteer", "volunteer.html"], ["CSR", "csr.html"], ["Contact", "contact.html"],
  ],
};

window.RG_FOOTER_HREFS = {
  "Education": "programs.html#education", "Healthcare": "programs.html#healthcare",
  "Skill development": "programs.html#skills", "Community & women": "programs.html#community",
  "Donate": "donate.html", "Volunteer": "volunteer.html", "CSR partnership": "csr.html", "Fundraise": "volunteer.html",
  "Home": "RG Care Foundation.html", "About us": "about.html", "Impact": "about.html",
  "Stories": "stories.html", "Transparency": "transparency.html", "Contact us": "contact.html",
};
