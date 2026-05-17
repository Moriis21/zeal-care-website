import { useParams } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { navConfig } from "@/lib/nav-config";
import { useState } from "react";
import { ChevronDown, ChevronUp, Heart, Users, HelpCircle, Sparkles, BookOpen, Star, Copy, Check, Building2, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

const section = navConfig.find((s) => s.path === "/igniting-potential")!;

// Official bank details — hardcoded for accuracy
const BANK = {
  bankName: "UBA (United Bank for Africa)",
  accountName: "Zeal Care",
  usd: "53080550013011",
  lrd: "53080550013028",
};

// Official mobile money dial codes — hardcoded for accuracy
const MOBILE_PROVIDERS = [
  {
    id: "lonestar",
    headerClass: "bg-[#001F5B] text-white",
    labelKey: "giving.ways.lonestarName",
    noteKey: "giving.ways.lonestarNote",
    usdCode: "*156*3*0887071690#",
    lrdCode: null as string | null,
  },
  {
    id: "orange",
    headerClass: "bg-[#FF6600] text-white",
    labelKey: "giving.ways.orangeName",
    noteKey: "giving.ways.orangeNote",
    usdCode: "*144*164*7811005#",
    lrdCode: "*144*253*7811005#",
  },
];

function CopyBtn({ text }: { text: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1 text-xs font-bold border border-primary/20 rounded-lg px-2.5 py-1.5 hover:bg-primary/5 transition-colors text-primary"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? t("giving.ways.copied") : t("giving.ways.copyCode")}
    </button>
  );
}

function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = t("giving.faq.items", { returnObjects: true }) as { q: string; a: string }[];
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <div key={i} className="border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-primary/5 transition-colors"
          >
            <span className="font-semibold text-primary pr-4">{faq.q}</span>
            {openIndex === i
              ? <ChevronUp className="w-5 h-5 text-secondary flex-shrink-0" />
              : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            }
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border bg-primary/[0.02]">
              <p className="pt-4">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Overview ─────────────────────────────────────────────────────────────────
function OverviewContent() {
  const { t } = useTranslation();
  const cards = [
    { lk: "giving.overview.cards.ways.label", dk: "giving.overview.cards.ways.desc", icon: Heart, href: "/igniting-potential/ways-to-give" },
    { lk: "giving.overview.cards.appeals.label", dk: "giving.overview.cards.appeals.desc", icon: Sparkles, href: "/igniting-potential/appeals" },
    { lk: "giving.overview.cards.partner.label", dk: "giving.overview.cards.partner.desc", icon: Users, href: "/igniting-potential/become-a-partner" },
    { lk: "giving.overview.cards.faq.label", dk: "giving.overview.cards.faq.desc", icon: HelpCircle, href: "/igniting-potential/faq" },
  ];
  return (
    <div className="space-y-8">
      <div className="bg-primary rounded-2xl p-8 text-white">
        <p className="text-2xl font-black mb-3">{t("giving.overview.hero")}</p>
        <p className="text-white/80">Nelson Mandela: &ldquo;{t("giving.overview.mandelaQuote")}&rdquo;</p>
      </div>
      <p className="text-muted-foreground leading-relaxed text-lg">{t("giving.overview.body")}</p>
      <div className="grid sm:grid-cols-2 gap-5">
        {cards.map(({ lk, dk, icon: Icon, href }) => (
          <a key={lk} href={href} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all block">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-primary mb-2">{t(lk)}</h3>
            <p className="text-muted-foreground text-sm">{t(dk)}</p>
          </a>
        ))}
      </div>
      <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-center">
        <p className="text-4xl font-black text-primary mb-2">90%+</p>
        <p className="text-muted-foreground font-medium">{t("giving.overview.directFunding")}</p>
      </div>
    </div>
  );
}

// ── Ways to Give ─────────────────────────────────────────────────────────────
function WaysContent() {
  const { t } = useTranslation();
  const impactItems = t("giving.ways.impactItems", { returnObjects: true }) as { amount: string; impact: string }[];
  const donationItems = t("giving.ways.donationItems", { returnObjects: true }) as string[];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-primary rounded-2xl p-8 text-white">
        <p className="text-2xl font-black mb-3">{t("giving.ways.hero")}</p>
        <p className="text-white/80 leading-relaxed">{t("giving.ways.heroPara")}</p>
      </div>

      {/* Impact Meter */}
      <div className="bg-white border border-border rounded-2xl p-6">
        <h3 className="font-black text-primary text-xl mb-5">{t("giving.ways.impactMeter")}</h3>
        <div className="space-y-3">
          {impactItems.map(({ amount, impact }) => (
            <div key={amount} className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors">
              <span className="text-2xl font-black text-primary w-24 flex-shrink-0">{amount}</span>
              <p className="text-muted-foreground text-sm">{impact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Donation usage */}
      <div className="space-y-4">
        <h3 className="font-black text-primary text-xl">{t("giving.ways.howUse")}</h3>
        <p className="text-muted-foreground leading-relaxed">{t("giving.ways.howUsePara")}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {donationItems.map((item) => (
            <div key={item} className="flex items-center gap-2 bg-secondary/10 rounded-xl p-3">
              <span className="text-secondary font-bold">✓</span>
              <span className="text-sm font-medium text-primary">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center">
            <Star className="w-7 h-7 text-secondary" />
          </div>
        </div>
        <p className="font-black text-primary text-xl mb-2">{t("giving.ways.readyTitle")}</p>
        <p className="text-muted-foreground mb-5">{t("giving.ways.readyPara")}</p>
        <p className="font-semibold text-primary mb-3">{t("giving.ways.contactPrompt")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:info@zealcare.org" className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors text-sm">{t("giving.ways.emailBtn")}</a>
          <a href="tel:+231886727619" className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors text-sm">{t("giving.ways.callBtn")}</a>
        </div>
      </div>

      {/* ── Mobile Money ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-primary" />
          <h3 className="font-black text-primary text-xl">Mobile Money</h3>
        </div>
        <div className="space-y-4">
          {MOBILE_PROVIDERS.map((p) => (
            <div key={p.id} className="bg-white border border-border rounded-2xl overflow-hidden">
              <div className={`${p.headerClass} px-6 py-4 flex items-center gap-3`}>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-black text-xs">{p.id === "lonestar" ? "MTN" : "OM"}</span>
                </div>
                <p className="font-black">{t(p.labelKey)}</p>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-muted-foreground">{t(p.noteKey)}</p>
                <div className={`grid gap-3 ${p.lrdCode ? "sm:grid-cols-2" : ""}`}>
                  {/* USD code */}
                  <div className="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3">
                    <p className="text-xs font-bold text-primary/70 uppercase tracking-wide mb-1.5">{t("giving.ways.payInUSD")}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-black text-primary tracking-wider text-sm font-mono">{p.usdCode}</p>
                      <CopyBtn text={p.usdCode} />
                    </div>
                  </div>
                  {/* LRD code (Orange only) */}
                  {p.lrdCode && (
                    <div className="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3">
                      <p className="text-xs font-bold text-primary/70 uppercase tracking-wide mb-1.5">{t("giving.ways.payInLRD")}</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-black text-primary tracking-wider text-sm font-mono">{p.lrdCode}</p>
                        <CopyBtn text={p.lrdCode} />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("giving.ways.afterPayment")}{" "}
                  <strong className="text-primary">{t("giving.ways.afterPaymentEmail")}</strong>{" "}
                  {t("giving.ways.afterPaymentSuffix")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bank Transfer ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-primary" />
          <h3 className="font-black text-primary text-xl">{t("giving.ways.bankTitle")}</h3>
        </div>
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="bg-primary px-6 py-4 text-white flex items-center gap-3">
            <Building2 className="w-5 h-5 flex-shrink-0" />
            <p className="font-black">{BANK.bankName}</p>
          </div>
          <div className="p-5 space-y-3">
            {/* Account name */}
            <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3">
              <p className="text-xs font-bold text-primary/60 uppercase tracking-wide mb-0.5">{t("giving.ways.bankAccountName")}</p>
              <p className="font-black text-primary">{BANK.accountName}</p>
            </div>
            {/* USD */}
            <div className="flex items-center justify-between bg-primary/5 border border-primary/10 rounded-xl px-4 py-3">
              <div>
                <p className="text-xs font-bold text-primary/60 uppercase tracking-wide mb-0.5">{t("giving.ways.bankUSD")}</p>
                <p className="font-black text-primary font-mono tracking-widest">{BANK.usd}</p>
              </div>
              <CopyBtn text={BANK.usd} />
            </div>
            {/* LRD */}
            <div className="flex items-center justify-between bg-primary/5 border border-primary/10 rounded-xl px-4 py-3">
              <div>
                <p className="text-xs font-bold text-primary/60 uppercase tracking-wide mb-0.5">{t("giving.ways.bankLRD")}</p>
                <p className="font-black text-primary font-mono tracking-widest">{BANK.lrd}</p>
              </div>
              <CopyBtn text={BANK.lrd} />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">{t("giving.ways.bankNote")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Appeals ──────────────────────────────────────────────────────────────────
function AppealsContent() {
  const { t } = useTranslation();
  const items = t("giving.appeals.items", { returnObjects: true }) as { title: string; urgency: string; desc: string; target: string }[];
  const icons = [Users, BookOpen, Sparkles];
  return (
    <div className="space-y-8">
      <div className="bg-primary rounded-2xl p-8 text-white">
        <p className="text-xl font-bold leading-relaxed">{t("giving.appeals.hero")}</p>
      </div>
      <div className="space-y-6">
        {items.map(({ title, urgency, desc, target }, i) => {
          const Icon = icons[i] ?? Sparkles;
          return (
            <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="bg-primary px-6 py-3 flex items-center justify-between gap-3">
                <span className="text-white font-bold flex items-center gap-2 min-w-0">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{title}</span>
                </span>
                <span className="text-secondary text-xs font-black bg-secondary/20 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">{urgency}</span>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-primary font-bold text-sm">{target}</span>
                  <a href="mailto:info@zealcare.org" className="bg-secondary text-primary px-4 py-2 rounded-full font-bold text-sm hover:bg-secondary/90 transition-colors flex-shrink-0">{t("giving.appeals.supportThis")}</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Become a Partner ─────────────────────────────────────────────────────────
function PartnerContent() {
  const { t } = useTranslation();
  const pathways = t("giving.partner.pathways", { returnObjects: true }) as { type: string; items: string[] }[];
  const colors = [
    { wrap: "border-blue-200 bg-blue-50", hd: "bg-blue-700" },
    { wrap: "border-green-200 bg-green-50", hd: "bg-green-700" },
    { wrap: "border-purple-200 bg-purple-50", hd: "bg-purple-700" },
  ];
  return (
    <div className="space-y-8">
      <div className="bg-primary rounded-2xl p-8 text-white">
        <p className="text-2xl font-black mb-3">{t("giving.partner.hero")}</p>
        <p className="text-white/80 leading-relaxed">{t("giving.partner.heroPara")}</p>
      </div>
      <p className="text-muted-foreground leading-relaxed">{t("giving.partner.body")}</p>
      <div className="space-y-5">
        <h3 className="font-black text-primary text-xl">{t("giving.partner.pathwaysTitle")}</h3>
        {pathways.map(({ type, items }, i) => {
          const c = colors[i] ?? colors[0];
          return (
            <div key={type} className={`border rounded-2xl overflow-hidden ${c.wrap}`}>
              <div className={`${c.hd} text-white px-5 py-3`}><p className="font-black">{type}</p></div>
              <div className="p-5">
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-white border border-border rounded-2xl p-6">
        <h3 className="font-black text-primary text-xl mb-5">{t("giving.partner.formTitle")}</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">{t("giving.partner.formType")}</label>
            <select className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">{t("giving.partner.formTypeOpt")}</option>
              <option>{t("giving.partner.formTypeOrg")}</option>
              <option>{t("giving.partner.formTypeInd")}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">{t("giving.partner.formName")}</label>
            <input type="text" placeholder={t("giving.partner.formNamePh")} className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">{t("giving.partner.formEmail")}</label>
            <input type="email" placeholder={t("giving.partner.formEmailPh")} className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">{t("giving.partner.formPathway")}</label>
            <select className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">{t("giving.partner.formPathwayOpt")}</option>
              {pathways.map(({ type }) => <option key={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">{t("giving.partner.formMessage")}</label>
            <textarea rows={4} placeholder={t("giving.partner.formMessagePh")} className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
          <a href="mailto:info@zealcare.org" className="block w-full bg-primary text-white py-3 rounded-full font-bold text-center hover:bg-primary/90 transition-colors text-sm">{t("giving.partner.formSubmit")}</a>
        </form>
      </div>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQContent() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <div className="bg-primary rounded-2xl p-8 text-white">
        <p className="text-2xl font-black mb-3">{t("giving.faq.hero")}</p>
      </div>
      <FAQ />
    </div>
  );
}

// ── Router ────────────────────────────────────────────────────────────────────
const SECTIONS: Record<string, { titleKey: string; Component: React.FC }> = {
  overview:           { titleKey: "giving.overview.title", Component: OverviewContent },
  "ways-to-give":     { titleKey: "giving.ways.title",     Component: WaysContent },
  appeals:            { titleKey: "giving.appeals.title",  Component: AppealsContent },
  "become-a-partner": { titleKey: "giving.partner.title",  Component: PartnerContent },
  faq:                { titleKey: "giving.faq.title",      Component: FAQContent },
};

export default function IgnitingPotentialPage() {
  const { t } = useTranslation();
  const params = useParams<{ section?: string }>();
  const key = params.section ?? "overview";
  const def = SECTIONS[key] ?? SECTIONS.overview;
  const title = t(def.titleKey);
  const { Component } = def;

  return (
    <PageLayout section={section} pageTitle={title} breadcrumb={key !== "overview" ? title : undefined}>
      <Component />
    </PageLayout>
  );
}
