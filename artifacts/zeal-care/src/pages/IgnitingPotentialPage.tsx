import { useParams } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { navConfig } from "@/lib/nav-config";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const section = navConfig.find((s) => s.path === "/igniting-potential")!;

const faqs = [
  { q: "What is Zeal Care?", a: "Zeal Care is a nonprofit NGO that empowers underprivileged children between the ages of 4 and 17 from low-income backgrounds to foster academic success, social confidence, and emotional well-being. The organization is committed to inclusivity and transformation to create opportunities, uplift lives, and inspire hope for a brighter and more equitable future." },
  { q: "How can I learn more about Zeal Care's impact?", a: "You can stay updated on our work by exploring our website, following us on social media, or signing up for our newsletter. We regularly share updates on our ongoing projects, success stories, and community initiatives." },
  { q: "Where does Zeal Care's funding come from?", a: "Our funding comes from generous donations by individuals, organizations, and partners who believe in our mission. We ensure that every contribution directly benefits the people and communities we serve." },
  { q: "Can I donate to support a specific county or program?", a: "Yes, you can do this in one of two ways: donate to a specific initiative or appeal on this page, or include a note with your donation specifying the county or program. We are always happy to answer any questions about how we ensure that your funds reach the programs and/or counties you specify." },
  { q: "Can I volunteer or travel with Zeal Care?", a: "Yes! We welcome volunteers who are passionate and willing to create change. If you'd like to contribute your skills, reach out to us at zealcare24@gmail.com or info@zealcare.org." },
  { q: "Can my organization partner with Zeal Care?", a: "Yes! We actively seek partnerships with organizations, businesses, and institutions that align with our mission, vision, and programs. If you are interested in collaborating, email us at info@zealcare.org." },
  { q: "Where is Zeal Care located?", a: "Zeal Care is based in Monrovia, Liberia. We are committed to driving impactful change across Liberia and beyond borders through our various programs." },
  { q: "How is my donation used?", a: "Every donation is allocated to key impact areas such as full education sponsorship, leadership & entrepreneurship training, digital literacy skills training, workshops to help make a choice of a career path in STEM, and other impactful community initiatives. We are committed to transparency in fund allocation." },
  { q: "Can I make a gift by wire transfer?", a: "Yes! Please contact our team at info@zealcare.org, and we'll send you instructions on how to make those gifts or visit our donation and igniting potential pages." },
  { q: "How can I get a receipt for tax purposes?", a: "For online donations, the acknowledgment you receive via email serves as your receipt for tax purposes. For donations made by other means, the acknowledgment sent to you by post or email serves as your receipt. To request a duplicate receipt, please email info@zealcare.org with details." },
  { q: "Does Zeal Care share my information?", a: "In keeping with our privacy policy, we do not transmit, transfer, or sell private information to any outside parties." },
  { q: "Do you accept donations of books, school supplies, clothes, or other materials outside of Liberia?", a: "While we appreciate offers to support Zeal Care's educational initiative with supplies, we are unable to accept these kinds of gifts. Zeal Care avoids overhead and administrative costs associated with shipping donated goods. Instead, we appreciate cash transfers directly, so that our procurement and logistics team can buy the supplies children need. This policy also helps us support local businesses in Liberia and Africa." },
  { q: "Are there any health requirements for traveling to Liberia?", a: "Yes! A yellow fever vaccination is required for entry into Liberia. We also recommend taking anti-malarial medication and consulting with a doctor before traveling." },
  { q: "How can I stay connected with Zeal Care?", a: "You can follow us on social media (LinkedIn, Facebook, Instagram) and subscribe to our newsletter for regular updates. Links are available in our website footer." },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-primary/5 transition-colors"
          >
            <span className="font-semibold text-primary pr-4">{faq.q}</span>
            {openIndex === i ? <ChevronUp className="w-5 h-5 text-secondary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border bg-primary/2">
              <p className="pt-4">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const subsections: Record<string, { title: string; content: React.ReactNode }> = {
  overview: {
    title: "Igniting Potential",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-3">With your support, we can ignite the endless potential of underprivileged children in Liberia and across Africa.</p>
          <p className="text-white/80">We see education as the starting point for systemic social change. As Nelson Mandela stated: "Education is the most powerful weapon which you can use to change the world."</p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg">Your support today can help a child secure an education. The child will be able to create the future they imagine for themselves, their community, and Africa.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { label: "Ways to Give", path: "/igniting-potential/ways-to-give", icon: "💛", desc: "Explore all the ways you can support Zeal Care's mission." },
            { label: "Appeals", path: "/igniting-potential/appeals", icon: "🙏", desc: "Specific urgent campaigns that need your support right now." },
            { label: "Become a Partner", path: "/igniting-potential/become-a-partner", icon: "🤝", desc: "Partner with us to multiply our impact for thousands of children." },
            { label: "Giving FAQ", path: "/igniting-potential/faq", icon: "❓", desc: "Find answers to all your questions about donating to Zeal Care." },
          ].map(({ label, icon, desc }) => (
            <div key={label} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-primary mb-2">{label}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-center">
          <p className="text-4xl font-black text-primary mb-2">90%+</p>
          <p className="text-muted-foreground font-medium">of every dollar we spend goes to our programs</p>
        </div>
      </div>
    ),
  },
  "ways-to-give": {
    title: "Ways to Give",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-3">Take Action Today</p>
          <p className="text-white/80 leading-relaxed">Your support today can help a child secure an education. That child will be able to create the future they imagine for themselves, their community, and Africa.</p>
        </div>

        {/* Impact Meter */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <h3 className="font-black text-primary text-xl mb-5">Impact Meter</h3>
          <div className="space-y-4">
            {[
              { amount: "$150", impact: "Empowers 1 child with full school fees, uniform, books & supplies for one year" },
              { amount: "$500", impact: "Empowers 2 underprivileged children for a full academic year" },
              { amount: "$1,800", impact: "Empowers 3 children + full year of mentorship and skills training" },
              { amount: "$7,200", impact: "Sponsors up to 25 children for a full academic year" },
            ].map(({ amount, impact }) => (
              <div key={amount} className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer">
                <span className="text-2xl font-black text-primary w-20 flex-shrink-0">{amount}</span>
                <p className="text-muted-foreground text-sm">{impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How we use donations */}
        <div className="space-y-4">
          <h3 className="font-black text-primary text-xl">How We Use Your Donation</h3>
          <p className="text-muted-foreground leading-relaxed">As well as paying school fees and other essentials such as uniforms and books, your gift helps beyond the classroom — supporting students with training and resources they need to become economically independent leaders in their communities.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {["School Fees & Registration", "Uniforms & Shoes", "Books & School Supplies", "Mentorship Programs", "Leadership Training", "Entrepreneurship Workshops"].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-secondary/10 rounded-xl p-3">
                <span className="text-secondary font-bold">✓</span>
                <span className="text-sm font-medium text-primary">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donate CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <p className="text-3xl mb-4">🌟</p>
          <p className="font-black text-primary text-xl mb-2">Ready to Make a Difference?</p>
          <p className="text-muted-foreground mb-5">When you educate one child, you educate many. Every child you support through Zeal Care will go on to help at least two others, multiplying your impact far into the future.</p>
          <div className="space-y-3">
            <p className="font-semibold text-primary">Contact us to donate:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:info@zealcare.org" className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors text-sm">Email: info@zealcare.org</a>
              <a href="tel:+231886727619" className="bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors text-sm">Call: +231 886 727 619</a>
            </div>
            <p className="text-muted-foreground text-sm">Dial <strong>*156*3*0887071690#</strong> for mobile money (Liberia)</p>
          </div>
        </div>
      </div>
    ),
  },
  appeals: {
    title: "Appeals",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-xl font-bold leading-relaxed">Zeal Care changes underprivileged children, students, and youth through education, leadership, entrepreneurship, career path choices in STEM, and Digital Education. These critical appeals and projects need your urgent support.</p>
        </div>
        <div className="space-y-6">
          {[
            { icon: "🎒", title: "No Child Should Be Left Behind in Education", urgency: "ACTIVE APPEAL", desc: "Zeal Care is seeking to expand beyond our current 105+ beneficiaries. We are currently raising funds to sponsor additional children from West Point and other slum communities in Liberia for the 2025–2026 academic year. Every child deserves the chance to learn, dream, and succeed.", target: "$7,200 sponsors 25 children" },
            { icon: "📚", title: "School Supplies Drive", urgency: "ONGOING", desc: "Cash donations to support procurement of school materials — books, bags, pens, pencils, shoes, and uniforms for newly enrolled beneficiaries. Your gift ensures no child walks into school without the tools they need to succeed.", target: "$50 supplies one child for the year" },
            { icon: "🌟", title: "Leadership & Entrepreneurship Training Fund", urgency: "PLANNING", desc: "We are raising funds to launch our first structured Leadership Development and Entrepreneurship training program for sponsored beneficiaries and youth in partner communities.", target: "$500 trains 10 young people" },
          ].map(({ icon, title, urgency, desc, target }) => (
            <div key={title} className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="bg-primary px-6 py-3 flex items-center justify-between">
                <span className="text-white font-bold flex items-center gap-2">{icon} {title}</span>
                <span className="text-secondary text-xs font-black bg-secondary/20 px-3 py-1 rounded-full">{urgency}</span>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-sm">{target}</span>
                  <a href="mailto:info@zealcare.org" className="bg-secondary text-primary px-4 py-2 rounded-full font-bold text-sm hover:bg-secondary/90 transition-colors">Support This</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "become-a-partner": {
    title: "Become a Partner",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-3">Partner with us to multiply the education and leadership potential of thousands of underprivileged children.</p>
          <p className="text-white/80 leading-relaxed">We see education for underprivileged children as the starting point for social change. Tackling the world's biggest issues needs the resources, innovation, and collaboration of the private sector.</p>
        </div>
        <p className="text-muted-foreground leading-relaxed">At Zeal Care, we build partnerships with companies, businesses, and organizations that are purpose-driven and looking for ways to engage their brand, employees, and customers with scalable change.</p>

        {/* Partnership Pathways */}
        <div className="space-y-5">
          <h3 className="font-black text-primary text-xl">Partnership Pathways</h3>
          {[
            {
              type: "Development Partner",
              color: "border-blue-200 bg-blue-50",
              headerColor: "bg-blue-700",
              items: ["Education Access, Retention & Inclusion", "Leadership Development & Civic Engagement", "Entrepreneurship and innovation training", "STEM & Digital Career Pathways"],
            },
            {
              type: "Community Advocate",
              color: "border-green-200 bg-green-50",
              headerColor: "bg-green-700",
              items: ["Community Education Advocacy & Child Protection", "Workshop Facilitation", "Event Support", "Community & School-Based Leadership & Mentorship", "Grassroots Entrepreneurship & Life Skills"],
            },
            {
              type: "Corporate Sponsor",
              color: "border-purple-200 bg-purple-50",
              headerColor: "bg-purple-700",
              items: ["Underprivileged Children Education and Support", "Leadership Training & Soft Skills", "Digital literacy and basic coding funding", "STEM awareness workshops", "Brand Campaign Placement"],
            },
          ].map(({ type, color, headerColor, items }) => (
            <div key={type} className={`border rounded-2xl overflow-hidden ${color}`}>
              <div className={`${headerColor} text-white px-5 py-3`}>
                <p className="font-black">{type}</p>
              </div>
              <div className="p-5">
                <ul className="space-y-2">
                  {items.map((item) => <li key={item} className="flex items-center gap-2 text-sm text-gray-700"><span className="text-green-600 font-bold">✓</span>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Form */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <h3 className="font-black text-primary text-xl mb-5">Submit a Partnership Inquiry</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Organization/Individual Name</label>
              <select className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select type...</option>
                <option>Organization</option>
                <option>Individual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Name</label>
              <input type="text" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your full name or organization name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Contact Email</label>
              <input type="email" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Partnership Pathway</label>
              <select className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select pathway...</option>
                <option>Development Partner</option>
                <option>Community Advocate</option>
                <option>Corporate Sponsor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Brief Message</label>
              <textarea rows={4} className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Tell us about your organization and how you'd like to partner with Zeal Care..." />
            </div>
            <a href="mailto:info@zealcare.org" className="block w-full bg-primary text-white py-3 rounded-full font-bold text-center hover:bg-primary/90 transition-colors text-sm">Submit Partnership Inquiry</a>
          </form>
        </div>
      </div>
    ),
  },
  faq: {
    title: "Giving FAQ",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-3">Find answers to all your questions about Zeal Care and donating.</p>
        </div>
        <FAQ />
      </div>
    ),
  },
};

export default function IgnitingPotentialPage() {
  const params = useParams<{ section?: string }>();
  const sectionKey = params.section ?? "overview";
  const content = subsections[sectionKey] ?? subsections.overview;

  return (
    <PageLayout section={section} pageTitle={content.title} breadcrumb={sectionKey !== "overview" ? content.title : undefined}>
      {content.content}
    </PageLayout>
  );
}
