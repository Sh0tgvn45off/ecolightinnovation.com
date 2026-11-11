import { Bento } from "@/components/home/bento";
import { ClosingCta } from "@/components/home/closing-cta";
import { EnergyGap } from "@/components/home/energy-gap";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ImpactCalculator } from "@/components/home/impact-calculator";
import { Packages } from "@/components/home/packages";
import { StoriesPreview } from "@/components/home/stories-preview";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EnergyGap />
      <HowItWorks />
      <Packages />
      <Bento />
      <ImpactCalculator />
      <StoriesPreview />

      <Section id="inquire" className="bg-gradient-to-b from-black via-obsidian-900 to-black">
        <SectionHeader
          eyebrow="Work with us"
          title="Let's light the next community."
          lead="Customers, partners, funders and schools: tell us what you have in mind and we'll get back to you within 24–48 hours."
        />
        <Reveal className="mx-auto max-w-3xl">
          <InquiryForm />
        </Reveal>
      </Section>

      <ClosingCta />
    </>
  );
}
