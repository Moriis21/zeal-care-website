import { useParams } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { navConfig } from "@/lib/nav-config";

const section = navConfig.find((s) => s.path === "/what-we-do")!;

const programs = [
  {
    icon: "📚",
    title: "Education Sponsorship, Support & Advocacy",
    quote: '"The best way to fight poverty is to empower people through access to quality education." – John Legend',
    desc: "This program empowers underprivileged children aged 4 to 17 who live in slums and rural communities and never enrolled or dropped out. We provide registration and tuition, school supplies, and resources to support academic success, and advocate for inclusive education, especially for the disabled.",
    img: "/attached_assets/pdf_images/img-059.jpg",
  },
  {
    icon: "🌟",
    title: "Leadership Development Programs",
    quote: '"If your actions inspire others to dream more, learn more, do more, and become more, you are a leader." – John Quincy Adams',
    desc: "Structured initiatives developing key skills for underprivileged children, students, and Zeal Care volunteers. Focus areas include personal development, mentorship, coaching, communication, problem-solving, emotional intelligence, and negotiation through training, seminars, and summits.",
    img: "/attached_assets/pdf_images/img-067.jpg",
  },
  {
    icon: "💼",
    title: "Entrepreneurship Programs",
    quote: '"It\'s not about ideas. It\'s about making ideas happen." — Scott Belsky',
    desc: "Structured training and developmental initiatives equipping underprivileged children, students, and young people with the knowledge, skills, and mindset required to identify business opportunities, develop new ventures, and manage business growth through seminars, summits, and more.",
    img: "/attached_assets/pdf_images/img-068.jpg",
  },
  {
    icon: "🔬",
    title: "Career Paths in STEM Programs",
    quote: '"Science is not a boy\'s game, it\'s not a girl\'s game. It\'s everyone\'s game." – Nichelle Nichols',
    desc: "Collaborate with high schools to provide information and resources on choosing career paths in STEM for high school students through workshops, seminars, and campaigns.",
    img: null,
  },
  {
    icon: "💻",
    title: "Digital Education Programs",
    quote: '"The illiterate of the 21st century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn." – Alvin Toffler',
    desc: "Providing digital literacy training and awareness in various ICT programs through seminars, bootcamp, coding, and others — ensuring young people are prepared for an increasingly digital world.",
    img: null,
  },
];

