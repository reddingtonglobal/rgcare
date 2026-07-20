/* RG Care — App composition + Tweaks + Watch modal */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "full",
  "donationStyle": "tiered",
  "accent": "#2B6CB0",
  "headline": "50,000+ smiles and counting",
  "subhead": "Together, donors, volunteers and supporters have helped improve the lives of thousands of children, women and families through healthcare, education, nutrition and community initiatives.",
  "showWhatsapp": true,
  "volLayout": "framed"
}/*EDITMODE-END*/;

const ACCENTS = {
  "#2B6CB0": { deep: "#235A95", sh: "0 6px 18px rgba(43,108,176,.22), 0 2px 6px rgba(43,108,176,.18)" },
  "#C87070": { deep: "#A9534F", sh: "0 6px 18px rgba(200,112,112,.26), 0 2px 6px rgba(200,112,112,.18)" },
  "#F4A300": { deep: "#D98C00", sh: "0 6px 18px rgba(244,163,0,.30), 0 2px 6px rgba(244,163,0,.20)" },
};

function WatchModal_REMOVED() { return null; }

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS["#2B6CB0"];
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-deep", a.deep);
    r.setProperty("--accent-sh", a.sh);
  }, [t.accent]);

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const openDonate = () => setDonateOpen(true);
  const goVolunteer = () => {
    const el = document.getElementById("volunteer");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
  };

  return (
    <>
      <Nav onDonate={openDonate} t={t} />
      <main>
        <Hero t={t} onDonate={openDonate} onVolunteer={goVolunteer} />
        <SamuelCrowdfund onDonate={openDonate} />
        <About />
        <Impact />
        <Programs />
        <DonateSection style={t.donationStyle} />
        <Stories />
        <FieldVideo onDonate={openDonate} />
        <FieldGallery />
        <FounderMessage />
        <Testimonials />
        <DonationTrust onDonate={openDonate} />
        <Volunteer layout={t.volLayout} />
        <CSR />
        <HomeFAQ items={window.RG.homeFaq} />
        <Transparency />
      </main>
      <Footer onDonate={openDonate} />
      <StickyBar onDonate={openDonate} showWhatsapp={t.showWhatsapp} />

      <DonateModal open={donateOpen} style={t.donationStyle} onClose={() => setDonateOpen(false)} />
      <DonatePopup onDonate={openDonate} />
      <ExitIntent />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Hero layout" value={t.heroVariant}
          options={[{ value: "full", label: "Full-bleed" }, { value: "split", label: "Split" }, { value: "centered", label: "Centered" }]}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakText label="Headline" value={t.headline} onChange={(v) => setTweak("headline", v)} multiline />
        <TweakText label="Sub-headline" value={t.subhead} onChange={(v) => setTweak("subhead", v)} multiline />

        <TweakSection label="Donation" />
        <TweakRadio label="Amount picker" value={t.donationStyle}
          options={[{ value: "tiered", label: "Tiers" }, { value: "slider", label: "Slider" }, { value: "compact", label: "Compact" }]}
          onChange={(v) => setTweak("donationStyle", v)} />

        <TweakSection label="Brand & CRO" />
        <TweakRadio label="Volunteer section" value={t.volLayout}
          options={[{ value: "framed", label: "Framed" }, { value: "light", label: "Photo card" }, { value: "photo", label: "Full photo" }]}
          onChange={(v) => setTweak("volLayout", v)} />
        <TweakColor label="Primary accent" value={t.accent}
          options={["#2B6CB0", "#C87070", "#F4A300"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakToggle label="WhatsApp float" value={t.showWhatsapp} onChange={(v) => setTweak("showWhatsapp", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
