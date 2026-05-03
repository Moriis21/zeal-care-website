import { useParams } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { navConfig } from "@/lib/nav-config";

const section = navConfig.find((s) => s.path === "/media")!;

const newsItems = [
  {
    date: "Jul–Aug 2024",
    title: "Zeal Care Staff Conducted an Educational Survey in Chicken Soup Factory",
    category: "Community",
    img: "/attached_assets/pdf_images/img-022.jpg",
    body: "On July 13 and August 3, 2024, Zeal Care conducted an educational survey in Chicken Soup Factory Lorma Yard, Block D. The team reached out to 45+ households. Data was reviewed to identify 4 under-resourced children from low or no-income backgrounds to attend school in the upcoming academic year. Zeal Care committed to paying school fees and providing all school stationery to successful children selected. Transparency, accountability, and inclusion remain paramount in what we do.",
  },
  {
    date: "Aug 2024",
    title: "Zeal Care Releases Educational Survey Report Showing High Dropout Rate in Schools",
    category: "Report",
    img: "/attached_assets/pdf_images/img-003.jpg",
    body: "As promised, Zeal Care shared data from the households its survey team visited in the Chicken Soup Factory, Lorma Yard Block-D community. Key findings: 20% of respondents are 14 years old (highest school attendance rate); 12-year-olds have the highest dropout rate. Zeal Care reviewed the data to select four under-resourced children from low or no-income backgrounds.",
  },
  {
    date: "Aug 27, 2024",
    title: "Zeal Care Conducts Interviews with Shortlisted Candidates and Parents/Guardians",
    category: "Selection",
    img: "/attached_assets/pdf_images/img-022.jpg",
    body: "After collecting data on over 40 candidates in Chicken Soup Factory—Lorma Yard, Block D, Zeal Care shortlisted nine (9) for interviews. The interviews took place on August 27, 2024, with support from the Block D Coordinator and Chairlady. Executive Director Mr. Titus S. Foko supervised the process, along with interview committee chair Mr. Ambulleh A. Sheriff and co-chair Mr. William Mammie.",
  },
  {
    date: "Sep 12, 2024",
    title: "Zeal Care Procurement Team Spotted Purchasing School Materials for Beneficiaries",
    category: "Program",
    img: "/attached_assets/pdf_images/img-059.jpg",
    body: "On September 12, our procurement team was seen purchasing school materials for the kids. September 14, 2024 was the official date set for the presentation and showcasing of the first batch of beneficiaries to benefit from full sponsorship through our goodwill supporters to attend school for academic year 2024/2025.",
  },
  {
    date: "Sep 14, 2024",
    title: "Zeal Care Reveals First Batch of Beneficiaries for 2024/2025 Academic Year",
    category: "Milestone",
    img: "/attached_assets/pdf_images/img-055.jpg",
    body: "Zeal Care had a successful presentation and showcase of its first batch of beneficiaries for the 2024/2025 academic year. The event was held in Chicken Soup Factory Community, Lorma Yard - Block D at Enfans Academy. Beneficiaries received books, bags, pencils, pens, shoes, 80% of school fees covered (totaling over 70,000 LRD), and three sets of uniforms each.",
  },
  {
    date: "Feb 26, 2025",
    title: "Zeal Care Team Visited Esfans Academy to Monitor and Evaluate Beneficiaries' Performance",
    category: "Monitoring",
    img: "/attached_assets/pdf_images/img-055.jpg",
    body: "On February 26, 2025, our team visited Esfans Academy to complete the remaining 20% payment for our four beneficiaries and monitor their academic progress. One of our beneficiaries, who sat in a classroom for the first time at 11 years old, was promoted to the next class even before the academic year ended! We also held partnership discussions with the Principal and Supervisor of Esfans Academy.",
  },
  {
    date: "2025",
    title: "Zeal Care Phase Two Educational Survey 2025 — No Child Should Be Left Behind",
    category: "Community",
    img: "/attached_assets/pdf_images/img-075.jpg",
    body: "Day 2 of Zeal Care's Phase 2 Educational Survey in West Point (Zone 405, Block C, D & E) was a huge success. The overwhelming desire for education from children aged 4–17 in low or no-income households was unprecedented. Zeal Care committed to fully supporting 16 children from one of Monrovia's most densely populated slum communities.",
  },
  {
    date: "Sep 3, 2025",
    title: "Zeal Care Conducts Phase Two Interviews with Shortlisted Candidates",
    category: "Selection",
    img: "/attached_assets/pdf_images/img-022.jpg",
    body: "After collecting data on 93 candidates in West Point Community, Zone 405 (Blocks C, D & E), Zeal Care shortlisted twenty-five (25) for interviews, from which only sixteen (16) were to be selected. The process was supervised by Executive Director Mr. Titus S. Foko, alongside interview committee chair Mr. Mohammed Soko Kamara and co-chair Mr. Jeremiah K. Weah, Jr.",
  },
  {
    date: "2025",
    title: "Zeal Care Pays Beneficiaries' School Fees for Academic Year 2025–2026",
    category: "Milestone",
    img: "/attached_assets/pdf_images/img-059.jpg",
    body: "With your support, Zeal Care's team visited Chicken Soup Factory Community, Block D, Lorma Yard, to register and provide beneficiaries with school materials for the 2025–2026 academic year. Children who once had no access to education now have the opportunity to return to school for another year. Phase Two targets an additional 16 children from West Point Community, Zone 405.",
  },
  {
    date: "Nov 22–25, 2025",
    title: "Zeal Care Staff and Board Member Receive Awards at Starz University 8th Annual Special Honors",
    category: "Recognition",
    img: "/attached_assets/pdf_images/img-078.jpg",
    body: "Mohammed Soko Kamara earned a Bachelor's in Marketing Management and received both the Starz University Excellence Award and Honor Society Award. William Mammie earned a Bachelor's in Information Technology. Board Advisor Mrs. Jluedoe M. Bornor received the Starz University Lecturer of the Year Award.",
  },
  {
    date: "Dec 2025",
    title: "Zeal Care Celebrates 2025 Christmas with Over 100 Kids",
    category: "Event",
    img: "/attached_assets/pdf_images/img-075.jpg",
    body: "Zeal Care celebrated Christmas with over 100 kids at the Chicken Soup Factory. The team packaged 120 gifts including food packages, Christmas hats, school materials, and other items distributed to children. This special day was made possible by the kindness of our goodwill supporters and all those who helped make it happen.",
  },
];

