import { Bento } from "@/components/home/bento";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { ImpactCalculator } from "@/components/home/impact-calculator";
import { Solutions } from "@/components/home/solutions";
import { StoriesPreview } from "@/components/home/stories-preview";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Bento />
      <Solutions />
      <ImpactCalculator />
      <StoriesPreview />

      <Section id="inquire" className="bg-gradient-to-b from-black via-obsidian-900 to-black">
        <SectionHeader
          eyebrow="Work with us"
          title="Let's light the next community."
          lead="Partners, donors, schools and families: tell us what you have in mind and we'll get back to you within 24–48 hours."
        />
        <Reveal className="mx-auto max-w-3xl">
          <InquiryForm />
        </Reveal>
      </Section>

      <ClosingCta />
    </>
  );
}
