import { useQuery } from "@tanstack/react-query";

export type TeamMember = { name: string; role: string; bio: string; img?: string };
export type BoardMember = { name: string; role: string; bio: string; img?: string };
export type NewsItem = { date: string; title: string; desc: string };
export type Program = { title: string; quote: string; desc: string };
export type FAQ = { q: string; a: string };
export type GalleryPhoto = { url: string; alt: string; category: string };

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
    heroPrograms: string;
    heroLanguages: string;
  };
  home: {
    heroBadge: string;
    footerCtaBadge: string;
    footerCtaTitle: string;
    footerCtaSubtitle: string;
    footerNewsletterTitle: string;
    footerNewsletterDesc: string;
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
  gallery: {
    photos: GalleryPhoto[];
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  settings: {
    orgName: "Zeal Care",
    tagline: "Igniting Potential, Inspiring Change",
    email: "info@zealcare.org",
    phone: "+231 886 727 619",
    address: "Monrovia, Liberia",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    impactChildren: "105+",
    impactCommunities: "3",
    impactYears: "7+",
    impactCountries: "1",
    scholarCount: "105",
    partnerSchools: "2",
    techHours: "5000",
    heroPrograms: "5",
    heroLanguages: "4",
  },
  home: {
    heroBadge: "EMPOWERING AFRICA'S FUTURE LEADERS",
    footerCtaBadge: "Get Involved",
    footerCtaTitle: "Ready to make an impact?",
    footerCtaSubtitle: "Your support helps us provide a future full of hope and possibility for underprivileged children in Liberia.",
    footerNewsletterTitle: "Stay in the loop",
    footerNewsletterDesc: "Get updates on our programs and impact stories.",
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
    overviewText: "Zeal Care is a nonprofit NGO that empowers underprivileged children between the ages of 4 and 17 from low-income backgrounds to foster academic success, social confidence, and emotional well-being.",
    missionText: "Empower underprivileged children from low-income backgrounds to break the cycle of poverty and inequality by providing resources, opportunities, and support to foster a brighter future for all.",
    visionText: "Zeal Care envisions underprivileged children from low-or non-income backgrounds to realize their full potential to learn and contribute.",
    valuesText: "Integrity, commitment, diversity, transparency, innovation, and teamwork drive everything we do.",
  },
  whoWeAre: {
    overviewText: "Zeal Care is a team of passionate young people united by a shared mission: to ensure that every underprivileged child in Liberia and across Africa has the chance to learn, grow, and lead.",
    historyText: "In 2017, Titus S. Foko conducted an educational survey across communities, planting the seeds that would grow into Zeal Care. The organization was legally registered in 2025.",
    financeText: "Zeal Care maintains an innovative financial system that ensures full transparency and accountability. Every donation is tracked and allocated directly to our core programs.",
    team: [
      {
        name: "Titus S. Foko",
        role: "Founder | Executive Director",
        img: "/titus-foko.jpg",
        bio: "Titus S. Foko is a professional Telecommunications Engineer and social impact leader with eight years of leadership experience and six years of professional practice. He started his career at Lonestar Cell MTN Liberia. Titus obtained a Bachelor Degree in Telecommunication Engineering, along with several other certificates in leadership. He is also an IT professional and Data Analyst.\n\nHe is the Founder and Executive Director of Zeal Care, where he leads the organization's vision to empower underprivileged children and underserved communities through education sponsorship, leadership development, entrepreneurship, career paths in STEM, and digital education. He works closely with the Board of Advisors and Executive Directors to govern and execute the organization goals.\n\nTitus is an advocate of empowerment of children, disabled, and young people for education, leadership, and entrepreneurship. Driven by his passion for leadership and service to the community, he has been recognized with multiple honors, including the Starz University Leadership Award, the Starz University Honors Society Award, and Ambassadorial honors.\n\nHe is an alumnus of Aspire Institute in the USA, where he obtained certificates in leadership and AI-Integrated Leadership, Millennium Campus Network, Frontier Tech Leaders, and several other institutions. In 2021, Titus received and was bestowed ambassadorial honors from Think Africa Foundation and the Young Africa Leadership Development Institute.\n\nTitus is a faith-driven person who leverages his diverse skills in engineering, technology, and leadership to drive social impact success, leading with intention and purpose to build a more inclusive, supportive, and compassionate society for children, young people, and underserved communities.",
      },
      {
        name: "Mohammed Soko Kamara",
        role: "Co-Founder | Executive Director of Marketing & Communications",
        img: "/mohammed-kamara.jpg",
        bio: "Mohammed Soko Kamara is a dynamic social entrepreneur and community leader dedicated to empowering young people and underserved communities. As Co-Founder and Executive Director of Marketing and Communications at Zeal Care, Mohammed drives strategic outreach, engagement, and impact-driven storytelling that amplifies the organization's mission.\n\nHis passion for education, leadership, and service has earned him multiple academic honors, including the Starz University Excellence Award and the Starz University Honor Society Award. Mohammed earned his bachelor's degree in Marketing Management and several other certificates in leadership and entrepreneurship. He is also an alumnus of the Aspire Institute in the USA.\n\nMohammed's leadership blends creativity, purpose, and a relentless focus on positive change.",
      },
      {
        name: "Joetta C. Paye",
        role: "Executive Director of Talent Management",
        img: "/joetta-paye.jpg",
        bio: "Joetta C. Paye is an Economist with a postgraduate certificate in Multilateral Diplomacy from the Gabriel L. Dennis Foreign Service Institute. She brings over 8 years of strategic experience in corporate and community development sectors, with expertise in negotiation, big data analytics, accountable leadership, design thinking, and project management. A graduate of AMEU (BSc in Economics, cum laude).\n\nJoetta is passionate about empowering children and young people through education and health. She is an alumna of the Young African Leaders Initiative (YALI), Young Political Leadership School Africa (YPLSA), and the Amazon Leaders Initiative.",
      },
      {
        name: "Beverley Chelsea Saungweme",
        role: "Co-Founder | Executive Director of International Affairs",
        img: "/beverley-saungweme.jpg",
        bio: "Beverley Chelsea Saungweme earned her bachelor's degree in mechanical engineering. A graduate of the Aspire Leaders Program 2024, she rekindled her desire to give back to society by helping underprivileged children.\n\nShe believes that building the Africa we want requires investing in the next generation through education. Through Zeal Care, she is committed to working as part of a team to empower future generations by ensuring access to education.",
      },
      {
        name: "William Mammie",
        role: "Acting Executive Director of Operations",
        img: "/william-mammie.png",
        bio: "William Mammie is a creative, open-minded professional who blends technology, design, and communication to solve real-world problems. He holds a BSc in Information Technology with an emphasis in System Administration. With a passion for brand design, William brings ideas to life through thoughtful visuals, UX/UI design, and digital marketing.\n\nFor William, creativity is more than a skill; it is how he approaches and solves problems.",
      },
    ],
    boardMembers: [
      {
        name: "Jluedoe M. Bornor",
        role: "Acting Board Chairperson",
        img: "/jluedoe-bornor.png",
        bio: "Jluedoe Matilda Bornor is an accomplished Information and Communications Engineer (MSc.) with over a decade of leadership in digital transformation and strategic IT management. As a Business Architect at Lonestar Cell MTN, she excels in optimizing complex infrastructure and steering high-performing teams within multinational environments.\n\nShe is also the Founder & Executive Director of Blooming Kaleidoscope, a nonprofit dedicated to empowering autistic and neurodivergent children in Liberia. In her role as Chairperson, she provides strategic leadership, governance oversight, and long-term vision for Zeal Care.",
      },
      {
        name: "Yewande Olaiya-Oni",
        role: "Project Advisor",
        img: "/yewande-olaiya-oni.jpg",
        bio: "Yewande holds an MSc in Project Management from the University of Liverpool, a Postgraduate Diploma in Business Administration from the University of Leicester, and a B.Tech in Physics Electronics. She is a certified Project Management Professional with over two decades of experience in telecommunications across MTN Nigeria and MTN Liberia.\n\nAs Project Advisor, she provides strategic guidance to executive directors to support effective planning, implementation, and evaluation of projects.",
      },
      {
        name: "Reginald K. Reeves II",
        role: "Community Development Advisor",
        img: "/reginald-reeves.jpg",
        bio: "Reginald K. Reeves II is a Civil Engineer (BSc., ASc.) with over sixteen years of professional experience in the design, supervision, and implementation of infrastructure projects across Liberia. He is the CEO of Dream-Joy Group of Companies.\n\nAt Zeal Care, he serves as Community Development Advisor, connecting Zeal Care with NGOs and local communities to identify needs, build strong partnerships, and promote inclusive participation.",
      },
      {
        name: "Mambiyea W. Kapee",
        role: "Children Education Impact Advisor",
        img: "/mambiyea-kapee.jpg",
        bio: "In her role as Children Education Impact Advisor, she guides the design and delivery of programs that improve children's access to quality education. She focuses on assessing impact, strengthening learning outcomes, and ensuring sustainable educational development for underprivileged children and communities.",
      },
      {
        name: "Sonay Knakay Monger Mason",
        role: "Strategy Partnership Advisor",
        img: "/sonay-mason.jpg",
        bio: "Sonay Knakay Monger Mason holds a Graduate Diploma in Management Studies from ICM, United Kingdom, and is an expert in Roaming and Interconnection with over 20 years' experience in the Telecoms Industry.\n\nAs Strategy Partnership Advisor, she builds and manages strategic collaborations that advance Zeal Care's mission and social impact, aligning partners, resources, and strategies to drive sustainable growth.",
      },
    ],
    newsItems: [],
  },
  whatWeDo: {
    overviewText: "Zeal Care is creating a model that will radically improve the lives of underprivileged children to become independent and influential people in society.",
    programs: [],
  },
  whyEmpowerment: {
    overviewText: "As the most effective strategy to tackle poverty and inequality, Zeal Care multiplies educational opportunities for underprivileged children.",
    bodyText: "Empowerment is not charity — it is a fundamental act of justice. When we empower a child with education, we are giving them a hand up.",
  },
  ignitingPotential: {
    overviewText: "With your support, we can ignite the endless potential of underprivileged children in Liberia and across Africa.",
    bodyText: "Your support today can help a child secure an education and create the future they imagine for themselves.",
    faqs: [],
  },
  gallery: {
    photos: [],
  },
};

export function useSiteContent() {
  return useQuery<SiteContent>({
    queryKey: ["site-content"],
    queryFn: async () => {
      const res = await fetch("/api/site-content");
      if (!res.ok) throw new Error("Failed to load content");
      const json = await res.json() as SiteContent;
      // If the API returns empty/missing nested structures, fill them from defaults
      return {
        ...DEFAULT_CONTENT,
        ...json,
        whoWeAre: {
          ...DEFAULT_CONTENT.whoWeAre,
          ...(json.whoWeAre || {}),
          team:         json.whoWeAre?.team?.length         ? json.whoWeAre.team         : DEFAULT_CONTENT.whoWeAre.team,
          boardMembers: json.whoWeAre?.boardMembers?.length ? json.whoWeAre.boardMembers : DEFAULT_CONTENT.whoWeAre.boardMembers,
        },
      };
    },
    staleTime: 1000 * 60 * 5,
    initialData: DEFAULT_CONTENT,   // ← guaranteed fallback (persists on error)
    placeholderData: DEFAULT_CONTENT,
    retry: false,                    // don't retry on API failure (local dev has no API)
  });
}
