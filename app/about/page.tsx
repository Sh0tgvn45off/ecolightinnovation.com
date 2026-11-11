import type { Metadata } from "next";
import Image from "next/image";
import { PersonCard } from "@/components/about/person-card";
import { ClosingCta } from "@/components/home/closing-cta";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { PageHero, Section, SectionHeader } from "@/components/ui/section";
import { board, team } from "@/lib/content/team";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet EcoLight Innovations, a Zambian social enterprise making solar energy affordable through monthly subscriptions, and the team and board behind it.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EcoLight"
        title="Sustainable technology, built around communities."
        lead="We're a Zambian social enterprise making reliable solar energy affordable through monthly subscriptions: more light, better learning, stronger livelihoods."
      />

      <Section id="about-ecolight" className="pt-0 md:pt-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-platinum">
              <p className="text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl text-balance">
                EcoLight Innovation Zambia is a social enterprise building a Solar Energy-as-a-Service business for households
                and small businesses.
              </p>
              <p>
                Based in Lusaka, we know the challenges facing communities without reliable electricity. Many families want
                solar, but the cost of buying a complete system keeps it out of reach. That affects household life, children&apos;s
                study time after sunset, and whether small businesses can operate consistently.
              </p>
              <p>
                So instead of selling systems, we provide them as a service. Customers pay an affordable monthly subscription,
                and EcoLight retains ownership of the core equipment: solar panels, batteries, inverters or charge controllers,
                protection components, wiring and lights. We arrange installation and provide ongoing monitoring, maintenance
                and technical support. Lighting comes first in every package, and appliances such as TVs, fans and
                refrigerators are available separately for customers who want them.
              </p>
              <p>
                We believe access to clean, affordable energy is a cornerstone of development. Our aim is a financially
                sustainable enterprise that combines commercial viability with measurable social impact: expanding dependable
                solar energy across Zambia, creating local jobs, and contributing to the country&apos;s transition to cleaner,
                more accessible energy.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4 lg:col-span-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-hairline">
              <Image
                src="/images/photos/installing-solar-panels.png"
                alt="Two technicians installing solar panels on a rooftop."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-hairline">
              <Image
                src="/images/photos/solar-charging-station.jpg"
                alt="A man running a small solar charging station for phones and radios."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="our-team" className="bg-gradient-to-b from-black via-obsidian-900 to-black">
        <SectionHeader
          eyebrow="Our team"
          title="The people behind the light."
          lead="A dedicated team running programs, finance, partnerships and impact evaluation."
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </RevealGroup>
      </Section>

      <Section id="our-board">
        <SectionHeader
          eyebrow="Our board"
          title="Guided by experience."
          lead="Our board sets direction and keeps EcoLight's governance, ethics and mission on course."
        />
        <RevealGroup className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </RevealGroup>
      </Section>

      <ClosingCta />
    </>
  );
}
