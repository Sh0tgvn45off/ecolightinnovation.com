/**
 * Solar Energy-as-a-Service (EaaS): packages, how it works, the pilot and the market context.
 * Source: EcoLight's EaaS business plan. Prices and system designs are for the Chilumba pilot
 * and are preliminary until technical validation and supplier quotes are final.
 */

export interface EnergyPackage {
  id: "basic" | "household" | "business";
  name: string;
  tagline: string;
  /** Monthly subscription in kwacha during the first 24 months. */
  monthly: number;
  /** Monthly subscription in kwacha after the first 24 months (50% lower). */
  afterTwoYears: number;
  specs: { label: string; value: string }[];
  /** Systems planned for the Chilumba pilot. */
  pilotUnits: number;
}

export const packages: EnergyPackage[] = [
  {
    id: "basic",
    name: "Basic Lighting",
    tagline: "Clean, reliable light for homes and evening study.",
    monthly: 175,
    afterTwoYears: 87.5,
    specs: [
      { label: "Solar panels", value: "100–150 W" },
      { label: "Battery", value: "12.8 V, 50 Ah" },
      { label: "Power", value: "DC lighting" },
    ],
    pilotUnits: 15,
  },
  {
    id: "household",
    name: "Household & Small Business",
    tagline: "Lighting plus an inverter for everyday appliances.",
    monthly: 375,
    afterTwoYears: 187.5,
    specs: [
      { label: "Solar panels", value: "400 W" },
      { label: "Battery", value: "25.6 V, 50 Ah" },
      { label: "Inverter", value: "800–1,000 W" },
    ],
    pilotUnits: 10,
  },
  {
    id: "business",
    name: "Higher-Demand Business",
    tagline: "A larger system for businesses with higher energy needs.",
    monthly: 1150,
    afterTwoYears: 575,
    specs: [
      { label: "Solar panels", value: "1,000 W" },
      { label: "Battery", value: "51.2 V, 100 Ah" },
      { label: "Inverter", value: "3,000 W" },
    ],
    pilotUnits: 5,
  },
];

export const howItWorks: { title: string; body: string }[] = [
  {
    title: "Choose your package",
    body: "Pick the system that fits how you use energy, from basic lighting to a full business setup.",
  },
  {
    title: "Share the installation cost",
    body: "You contribute 50% of the installation cost. EcoLight covers the other 50%.",
  },
  {
    title: "Pay monthly. We do the rest.",
    body: "Pay a monthly subscription, or half of it every two weeks. EcoLight owns the equipment and keeps it running.",
  },
  {
    title: "Half price after two years",
    body: "After the first 24 months, your monthly subscription drops by 50%.",
  },
];

/** What every subscription includes, per the customer agreement. */
export const included: string[] = [
  "EcoLight owns the core equipment: panels, batteries, inverters or charge controllers, protection, wiring and lights",
  "Installation arranged by EcoLight",
  "Ongoing system monitoring and maintenance",
  "Technical support when you need it",
  "Repairs and replacements as set out in your agreement",
];

export const appliancesNote =
  "Lighting comes first in every package. TVs, fans, refrigerators and business equipment are sold separately, so you only buy what you need, and it's matched to your system.";

export const pilot = {
  location: "Chilumba",
  systems: packages.reduce((sum, p) => sum + p.pilotUnits, 0),
};

/** National context, as cited in the EaaS business plan. */
export const energyGap: { value: number; suffix?: string; label: string; source: string }[] = [
  {
    value: 2332782,
    label: "households in Zambia without access to electricity",
    source: "ZamStats & National Energy Access Survey",
  },
  {
    value: 1908906,
    label: "of those households are in rural areas, like Chilumba",
    source: "ZamStats & National Energy Access Survey",
  },
  {
    value: 65,
    suffix: "%+",
    label: "of rural small businesses have no electricity access",
    source: "IFC Enterprise Baseline Data, Zambia",
  },
  {
    value: 1768311,
    label: "more households to be connected off-grid by 2030",
    source: "National Energy Compact for Zambia",
  },
];

export const kwacha = (n: number) =>
  `K${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
