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
    team: [],
    boardMembers: [],
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
      return res.json() as Promise<SiteContent>;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: DEFAULT_CONTENT,
  });
}
