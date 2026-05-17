import { useParams } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { navConfig } from "@/lib/nav-config";
import { Target, Eye, Star, Heart, Lightbulb, Globe, Users, ShieldCheck, Zap, Brain, Link2, Scale, Monitor, Unlock } from "lucide-react";

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
            { icon: ShieldCheck, title: "Integrity", desc: "We fulfill our commitments and conduct ourselves in a way that is true to our identity." },
            { icon: Heart, title: "Commitment to Community Services", desc: "We strive to create equal opportunities, foster growth, and inspire lifelong learning, ensuring every child can achieve their full potential and inspire change." },
            { icon: Globe, title: "Diversity & Inclusion", desc: "We seek to empower under-resourced children, regardless of their ethnic and religious backgrounds, by accepting the diverse ways of life and opinions found within a multicultural environment. We respect and actively encourage the contribution of every individual and the inclusion of every child." },
            { icon: Eye, title: "Transparency & Accountability", desc: "We uphold a culture of total accountability. The Zeal Care team is committed to transparency in every decision, ensuring our internal processes and external actions are perfectly aligned. We take full responsibility for the outcomes of our work." },
            { icon: Lightbulb, title: "Innovation", desc: "We embrace creativity, adaptability, and new ideas to enhance our initiative so that every child has the opportunity to succeed and members to grow." },
            { icon: Users, title: "Teamwork", desc: "We believe that collaboration, shared goals, and mutual respect are the engines of the change we seek. Together with communities, educators, donors, partners, and volunteers, we are bridging the gap for under-resourced children, maximizing our impact so that every child can thrive and succeed." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
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
            We believe that education, leadership, entrepreneurship, and digital literacy are essential foundations. Everyone deserves access to these tools to build a fulfilling life and contribute to the world around them.
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
            { num: "01", title: "Self-Awareness", icon: Brain, desc: "Education starts with the self. We provide the space for young people to recognize their unique strengths and emotions, building the confidence and emotional intelligence necessary to lead their own lives." },
            { num: "02", title: "Strategic Networks", icon: Link2, desc: "Success is built on community. We create the opportunity for young people to access meaningful relationships and mentors, providing the social support required to open doors that were previously closed." },
            { num: "03", title: "Solution-Oriented Thinking", icon: Lightbulb, desc: "We move beyond a passive approach. Our young people are equipped to be proactive problem-solvers who approach every challenge with the creativity and resilience needed to build practical solutions." },
            { num: "04", title: "Breaking Cycles of Poverty", icon: Unlock, desc: "We provide access to literacy and career-readiness programs. By integrating these into our model, we offer the specific tools needed to bypass generational barriers and achieve lasting economic independence." },
            { num: "05", title: "Ethical Leadership", icon: Scale, desc: "We facilitate the development of leaders with integrity. Our beneficiaries gain the perspective needed to make decisions based on empathy and the collective good, ensuring they lead by example." },
            { num: "06", title: "Digital Fluency", icon: Monitor, desc: "In a tech-driven world, we ensure children are creators, not just consumers. We provide access to the technical mastery and digital tools needed to compete and innovate in the global economy." },
            { num: "07", title: "Intentional Collaboration", icon: Users, desc: "Meaningful change is a team sport. We provide a multicultural environment where beneficiaries and volunteers learn to work across differences and respect diverse opinions — a skill that hugely increases their future employability." },
          ].map(({ num, title, icon: Icon, desc }) => (
            <div key={num} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
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
