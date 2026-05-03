import { useState, useEffect } from "react";
import { X, CheckCircle, Smartphone, Building2, CreditCard, MoreHorizontal, ChevronRight, Heart, Phone, Zap } from "lucide-react";
import { useDonate } from "@/context/DonateContext";
import { useRecordDonation } from "@/hooks/useDonationStats";
import { useSponsorChild } from "@/hooks/useChildren";

const PRESET_AMOUNTS = [25, 50, 150, 500, 1800, 7200];

const impactMap: Record<number, string> = {
  25: "Provides school supplies for 1 child for a term",
  50: "Covers a child's school uniform, shoes, and books",
  150: "Fully sponsors 1 child's education for a full academic year",
  500: "Sponsors 2 underprivileged children for a full year",
  1800: "Sponsors 3 children + a full year of mentorship & skills training",
  7200: "Sponsors up to 25 children for a full academic year",
};

const getImpact = (amount: number): string => {
  if (amount <= 0) return "";
  if (amount < 25) return "Every dollar helps provide school supplies for children in need";
  if (amount < 50) return impactMap[25];
  if (amount < 150) return impactMap[50];
  if (amount < 500) return impactMap[150];
  if (amount < 1800) return impactMap[500];
  if (amount < 7200) return impactMap[1800];
  return impactMap[7200];
};

type PaymentMethod = "mobile" | "momo" | "bank" | "card" | "other";

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; shortLabel: string; badge?: string }[] = [
  { id: "mobile", label: "Mobile Money", shortLabel: "Mobile", icon: <Smartphone className="w-5 h-5" /> },
  { id: "momo", label: "MTN MoMo API", shortLabel: "MTN MoMo", icon: <Zap className="w-5 h-5" />, badge: "Soon" },
  { id: "bank", label: "Bank Transfer", shortLabel: "Bank", icon: <Building2 className="w-5 h-5" /> },
  { id: "card", label: "Card", shortLabel: "Card", icon: <CreditCard className="w-5 h-5" /> },
  { id: "other", label: "Other", shortLabel: "Other", icon: <MoreHorizontal className="w-5 h-5" /> },
];

const paymentDetails: Record<PaymentMethod, { title: string; instructions: string[]; note?: string }> = {
  momo: {
    title: "MTN Mobile Money — Direct Payment",
    instructions: [
      "We'll send a payment prompt directly to your MTN MoMo number",
      "You approve the payment on your phone — no shortcodes needed",
      "Payment is confirmed instantly and securely via the MTN MoMo API",
    ],
    note: "This feature is coming soon. Register your interest below and we'll notify you the moment it goes live.",
  },
  mobile: {
    title: "Mobile Money (Orange Money — Liberia)",
    instructions: [
      "To pay in USD: Dial *144*164*7811005# on your Orange Money phone",
      "To pay in LRD: Dial *144*253*7811005# on your Orange Money phone",
      "Or send directly to: +231 886 727 619 (Orange Money / Lonestar MTN)",
      "Reference: Your name + 'Zeal Care Donation'",
    ],
    note: "After donating, email zealcare24@gmail.com with your name and transaction ID for confirmation and receipt.",
  },
  bank: {
    title: "Bank Transfer",
    instructions: [
      "Please contact us for bank transfer details",
      "Email: info@zealcare.org",
      "Subject: Bank Transfer Donation",
    ],
    note: "We'll respond within 24 hours with our bank account details and transfer instructions.",
  },
  card: {
    title: "Card Payment",
    instructions: [
      "Card payments can be arranged through our team",
      "Email: info@zealcare.org with the subject 'Card Donation'",
      "We'll send you a secure payment link",
    ],
    note: "We're working on integrating an online card payment gateway. Thank you for your patience.",
  },
  other: {
    title: "Other Ways to Give",
    instructions: [
      "Wire transfer — contact info@zealcare.org for instructions",
      "In-kind support — contact us to discuss what's needed",
      "Fundraise on our behalf — reach out to partner with us",
    ],
    note: "For any questions about donating, email info@zealcare.org or call +231 886 727 619.",
  },
};

type Step = "form" | "confirm" | "success";

