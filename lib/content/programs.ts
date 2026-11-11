export interface Program {
  id: string;
  label: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
  highlights: string[];
  /** "At a glance" rows shown in the detail drawer. Only facts we can stand behind. */
  details: { label: string; value: string }[];
  storySlug: string;
}

export const programs: Program[] = [
  {
    id: "home",
    label: "Homes",
    title: "Home solar lighting kits",
    summary:
      "A compact solar home system that gives families clean light after sunset, so pupils can study through the quiet hours of the night.",
    image: {
      src: "/images/stories/home-solar-kit.jpeg",
      alt: "A home solar lighting kit with a solar panel, a battery unit and three LED bulbs.",
    },
    highlights: ["Solar panel and battery unit", "Three LED bulbs", "USB port for phone charging"],
    details: [
      { label: "Built for", value: "Rural households and pupils studying after dark" },
      { label: "In the kit", value: "Solar panel, rechargeable battery unit, three LED bulbs" },
      { label: "Charging", value: "USB port on the battery unit for phones" },
      { label: "Payment", value: "Flexible installment plans" },
      { label: "Delivered by", value: "Trained local Sales Agents" },
      { label: "Where", value: "Chilumba, Central Province" },
    ],
    storySlug: "bright",
  },
  {
    id: "business",
    label: "Businesses",
    title: "Lighting for local shops",
    summary:
      "Bright, reliable light that keeps rural shops open after dark. More trading hours for owners, more access for customers.",
    image: {
      src: "/images/stories/grocery-lighting-chilumba.png",
      alt: "A grocery shop in Chilumba lit at night by a solar light.",
    },
    highlights: ["Open after sunset", "Installment payments", "No fuel to buy"],
    details: [
      { label: "Built for", value: "Grocery owners and small traders" },
      { label: "Real result", value: "One Chilumba shop now closes at 21:00 instead of 17:30" },
      { label: "Payment", value: "Flexible installment plans" },
      { label: "Case study", value: "Moses's grocery, lit since July 2025" },
      { label: "Where", value: "Chilumba, Central Province" },
    ],
    storySlug: "enablement",
  },
  {
    id: "education",
    label: "Climate",
    title: "Climate education & capacity building",
    summary:
      "Outreach in schools and communities on climate change, and workshops that help young people bring their own green ideas to life.",
    image: {
      src: "/images/stories/climate-education-tubalange.png",
      alt: "An EcoLight facilitator teaching a classroom of pupils about climate change.",
    },
    highlights: ["School outreach", "Youth workshops", "Just energy transition"],
    details: [
      { label: "Built for", value: "Pupils, youth and rural communities" },
      { label: "Format", value: "School outreach sessions and capacity-building workshops" },
      { label: "Topics", value: "Climate change, clean energy, deforestation and land degradation" },
      { label: "Recent session", value: "Tubalange Primary School, November 2025" },
      { label: "Delivered by", value: "The EcoLight team" },
    ],
    storySlug: "capacity-building",
  },
];