const subsections: Record<string, { title: string; content: React.ReactNode }> = {
  overview: {
    title: "What We Do",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-xl font-bold leading-relaxed">Zeal Care is creating a model that will radically improve the lives of underprivileged children to become independent and influential people in society.</p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">We treat everyone we work with as an individual. But we do not support anyone in isolation. We work in partnership with slum and rural communities, founded on trust and deep respect for the expertise and commitment of community and school members.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { label: "How We Operate", path: "/what-we-do/how-we-operate", icon: "⚙️", desc: "Our holistic, community-rooted model of educational support." },
            { label: "Where We Operate", path: "/what-we-do/where-we-operate", icon: "🗺️", desc: "Currently serving 3 counties across Liberia." },
            { label: "Our Programs", path: "/what-we-do/programs", icon: "📋", desc: "Five core programs from education to digital literacy." },
            { label: "Impact in Numbers", path: "/what-we-do/impact", icon: "📊", desc: "105+ children sponsored, 100% retention rate." },
          ].map(({ label, icon, desc }) => (
            <div key={label} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-primary mb-2">{label}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          ))}
        </div>
        <img src="/attached_assets/pdf_images/img-055.jpg" alt="Zeal Care in action" className="w-full rounded-2xl object-cover max-h-80" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    ),
  },
  "how-we-operate": {
    title: "How We Operate",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-xl font-bold leading-relaxed">We believe that effectively supporting an individual means investing in the structures that surround them.</p>
        </div>
        <p className="text-muted-foreground leading-relaxed">Zeal Care knows that successfully supporting a child means investing in all aspects of their life — providing both financial and social support, and working to change the context of their exclusion.</p>
        <div className="space-y-5">
          {[
            { step: "01", title: "Community Survey & Selection", desc: "We conduct educational surveys in target communities to identify children most in need. Using a rigorous, transparent selection process, we identify families from low- or no-income backgrounds who have children out of school." },
            { step: "02", title: "Interview & Vetting Process", desc: "Shortlisted candidates are interviewed by a committee that includes community leaders, ensuring fairness and community buy-in. Parents or guardians are included in the process." },
            { step: "03", title: "Full Sponsorship Package", desc: "Zeal Care not only pays school fees but also provides uniforms, books, shoes, bags, pens, pencils, and other essentials so children can attend school with dignity and readiness." },
            { step: "04", title: "Ongoing Monitoring & Mentorship", desc: "Our team regularly visits schools and communities to monitor beneficiaries' academic performance and well-being. We provide mentorship and ensure every child is supported beyond the classroom." },
            { step: "05", title: "Leadership & Skills Training", desc: "Beyond education, we offer leadership development, entrepreneurship, STEM awareness, and digital literacy programs so children and youth are equipped for future success." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-5 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all">
              <span className="text-4xl font-black text-secondary/30 leading-none flex-shrink-0">{step}</span>
              <div>
                <h3 className="font-bold text-primary text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "where-we-operate": {
    title: "Where We Operate",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-xl font-bold leading-relaxed">Zeal Care works in partnership with communities, schools, donors, NGOs, and education authorities in Liberia and across Africa. We are currently operating in three counties in Liberia.</p>
        </div>
        <div className="space-y-5">
          {[
            { county: "Montserrado County", status: "Active", statusColor: "bg-green-100 text-green-700", desc: "Zeal Care started its initiative in a slum community in Montserrado in 2024. We currently support the education of underprivileged children in 2 private schools across 2 districts. Our partner communities — Chicken Soup Factory (Lorma Yard, Block D) and West Point (Zone 405) — are among the most deprived in the county, with extremely low literacy rates.", communities: ["Chicken Soup Factory, Lorma Yard, Block D", "West Point, Zone 405, Blocks C, D & E"] },
            { county: "Margibi County", status: "Planned 2026", statusColor: "bg-yellow-100 text-yellow-700", desc: "Zeal Care intends to expand to Margibi County in 2026 to support the education of vulnerable underprivileged children in schools across Districts 7 and 12.", communities: [] },
            { county: "Bong County", status: "Planned 2026", statusColor: "bg-yellow-100 text-yellow-700", desc: "Zeal Care intends to extend its initiative to Bong County in 2026 to support underprivileged children in schools across 1 district.", communities: [] },
          ].map(({ county, status, statusColor, desc, communities }) => (
            <div key={county} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-black text-primary text-xl">{county}</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor}`}>{status}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">{desc}</p>
              {communities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {communities.map((c) => <span key={c} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{c}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-center">
          <p className="font-bold text-primary mb-2">🌍 Vision: Beyond Liberia</p>
          <p className="text-muted-foreground">Zeal Care's vision extends to West Africa and across the African continent. Our model is designed to be replicated in communities with similar challenges.</p>
        </div>
      </div>
    ),
  },
  programs: {
    title: "Our Programs",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">As Zeal Care ignites potential and inspires change, we celebrate the hope and joy in supporting underprivileged children, students, and youth in realizing their dreams through five core programs.</p>
        <div className="space-y-8">
          {programs.map((prog) => (
            <div key={prog.title} className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
              {prog.img && <img src={prog.img} alt={prog.title} className="w-full h-56 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
              <div className="p-6">
                <div className="text-3xl mb-3">{prog.icon}</div>
                <h3 className="font-black text-primary text-xl mb-3">{prog.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{prog.desc}</p>
                <div className="bg-secondary/10 border-l-4 border-secondary rounded-r-xl p-4">
                  <p className="text-primary italic text-sm font-semibold">{prog.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "what-sets-us-apart": {
    title: "What Sets Us Apart",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">Zeal Care is not just another education NGO. Our model is designed to create lasting, systemic change by addressing the root causes of educational inequality — not just its symptoms.</p>
        <div className="space-y-6">
          {[
            { icon: "🎯", title: "Holistic Development, Not Just School Fees", desc: "Zeal Care goes beyond education sponsorship with mentorship and life-skills development. This ensures children not only stay in school but also build confidence and resilience, gain leadership and entrepreneurship skills, and learn how to choose a career path for long-term success. This integrated approach directly advances SDG 4 by improving access, retention, and learning outcomes." },
            { icon: "🏘️", title: "Community-Rooted and Accountability-Driven", desc: "Zeal Care is deeply embedded within local communities, working closely with parents, schools, and community leaders to ensure sustainability. Our strong emphasis on transparency, monitoring, and donor accountability guarantees that every contribution delivers measurable and lasting impact. This aligns with SDG 17, Partnerships for the Goals." },
            { icon: "📊", title: "Evidence-Based Selection and Monitoring", desc: "Our rigorous survey, interview, and vetting process ensures that support reaches those who need it most. We continuously monitor academic performance and well-being, providing accountability to donors and ensuring children receive their full entitlements." },
            { icon: "🌱", title: "Youth-Led Movement", desc: "Zeal Care is led by young people who have personally experienced the barriers of poverty and educational inequality. This lived experience drives authentic, culturally sensitive programming that resonates with communities and beneficiaries." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-border rounded-2xl p-7 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{icon}</span>
                <div>
                  <h3 className="font-black text-primary text-xl mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  impact: {
    title: "Impact in Numbers",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">Numbers tell part of the story. Behind every statistic is a child who now has the chance to dream bigger.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { num: "105+", label: "Underprivileged children provided with full educational sponsorship and support", icon: "🎓" },
            { num: "100%", label: "Education sponsorship retention rate — every child we sponsor stays in school", icon: "✅" },
            { num: "2+", label: "Communities impacted in Montserrado County, Liberia", icon: "🏘️" },
            { num: "3+", label: "Schools reached through full sponsorship programs", icon: "🏫" },
            { num: "10+", label: "Children, students, and youth provided with leadership, entrepreneurship, and digital training", icon: "📈" },
            { num: "2+", label: "Years of supporting slum and rural communities in Liberia", icon: "📅" },
          ].map(({ num, label, icon }) => (
            <div key={label} className="bg-white border border-border rounded-2xl p-6 text-center hover:shadow-md hover:border-primary/30 transition-all">
              <div className="text-4xl mb-3">{icon}</div>
              <p className="text-5xl font-black text-primary mb-2">{num}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{label}</p>
            </div>
          ))}
        </div>
        <div className="bg-primary rounded-2xl p-8 text-white text-center">
          <p className="text-3xl font-black mb-3">93 Candidates → 16 Sponsored</p>
          <p className="text-white/80">In our 2025 West Point survey, we assessed 93 children, interviewed 25, and selected 16 for full sponsorship — a rigorous, transparent process that ensures maximum impact.</p>
        </div>
      </div>
    ),
  },
};

export default function WhatWeDoPage() {
  const params = useParams<{ section?: string }>();
  const sectionKey = params.section ?? "overview";
  const content = subsections[sectionKey] ?? subsections.overview;

  return (
    <PageLayout section={section} pageTitle={content.title} breadcrumb={sectionKey !== "overview" ? content.title : undefined}>
      {content.content}
    </PageLayout>
  );
}