export function DonateModal() {
  const { isOpen, closeDonate, initialAmount, sponsoredChild } = useDonate();
  const [step, setStep] = useState<Step>("form");
  const [amount, setAmount] = useState<number | "">(150);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("mobile");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameOrOrg, setNameOrOrg] = useState("");
  const [momoPhone, setMomoPhone] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep("form");
      if (initialAmount) {
        setAmount(initialAmount);
        setIsCustom(!PRESET_AMOUNTS.includes(initialAmount));
        if (!PRESET_AMOUNTS.includes(initialAmount)) {
          setCustomAmount(String(initialAmount));
        }
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, initialAmount]);

  const recordDonation = useRecordDonation();
  const sponsorChildMutation = useSponsorChild();

  if (!isOpen) return null;

  const effectiveAmount = isCustom ? (Number(customAmount) || 0) : (Number(amount) || 0);
  const impact = getImpact(effectiveAmount);

  const handleConfirm = () => {
    if (effectiveAmount <= 0) return;
    setStep("confirm");
  };

  const handlePaymentSent = () => {
    recordDonation.mutate({
      amount: effectiveAmount,
      donorName: nameOrOrg,
      donorEmail: email,
      method,
      childName: sponsoredChild?.name,
      childId: sponsoredChild?.id,
      message,
    });
    if (sponsoredChild) {
      sponsorChildMutation.mutate(sponsoredChild.id);
    }
    setStep("success");
  };

  const handleDone = () => {
    closeDonate();
    setTimeout(() => {
      setStep("form");
      setAmount(150);
      setIsCustom(false);
      setCustomAmount("");
      setEmail("");
      setMessage("");
      setNameOrOrg("");
      setMomoPhone("");
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) closeDonate(); }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary px-7 py-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {sponsoredChild ? (
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-black text-primary text-lg flex-shrink-0">
                {sponsoredChild.name[0]}
              </div>
            ) : (
              <Heart className="w-6 h-6 text-secondary fill-secondary" />
            )}
            <div>
              <p className="text-white font-black text-lg leading-tight">
                {sponsoredChild ? `Sponsoring ${sponsoredChild.name}` : "Donate to Zeal Care"}
              </p>
              <p className="text-white/60 text-xs">
                {sponsoredChild ? "1 full year of school · $150" : "Igniting Potential · Inspiring Change"}
              </p>
            </div>
          </div>
          <button onClick={closeDonate} className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-7 py-6">
          {/* ---- STEP: FORM ---- */}
          {step === "form" && (
            <div className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-bold text-primary mb-3">Select Amount (USD)</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setAmount(a); setIsCustom(false); setCustomAmount(""); }}
                      className={`py-3 rounded-xl text-sm font-bold transition-all duration-150 ${
                        !isCustom && amount === a
                          ? "bg-secondary text-primary shadow-md scale-105"
                          : "bg-primary/8 text-primary hover:bg-primary/15 border border-border"
                      }`}
                    >
                      ${a.toLocaleString()}
                    </button>
                  ))}
                </div>
                {/* Custom Amount */}
                <div className={`flex items-center gap-2 border-2 rounded-xl px-4 py-3 transition-colors ${isCustom ? "border-secondary" : "border-border"}`}>
                  <span className="text-primary font-bold text-sm">$</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setIsCustom(true); setAmount(""); }}
                    onFocus={() => { setIsCustom(true); setAmount(""); }}
                    className="flex-1 text-sm font-semibold text-primary bg-transparent outline-none placeholder:text-muted-foreground"
                  />
                  {isCustom && customAmount && (
                    <span className="text-xs font-bold text-secondary">Custom</span>
                  )}
                </div>
              </div>

              {/* Impact Display */}
              {effectiveAmount > 0 && impact && (
                <div className="bg-secondary/15 border border-secondary/40 rounded-2xl p-4 flex gap-3 items-start">
                  <span className="text-xl flex-shrink-0">💛</span>
                  <div>
                    <p className="text-primary font-bold text-sm mb-0.5">Your Impact</p>
                    <p className="text-primary/80 text-sm leading-relaxed">{impact}</p>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-bold text-primary mb-3">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setMethod(pm.id)}
                      className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                        method === pm.id
                          ? pm.id === "momo"
                            ? "bg-yellow-400 text-yellow-900 shadow-md"
                            : "bg-primary text-white shadow-md"
                          : "bg-primary/8 text-primary hover:bg-primary/15 border border-border"
                      }`}
                    >
                      {pm.badge && (
                        <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-yellow-900 text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">
                          {pm.badge}
                        </span>
                      )}
                      {pm.icon}
                      <span>{pm.shortLabel}</span>
                    </button>
                  ))}
                </div>

                {/* MTN MoMo Coming Soon panel */}
                {method === "momo" && (
                  <div className="mt-3 rounded-2xl border-2 border-yellow-400 bg-yellow-50 overflow-hidden">
                    {/* Banner */}
                    <div className="bg-yellow-400 px-4 py-2.5 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-900 flex-shrink-0" />
                      <p className="text-yellow-900 font-black text-sm">MTN MoMo Direct Pay — Coming Soon</p>
                    </div>
                    <div className="px-4 py-4 space-y-3">
                      <p className="text-sm text-yellow-900 leading-relaxed">
                        We're integrating the <strong>MTN MoMo API</strong> so you can pay directly from this page — no shortcodes, no manual steps. A payment prompt will be pushed to your phone and you approve it with one tap.
                      </p>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-yellow-900">
                          Your MTN MoMo Number <span className="font-normal opacity-70">(we'll notify you when it goes live)</span>
                        </label>
                        <div className="flex items-center gap-2 bg-white border-2 border-yellow-300 rounded-xl px-3 py-2.5">
                          <Phone className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                          <input
                            type="tel"
                            placeholder="+231 77 000 0000"
                            value={momoPhone}
                            onChange={(e) => setMomoPhone(e.target.value)}
                            className="flex-1 text-sm font-semibold text-primary bg-transparent outline-none placeholder:text-muted-foreground"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-2 leading-relaxed">
                        📱 In the meantime, you can still donate via <strong>Orange Money</strong> using the shortcode option above. We'll switch to MTN MoMo API as soon as our credentials are approved.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Your Name / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Smith or Acme Corp"
                  value={nameOrOrg}
                  onChange={(e) => setNameOrOrg(e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Email Address <span className="font-normal text-muted-foreground">(for receipt)</span></label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-primary mb-1.5">Brief Message <span className="font-normal text-muted-foreground">(optional)</span></label>
                <textarea
                  rows={2}
                  placeholder="e.g. Allocate to West Point children, or a personal note..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-shadow"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleConfirm}
                disabled={effectiveAmount <= 0}
                className={`w-full py-4 rounded-2xl font-black text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] ${
                  method === "momo"
                    ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-300"
                    : "bg-secondary text-primary hover:bg-secondary/90"
                }`}
              >
                {method === "momo" ? (
                  <>
                    <Zap className="w-5 h-5" />
                    Register My Interest — ${effectiveAmount > 0 ? effectiveAmount.toLocaleString() : "—"}
                  </>
                ) : (
                  <>
                    Confirm Donation of ${effectiveAmount > 0 ? effectiveAmount.toLocaleString() : "—"}
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                90%+ of every dollar goes directly to our programs. <br/>
                We do not share your personal information.
              </p>
            </div>
          )}

          {/* ---- STEP: CONFIRM / PAYMENT DETAILS ---- */}
          {step === "confirm" && (
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-primary text-lg">Donation Summary</p>
                  <span className="text-2xl font-black text-secondary">${effectiveAmount.toLocaleString()}</span>
                </div>
                {nameOrOrg && <p className="text-sm text-muted-foreground"><span className="font-semibold">From:</span> {nameOrOrg}</p>}
                {email && <p className="text-sm text-muted-foreground"><span className="font-semibold">Receipt to:</span> {email}</p>}
                <p className="text-sm text-muted-foreground"><span className="font-semibold">Method:</span> {paymentMethods.find(p => p.id === method)?.label}</p>
                {message && <p className="text-sm text-muted-foreground"><span className="font-semibold">Note:</span> {message}</p>}
                {impact && (
                  <div className="mt-3 pt-3 border-t border-primary/10">
                    <p className="text-sm text-primary font-semibold">💛 {impact}</p>
                  </div>
                )}
              </div>

              {/* Payment Instructions */}
              <div>
                <p className="font-black text-primary text-base mb-3">{paymentDetails[method].title}</p>
                <div className="space-y-2.5">
                  {paymentDetails[method].instructions.map((instr, i) => (
                    <div key={i} className="flex gap-3 bg-white border border-border rounded-xl p-3.5">
                      <span className="w-6 h-6 bg-primary rounded-full text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <p className="text-sm text-primary font-medium leading-snug">{instr}</p>
                    </div>
                  ))}
                </div>
                {paymentDetails[method].note && (
                  <div className="mt-3 bg-secondary/10 border border-secondary/30 rounded-xl p-3.5">
                    <p className="text-xs text-primary/80 leading-relaxed">{paymentDetails[method].note}</p>
                  </div>
                )}
              </div>

              {/* MoMo interest note on confirm step */}
              {method === "momo" && momoPhone && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3.5 flex gap-2 items-start">
                  <Phone className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-900 leading-relaxed">
                    <span className="font-bold">MTN MoMo number registered:</span> {momoPhone}. We'll send you a payment request as soon as the MTN MoMo API goes live.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("form")}
                  className="flex-1 py-3 border-2 border-primary/20 text-primary rounded-2xl font-bold text-sm hover:bg-primary/5 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePaymentSent}
                  className={`flex-[2] py-3 rounded-2xl font-bold text-sm transition-all shadow-md hover:shadow-lg ${
                    method === "momo"
                      ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-300"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {method === "momo" ? "⚡ Register My Interest" : "I've Sent the Payment ✓"}
                </button>
              </div>
            </div>
          )}

          {/* ---- STEP: SUCCESS ---- */}
          {step === "success" && (
            <div className="text-center space-y-6 py-4">
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-14 h-14 text-green-500" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary mb-2">Thank You!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your generosity is changing lives. We'll verify your payment and send a confirmation to {email || "your email"} within 24 hours.
                </p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-left">
                <p className="font-bold text-primary mb-2 text-sm">What happens next?</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-green-500">✓</span>We verify your payment</li>
                  <li className="flex gap-2"><span className="text-green-500">✓</span>You receive a receipt via email</li>
                  <li className="flex gap-2"><span className="text-green-500">✓</span>Funds are allocated to sponsor a child</li>
                  <li className="flex gap-2"><span className="text-green-500">✓</span>We share an update on the child's progress</li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Share the movement with others:</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://zealcare.org`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-700 transition-colors"
                  >
                    Share on Facebook
                  </a>
                  <a
                    href={`https://www.linkedin.com/company/zeal-care`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-800 transition-colors"
                  >
                    Follow on LinkedIn
                  </a>
                </div>
              </div>
              <button
                onClick={handleDone}
                className="w-full bg-secondary text-primary py-4 rounded-2xl font-black hover:bg-secondary/90 transition-all shadow-md"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
