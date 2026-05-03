// Official partner logos as inline SVGs — reliable, no external dependency

export function USAIDLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="180" height="80" fill="#002F6C" rx="4"/>
      <rect x="0" y="60" width="180" height="20" fill="#BA0C2F" rx="0"/>
      <rect x="0" y="56" width="180" height="4" fill="white"/>
      <text x="90" y="45" textAnchor="middle" fill="white" fontSize="28" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="2">USAID</text>
      <text x="90" y="74" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="1">FROM THE AMERICAN PEOPLE</text>
    </svg>
  );
}

export function OrangeLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="180" height="80" fill="#FF6600" rx="4"/>
      <text x="90" y="52" textAnchor="middle" fill="white" fontSize="36" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif">orange</text>
    </svg>
  );
}

export function EcobankLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="180" height="80" fill="white" rx="4"/>
      <rect x="12" y="20" width="18" height="5" fill="#006835" rx="1"/>
      <rect x="12" y="31" width="14" height="5" fill="#F57E20" rx="1"/>
      <rect x="12" y="42" width="18" height="5" fill="#006835" rx="1"/>
      <rect x="12" y="53" width="14" height="5" fill="#F57E20" rx="1"/>
      <text x="106" y="52" textAnchor="middle" fill="#006835" fontSize="24" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="1">ECOBANK</text>
    </svg>
  );
}

export function UNICEFLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="180" height="80" fill="white" rx="4"/>
      <circle cx="22" cy="40" r="16" fill="none" stroke="#009FDA" strokeWidth="2.5"/>
      <ellipse cx="22" cy="40" rx="8" ry="16" fill="none" stroke="#009FDA" strokeWidth="1.5"/>
      <line x1="6" y1="40" x2="38" y2="40" stroke="#009FDA" strokeWidth="1.5"/>
      <line x1="8" y1="30" x2="36" y2="30" stroke="#009FDA" strokeWidth="1"/>
      <line x1="8" y1="50" x2="36" y2="50" stroke="#009FDA" strokeWidth="1"/>
      <text x="44" y="30" fill="#009FDA" fontSize="7" fontFamily="Arial" fontWeight="600">for every child</text>
      <text x="44" y="52" textAnchor="start" fill="#009FDA" fontSize="30" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif">UNICEF</text>
    </svg>
  );
}

export function GlobalFundLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="180" height="80" fill="white" rx="4"/>
      <circle cx="24" cy="40" r="18" fill="#C5003E"/>
      <circle cx="24" cy="40" r="12" fill="white"/>
      <circle cx="24" cy="40" r="7" fill="#C5003E"/>
      <text x="100" y="32" textAnchor="middle" fill="#333" fontSize="11" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="1">THE</text>
      <text x="100" y="48" textAnchor="middle" fill="#333" fontSize="13" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="0.5">GLOBAL FUND</text>
      <text x="100" y="63" textAnchor="middle" fill="#666" fontSize="8" fontFamily="Arial, sans-serif" letterSpacing="0.5">TO FIGHT AIDS, TB AND MALARIA</text>
    </svg>
  );
}

export function WorldVisionLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="180" height="80" fill="white" rx="4"/>
      <path d="M22 52 C18 44 10 40 10 34 C10 29 14 26 18 26 C20 26 22 27 24 29 C26 27 28 26 30 26 C34 26 38 29 38 34 C38 40 30 44 26 52 L24 55 Z" fill="#C5003E"/>
      <text x="110" y="35" textAnchor="middle" fill="#0E4C96" fontSize="15" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="0.5">WORLD</text>
      <text x="110" y="55" textAnchor="middle" fill="#0E4C96" fontSize="15" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="0.5">VISION</text>
    </svg>
  );
}

export interface PartnerInfo {
  id: string;
  name: string;
  fullName: string;
  type: string;
  website: string;
  description: string;
  logo: React.ReactNode;
  bgColor: string;
}

export const STRATEGIC_PARTNERS: PartnerInfo[] = [
  {
    id: "usaid",
    name: "USAID",
    fullName: "U.S. Agency for International Development",
    type: "Development Partner",
    website: "https://www.usaid.gov",
    description: "The world's premier international development agency, supporting education, health, and economic growth across developing nations.",
    logo: <USAIDLogo />,
    bgColor: "#002F6C",
  },
  {
    id: "orange",
    name: "Orange",
    fullName: "Orange Telecom Group",
    type: "Technology & Connectivity Partner",
    website: "https://www.orange.com",
    description: "A leading global telecommunications operator delivering digital connectivity solutions across Africa and Europe.",
    logo: <OrangeLogo />,
    bgColor: "#FF6600",
  },
  {
    id: "ecobank",
    name: "Ecobank",
    fullName: "Ecobank Transnational Inc.",
    type: "Financial Services Partner",
    website: "https://www.ecobank.com",
    description: "Pan-African banking group operating in 35 African countries, driving financial inclusion and economic empowerment.",
    logo: <EcobankLogo />,
    bgColor: "#FFFFFF",
  },
  {
    id: "unicef",
    name: "UNICEF",
    fullName: "United Nations Children's Fund",
    type: "Child Welfare Partner",
    website: "https://www.unicef.org",
    description: "The UN agency working in over 190 countries to protect the rights of every child through education, health, and nutrition.",
    logo: <UNICEFLogo />,
    bgColor: "#FFFFFF",
  },
  {
    id: "globalfund",
    name: "Global Fund",
    fullName: "The Global Fund to Fight AIDS, TB and Malaria",
    type: "Health & Development Partner",
    website: "https://www.theglobalfund.org",
    description: "A global partnership investing over $4 billion annually to defeat infectious diseases and strengthen health systems in developing nations.",
    logo: <GlobalFundLogo />,
    bgColor: "#FFFFFF",
  },
  {
    id: "worldvision",
    name: "World Vision",
    fullName: "World Vision International",
    type: "Humanitarian Partner",
    website: "https://www.wvi.org",
    description: "A global Christian humanitarian organization partnering with children, families, and communities to overcome poverty and injustice.",
    logo: <WorldVisionLogo />,
    bgColor: "#FFFFFF",
  },
];
