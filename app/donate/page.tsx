import type { Metadata } from "next";
import { BookOpen, HeartPulse, Lightbulb, ShieldCheck, Store, type LucideIcon } from "lucide-react";
import { DonationOptions } from "@/components/donate/donation-options";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHero, Section, SectionHeader } from "@/components/ui/section";
import { donationImpact } from "@/lib/content/donate";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support EcoLight Innovations. Your gift brings clean solar light, education and opportunity to rural communities in Zambia.",
};

const icons: Record<(typeof donationImpact)[number]["icon"], LucideIcon> = {
  lightbulb: Lightbulb,
  book: BookOpen,
  heart: HeartPulse,
  store: Store,
};

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Support our mission"
        title="Give the gift of light."
        lead="Your contribution brings light, education and opportunity to rural Zambian communities that need it most."
      >
        <ButtonLink href="#give" variant="photon">
          Give now
        </ButtonLink>
        <ButtonLink href="/contact#inquire" variant="glass">
          Partner with us
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 md:pt-0">
        <SectionHeader
          eyebrow="Why it matters"
          title="Every gift, put to work."
          lead="Every contribution, whatever its size, helps us bring clean, sustainable energy to rural communities."
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {donationImpact.map((item) => {
            const Icon = icons[item.icon];
            return (
              <RevealItem key={item.title} className="glass rounded-[28px] p-7">
                <span className="mb-6 grid size-11 place-items-center rounded-2xl border border-ember/25 bg-ember/10 text-ember-light">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-platinum">{item.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section id="give" className="bg-gradient-to-b from-black via-obsidian-900 to-black">
        <SectionHeader eyebrow="Ways to give" title="Choose how you give." />
        <DonationOptions />
      </Section>

      <Section>
        <Reveal className="glass mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-[32px] p-8 md:flex-row md:items-center md:p-12">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-photon/25 bg-photon/10 text-photon-light">
            <ShieldCheck aria-hidden className="size-7" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Our commitment to transparency</h2>
            <p className="mt-3 leading-relaxed text-platinum">
              We use your donations efficiently and effectively to maximise impact on the ground. Annual reports and
              financial statements are available on request: email{" "}
              <a href={`mailto:${site.email}`} className="text-white underline decoration-white/30 underline-offset-2">
                {site.email}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
