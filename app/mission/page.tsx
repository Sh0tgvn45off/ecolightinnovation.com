import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Leaf, Sparkles, Store, Users, Zap, type LucideIcon } from "lucide-react";
import { ClosingCta } from "@/components/home/closing-cta";
import { EnergyGap } from "@/components/home/energy-gap";
import { pilot } from "@/lib/content/eaas";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHero, Section, SectionHeader } from "@/components/ui/section";
import { goals, values, type Goal } from "@/lib/content/mission";

export const metadata: Metadata = {
  title: "Our mission",
  description:
    "Reliable, affordable solar energy for households and small businesses in Zambia, delivered as a monthly subscription. Starting in Chilumba, Central Province.",
};

const icons: Record<Goal["icon"], LucideIcon> = {
  zap: Zap,
  store: Store,
  graduation: GraduationCap,
  leaf: Leaf,
  users: Users,
  sparkles: Sparkles,
};

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Our mission"
        title="End energy poverty, one community at a time."
        lead="Reliable, affordable solar energy for households and small businesses across Zambia, delivered as a service. Starting in Chilumba, Central Province."
      >
        <ButtonLink href="/#how-it-works" variant="photon">
          How our model works
        </ButtonLink>
        <ButtonLink href="/impact" variant="glass" chevron>
          See our progress
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 md:pt-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Core purpose</p>
            <h2 className="text-display-md font-semibold text-gradient text-balance">Light is where opportunity starts.</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-platinum">
              <p>
                We are committed to eradicating energy poverty, reducing reliance on harmful traditional energy sources, and
                creating a brighter future for all.
              </p>
              <p>
                The biggest barrier isn&apos;t willingness. It&apos;s the upfront cost of a solar system. So we offer solar as a
                monthly subscription: EcoLight owns the equipment, installs it and keeps it running, and customers pay for
                reliable light and energy rather than hardware.
              </p>
              <p>
                We&apos;re starting with a pilot of {pilot.systems} solar systems in Chilumba, building on our community
                lighting work there. It will test demand, affordability, system performance and service before we expand to
                other rural, peri-urban and urban communities across Zambia.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[28px] border border-hairline">
              <Image
                src="/images/photos/children-studying-solar.jpg"
                alt="Two pupils studying by the light of a small solar lamp."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[28px] border border-hairline">
              <Image
                src="/images/photos/solar-trader.webp"
                alt="A trader charging phones and devices from a solar panel outside his shop."
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[28px] border border-hairline">
              <Image
                src="/images/photos/installing-solar-panels.png"
                alt="Two technicians installing solar panels on a rooftop."
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <EnergyGap />

      <Section className="bg-gradient-to-b from-black via-obsidian-900 to-black">
        <SectionHeader
          eyebrow="Strategic goals"
          title="Six goals. One direction."
          lead="How we turn clean light into lasting change for rural communities."
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => {
            const Icon = icons[goal.icon];
            return (
              <RevealItem key={goal.title} className="glass rounded-[28px] p-7 md:p-8">
                <span className="mb-6 grid size-11 place-items-center rounded-2xl border border-photon/25 bg-photon/10 text-photon-light">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-white">{goal.title}</h3>
                <p className="mt-3 leading-relaxed text-platinum">{goal.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeader eyebrow="Our values" title="What we stand for." />
        <RevealGroup className="mx-auto max-w-4xl divide-y divide-white/[0.08] border-y border-hairline">
          {values.map((value) => (
            <RevealItem
              key={value.name}
              className="grid gap-2 py-8 md:grid-cols-[280px_1fr] md:items-baseline md:gap-10"
            >
              <h3 className="text-3xl font-semibold tracking-tight text-gradient md:text-4xl">{value.name}</h3>
              <p className="text-lg text-platinum">{value.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <ClosingCta />
    </>
  );
}
