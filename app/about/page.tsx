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
    "Meet EcoLight Innovations: the team and board bringing sustainable solar lighting to rural communities in Zambia.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EcoLight"
        title="Sustainable technology, built around communities."
        lead="We're a Zambian initiative harnessing solar power to uplift vulnerable rural communities: more light, better learning, stronger livelihoods."
      />

      <Section id="about-ecolight" className="pt-0 md:pt-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-platinum">
              <p className="text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl text-balance">
                EcoLight Innovations was founded with a single vision: use sustainable technology to uplift vulnerable rural
                communities.
              </p>
              <p>
                Based in Lusaka, we know the challenges facing communities without reliable electricity. Our mission goes beyond
                providing light. We aim to foster economic growth, expand educational opportunity and improve health through
                sustainable energy.
              </p>
              <p>
                We believe access to clean, affordable energy is a fundamental human right and a cornerstone of development. Solar
                lighting helps communities break free from energy poverty, rely less on harmful and expensive fossil fuels, and
                build a brighter, healthier future. Every project is community-centred: technically sound, culturally
                appropriate and economically viable for the long term.
              </p>
              <p>
                Sustainability is at the core of everything we do, from the materials we source to how we install them. We train
                local people and build local capacity, so the benefits of our work are sustained by the communities themselves.
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
