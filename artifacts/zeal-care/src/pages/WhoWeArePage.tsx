import { useParams } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { navConfig } from "@/lib/nav-config";
import { Link } from "wouter";
import { User, Building2, Scroll, BarChart2, Users, Search, Eye, ClipboardList, GraduationCap, Trophy, Inbox } from "lucide-react";
import { STRATEGIC_PARTNERS } from "@/lib/partner-logos";

const section = navConfig.find((s) => s.path === "/who-we-are")!;

const leadership = [
  {
    name: "Titus S. Foko",
    role: "Founder & Executive Director",
    img: "/titus-foko.png",
    bio: "Titus S. Foko is the visionary Founder and Executive Director of Zeal Care. With a background in Development Work and Community Development, he holds a BSc in Development Work from Stella Maris Polytechnic and a Certificate in Aspire Institute Leaders' Program from Boston University. Born and raised in Liberia, Titus experienced firsthand the devastating impact of educational inequality. His personal journey — from a young person who lacked access to education and mentorship to a passionate advocate for children — is the driving force behind Zeal Care. In 2017, he conducted an educational survey across communities in Montserrado, Margibi, and Bong Counties, planting the seeds that would grow into Zeal Care. He leads with vision, integrity, and an unrelenting commitment to igniting potential in every child.",
  },
  {
    name: "Mohammed Soko Kamara",
    role: "Executive Director of Marketing & Communications",
    img: "/mohammed-kamara.png",
    bio: "Mohammed Soko Kamara leads all marketing, communications, and public engagement strategies for Zeal Care. Holding a Bachelor's Degree in Marketing Management from Starz University, Mohammed is the voice and brand steward of the organization. He received the prestigious Starz University Excellence Award and the Starz University Honor Society Award in 2025. Mohammed ensures that Zeal Care's story reaches donors, partners, and communities around the world with clarity, authenticity, and impact.",
  },
  {
    name: "Joetta C. Paye",
    role: "Executive Director of Operations",
    img: "/attached_assets/pdf_images/img-004.jpg",
    bio: "Joetta C. Paye serves as the Executive Director of Operations, ensuring that Zeal Care's programs are delivered efficiently, ethically, and in alignment with our mission. She holds a BSc in Public Administration from the University of Liberia and is a skilled people manager and logistician. With her expertise in institutional management and community service, Joetta ensures that every Zeal Care initiative runs smoothly from planning to execution, maintaining the highest standards of accountability and transparency.",
  },
  {
    name: "William Mammie",
    role: "Graphic & Media Officer",
    img: "/attached_assets/pdf_images/img-004.jpg",
    bio: "William Mammie serves as Zeal Care's Graphic and Media Officer, responsible for the organization's visual identity, multimedia content, and media documentation. He recently earned a Bachelor's Degree in Information Technology with an Emphasis in System Administration from Starz University. William brings creativity and technical excellence to every piece of content Zeal Care produces, ensuring that our visual storytelling matches the power of our mission.",
  },
  {
    name: "Beverley Chelsea Saungweme",
    role: "Executive Director of Programs",
    img: "/attached_assets/pdf_images/img-004.jpg",
    bio: "Beverley Chelsea Saungweme leads Zeal Care's programming strategy from Zimbabwe. She holds a Master of Science in Development Economics and is a certified PMP Professional with expertise in project management, leadership, and child advocacy. Beverley brings international development experience and a passion for education reform to Zeal Care's programs, ensuring that every initiative is evidence-based, community-centered, and aligned with global best practices.",
  },
];

const boardMembers = [
  { name: "Jluedoe M. Bornor", role: "Education Impact Advisor", bio: "An accomplished educator and Lecturer of the Year (Starz University, 2025). Jluedoe provides strategic guidance on educational program design and child development." },
  { name: "Mambiyea Bio", role: "Children Education Impact Advisor", bio: "Guides the design and delivery of programs that improve children's access to quality education. Focuses on assessing impact, strengthening learning outcomes, and ensuring sustainable educational development." },
  { name: "Sonay Knakay Monger Mason", role: "Strategy Partnership Advisor", bio: "Holds a Graduate Diploma in Management Studies from ICM, United Kingdom. With over 20 years in telecoms and international business, Sonay builds and manages strategic collaborations that advance Zeal Care's mission." },
];