const galleryImages = [
  "/attached_assets/pdf_images/img-055.jpg",
  "/attached_assets/pdf_images/img-054.jpg",
  "/attached_assets/pdf_images/img-059.jpg",
  "/attached_assets/pdf_images/img-058.jpg",
  "/attached_assets/pdf_images/img-003.jpg",
  "/attached_assets/pdf_images/img-004.jpg",
  "/attached_assets/pdf_images/img-022.jpg",
  "/attached_assets/pdf_images/img-067.jpg",
  "/attached_assets/pdf_images/img-068.jpg",
  "/attached_assets/pdf_images/img-075.jpg",
  "/attached_assets/pdf_images/img-078.jpg",
  "/attached_assets/pdf_images/img-001.jpg",
];

const categoryColors: Record<string, string> = {
  Community: "bg-blue-100 text-blue-700",
  Report: "bg-purple-100 text-purple-700",
  Selection: "bg-yellow-100 text-yellow-700",
  Program: "bg-green-100 text-green-700",
  Milestone: "bg-secondary/20 text-primary",
  Monitoring: "bg-orange-100 text-orange-700",
  Recognition: "bg-pink-100 text-pink-700",
  Event: "bg-teal-100 text-teal-700",
};

const subsections: Record<string, { title: string; content: React.ReactNode }> = {
  overview: {
    title: "Media",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed text-lg">Stay informed about Zeal Care's latest news, success stories, photos, and events as we continue to ignite potential and inspire change across Liberia.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { label: "Newsroom", path: "/media/newsroom", icon: "📰", desc: "Latest news, updates, and announcements from Zeal Care." },
            { label: "Success Stories", path: "/media/stories", icon: "⭐", desc: "Inspiring stories of the children whose lives have been transformed." },
            { label: "Video", path: "/media/video", icon: "🎬", desc: "Watch our impact stories and program highlights." },
            { label: "Photo Gallery", path: "/media/gallery", icon: "📷", desc: "A visual journey through our programs and communities." },
            { label: "Events & Calendar", path: "/media/events", icon: "📅", desc: "Upcoming events and activities from Zeal Care." },
          ].map(({ label, icon, desc }) => (
            <div key={label} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-primary mb-2">{label}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          ))}
        </div>
        {/* Featured image */}
        <img src="/attached_assets/pdf_images/img-055.jpg" alt="Zeal Care team" className="w-full rounded-2xl object-cover max-h-80" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
    ),
  },
  newsroom: {
    title: "Newsroom",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed">Follow Zeal Care's journey — from our first community survey to sponsoring over 100 children across Monrovia.</p>
        <div className="space-y-6">
          {newsItems.map((item) => (
            <div key={item.title} className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="md:flex">
                <div className="md:w-48 flex-shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-48 md:h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[item.category] || "bg-gray-100 text-gray-700"}`}>{item.category}</span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-black text-primary text-lg mb-3 leading-snug">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  stories: {
    title: "Success Stories",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-3">Every number has a name. Every statistic has a story.</p>
          <p className="text-white/80">These are the children behind the mission — young lives transformed by education, opportunity, and the belief that every child matters.</p>
        </div>
        {/* Ruth Flomo Story */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
          <div className="md:flex">
            <div className="md:w-64 flex-shrink-0">
              <img src="/attached_assets/pdf_images/img-058.jpg" alt="Ruth Flomo" className="w-full h-64 md:h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="p-8 flex-1">
              <div className="inline-block bg-secondary/20 text-primary text-xs font-black px-3 py-1 rounded-full mb-4">FEATURED STORY</div>
              <h3 className="font-black text-primary text-2xl mb-4">Meet Ruth Flomo</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">For years, she watched others go to school. At 11, she'd never been in a classroom — until Zeal Care stepped in. Today, Ruth is learning, growing, and dreaming big, all because of your support.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">Ruth Flomo, age 11, had been living with her grandmother in a village, not attending school. During Zeal Care's initiative survey in Chicken Soup Factory Lorma Yard Block D to sponsor four underprivileged children, Ruth was identified as one of the many children out of school.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">After completing all of Zeal Care's vetting processes, she was enrolled at Esfans Academy in 2024 to begin her educational journey. In her first year, she was promoted to the next class based on her academic performance after the first semester ended — even though she was the oldest and biggest in her previous class.</p>
              <div className="bg-secondary/10 border-l-4 border-secondary rounded-r-xl p-4">
                <p className="text-primary font-semibold italic">"Ruth is strong, focused, and eager to learn."</p>
                <p className="text-muted-foreground text-sm mt-1">— Ruth's Teacher, Esfans Academy</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📖</div>
          <p className="font-bold text-primary text-xl mb-2">More Stories Coming Soon</p>
          <p className="text-muted-foreground mb-5">We are documenting the journeys of all 105+ children in our programs. Check back for new stories of transformation and hope.</p>
          <a href="mailto:info@zealcare.org" className="inline-block bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">Share Your Story</a>
        </div>
      </div>
    ),
  },
  video: {
    title: "Video",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-3">See Our Impact in Action</p>
          <p className="text-white/80">Watch our stories of transformation, community programs, and the children whose lives are being changed through education.</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🎬</div>
          <p className="font-bold text-primary text-xl mb-2">Videos Coming Soon</p>
          <p className="text-muted-foreground mb-5">We are currently working on video documentation of our programs and impact stories. Follow us on social media to be the first to see our videos.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://www.facebook.com/profile.php?id=61561063778243" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">Facebook</a>
            <a href="https://www.instagram.com/zealcare2024" target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-pink-700 transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/company/zeal-care" target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-800 transition-colors">LinkedIn</a>
          </div>
        </div>
        {/* ELUM Radio feature */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
          <img src="/attached_assets/pdf_images/img-078.jpg" alt="ELUM 98.7 FM" className="w-full h-56 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="p-6">
            <div className="inline-block bg-secondary/20 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">RADIO FEATURE</div>
            <h3 className="font-black text-primary text-xl mb-2">Zeal Care on ELUM 98.7 FM</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Zeal Care's work has been featured on ELUM 98.7 FM, one of Liberia's popular radio stations, amplifying our message of educational empowerment to communities across the country.</p>
          </div>
        </div>
      </div>
    ),
  },
  gallery: {
    title: "Photo Gallery",
    content: (
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed">A visual journey through Zeal Care's programs, community visits, school sponsorships, and the children whose lives are being transformed.</p>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((src, i) => (
            <div key={i} className="break-inside-avoid rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={src}
                alt={`Zeal Care gallery ${i + 1}`}
                className="w-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="font-bold text-primary mb-2">Follow Us for More Photos</p>
          <p className="text-muted-foreground text-sm mb-4">We regularly share photos from our programs, community visits, and events on our social media channels.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://www.instagram.com/zealcare2024" target="_blank" rel="noopener noreferrer" className="bg-pink-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-pink-700 transition-colors">@zealcare2024</a>
            <a href="https://www.facebook.com/profile.php?id=61561063778243" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">Facebook Page</a>
          </div>
        </div>
      </div>
    ),
  },
  events: {
    title: "Events & Calendar",
    content: (
      <div className="space-y-8">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <p className="text-2xl font-black mb-3">Events & Calendar</p>
          <p className="text-white/80">Stay updated on Zeal Care's upcoming events, community programs, and fundraising activities.</p>
        </div>

        {/* Past Events */}
        <div>
          <h3 className="font-black text-primary text-xl mb-5">Recent Events</h3>
          <div className="space-y-4">
            {[
              { date: "Dec 2025", title: "Christmas Celebration with 100+ Kids", desc: "Celebrated Christmas with over 100 children at the Chicken Soup Factory community, distributing food packages, Christmas hats, and school materials.", icon: "🎄" },
              { date: "Nov 22–25, 2025", title: "Starz University 8th Annual Special Honors & Graduation", desc: "Zeal Care team members Mohammed Soko Kamara and William Mammie graduated, with Mohammed receiving two prestigious university awards.", icon: "🎓" },
              { date: "Sep 3, 2025", title: "Phase Two Beneficiary Interviews — West Point", desc: "Conducted interviews with 25 shortlisted candidates from West Point, Zone 405, for the 2025–2026 academic year sponsorship.", icon: "📋" },
              { date: "Sep 14, 2024", title: "First Beneficiaries Presentation — Chicken Soup Factory", desc: "Revealed the first batch of 4 Zeal Care beneficiaries for the 2024/2025 academic year, presenting them with school materials and uniforms.", icon: "🎉" },
            ].map(({ date, title, desc, icon }) => (
              <div key={title} className="flex gap-4 bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-all">
                <div className="text-3xl flex-shrink-0">{icon}</div>
                <div>
                  <p className="text-xs font-bold text-secondary mb-1">{date}</p>
                  <h4 className="font-bold text-primary mb-2">{title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📅</div>
          <p className="font-bold text-primary text-xl mb-2">Upcoming Events</p>
          <p className="text-muted-foreground mb-5">No events are currently scheduled. Follow us on social media or sign up for our newsletter to be notified of upcoming events.</p>
          <a href="mailto:info@zealcare.org" className="inline-block bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">Get Notified</a>
        </div>
      </div>
    ),
  },
};

export default function MediaPage() {
  const params = useParams<{ section?: string }>();
  const sectionKey = params.section ?? "overview";
  const content = subsections[sectionKey] ?? subsections.overview;

  return (
    <PageLayout section={section} pageTitle={content.title} breadcrumb={sectionKey !== "overview" ? content.title : undefined}>
      {content.content}
    </PageLayout>
  );
}
