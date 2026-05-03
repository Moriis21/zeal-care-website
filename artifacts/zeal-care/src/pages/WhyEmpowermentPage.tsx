import { useParams } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { navConfig } from "@/lib/nav-config";

const section = navConfig.find((s) => s.path === "/why-empowerment")!;

const subsections: Record<string, { title: string; content: React.ReactNode }> = {
  overview: {
    title: "Why Empowerment",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-xl font-bold leading-relaxed">
            "As the most effective strategy to tackle poverty and inequality, Zeal Care multiplies educational opportunities for underprivileged children and supports young people to become leaders of change."
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Empowerment is not charity — it is a fundamental act of justice. When we empower a child with education, we are not giving them a handout; we are giving them a hand up. We are returning to them what was always theirs: the right to learn, to grow, and to determine their own future.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Zeal Care's work is rooted in a deep conviction that poverty and inequality are not inevitable. They are the result of systems and structures that can be changed. Education is the most powerful tool we have to disrupt these systems from within, by investing in the people most affected by them.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "Social Justice", path: "/why-empowerment/social-justice", icon: "⚖️", desc: "Education is a human right. We stand with underprivileged children to ensure they are not left behind by the systems that should protect them." },
            { title: "Economic Development", path: "/why-empowerment/economic-development", icon: "📈", desc: "An educated generation is an economically resilient generation. We invest in futures that will lift entire communities out of poverty." },
          ].map(({ title, icon, desc }) => (
            <div key={title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-primary text-xl mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <img src="/attached_assets/pdf_images/img-058.jpg" alt="Students empowered by Zeal Care" className="w-full rounded-2xl object-cover max-h-80" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    ),
  },
  "social-justice": {
    title: "Social Justice",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <span className="text-5xl mb-4 block">⚖️</span>
          <p className="text-xl font-bold leading-relaxed">
            Education is a fundamental human right. No child should be denied access to learning because of where they were born or how much their family earns.
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Zeal Care's work is an act of social justice. The children we serve are not poor because they are less capable or less worthy. They are poor because of systemic inequalities that have denied their communities access to basic resources for generations.
        </p>
        <div className="space-y-5">
          {[
            { title: "Equal Access to Education", desc: "Every child, regardless of gender, disability, ethnicity, or economic background, deserves access to quality education. Zeal Care actively works to remove financial, social, and cultural barriers that prevent children from enrolling in and completing school." },
            { title: "Child Rights Advocacy", desc: "We believe that children are not passive recipients of charity — they are rights holders. We advocate for the recognition and protection of every child's right to education, safety, and opportunity." },
            { title: "Gender Equity in Education", desc: "Girls in our partner communities face particularly severe disadvantages. Cultural expectations, early marriage, and safety concerns keep many girls out of school. Zeal Care takes deliberate steps to ensure girls have equal access to our programs and benefits." },
            { title: "Disability Inclusion", desc: "We advocate for inclusive education for children with disabilities, ensuring that no child is left behind because the system was not built with them in mind." },
          ].map(({ title, desc }) => (
            <div key={title} className="border-l-4 border-secondary bg-secondary/5 rounded-r-2xl p-5">
              <h3 className="font-bold text-primary mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <p className="font-bold text-primary mb-2">Did You Know?</p>
          <p className="text-muted-foreground">In Liberia, many children in slum communities like Chicken Soup Factory and West Point have never set foot in a classroom. Zeal Care's survey in 2024 found that some children as old as 11 years had never attended school. These are not statistics — they are children with names, dreams, and infinite potential.</p>
        </div>
      </div>
    ),
  },
  "economic-development": {
    title: "Economic Development",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <span className="text-5xl mb-4 block">📈</span>
          <p className="text-xl font-bold leading-relaxed">
            When you educate one child, you educate many. Every child supported through Zeal Care will go on to help at least two others — multiplying your impact far into the future.
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Education is not just a social good — it is the single most powerful driver of economic development. UNESCO research shows that every additional year of schooling increases an individual's earnings by an average of 10%. For communities trapped in cycles of poverty, this represents a transformational opportunity.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { icon: "🎓", title: "Breaking the Poverty Cycle", desc: "When children complete their education, they are far less likely to live in poverty as adults. They earn more, invest in their own children's education, and contribute to their local economy." },
            { icon: "👩‍💼", title: "Workforce Development", desc: "Through our entrepreneurship, STEM, and digital education programs, we are preparing young people for the jobs and businesses of tomorrow — many of which don't yet exist." },
            { icon: "🏘️", title: "Community Economic Growth", desc: "Educated communities are more economically productive. Local businesses grow, community leaders emerge, and the entire ecosystem benefits from a more skilled and confident population." },
            { icon: "🌍", title: "Regional Impact", desc: "Liberia's economic future depends on the quality of its next generation. Zeal Care's investment in today's children is an investment in Liberia's national development for decades to come." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-bold text-primary mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-center">
          <p className="text-4xl font-black text-primary mb-2">90%+</p>
          <p className="text-muted-foreground font-medium">of every dollar Zeal Care spends goes directly to programs</p>
        </div>
      </div>
    ),
  },
};

export default function WhyEmpowermentPage() {
  const params = useParams<{ section?: string }>();
  const sectionKey = params.section ?? "overview";
  const content = subsections[sectionKey] ?? subsections.overview;

  return (
    <PageLayout section={section} pageTitle={content.title} breadcrumb={sectionKey !== "overview" ? content.title : undefined}>
      {content.content}
    </PageLayout>
  );
}