const newsItems = [
  { date: "Jul–Aug 2024", title: "Educational Survey — Chicken Soup Factory", desc: "Zeal Care conducted an educational survey in Chicken Soup Factory Lorma Yard, Block D, reaching 45+ households to identify children most in need of educational support." },
  { date: "Aug 2024", title: "Interviews with Shortlisted Candidates", desc: "After collecting data on 40+ candidates, 9 were shortlisted for interviews. The process was supervised by Executive Director Titus S. Foko." },
  { date: "Sep 2024", title: "First Batch of Beneficiaries Revealed", desc: "Four children were selected for full academic sponsorship for the 2024/2025 academic year in the Chicken Soup Factory Community." },
  { date: "Feb 2025", title: "School Visit — Esfans Academy", desc: "Team visited Esfans Academy to complete remaining fee payments and monitor beneficiaries' academic progress. One beneficiary was promoted to the next class after just one semester." },
  { date: "2025", title: "Phase Two — West Point Survey", desc: "Zeal Care expanded to West Point, Zone 405, surveying 93 candidates and selecting 16 children for full sponsorship for the 2025–2026 academic year." },
];

const subsections: Record<string, { title: string; content: React.ReactNode }> = {
  overview: {
    title: "Who We Are",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">Zeal Care is a team of passionate young people united by a shared mission: to ensure that every underprivileged child in Liberia and across Africa has the chance to learn, grow, and lead.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { label: "Our Leadership", path: "/who-we-are/leadership", icon: User, desc: "Meet the dedicated team driving Zeal Care's mission forward." },
            { label: "Board of Advisors", path: "/who-we-are/board", icon: Building2, desc: "Expert advisors guiding our strategy and governance." },
            { label: "Our History", path: "/who-we-are/history", icon: Scroll, desc: "From a 2017 survey to a legally registered NGO in 2025." },
            { label: "Finance & Accountability", path: "/who-we-are/finance", icon: BarChart2, desc: "Our innovative financial system ensures full transparency." },
          ].map(({ label, path, icon: Icon, desc }) => (
            <Link key={label} href={path}>
              <div className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-primary mb-2">{label}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <img src="/attached_assets/pdf_images/img-054.jpg" alt="Zeal Care team" className="w-full rounded-2xl object-cover max-h-80" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    ),
  },
  leadership: {
    title: "Our Leadership",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">Our leadership team is made up of passionate, experienced professionals united by a shared vision: a Liberia and Africa where every child has access to quality education and the opportunity to become a leader.</p>
        <div className="space-y-8">
          {leadership.map((person) => (
            <div key={person.name} className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="md:flex">
                <div className="md:w-56 flex-shrink-0">
                  <img src={person.img} alt={person.name} className="w-full h-56 md:h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23061A32'/%3E%3Ccircle cx='100' cy='80' r='40' fill='%23F5C619'/%3E%3Ccircle cx='100' cy='200' r='70' fill='%23F5C619'/%3E%3C/svg%3E"; }} />
                </div>
                <div className="p-6 flex-1">
                  <div className="inline-block bg-secondary/20 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">{person.role}</div>
                  <h3 className="text-xl font-black text-primary mb-3">{person.name}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{person.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  board: {
    title: "Board of Advisors",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">Our Board of Advisors brings deep expertise in education, international development, business strategy, and community leadership. They provide invaluable guidance to ensure Zeal Care delivers maximum impact.</p>
        <div className="space-y-5">
          {boardMembers.map((member) => (
            <div key={member.name} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white text-xl font-black flex-shrink-0">{member.name[0]}</div>
                <div>
                  <div className="inline-block bg-secondary/20 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">{member.role}</div>
                  <h3 className="font-black text-primary text-lg mb-2">{member.name}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="font-bold text-primary mb-2">Join Our Advisory Board</p>
          <p className="text-muted-foreground text-sm mb-4">Are you a leader with expertise in education, development, or social impact? We'd love to hear from you.</p>
          <a href="mailto:info@zealcare.org" className="inline-block bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">Get in Touch</a>
        </div>
      </div>
    ),
  },
  beneficiaries: {
    title: "Our Beneficiaries",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-2">Support Education. Transform Lives.</p>
          <p className="text-white/80 leading-relaxed">Every child deserves the opportunity to learn and build a brighter future. At Zeal Care, we support underprivileged children and students in need through educational sponsorship, mentorship, and skills development.</p>
        </div>
        <p className="text-muted-foreground leading-relaxed">Zeal Care supports underprivileged children aged 4 to 17 from low- or no-income backgrounds, particularly those living in slums and rural communities, to achieve academic success, social confidence, and emotional well-being.</p>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { num: "105+", label: "Children sponsored" },
            { num: "2+", label: "Communities reached" },
            { num: "100%", label: "Retention rate" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-secondary/10 border border-secondary/30 rounded-2xl p-5">
              <p className="text-3xl font-black text-primary mb-1">{num}</p>
              <p className="text-muted-foreground text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          <h3 className="font-black text-primary text-xl">Our 2025 Volunteers</h3>
          <p className="text-muted-foreground leading-relaxed">We collaborate with purpose-driven youth and organizations that champion SDGs 4, 5, 8, 10, and 17, and are willing and committed to delivering measurable social impact within their communities.</p>
          <p className="text-muted-foreground leading-relaxed">Our volunteers bring empathy, professionalism, and a strong commitment to children's development. They contribute their time, expertise, and resources to support underprivileged children, students, and young people to strengthen community education systems.</p>
        </div>
        <img src="/attached_assets/pdf_images/img-067.jpg" alt="Zeal Care community" className="w-full rounded-2xl object-cover max-h-80" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    ),
  },
  partners: {
    title: "Our Partners",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-3">Together, we are supporting community-led change in slum and rural communities in Liberia and across Africa.</p>
          <p className="text-white/75 text-base leading-relaxed">We couldn't do our work without the committed individuals and world-class organizations that make up our strategic global ecosystem.</p>
        </div>

        {/* Strategic Global Ecosystem label */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-black text-secondary uppercase tracking-widest px-3">Strategic Global Ecosystem</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Partner logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {STRATEGIC_PARTNERS.map((partner) => (
            <div key={partner.id} className="group relative overflow-hidden rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
              {/* Logo area */}
              <div
                className="h-24 p-4 flex items-center justify-center"
                style={{ backgroundColor: partner.bgColor }}
              >
                <div className="w-full max-w-[140px] h-12">
                  {partner.logo}
                </div>
              </div>
              {/* Info strip */}
              <div className="bg-white px-3 py-2.5 border-t border-border">
                <p className="font-bold text-primary text-sm">{partner.name}</p>
                <p className="text-muted-foreground text-xs leading-tight">{partner.type}</p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 rounded-2xl">
                <div className="text-center">
                  <p className="text-secondary font-black text-sm mb-1">{partner.name}</p>
                  <p className="text-white/80 text-xs leading-snug">{partner.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm">
          We recognize the generosity of individuals, communities, schools, corporations, foundations, and non-governmental bodies who have supported Zeal Care's grassroots-led program at all levels. Together, we are improving lives and livelihoods for underprivileged children, students, and young people in their communities.
        </p>

        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-primary mb-1">Partnership Opportunities Available</p>
            <p className="text-muted-foreground text-sm">Zeal Care is actively seeking mission-aligned partners for 2026.</p>
          </div>
          <Link href="/igniting-potential/become-a-partner">
            <button className="whitespace-nowrap bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">Become a Partner</button>
          </Link>
        </div>
      </div>
    ),
  },
  history: {
    title: "Our History",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">What began as one man's personal mission has grown into a powerful movement for educational equity in Liberia and beyond.</p>
        <div className="space-y-5">
          {[
            { year: "2017", title: "The Survey That Started It All", desc: "Our visionary leader conducted an educational survey across selected communities in Montserrado, Margibi, and Bong Counties to understand why so many children were out of school. Motivated by his own experience with educational barriers, he resolved to find sustainable ways to empower children and youth in need." },
            { year: "2024 (May)", title: "Vision Becomes Action", desc: "Following his participation in the Aspire Institute Leaders' Program, his vision evolved into decisive action. He engaged colleagues who had faced similar hardships and shared a strong passion for social impact. On May 28, 2024, the team held its first online meeting." },
            { year: "2024 (Sep)", title: "First Children Sponsored", desc: "Zeal Care mobilized resources from its network to fully sponsor four children from Chicken Soup Factory, Lorma Yard, Block D Community, enabling them to attend school for the first time in the 2024–2025 academic year." },
            { year: "2025 (Apr)", title: "Legally Registered NGO", desc: "Zeal Care transitioned from an initiative to a legally registered nonprofit local NGO in Liberia. The organization extended its operations to West Point, Zone 405, supporting sixteen underprivileged children for the 2025–2026 academic year." },
            { year: "Today", title: "A Collective Mission", desc: "A team of six committed individuals has grown into a powerful network of change leaders across Liberia, with a vision to expand beyond national borders. What was once the dream of one has become a collective mission driven by passionate young people." },
          ].map(({ year, title, desc }, i) => (
            <div key={year} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 text-center leading-tight px-1">{year}</div>
                {i < 4 && <div className="w-0.5 bg-primary/20 flex-1 mt-2" />}
              </div>
              <div className="pb-6 flex-1">
                <h3 className="font-black text-primary text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  awards: {
    title: "Awards & Prizes",
    content: (
      <div className="space-y-8">
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <h3 className="font-black text-primary text-xl mb-3">Coming Soon</h3>
          <p className="text-muted-foreground">Zeal Care is a young and rapidly growing organization. We have not yet received formal organizational awards, but our impact speaks for itself — 105+ children sponsored, 100% retention rate, and communities transformed.</p>
        </div>
        <div className="bg-primary rounded-2xl p-8 text-white">
          <h3 className="font-black text-xl mb-4">Team Achievements</h3>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold mb-1">Mohammed Soko Kamara</p>
              <p className="text-white/80 text-sm">Starz University Excellence Award & Honor Society Award — 8th Annual Special Honors, November 2025</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold mb-1">William Mammie</p>
              <p className="text-white/80 text-sm">Bachelor's Degree in Information Technology — Starz University, November 2025</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold mb-1">Mrs. Jluedoe M. Bornor (Board Advisor)</p>
              <p className="text-white/80 text-sm">Starz University Lecturer of the Year Award — 8th Annual Special Honors, November 2025</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  protection: {
    title: "Protection & Safeguarding",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-xl font-bold leading-relaxed">The protection and safeguarding of vulnerable underprivileged children and young people are at the core of our model, with the young people of Zeal Care now leading the charge for igniting potential and inspiring change against exploitation.</p>
        </div>
        <div className="space-y-5">
          {[
            { title: "Our Vision and Mission for Protection", desc: "Zeal Care envisions underprivileged children from low- or non-income backgrounds to realize their full potential to learn and contribute. As the most effective strategy to tackle poverty, Zeal Care multiplies educational opportunities for underprivileged children and supports young people to become leaders of change." },
            { title: "The Core of Our Work", desc: "The protection and safeguarding of vulnerable children and young people are at the core of our model. We engage with all those who hold authority in relation to underprivileged children to mitigate their vulnerability to any form of abuse. This is dedicated in our Child Protection Policy." },
            { title: "Community-Level Protection", desc: "At every partner school, we intend to train Teacher Mentors to look after the psycho-social well-being of vulnerable children. We also train School Management Committees in child protection, and partner with communities, civil society organizations, district officials, and other NGOs." },
            { title: "Child Protection Policy Basis", desc: "Zeal Care bases its work on the Universal Declaration of Human Rights; the Convention of the Rights of the Child; UN General Assembly Resolution S-27/2: A World Fit for Children; and ILO Minimum Age Convention 138 of 1973." },
          ].map(({ title, desc }) => (
            <div key={title} className="border-l-4 border-secondary bg-secondary/5 rounded-r-2xl p-5">
              <h3 className="font-bold text-primary mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <p className="font-bold text-primary mb-3">Excerpts from Our Child Protection Policy</p>
          <ul className="space-y-2 text-muted-foreground text-sm">
            {["Zeal Care incorporates child protection into its strategy, structures, and working practices.", "We work in consideration of the whole being of the child — physical, mental, and psychological well-being.", "We believe communities hold the power to protect children from neglect.", "All Zeal Care employees and program activists have a duty to act if children are not being protected.", "Zeal Care will work actively with all stakeholders to spread best practices in the protection of children."].map((item) => (
              <li key={item} className="flex gap-2"><span className="text-secondary mt-0.5">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  finance: {
    title: "Finance & Accountability",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-xl font-bold leading-relaxed">Our innovative financial system is designed to maintain high levels of accountability and transparency, tracking funds from donors to underprivileged children.</p>
        </div>
        <p className="text-muted-foreground leading-relaxed">Zeal Care's financial processes ensure we are accountable to the underprivileged children we serve and the donors who invest and trust in us. Our partner communities and schools are our stakeholders, whose members match donor resources with time and resources of their own.</p>
        <div className="space-y-5">
          {[
            { icon: Search, title: "Transparent Tracking", desc: "Our system starts with an educational survey for the selection process. Once a child is approved for support, their full entitlement is tracked through our data monitoring system, with volunteers using mobile phones to record and report data." },
            { icon: Eye, title: "Regular Field Visits", desc: "Zeal Care staff make regular visits to each school and community. They meet with volunteer groups to ensure that funds are used for their intended purpose and that records provide a clear audit trail." },
            { icon: ClipboardList, title: "Annual Auditing", desc: "The audit process traces funds from the time of donation to the time it reaches a child. Evidence is gathered by inspecting finance records and interviewing sponsored children to confirm they received their full entitlements." },
            { icon: GraduationCap, title: "Continuous Training", desc: "A continuous training program supports this framework. Financial training covers strong planning skills, sound maintenance of records, robust internal controls, and regular internal audit and monitoring." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-center">
          <p className="text-4xl font-black text-primary mb-2">90%+</p>
          <p className="text-muted-foreground font-medium">of every dollar goes directly to programs</p>
        </div>
      </div>
    ),
  },
  "work-for-us": {
    title: "Work for Us",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-3xl font-black mb-3">Looking for a more meaningful place to work?</p>
          <p className="text-white/80 leading-relaxed">At Zeal Care, we focus on tackling poverty, inequality, and injustice by supporting underprivileged children's education and student leadership in Africa.</p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">We're a team of passionate people united by our shared goals: to help children thrive and grow as future leaders, and to transform national education systems through strategic partnerships.</p>
        <p className="text-muted-foreground leading-relaxed">Working at Zeal Care is more than just a job; it's a chance to be part of something bigger. Whether you're a seasoned development professional or eager to prove social skills, you'll find purpose, collaboration, and meaning in the work we do together.</p>
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Inbox className="w-8 h-8 text-primary" />
            </div>
          </div>
          <p className="font-bold text-primary text-xl mb-2">No Open Positions Right Now</p>
          <p className="text-muted-foreground mb-5">We don't have any open vacancies at the moment, but we are always looking for passionate people. Send us your details and we'll be in touch when a role that matches your skills opens up.</p>
          <a href="mailto:info@zealcare.org" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">Send Your CV</a>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <p className="font-bold text-primary mb-3">Together, we can ignite the world-changing power of underprivileged children's education.</p>
          <p className="text-muted-foreground text-sm">Contact us at <a href="mailto:info@zealcare.org" className="text-primary font-semibold underline">info@zealcare.org</a></p>
        </div>
      </div>
    ),
  },
  tenders: {
    title: "Tenders & Opportunities",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-3xl font-black mb-3">Procurement & Tenders</p>
          <p className="text-white/80">Zeal Care is committed to ethical, transparent procurement that delivers maximum value for the children we serve.</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <ClipboardList className="w-8 h-8 text-primary" />
            </div>
          </div>
          <p className="font-bold text-primary text-xl mb-2">No Active Tenders</p>
          <p className="text-muted-foreground mb-5">There are no active procurement opportunities at this time. Please check back regularly or contact us to be notified when new tenders are published.</p>
          <a href="mailto:info@zealcare.org" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">Register Your Interest</a>
        </div>
      </div>
    ),
  },
};

export default function WhoWeArePage() {
  const params = useParams<{ section?: string }>();
  const sectionKey = params.section ?? "overview";
  const content = subsections[sectionKey] ?? subsections.overview;

  return (
    <PageLayout section={section} pageTitle={content.title} breadcrumb={sectionKey !== "overview" ? content.title : undefined}>
      {content.content}
    </PageLayout>
  );
}
