/* RG Care — Success stories archive */
const STORY_ARCHIVE = [
  { name: "Aarti, 13", place: "Bawana, Delhi", program: "Education", slot: "sa-1", result: "Back in school · Rank 1 in Grade 8", blurb: "On the edge of dropping out to work, an after-school centre helped Aarti top her class." },
  { name: "Sunita Devi", place: "Sonipat, Haryana", program: "Women empowerment", slot: "sa-2", result: "Runs a 4-woman tailoring unit", blurb: "A self-help group turned Sunita's skill into a business that now employs four women." },
  { name: "Ramesh, 22", place: "Virudhunagar, TN", program: "Skill development", slot: "sa-3", result: "Employed solar technician", blurb: "A solar-skilling course gave Ramesh a trade — and a job within a month of finishing." },
  { name: "Meena & daughters", place: "Gurgaon, Haryana", program: "Healthcare", slot: "sa-4", result: "Safe pregnancy & healthy baby", blurb: "Regular antenatal checks at a mobile camp meant a safe delivery for Meena." },
  { name: "Imran, 19", place: "Delhi-NCR", program: "Skill development", slot: "sa-5", result: "Junior developer", blurb: "Digital-literacy training opened the door to Imran's first IT-enabled job." },
  { name: "Lakshmi", place: "Tamil Nadu", program: "Community", slot: "sa-6", result: "Clean water for her village", blurb: "A WASH project brought safe drinking water and better attendance for girls at school." },
];

function StoriesPage() {
  return (
    <>
      <Nav solid active="Stories" />
      <PageHero tint="cream"
        trail={[["Home", "/"], ["Success Stories"]]}
        eyebrow="Success stories"
        title="Change has a face — and a name."
        lead="Behind every number is a person whose life turned a corner. These are a few of them."
        actions={<>
          <a href="donate" className="btn btn-primary btn-lg"><Icon name="heart" size={18} /> Fund more stories</a>
          <a href="volunteer" className="btn btn-ghost btn-lg">Help write them</a>
        </>}
      />

      {/* featured slider (reused) */}
      <Stories />

      {/* archive */}
      <section className="section rg-band-white">
        <div className="wrap wrap-wide">
          <SectionHead center eyebrow="The archive" title="More journeys of change" sub="Real people, real outcomes — across education, healthcare, skills and community." />
          <div className="rg-grid-3" style={{ marginTop: 36 }}>
            {STORY_ARCHIVE.map((s) => (
              <article className="card rg-post" key={s.name} style={{ overflow: "hidden" }}>
                <Slot id={s.slot} label={"Portrait — " + s.name} radius={0} style={{ width: "100%", height: 220 }} />
                <div className="rg-post-body">
                  <span className="rg-post-tag">{s.program}</span>
                  <h3 className="rg-post-title" style={{ fontSize: 20 }}>{s.name}</h3>
                  <div className="rg-story-place" style={{ marginTop: 4 }}><Icon name="map-pin" size={14} /> {s.place}</div>
                  <p className="rg-prose" style={{ marginTop: 10 }}>{s.blurb}</p>
                  <div className="rg-story-result" style={{ marginTop: 14 }}><Icon name="trending-up" size={16} /> {s.result}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* impact stats */}
      <section className="section rg-band-blue" style={{ paddingTop: 44, paddingBottom: 44 }}>
        <div className="wrap wrap-wide">
          <StatRow light items={[
            { value: 18400, suffix: "+", label: "Children educated" },
            { value: 5100, suffix: "+", label: "Women empowered" },
            { value: 4300, suffix: "+", label: "Youth skilled" },
            { value: 31200, suffix: "+", label: "Healthcare beneficiaries" },
          ]} />
        </div>
      </section>

      <CTABand title="Your support writes the next story." text="Every gift is a child back in school, a mother with an income, a young person with a future."
        primary={["Donate now", "donate.html"]} secondary={["Meet our team", "about.html"]} />

      <PageFoot />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<StoriesPage />);
