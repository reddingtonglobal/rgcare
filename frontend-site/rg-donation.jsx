/* RG Care — Donation flow (interactive, multi-step, 3 amount-picker styles) */

const PAY_METHODS = [
  ["UPI", "smartphone"], ["Card", "credit-card"], ["Net banking", "landmark"],
  ["Razorpay", "zap"], ["QR code", "qr-code"],
];

function impactFor(amount, tiers) {
  let best = tiers[0];
  tiers.forEach((t) => { if (amount >= t.amount) best = t; });
  return best;
}
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

function FreqToggle({ freq, setFreq }) {
  return (
    <div className="rg-freq" role="tablist" aria-label="Donation frequency">
      {[["once", "One-time"], ["monthly", "Monthly"]].map(([k, label]) => (
        <button key={k} role="tab" aria-selected={freq === k}
          className={"rg-freq-btn" + (freq === k ? " is-on" : "")}
          onClick={() => setFreq(k)}>
          {label}{k === "monthly" && <span className="rg-freq-tag">2× impact</span>}
        </button>
      ))}
    </div>
  );
}

/* --- Amount pickers (3 styles) --- */
function AmountTiered({ tiers, amount, setAmount, custom, setCustom }) {
  return (
    <div className="rg-tiers">
      {tiers.map((t) => {
        const on = amount === t.amount && !custom;
        return (
          <button key={t.amount} className={"rg-tier" + (on ? " is-on" : "")}
            onClick={() => { setAmount(t.amount); setCustom(""); }}>
            <span className="rg-tier-top">
              <span className="rg-tier-amt">{inr(t.amount)}</span>
              <span className="rg-tier-ic"><Icon name={t.icon} size={18} /></span>
            </span>
            <span className="rg-tier-label">{t.label}</span>
            <span className="rg-tier-desc">{t.desc}</span>
          </button>
        );
      })}
      <div className={"rg-tier rg-tier-custom" + (custom ? " is-on" : "")}>
        <label className="rg-tier-label" htmlFor="customA">Custom amount</label>
        <div className="rg-custom-input">
          <span>₹</span>
          <input id="customA" type="number" inputMode="numeric" min="100" placeholder="Other"
            value={custom} onChange={(e) => setCustom(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

function AmountSlider({ tiers, amount, setAmount, custom, setCustom }) {
  const val = custom ? Number(custom) : amount;
  const min = 100, max = 25000;
  const imp = impactFor(val || 0, tiers);
  return (
    <div className="rg-slider-pick">
      <div className="rg-slider-amt">{inr(val || 0)}</div>
      <input type="range" min={min} max={max} step={100} value={Math.min(val || min, max)}
        onChange={(e) => { setAmount(Number(e.target.value)); setCustom(""); }} className="rg-range" />
      <div className="rg-slider-scale"><span>₹100</span><span>₹25,000</span></div>
      <div className="rg-quickchips">
        {tiers.map((t) => (
          <button key={t.amount} className={"rg-quickchip" + (val === t.amount ? " is-on" : "")}
            onClick={() => { setAmount(t.amount); setCustom(""); }}>{inr(t.amount)}</button>
        ))}
      </div>
      <div className="rg-slider-impact"><Icon name={imp.icon} size={18} /> {inr(val || 0)} ≈ <b>{imp.label}</b> — {imp.desc}</div>
    </div>
  );
}

function AmountCompact({ tiers, amount, setAmount, custom, setCustom }) {
  return (
    <div className="rg-compact-pick">
      <div className="rg-compact-chips">
        {tiers.map((t) => (
          <button key={t.amount} className={"rg-compact-chip" + (amount === t.amount && !custom ? " is-on" : "")}
            onClick={() => { setAmount(t.amount); setCustom(""); }}>{inr(t.amount)}</button>
        ))}
        <div className={"rg-compact-custom" + (custom ? " is-on" : "")}>
          <span>₹</span>
          <input type="number" inputMode="numeric" placeholder="Custom" value={custom}
            onChange={(e) => setCustom(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

function DonationWidget({ style = "tiered", compact = false, onClose }) {
  const tiers = window.RG.tiers;
  const [step, setStep] = useState("amount");
  const [freq, setFreq] = useState("monthly");
  const [amount, setAmount] = useState(2500);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState("UPI");
  const [form, setForm] = useState({ name: "", email: "", phone: "", pan: "" });
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);

  const value = custom ? Number(custom) : amount;
  const imp = impactFor(value || 0, tiers);
  const steps = ["amount", "details", "pay", "done"];
  const idx = steps.indexOf(step);

  const Picker = style === "slider" ? AmountSlider : style === "compact" ? AmountCompact : AmountTiered;

  const goPay = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email needed";
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, "").slice(-10))) e.phone = "10-digit phone";
    setErr(e);
    if (Object.keys(e).length === 0) setStep("pay");
  };
  const pay = () => {
    setBusy(true);
    setTimeout(() => { setBusy(false); setStep("done"); }, 1400);
  };

  return (
    <div className={"rg-donate-widget" + (compact ? " is-modal" : "")}>
      {onClose && (
        <button className="rg-modal-close" aria-label="Close" onClick={onClose}><Icon name="x" size={20} /></button>
      )}

      {step !== "done" && (
        <div className="rg-steps">
          {["Amount", "Details", "Payment"].map((s, i) => (
            <span key={s} className={"rg-step" + (i === idx ? " is-on" : "") + (i < idx ? " is-done" : "")}>
              <i>{i < idx ? <Icon name="check" size={13} /> : i + 1}</i>{s}
            </span>
          ))}
        </div>
      )}

      {step === "amount" && (
        <div className="rg-step-body">
          <h3 className="rg-donate-h">Choose your gift</h3>
          <FreqToggle freq={freq} setFreq={setFreq} />
          <Picker tiers={tiers} amount={amount} setAmount={setAmount} custom={custom} setCustom={setCustom} />
          {style !== "slider" && (
            <div className="rg-impact-line">
              <Icon name={imp.icon} size={18} />
              <span><b>{inr(value || 0)}{freq === "monthly" ? "/mo" : ""}</b> ≈ {imp.label.toLowerCase()} — {imp.desc}</span>
            </div>
          )}
          <button className="btn btn-primary rg-donate-go" disabled={!value || value < 100}
            onClick={() => setStep("details")}>
            Continue <Icon name="arrow-right" size={18} />
          </button>
          <div className="rg-donate-secure"><Icon name="lock" size={14} /> 100% secure · 80G tax-deductible · cancel anytime</div>
        </div>
      )}

      {step === "details" && (
        <div className="rg-step-body">
          <button className="rg-back" onClick={() => setStep("amount")}><Icon name="arrow-left" size={16} /> Back</button>
          <h3 className="rg-donate-h">Your details</h3>
          <p className="rg-donate-sub">{inr(value)}{freq === "monthly" ? " every month" : " one-time"} · we'll email your 80G receipt.</p>
          <div className="rg-fields">
            {[["name", "Full name", "text", "Priya Sharma"],
              ["email", "Email", "email", "you@email.com"],
              ["phone", "Phone", "tel", "98765 43210"],
              ["pan", "PAN (optional, for 80G)", "text", "ABCDE1234F"]].map(([k, label, type, ph]) => (
              <label className={"rg-field" + (err[k] ? " has-err" : "")} key={k}>
                <span>{label}</span>
                <input type={type} placeholder={ph} value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
                {err[k] && <em>{err[k]}</em>}
              </label>
            ))}
          </div>
          <button className="btn btn-primary rg-donate-go" onClick={goPay}>
            Continue to payment <Icon name="arrow-right" size={18} />
          </button>
        </div>
      )}

      {step === "pay" && (
        <div className="rg-step-body">
          <button className="rg-back" onClick={() => setStep("details")}><Icon name="arrow-left" size={16} /> Back</button>
          <h3 className="rg-donate-h">Payment</h3>
          <div className="rg-pay-summary">
            <span>{freq === "monthly" ? "Monthly gift" : "One-time gift"}</span>
            <b>{inr(value)}{freq === "monthly" ? "/mo" : ""}</b>
          </div>
          <div className="rg-methods">
            {PAY_METHODS.map(([m, ic]) => (
              <button key={m} className={"rg-method" + (method === m ? " is-on" : "")} onClick={() => setMethod(m)}>
                <Icon name={ic} size={20} /> {m}
              </button>
            ))}
          </div>
          {method === "QR code" ? (
            <div className="rg-qr">
              <div className="rg-qr-box"><Icon name="qr-code" size={120} /></div>
              <p>Scan with any UPI app to pay {inr(value)}</p>
            </div>
          ) : (
            <div className="rg-pay-mock">
              <Icon name="shield-check" size={18} />
              <span>You'll be redirected to a secure {method} checkout. This is a prototype — no real charge.</span>
            </div>
          )}
          <button className="btn btn-rose rg-donate-go" onClick={pay} disabled={busy}>
            {busy ? <><span className="rg-spin" /> Processing…</> : <><Icon name="heart" size={18} /> Donate {inr(value)}{freq === "monthly" ? "/mo" : ""}</>}
          </button>
          <div className="rg-donate-secure"><Icon name="lock" size={14} /> 256-bit encrypted · PCI-DSS compliant</div>
        </div>
      )}

      {step === "done" && (
        <div className="rg-step-body rg-done">
          <div className="rg-done-check"><Icon name="check" size={40} /></div>
          <h3 className="rg-donate-h">Thank you{form.name ? ", " + form.name.split(" ")[0] : ""}!</h3>
          <p className="rg-donate-sub">
            Your {freq === "monthly" ? "monthly" : "one-time"} gift of <b>{inr(value)}</b> is on its way to {imp.label.toLowerCase()}.
            A receipt with your 80G details is headed to {form.email || "your inbox"}.
          </p>
          <div className="rg-done-impact"><Icon name={imp.icon} size={20} /> {imp.desc}</div>
          <div className="rg-done-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => { setStep("amount"); }}>Give again</button>
            {onClose && <button className="btn btn-primary btn-sm" onClick={onClose}>Done</button>}
          </div>
          <div className="rg-share">Share the cause: 
            <span className="rg-share-ic"><Brand name="instagram" size={15} /></span>
            <span className="rg-share-ic"><Brand name="facebook" size={15} /></span>
            <span className="rg-share-ic"><Brand name="twitter" size={14} /></span>
          </div>
        </div>
      )}
    </div>
  );
}

function DonateSection({ style }) {
  const raised = 482000, goal = 750000;
  const pct = Math.round((raised / goal) * 100);
  return (
    <section className="section rg-donate-sec" id="donate">
      <div className="wrap wrap-wide rg-donate-grid">
        <div className="rg-donate-rail">
          <Eyebrow style={{ color: "#fff" }}>Donate</Eyebrow>
          <h2 className="rg-h2 on-dark" style={{ marginTop: 14 }}>Your gift becomes a school day, a check-up, a fresh start.</h2>
          <p className="rg-donate-rail-sub">Every contribution is tracked end-to-end, so you can see exactly where your money goes.</p>
          <div className="rg-progress">
            <div className="rg-progress-top"><b>{inr(raised)}</b> raised of {inr(goal)} goal</div>
            <div className="rg-progress-bar"><span style={{ width: pct + "%" }} /></div>
            <div className="rg-progress-foot">{pct}% · this month's relief drive · <b>318 donors</b></div>
          </div>
          <div className="rg-donate-trust">
            {["80G receipt", "Cancel anytime", "100% to programs*"].map((x) => (
              <span key={x}><Icon name="check" size={14} /> {x}</span>
            ))}
          </div>
        </div>
        <div className="rg-donate-card card">
          <DonationWidget style={style} />
        </div>
      </div>
    </section>
  );
}

function DonateModal({ open, style, onClose }) {
  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="rg-modal-backdrop" onClick={onClose}>
      <div className="rg-modal card" onClick={(e) => e.stopPropagation()}>
        <DonationWidget style={style} compact onClose={onClose} />
      </div>
    </div>
  );
}

Object.assign(window, { DonationWidget, DonateSection, DonateModal });
