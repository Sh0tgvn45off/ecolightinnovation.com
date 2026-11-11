export const site = {
  name: "EcoLight Innovations",
  shortName: "EcoLight",
  legalName: "EcoLight Innovations Zambia",
  tagline: "Brightening Lives, Transforming Communities",
  description:
    "EcoLight Innovations brings clean, affordable solar lighting to rural Zambian homes, schools and small businesses, starting in Chilumba, Central Province.",
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
  { label: "Mission", href: "/mission" },
  { label: "Solutions", href: "/#solutions" },
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
      { label: "Solutions", href: "/#solutions" },
      { label: "Impact stories", href: "/impact" },
      { label: "Impact calculator", href: "/#calculator" },
      { label: "Climate education", href: "/impact#capacity-building" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Monthly giving", href: "/donate#give" },
      { label: "Partner with us", href: "/contact#inquire" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
