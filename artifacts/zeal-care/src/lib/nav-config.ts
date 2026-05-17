export type NavItem = {
  label: string;
  path: string;
};

export type NavSection = {
  label: string;
  path: string;
  color: string;
  items: NavItem[];
};

export const navConfig: NavSection[] = [
  {
    label: "About Us",
    path: "/about",
    color: "#09609A",
    items: [
      { label: "Overview", path: "/about" },
      { label: "Our Mission", path: "/about/mission" },
      { label: "Our Vision", path: "/about/vision" },
      { label: "Our Goals", path: "/about/goals" },
      { label: "Our Values", path: "/about/values" },
      { label: "Our Belief", path: "/about/belief" },
      { label: "SDG Focus", path: "/about/sdg" },
      { label: "Characteristics We Develop", path: "/about/characteristics" },
    ],
  },
  {
    label: "Why Empowerment",
    path: "/why-empowerment",
    color: "#061A32",
    items: [
      { label: "Overview", path: "/why-empowerment" },
      { label: "Social Justice", path: "/why-empowerment/social-justice" },
      { label: "Economic Development", path: "/why-empowerment/economic-development" },
    ],
  },
  {
    label: "Who We Are",
    path: "/who-we-are",
    color: "#09609A",
    items: [
      { label: "Overview", path: "/who-we-are" },
      { label: "Our Leadership", path: "/who-we-are/leadership" },
      { label: "Board of Advisors", path: "/who-we-are/board" },
      { label: "Our Beneficiaries", path: "/who-we-are/beneficiaries" },
      { label: "Our Partners", path: "/who-we-are/partners" },
      { label: "Our History", path: "/who-we-are/history" },
      { label: "Awards & Prizes", path: "/who-we-are/awards" },
      { label: "Protection & Safeguarding", path: "/who-we-are/protection" },
      { label: "Finance & Accountability", path: "/who-we-are/finance" },
      { label: "Work for Us", path: "/who-we-are/work-for-us" },
      { label: "Tenders & Opportunities", path: "/who-we-are/tenders" },
    ],
  },
  {
    label: "What We Do",
    path: "/what-we-do",
    color: "#061A32",
    items: [
      { label: "Overview", path: "/what-we-do" },
      { label: "How We Operate", path: "/what-we-do/how-we-operate" },
      { label: "Where We Operate", path: "/what-we-do/where-we-operate" },
      { label: "Our Programs", path: "/what-we-do/programs" },
      { label: "What Sets Us Apart", path: "/what-we-do/what-sets-us-apart" },
      { label: "Impact in Numbers", path: "/what-we-do/impact" },
    ],
  },
  {
    label: "Igniting Potential",
    path: "/igniting-potential",
    color: "#09609A",
    items: [
      { label: "Overview", path: "/igniting-potential" },
      { label: "Ways to Give", path: "/igniting-potential/ways-to-give" },
      { label: "Appeals", path: "/igniting-potential/appeals" },
      { label: "Become a Partner", path: "/igniting-potential/become-a-partner" },
      { label: "Giving FAQ", path: "/igniting-potential/faq" },
    ],
  },
  {
    label: "Media",
    path: "/media",
    color: "#061A32",
    items: [
      { label: "Overview", path: "/media" },
      { label: "Newsroom", path: "/media/newsroom" },
      { label: "Success Stories", path: "/media/stories" },
      { label: "Video", path: "/media/video" },
      { label: "Photo Gallery", path: "/gallery" },
      { label: "Events & Calendar", path: "/media/events" },
    ],
  },
];
