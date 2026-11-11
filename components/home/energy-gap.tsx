"use client";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { energyGap } from "@/lib/content/eaas";

const format = (suffix?: string) => (n: number) => `${Math.round(n).toLocaleString("en-US")}${suffix ?? ""}`;

export function EnergyGap({ className }: { className?: string }) {
  return (
    <Section id="energy-gap" className={className}>
      <SectionHeader
        eyebrow="The energy gap"
        title="Millions of homes are still waiting for power."
        lead="Families want solar, but the upfront cost of a full system keeps it out of reach. That's the gap our subscription model is built to close."
      />
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {energyGap.map((stat) => (
          <RevealItem key={stat.label} className="glass flex flex-col rounded-[28px] p-7">
            <p className="text-[clamp(2rem,3.4vw,2.6rem)] font-semibold leading-none tracking-tight text-gradient tabular">
              <AnimatedNumber value={stat.value} format={format(stat.suffix)} />
            </p>
            <p className="mt-4 flex-1 leading-relaxed text-platinum-soft">{stat.label}</p>
            <p className="mt-5 text-xs text-platinum-dim">Source: {stat.source}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
