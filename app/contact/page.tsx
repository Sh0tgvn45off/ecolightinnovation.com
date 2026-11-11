import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PageHero, Section, SectionHeader } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, partnerships or press: get in touch with EcoLight Innovations in Lusaka, Zambia.",
};

const channels = [
  {
    icon: Mail,
    title: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "We typically reply within 24–48 hours.",
  },
  {
    icon: WhatsAppIcon,
    title: "Call or WhatsApp",
    value: site.phone.display,
    href: site.phone.whatsapp,
    note: `Office hours: ${site.hours}.`,
  },
  {
    icon: MapPin,
    title: "Visit our office",
    value: site.office,
    href: undefined,
    note: "Please book an appointment before visiting.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's light up the future together."
        lead="Have a question or want to partner with us? Reach out. We'd love to hear from you."
      />

      <Section className="pt-0 md:pt-0">
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {channels.map(({ icon: Icon, title, value, href, note }) => (
            <RevealItem key={title} className="glass rounded-[28px] p-7 md:p-8">
              <span className="mb-6 grid size-11 place-items-center rounded-2xl border border-photon/25 bg-photon/10 text-photon-light">
                <Icon aria-hidden className="size-5" />
              </span>
              <h2 className="text-sm text-platinum">{title}</h2>
              {href ? (
                <a
                  href={href}
                  className="mt-1 block break-words text-xl font-semibold tracking-tight text-white transition-colors hover:text-photon-light"
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {value}
                </a>
              ) : (
                <p className="mt-1 text-xl font-semibold tracking-tight text-white">{value}</p>
              )}
              <p className="mt-3 text-sm text-platinum-dim">{note}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="inquire" className="bg-gradient-to-b from-black via-obsidian-900 to-black">
        <SectionHeader
          eyebrow="Send a message"
          title="Tell us what you have in mind."
          lead="Partnerships, donations, solar for your home or shop, volunteering or media. It takes about a minute."
        />
        <Reveal className="mx-auto max-w-3xl">
          <InquiryForm />
        </Reveal>
      </Section>
    </>
  );
}
