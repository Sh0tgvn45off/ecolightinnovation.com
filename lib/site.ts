export const site = {
  name: "EcoLight Innovations",
  shortName: "EcoLight",
  legalName: "EcoLight Innovations Zambia",
  tagline: "Brightening Lives, Transforming Communities",
  description:
    "EcoLight Innovations is a Zambian social enterprise offering Solar Energy-as-a-Service: reliable solar lighting and power by affordable monthly subscription for rural homes and small businesses, starting in Chilumba, Central Province.",
  url: "https://www.ecolightinnovation.com",
  email: "ecolight.zm@gmail.com",
  phone: {
    display: "+260 97 3032559",
    tel: "+260973032559",
    whatsapp: "https://wa.me/260973032559",
  },
  office: "Lusaka, Zambia",
  hours: "Mon–Fri, 9:00–17:00 CAT",
  firstCommunity: "Chilumba, Central Province",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61561046755563",
    linkedin: "https://www.linkedin.com/company/108702222/",
  },
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Packages", href: "/#packages" },
  { label: "Mission", href: "/mission" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Organisation",
    links: [
      { label: "About EcoLight", href: "/about" },
      { label: "Our team", href: "/about#our-team" },
      { label: "Our board", href: "/about#our-board" },
      { label: "Mission & goals", href: "/mission" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Packages & pricing", href: "/#packages" },
      { label: "Impact stories", href: "/impact" },
      { label: "Impact calculator", href: "/#calculator" },
      { label: "Climate education", href: "/impact#capacity-building" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Get solar", href: "/contact#inquire" },
      { label: "Partner or fund the pilot", href: "/contact#inquire" },
      { label: "Donate", href: "/donate" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
