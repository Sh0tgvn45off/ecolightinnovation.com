export interface Goal {
  title: string;
  body: string;
  icon: "zap" | "store" | "graduation" | "leaf" | "users" | "sparkles";
}

export const goals: Goal[] = [
  {
    title: "Expand access to clean energy",
    body: "Deploy solar lighting units and micro-grid systems to reach unserved households and public facilities like schools and health clinics.",
    icon: "zap",
  },
  {
    title: "Promote sustainable livelihoods",
    body: "Provide energy for income-generating activity: phone charging, small businesses and agricultural processing.",
    icon: "store",
  },
  {
    title: "Enhance education and health",
    body: "Light evening study to improve learning, and power clinics so night-time medical care is possible.",
    icon: "graduation",
  },
  {
    title: "Foster environmental stewardship",
    body: "Teach communities about renewable energy, cutting carbon footprints and reliance on kerosene and firewood.",
    icon: "leaf",
  },
  {
    title: "Build local capacity",
    body: "Train and employ community members to install, maintain and manage solar technology, building self-sufficiency and local ownership.",
    icon: "users",
  },
  {
    title: "Innovate and adapt",
    body: "Keep adopting the latest advances in solar technology for the most efficient, durable and cost-effective solutions.",
    icon: "sparkles",
  },
];

export const values: { name: string; body: string }[] = [
  { name: "Integrity", body: "Transparency and ethical conduct in everything we do." },
  { name: "Community", body: "Community needs and participation at the centre of every project." },
  { name: "Innovation", body: "Always seeking better, more sustainable solutions." },
  { name: "Impact", body: "Measurable, long-lasting positive change." },
  { name: "Collaboration", body: "Partnering with local organisations, government and stakeholders to reach further." },
];
