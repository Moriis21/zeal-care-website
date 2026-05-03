import { useParams } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { navConfig } from "@/lib/nav-config";
import { Target, Eye, Star, Heart, Lightbulb, Globe, Users } from "lucide-react";

const section = navConfig.find((s) => s.path === "/about")!;

const subsections: Record<string, { title: string; content: React.ReactNode }> = {
  overview: {
    title: "About Us",
    content: (
      <div className="space-y-8">
        <div className="bg-primary/5 border-l-4 border-secondary rounded-r-2xl p-6">
          <p className="text-lg font-semibold text-primary italic">
            "Igniting Potential, Inspiring Change"
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Zeal Care is a nonprofit NGO that empowers underprivileged children between the ages of 4 and 17 from low-income backgrounds to foster academic success, social confidence, and emotional well-being. The organization is committed to inclusivity and transformation to create opportunities, uplift lives, and inspire hope for a brighter and more equitable future.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Target, label: "Our Mission", desc: "Empower underprivileged children to break the cycle of poverty through education, leadership, and opportunity.", path: "/about/mission" },
            { icon: Eye, label: "Our Vision", desc: "Underprivileged children realizing their full potential to learn, lead, and contribute to society.", path: "/about/vision" },
            { icon: Star, label: "Our Values", desc: "Integrity, commitment, diversity, transparency, innovation, and teamwork drive everything we do.", path: "/about/values" },
            { icon: Globe, label: "SDG Focus", desc: "Advancing the UN Sustainable Development Goals 4, 5, 8, 10, and 17 through grassroots action.", path: "/about/sdg" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all duration-300">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2">{label}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <img src="/attached_assets/pdf_images/img-055.jpg" alt="Zeal Care team with students" className="w-full rounded-2xl object-cover max-h-80" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    ),
  },
  mission: {
    title: "Our Mission",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <Target className="w-10 h-10 text-secondary mb-4" />
          <p className="text-xl font-bold leading-relaxed">
            Empower underprivileged children from low-income backgrounds to break the cycle of poverty and inequality by providing resources, opportunities, and support to foster a brighter future for all through full educational sponsorship, leadership development, entrepreneurship, career paths in STEM, and digital education.
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          At Zeal Care, our mission is more than words — it is a daily commitment lived out through every school enrollment, every leadership training, every mentorship session, and every child who walks into a classroom for the very first time because someone believed in them.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We believe that education is the most powerful tool for lifting communities out of poverty. As Nelson Mandela said, <em>"Education is the most powerful weapon which you can use to change the world."</em> Zeal Care uses education, leadership, and entrepreneurship to transform lives and communities in Liberia and across Africa.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {["Educational Sponsorship", "Leadership Development", "Entrepreneurship & STEM"].map((item) => (
            <div key={item} className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-center">
              <p className="font-bold text-primary text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  vision: {
    title: "Our Vision",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <Eye className="w-10 h-10 text-secondary mb-4" />
          <p className="text-xl font-bold leading-relaxed">
            Zeal Care envisions underprivileged children from low-or non-income backgrounds to realize their full potential to learn and contribute. We foresee that talent and knowledge are the only limits to destiny.
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          We see a world where every child, regardless of the community they were born into or the circumstances that surround them, has the opportunity to discover who they are and become who they were created to be. A world where a child born in a slum in Monrovia has the same shot at a meaningful future as any other child on earth.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our vision extends beyond Liberia. We are building a model of community-driven education that can inspire change across Africa and beyond — where young people are not defined by their past but empowered by their future.
        </p>
        <div className="bg-secondary/10 border-l-4 border-secondary rounded-r-2xl p-6">
          <p className="text-primary font-semibold italic text-lg">"Talent and knowledge are the only limits to destiny."</p>
          <p className="text-muted-foreground text-sm mt-2">— Zeal Care Vision Statement</p>
        </div>
      </div>
    ),
  },
  goals: {
    title: "Our Goals",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">
          Zeal Care's goals guide every decision, every program, and every partnership we pursue. These four pillars define what success looks like for us and the communities we serve.
        </p>
        <div className="space-y-5">
          {[
            { num: "01", title: "Expand Educational Access", desc: "Increase the number of underprivileged children aged 4–17 from slum and rural communities in Liberia and across Africa who receive full educational sponsorship, including tuition, uniforms, books, and school supplies." },
            { num: "02", title: "Develop Future Leaders", desc: "Equip underprivileged children, students, and youth with leadership, entrepreneurship, STEM career path awareness, and digital literacy skills through structured mentorship, training, and programs." },
            { num: "03", title: "Strengthen Community Systems", desc: "Partner with communities, schools, and NGOs to build sustainable education and child protection systems that outlast any single organization or donor cycle." },
            { num: "04", title: "Drive Policy and Advocacy", desc: "Advocate for inclusive education policies at local, national, and international levels to ensure every child's right to quality education is recognized and protected." },
          ].map(({ num, title, desc }) => (
            <div key={num} className="flex gap-5 bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all">
              <span className="text-4xl font-black text-secondary/30 leading-none flex-shrink-0">{num}</span>
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
  values: {
    title: "Our Values",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">
          Our values are not just principles on paper — they are the foundation of how we work, how we treat every child, family, and partner, and how we hold ourselves accountable.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { icon: "🤝", title: "Integrity", desc: "We do what we say and say what we mean. Every decision we make is guided by honesty, ethics, and accountability." },
            { icon: "💪", title: "Commitment", desc: "We are passionately committed to our mission and to the children, families, and communities we serve — even when the work is hard." },
            { icon: "🌍", title: "Diversity & Inclusion", desc: "We celebrate the diversity of every individual and create a culture of belonging where every child and team member feels valued and respected." },
            { icon: "🔍", title: "Transparency & Accountability", desc: "We are open and honest about our work, our finances, and our impact, so that donors, partners, and communities can trust us completely." },
            { icon: "💡", title: "Innovation", desc: "We are committed to finding creative, effective, and scalable solutions to the complex challenge of educational inequality." },
            { icon: "🤲", title: "Teamwork", desc: "We believe that together we are stronger. We collaborate with communities, partners, volunteers, and young people to multiply our impact." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-primary text-lg mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  belief: {
    title: "Our Belief",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <Heart className="w-10 h-10 text-secondary mb-4" />
          <p className="text-xl font-bold leading-relaxed">
            We believe that education is the most powerful weapon for social change, and that every child — regardless of their circumstances — deserves the opportunity to unlock their God-given potential.
          </p>
        </div>
        <div className="space-y-5">
          {[
            { belief: "Every child has infinite potential", desc: "We believe every child, no matter their background, possesses the intelligence, creativity, and resilience to transform their life and community." },
            { belief: "Education is a right, not a privilege", desc: "Access to quality education should not depend on a family's income or a community's resources. Every child deserves to learn." },
            { belief: "Community drives change", desc: "Lasting change comes from within communities. We partner with local leaders, families, and schools because they hold the power to shape their children's futures." },
            { belief: "Holistic support produces lasting outcomes", desc: "True empowerment goes beyond paying school fees. It requires mentorship, health, safety, and social-emotional support for a child to truly thrive." },
          ].map(({ belief, desc }) => (
            <div key={belief} className="border-l-4 border-secondary bg-secondary/5 rounded-r-2xl p-5">
              <h3 className="font-bold text-primary mb-2">{belief}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  sdg: {
    title: "SDG Focus",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">
          Zeal Care's work directly contributes to five of the United Nations' Sustainable Development Goals (SDGs), ensuring our grassroots actions connect to the global agenda for a more equitable world.
        </p>
        <div className="space-y-5">
          {[
            { num: "SDG 4", title: "Quality Education", color: "bg-red-50 border-red-200", accent: "text-red-700 bg-red-100", desc: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Zeal Care works to increase educational access, retention, and outcomes for underprivileged children in Liberia through sponsorship, mentorship, and leadership programs." },
            { num: "SDG 5", title: "Gender Equality", color: "bg-orange-50 border-orange-200", accent: "text-orange-700 bg-orange-100", desc: "Achieve gender equality and empower all women and girls. Zeal Care ensures that girls have equal access to education and leadership opportunities, challenging cultural norms that keep young girls out of school." },
            { num: "SDG 8", title: "Decent Work & Economic Growth", color: "bg-blue-50 border-blue-200", accent: "text-blue-700 bg-blue-100", desc: "Promote sustained, inclusive, and sustainable economic growth. Through entrepreneurship training, career path awareness in STEM, and digital education, Zeal Care prepares youth for the economy of tomorrow." },
            { num: "SDG 10", title: "Reduced Inequalities", color: "bg-purple-50 border-purple-200", accent: "text-purple-700 bg-purple-100", desc: "Reduce inequality within and among countries. By targeting the most marginalized children in slum and rural communities, Zeal Care addresses the root causes of inequality through inclusive education and empowerment." },
            { num: "SDG 17", title: "Partnerships for the Goals", color: "bg-green-50 border-green-200", accent: "text-green-700 bg-green-100", desc: "Strengthen the means of implementation and revitalize the global partnership for sustainable development. Zeal Care actively builds partnerships with communities, donors, NGOs, schools, and institutions to scale its impact." },
          ].map(({ num, title, color, accent, desc }) => (
            <div key={num} className={`border rounded-2xl p-6 ${color}`}>
              <div className="flex items-start gap-4">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-black ${accent} flex-shrink-0`}>{num}</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  characteristics: {
    title: "Characteristics We Develop",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">
          At Zeal Care, we don't just sponsor school fees — we invest in the whole child. Our programs are designed to develop seven key characteristics that prepare children and youth to become independent, influential leaders in their communities.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { num: "01", title: "Self-Awareness", icon: "🧠", desc: "We help children understand their strengths, values, and purpose. A young person who knows themselves is equipped to navigate challenges with confidence." },
            { num: "02", title: "Strategic Networks", icon: "🔗", desc: "We connect children and youth with mentors, peers, and professionals who broaden their horizons and open doors of opportunity." },
            { num: "03", title: "Solution-Oriented Thinking", icon: "💡", desc: "We train young people to approach challenges as opportunities. Through problem-solving workshops and leadership programs, we develop creative, resilient thinkers." },
            { num: "04", title: "Breaking Cycles of Poverty", icon: "🔓", desc: "By equipping children with education, skills, and confidence, we help them become the first in their family to break generational patterns of poverty." },
            { num: "05", title: "Ethical Leadership", icon: "⚖️", desc: "We instill integrity, accountability, and servant leadership — because the next generation must lead with both competence and character." },
            { num: "06", title: "Digital Fluency", icon: "💻", desc: "In a rapidly changing world, digital literacy is essential. We give young people the foundational skills to participate in and shape the digital economy." },
            { num: "07", title: "Intentional Collaboration", icon: "🤝", desc: "We develop the ability to work across differences and build meaningful partnerships — because collective action creates the most lasting change." },
          ].map(({ num, title, icon, desc }) => (
            <div key={num} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-black text-secondary">{num}</span>
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export default function AboutPage() {
  const params = useParams<{ section?: string }>();
  const sectionKey = params.section ?? "overview";
  const content = subsections[sectionKey] ?? subsections.overview;

  return (
    <PageLayout section={section} pageTitle={content.title} breadcrumb={sectionKey !== "overview" ? content.title : undefined}>
      {content.content}
    </PageLayout>
  );
}
