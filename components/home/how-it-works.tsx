import { Check, Tv } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { appliancesNote, howItWorks, included } from "@/lib/content/eaas";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-gradient-to-b from-black via-obsidian-900 to-black">
      <SectionHeader
        eyebrow="Solar Energy-as-a-Service"
        title="Solar power, without the upfront cost."
        lead="Instead of buying a whole system, you subscribe to reliable light and energy. We own the equipment, and we keep it running."
      />

      <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((step, i) => (
          <RevealItem key={step.title} className="glass relative rounded-[28px] p-7 md:p-8">
            <span className="mb-8 grid size-10 place-items-center rounded-full border border-photon/30 bg-photon/10 text-sm font-semibold text-photon-light tabular">
              {i + 1}
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-white">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-platinum">{step.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-5 grid gap-4 lg:grid-cols-5">
        <div className="glass rounded-[28px] p-7 md:p-9 lg:col-span-3">
          <h3 className="text-lg font-semibold text-white">Included with every subscription</h3>
          <ul className="mt-6 space-y-3.5">
            {included.map((item) => (
              <li key={item} className="flex gap-3 text-platinum-soft">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-photon/15 text-photon-light">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass flex flex-col justify-between rounded-[28px] p-7 md:p-9 lg:col-span-2">
          <span className="grid size-11 place-items-center rounded-2xl border border-ember/25 bg-ember/10 text-ember-light">
            <Tv aria-hidden className="size-5" />
          </span>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white">Appliances, only if you want them</h3>
            <p className="mt-3 leading-relaxed text-platinum">{appliancesNote}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
