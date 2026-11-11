export type StoryBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export type StoryMedia =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "video"; src: string; title: string; portrait?: boolean };

export interface Story {
  slug: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  title: string;
  headline: string;
  summary: string;
  category: "Education" | "Livelihoods" | "Climate education" | "Jobs" | "Community" | "Products";
  media: StoryMedia[];
  body: StoryBlock[];
  tags: string[];
}

/** Newest first. */
export const stories: Story[] = [
  {
    slug: "bright",
    date: "2026-06-19",
    title: "EcoLight: brightening your world",
    headline: "Solar lighting for your everyday needs",
    summary:
      "Home solar lighting systems that let pupils use the quiet hours of the night to study, opening doors to higher education.",
    category: "Products",
    media: [
      {
        kind: "image",
        src: "/images/stories/home-solar-kit.jpeg",
        alt: "An EcoLight home solar lighting kit: a solar panel, a battery unit and three LED bulbs, one of them lit.",
        width: 1280,
        height: 960,
      },
    ],
    body: [
      {
        type: "p",
        text: "EcoLight Innovation supplies reliable and sustainable solar energy solutions (home solar lighting systems) to pupils in rural, vulnerable and underserved communities. They can use the quiet night-time hours to study effectively, which improves their academic performance, opens doors to higher education, and drives the development of their communities.",
      },
    ],
    tags: ["RuralEducation", "EqualOpportunitiesForAllLearners", "CleanEnergy", "RuralDevelopment"],
  },
  {
    slug: "feedback1",
    date: "2026-05-07",
    title: "Customer feedback from Chilumba",
    headline: "Feedback from a satisfied client in our first community",
    summary:
      "We follow up after every installation to make sure our work is making a positive difference in people's lives.",
    category: "Community",
    media: [
      {
        kind: "video",
        src: "/videos/customer-feedback-chilumba.mp4",
        title: "A client in Chilumba shares their experience with EcoLight solar lighting",
        portrait: true,
      },
    ],
    body: [
      {
        type: "p",
        text: "Client satisfaction matters to us, so we conduct post-installation follow-ups to make sure we are making a positive impact on the lives of the people we serve.",
      },
      {
        type: "p",
        text: "Our mission is to bridge the energy access gap in underserved, rural and vulnerable communities, promoting equal opportunities for all. We are particularly focused on improving study conditions for pupils in rural areas and fostering a positive attitude towards learning.",
      },
      {
        type: "p",
        text: "EcoLight contributes to better academic performance among pupils and raises the overall living standards of rural households.",
      },
    ],
    tags: ["Feedback", "EqualOpportunitiesForAllLearners", "CleanEnergy", "RuralDevelopment"],
  },
  {
    slug: "rural-education",
    date: "2026-03-17",
    title: "Solar lighting for rural education",
    headline: "Empowering rural education through solar lighting",
    summary:
      "The challenge isn't ability or determination. It's access to reliable light after dark.",
    category: "Education",
    media: [
      {
        kind: "image",
        src: "/images/stories/rural-education-1.jpeg",
        alt: "Rural education campaign by EcoLight Innovations, image one.",
        width: 762,
        height: 1016,
      },
      {
        kind: "image",
        src: "/images/stories/rural-education-2.jpeg",
        alt: "Rural education campaign by EcoLight Innovations, image two.",
        width: 762,
        height: 1016,
      },
    ],
    body: [
      {
        type: "p",
        text: "We believe that when given the right tools and opportunities, every child, regardless of where they live, can succeed.",
      },
      {
        type: "p",
        text: "Many people believe that pupils in vulnerable rural communities perform poorly academically. At EcoLight Innovation, we consider this belief a myth.",
      },
      {
        type: "p",
        text: "The challenge is not a lack of ability or determination among these pupils, but a lack of access to reliable and sustainable lighting. Without electricity, many learners in rural areas cannot study in the evening, which limits their chance to reach their full academic potential.",
      },
      { type: "h", text: "EcoLight Innovation is committed to changing this reality." },
      {
        type: "p",
        text: "We empower vulnerable rural communities with sustainable solar lighting so pupils can study during the quiet, peaceful hours of the night. Beyond academic improvement, the initiative raises the overall living standards of the communities we serve. Our first operation is in the Chilumba community in Central Province, near the Lukanga Swamp.",
      },
      {
        type: "p",
        text: "Together, we can empower young minds, strengthen rural communities, and build a brighter future for everyone.",
      },
    ],
    tags: ["Rural", "RuralDevelopment", "RenewableEnergy", "Zambia"],
  },
  {
    slug: "capacity-building",
    date: "2025-11-20",
    title: "Climate awareness & capacity building",
    headline: "Climate change education at Tubalange Primary School",
    summary:
      "Knowledge sharing is the first step towards change, so we run outreach on climate change education in rural schools.",
    category: "Climate education",
    media: [
      {
        kind: "image",
        src: "/images/stories/climate-education-tubalange.png",
        alt: "An EcoLight facilitator teaching a full classroom of pupils during a climate change awareness session.",
        width: 2000,
        height: 1600,
      },
    ],
    body: [
      {
        type: "p",
        text: "EcoLight Innovation is dedicated not only to providing rural communities with sustainable, reliable, affordable and renewable solar energy, but also to equipping them with the knowledge needed for social change. That's why we run outreach programs on climate change education and awareness.",
      },
      {
        type: "p",
        text: "We focus on rural communities, which often have limited access to information and resources. With the right knowledge, individuals can take action against climate change, starting at a personal level.",
      },
      {
        type: "quote",
        text: "Education is the most powerful weapon which we can use to change the world.",
        cite: "Nelson Mandela",
      },
      {
        type: "p",
        text: "Our recent outreach program at Tubalange Primary School reflects our commitment to spreading awareness about climate change. Everyone deserves access to information, wherever they live, and we are making a difference one community at a time.",
      },
    ],
    tags: ["EcolightInnovation", "Environment", "SolarEnergy", "Sustainability", "YouthEmpowerment", "Zambia"],
  },
  {
    slug: "enablement",
    date: "2025-10-31",
    title: "Lighting local businesses",
    headline: "Enabling local businesses with clean, green lighting",
    summary:
      "Moses used to close his grocery at 5:30 pm. With solar lighting he now serves customers until 9 pm.",
    category: "Livelihoods",
    media: [
      {
        kind: "image",
        src: "/images/stories/grocery-lighting-chilumba.png",
        alt: "A grocery shop in Chilumba lit at night by a bright solar light, with customers buying goods after dark.",
        width: 1080,
        height: 1080,
      },
    ],
    body: [
      {
        type: "p",
        text: "Our mission goes beyond lighting. We are driven by sustainable development, economic empowerment and the well-being of people in rural communities, and we create opportunities for growth.",
      },
      {
        type: "p",
        text: "Solar lighting lets local grocery owners extend their trading hours. Community members get access to essential goods in the evening, and the whole community becomes more resilient.",
      },
      { type: "h", text: "Meet Moses" },
      {
        type: "p",
        text: "Moses is a grocery owner in the Chilumba community and one of the beneficiaries of our solar lighting packages. Here is what he had to say about his experience.",
      },
      {
        type: "quote",
        text: "I am happy to share my experience with EcoLight Innovation's solar lighting packages. Before, my grocery store would close at 5:30 pm due to darkness. But after installing their solar lights on July 21st, 2025, I can now stay open till 9 pm, giving me extra hours to serve my customers. This has not only boosted my sales but also helped my customers with tight schedules to have access and be able to buy at evening hours. I am grateful for EcoLight Innovation's flexible installment payment system, which makes their products accessible to us rural dwellers. Thank you, EcoLight Innovation, for remembering us and continue your good work.",
        cite: "Moses, grocery owner, Chilumba",
      },
    ],
    tags: ["EcolightInnovation", "SolarPower", "RuralDevelopment", "RenewableEnergy", "Zambia"],
  },
  {
    slug: "empowerment",
    date: "2025-10-22",
    title: "Creating local jobs",
    headline: "Empowering local communities through job creation",
    summary:
      "Our first three local Sales Agents in Chilumba, trained in customer care and mini-grid solar installation.",
    category: "Jobs",
    media: [
      {
        kind: "image",
        src: "/images/stories/sales-agents-1.jpeg",
        alt: "EcoLight's newly onboarded local sales agents in Chilumba, image one.",
        width: 1280,
        height: 1706,
      },
      {
        kind: "image",
        src: "/images/stories/sales-agents-2.jpeg",
        alt: "EcoLight's newly onboarded local sales agents in Chilumba, image two.",
        width: 1280,
        height: 1706,
      },
    ],
    body: [
      {
        type: "p",
        text: "EcoLight Innovation has taken a significant step towards creating economic opportunity in vulnerable rural communities. We have officially onboarded our first three local Sales Agents in the Chilumba community, Central Province, Zambia. Each received comprehensive training in customer relationship management, customer service and mini-grid solar installation.",
      },
      { type: "h", text: "Empowerment" },
      {
        type: "p",
        text: "Our commission-based structure lets Sales Agents earn a percentage on every sale. That gives them ownership and motivation, creates jobs, and helps them support themselves and their families.",
      },
      { type: "h", text: "A milestone" },
      {
        type: "p",
        text: "We look forward to sharing our Sales Agents' stories and the difference their earnings make in their lives. We are committed to fostering economic development in rural communities.",
      },
    ],
    tags: ["EcolightInnovation", "YouthEmpowerment", "RuralDevelopment", "Zambia"],
  },
  {
    slug: "story-intro",
    date: "2025-10-08",
    title: "Introducing EcoLight Innovations",
    headline: "Introducing EcoLight Innovation Zambia",
    summary:
      "An initiative to strengthen climate resilience in Zambia by bridging the energy access gap for marginalised communities.",
    category: "Community",
    media: [
      {
        kind: "image",
        src: "/images/stories/introduction.jpg",
        alt: "EcoLight Innovations branded shirts.",
        width: 1080,
        height: 1080,
      },
    ],
    body: [
      {
        type: "p",
        text: "EcoLight Innovation is an initiative dedicated to enhancing climate resilience in Zambia. We bridge the energy access gap for marginalised communities and improve living standards with affordable, reliable, renewable and eco-friendly solar lighting. We also run climate change education and awareness programs in schools and communities, and capacity-building workshops.",
      },
      { type: "h", text: "Our main objective" },
      {
        type: "p",
        text: "To enhance climate resilience and bridge the energy access gap for marginalised communities in Zambia.",
      },
      { type: "h", text: "Specific objectives" },
      {
        type: "list",
        items: [
          "Raise awareness and knowledge of climate change among youths in marginalised communities through outreach programs.",
          "Run capacity-building workshops that give youths a platform to bring their ideas to life in just energy transition, environmental sustainability, and reducing deforestation and land degradation.",
          "Improve living standards in marginalised communities with eco-friendly, affordable and renewable solar lighting, ending over-reliance on fossil fuels.",
          "Improve the academic performance of pupils in marginalised communities with reliable solar lighting in schools and homes.",
          "Empower women and youth with decent work as Sales Agents and with income-generating skills.",
        ],
      },
    ],
    tags: ["EcolightInnovation", "Environment", "Energy", "Sustainability", "Zambia"],
  },
];
