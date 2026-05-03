import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { getDataDir } from "./dataDir";

const DATA_DIR = getDataDir();
const FILE = `${DATA_DIR}/site-content.json`;

export type TeamMember = { name: string; role: string; bio: string; img?: string };
export type BoardMember = { name: string; role: string; bio: string; img?: string };
export type NewsItem = { date: string; title: string; desc: string };
export type Program = { title: string; quote: string; desc: string };
export type FAQ = { q: string; a: string };

export type SiteContent = {
  settings: {
    orgName: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    impactChildren: string;
    impactCommunities: string;
    impactYears: string;
    impactCountries: string;
    scholarCount: string;
    partnerSchools: string;
    techHours: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroPrimaryCTA: string;
    heroSecondaryCTA: string;
    missionTitle: string;
    missionText: string;
    aboutTitle: string;
    aboutText: string;
  };
  about: {
    overviewText: string;
    missionText: string;
    visionText: string;
    valuesText: string;
  };
  whoWeAre: {
    overviewText: string;
    historyText: string;
    financeText: string;
    team: TeamMember[];
    boardMembers: BoardMember[];
    newsItems: NewsItem[];
  };
  whatWeDo: {
    overviewText: string;
    programs: Program[];
  };
  whyEmpowerment: {
    overviewText: string;
    bodyText: string;
  };
  ignitingPotential: {
    overviewText: string;
    bodyText: string;
    faqs: FAQ[];
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  settings: {
    orgName: "Zeal Care",
    tagline: "Igniting Potential, Inspiring Change",
    email: "info@zealcare.org",
    phone: "+231 886 727 619",
    address: "Monrovia, Liberia",
    facebook: "https://www.facebook.com/profile.php?id=61561063778243",
    twitter: "",
    instagram: "https://www.instagram.com/zealcare2024?igsh=MTU2emRiMHBmd3d1Zw==",
    linkedin: "https://www.linkedin.com/company/zeal-care",
    youtube: "",
    impactChildren: "105+",
    impactCommunities: "3",
    impactYears: "7+",
    impactCountries: "1",
    scholarCount: "850",
    partnerSchools: "50",
    techHours: "24000",
  },
  home: {
    heroBadge: "EMPOWERING AFRICA'S FUTURE LEADERS",
    heroTitle: "Igniting Potential, Inspiring Change.",
    heroSubtitle: "We believe every child is a spark of genius. We provide the tools, mentorship, and opportunities to set that genius free.",
    heroPrimaryCTA: "SPONSOR A CHILD",
    heroSecondaryCTA: "OUR IMPACT",
    missionTitle: "Our Mission",
    missionText: "Empower underprivileged children from low-income backgrounds to break the cycle of poverty through education, leadership, and opportunity.",
    aboutTitle: "About Zeal Care",
    aboutText: "Zeal Care is a nonprofit NGO that empowers underprivileged children between the ages of 4 and 17 from low-income backgrounds to foster academic success, social confidence, and emotional well-being.",
  },
  about: {
    overviewText: "Zeal Care is a nonprofit NGO that empowers underprivileged children between the ages of 4 and 17 from low-income backgrounds to foster academic success, social confidence, and emotional well-being. The organization is committed to inclusivity and transformation to create opportunities, uplift lives, and inspire hope for a brighter and more equitable future.",
    missionText: "Empower underprivileged children from low-income backgrounds to break the cycle of poverty and inequality by providing resources, opportunities, and support to foster a brighter future for all through full educational sponsorship, leadership development, entrepreneurship, career paths in STEM, and digital education.",
    visionText: "Zeal Care envisions underprivileged children from low-or non-income backgrounds to realize their full potential to learn and contribute. We foresee that talent and knowledge are the only limits to destiny.",
    valuesText: "Integrity, commitment, diversity, transparency, innovation, and teamwork drive everything we do.",
  },
  whoWeAre: {
    overviewText: "Zeal Care is a team of passionate young people united by a shared mission: to ensure that every underprivileged child in Liberia and across Africa has the chance to learn, grow, and lead.",
    historyText: "In 2017, Titus S. Foko conducted an educational survey across communities in Montserrado, Margibi, and Bong Counties, planting the seeds that would grow into Zeal Care. The organization was legally registered in 2025 as a nonprofit NGO committed to igniting potential in every underprivileged child.",
    financeText: "Zeal Care maintains an innovative financial system that ensures full transparency and accountability. Every donation is tracked, reported, and allocated directly to our core programs. We are committed to open reporting and donor stewardship.",
    team: [
      { name: "Titus S. Foko", role: "Founder & Executive Director", bio: "Titus S. Foko is the visionary Founder and Executive Director of Zeal Care. With a background in Development Work and Community Development, he holds a BSc in Development Work from Stella Maris Polytechnic and a Certificate in Aspire Institute Leaders' Program from Boston University. Born and raised in Liberia, Titus experienced firsthand the devastating impact of educational inequality.", img: "/titus-foko.png" },
      { name: "Mohammed Soko Kamara", role: "Executive Director of Marketing & Communications", bio: "Mohammed Soko Kamara leads all marketing, communications, and public engagement strategies for Zeal Care. Holding a Bachelor's Degree in Marketing Management from Starz University, Mohammed is the voice and brand steward of the organization. He received the prestigious Starz University Excellence Award in 2025.", img: "/mohammed-kamara.png" },
      { name: "Joetta C. Paye", role: "Executive Director of Operations", bio: "Joetta C. Paye serves as the Executive Director of Operations, ensuring that Zeal Care's programs are delivered efficiently, ethically, and in alignment with our mission. She holds a BSc in Public Administration from the University of Liberia.", img: "" },
      { name: "William Mammie", role: "Graphic & Media Officer", bio: "William Mammie serves as Zeal Care's Graphic and Media Officer, responsible for the organization's visual identity, multimedia content, and media documentation. He holds a Bachelor's Degree in Information Technology from Starz University.", img: "" },
      { name: "Beverley Chelsea Saungweme", role: "Executive Director of Programs", bio: "Beverley Chelsea Saungweme leads Zeal Care's programming strategy from Zimbabwe. She holds a Master of Science in Development Economics and is a certified PMP Professional with expertise in project management, leadership, and child advocacy.", img: "/beverley-saungweme.png" },
    ],
    boardMembers: [
      { name: "Jluedoe M. Bornor", role: "Education Impact Advisor", bio: "An accomplished educator and Lecturer of the Year (Starz University, 2025). Jluedoe provides strategic guidance on educational program design and child development." },
      { name: "Mambiyea W. Kapee", role: "Children Education Impact Advisor", bio: "Guides the design and delivery of programs that improve children's access to quality education. Focuses on assessing impact, strengthening learning outcomes, and ensuring sustainable educational development.", img: "/mambiyea-kapee.png" },
      { name: "Sonay Knakay Monger Mason", role: "Strategy Partnership Advisor", bio: "Holds a Graduate Diploma in Management Studies from ICM, United Kingdom. With over 20 years in telecoms and international business, Sonay builds and manages strategic collaborations that advance Zeal Care's mission." },
    ],
    newsItems: [
      { date: "Jul–Aug 2024", title: "Educational Survey — Chicken Soup Factory", desc: "Zeal Care conducted an educational survey in Chicken Soup Factory Lorma Yard, Block D, reaching 45+ households to identify children most in need of educational support." },
      { date: "Aug 2024", title: "Interviews with Shortlisted Candidates", desc: "After collecting data on 40+ candidates, 9 were shortlisted for interviews. The process was supervised by Executive Director Titus S. Foko." },
      { date: "Sep 2024", title: "First Batch of Beneficiaries Revealed", desc: "Four children were selected for full academic sponsorship for the 2024/2025 academic year in the Chicken Soup Factory Community." },
      { date: "Feb 2025", title: "School Visit — Esfans Academy", desc: "Team visited Esfans Academy to complete remaining fee payments and monitor beneficiaries' academic progress. One beneficiary was promoted to the next class after just one semester." },
      { date: "2025", title: "Phase Two — West Point Survey", desc: "Zeal Care expanded to West Point, Zone 405, surveying 93 candidates and selecting 16 children for full sponsorship for the 2025–2026 academic year." },
    ],
  },
  whatWeDo: {
    overviewText: "Zeal Care is creating a model that will radically improve the lives of underprivileged children to become independent and influential people in society. We work in partnership with slum and rural communities, founded on trust and deep respect for the expertise of community and school members.",
    programs: [
      { title: "Education Sponsorship, Support & Advocacy", quote: '"The best way to fight poverty is to empower people through access to quality education." – John Legend', desc: "This program empowers underprivileged children aged 4 to 17 who live in slums and rural communities and never enrolled or dropped out. We provide registration and tuition, school supplies, and resources to support academic success, and advocate for inclusive education, especially for the disabled." },
      { title: "Leadership Development Programs", quote: '"If your actions inspire others to dream more, learn more, do more, and become more, you are a leader." – John Quincy Adams', desc: "Structured initiatives developing key skills for underprivileged children, students, and Zeal Care volunteers. Focus areas include personal development, mentorship, coaching, communication, problem-solving, emotional intelligence, and negotiation through training, seminars, and summits." },
      { title: "Entrepreneurship Programs", quote: '"It\'s not about ideas. It\'s about making ideas happen." — Scott Belsky', desc: "Structured training and developmental initiatives equipping underprivileged children, students, and young people with the knowledge, skills, and mindset required to identify business opportunities, develop new ventures, and manage business growth." },
      { title: "Career Paths in STEM Programs", quote: '"Science is not a boy\'s game, it\'s not a girl\'s game. It\'s everyone\'s game." – Nichelle Nichols', desc: "Collaborate with high schools to provide information and resources on choosing career paths in STEM for high school students through workshops, seminars, and campaigns." },
      { title: "Digital Education Programs", quote: '"The illiterate of the 21st century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn." – Alvin Toffler', desc: "Providing digital literacy training and awareness in various ICT programs through seminars, bootcamp, coding, and others — ensuring young people are prepared for an increasingly digital world." },
    ],
  },
  whyEmpowerment: {
    overviewText: "As the most effective strategy to tackle poverty and inequality, Zeal Care multiplies educational opportunities for underprivileged children and supports young people to become leaders of change.",
    bodyText: "Empowerment is not charity — it is a fundamental act of justice. When we empower a child with education, we are not giving them a handout; we are giving them a hand up. We are returning to them what was always theirs: the right to learn, to grow, and to determine their own future. Zeal Care's work is rooted in a deep conviction that poverty and inequality are not inevitable. They are the result of systems and structures that can be changed.",
  },
  ignitingPotential: {
    overviewText: "With your support, we can ignite the endless potential of underprivileged children in Liberia and across Africa. We see education as the starting point for systemic social change. As Nelson Mandela stated: \"Education is the most powerful weapon which you can use to change the world.\"",
    bodyText: "Your support today can help a child secure an education. The child will be able to create the future they imagine for themselves, their community, and Africa.",
    faqs: [
      { q: "What is Zeal Care?", a: "Zeal Care is a nonprofit NGO that empowers underprivileged children between the ages of 4 and 17 from low-income backgrounds to foster academic success, social confidence, and emotional well-being." },
      { q: "How can I learn more about Zeal Care's impact?", a: "You can stay updated on our work by exploring our website, following us on social media, or signing up for our newsletter. We regularly share updates on our ongoing projects, success stories, and community initiatives." },
      { q: "Where does Zeal Care's funding come from?", a: "Our funding comes from generous donations by individuals, organizations, and partners who believe in our mission. We ensure that every contribution directly benefits the people and communities we serve." },
      { q: "Can I donate to support a specific county or program?", a: "Yes, you can do this in one of two ways: donate to a specific initiative on this page, or include a note with your donation specifying the county or program." },
      { q: "Can I volunteer or travel with Zeal Care?", a: "Yes! We welcome volunteers who are passionate and willing to create change. If you'd like to contribute your skills, reach out to us at zealcare24@gmail.com or info@zealcare.org." },
      { q: "Can my organization partner with Zeal Care?", a: "Yes! We actively seek partnerships with organizations, businesses, and institutions that align with our mission, vision, and programs. If you are interested in collaborating, email us at info@zealcare.org." },
      { q: "Where is Zeal Care located?", a: "Zeal Care is based in Monrovia, Liberia. We are committed to driving impactful change across Liberia and beyond borders through our various programs." },
      { q: "How is my donation used?", a: "Every donation is allocated to key impact areas such as full education sponsorship, leadership & entrepreneurship training, digital literacy skills training, workshops to help make a choice of a career path in STEM, and other impactful community initiatives. We are committed to transparency in fund allocation." },
      { q: "Can I make a gift by wire transfer?", a: "Yes! Please contact our team at info@zealcare.org, and we'll send you instructions on how to make those gifts or visit our donation and igniting potential pages." },
      { q: "Does Zeal Care share my information?", a: "In keeping with our privacy policy, we do not transmit, transfer, or sell private information to any outside parties." },
    ],
  },
};

function ensureDir(): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function readContent(): SiteContent {
  try {
    if (!existsSync(FILE)) return DEFAULT_CONTENT;
    const stored = JSON.parse(readFileSync(FILE, "utf-8")) as Partial<SiteContent>;
    return deepMerge(DEFAULT_CONTENT, stored);
  } catch {
    return DEFAULT_CONTENT;
  }
}

export function writeContent(content: SiteContent): void {
  ensureDir();
  writeFileSync(FILE, JSON.stringify(content, null, 2), "utf-8");
}

export function patchContent(patch: Partial<SiteContent>): SiteContent {
  const current = readContent();
  const updated = deepMerge(current, patch);
  writeContent(updated);
  return updated;
}

function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(override) as (keyof T)[]) {
    const ov = override[key];
    const bv = base[key];
    if (
      ov !== null &&
      typeof ov === "object" &&
      !Array.isArray(ov) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      (result[key] as object) = deepMerge(bv as object, ov as Partial<object>);
    } else if (ov !== undefined) {
      result[key] = ov as T[keyof T];
    }
  }
  return result;
}
