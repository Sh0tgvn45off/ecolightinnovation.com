import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Banknote, GraduationCap, Users, Wind } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { EveningDial } from "./evening-dial";

function Tile({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <RevealItem
      className={cn(
        "glass group relative overflow-hidden rounded-[28px] p-7 transition-colors duration-500 hover:border-hairline-strong md:p-8",
        className,
      )}
    >
      {children}
    </RevealItem>
  );
}

function TileIcon({ children, tone = "photon" }: { children: React.ReactNode; tone?: "photon" | "ember" }) {
  return (
    <span
      className={cn(
        "mb-6 grid size-11 place-items-center rounded-2xl border",
        tone === "photon" ? "border-photon/25 bg-photon/10 text-photon-light" : "border-ember/25 bg-ember/10 text-ember-light",
      )}
    >
      {children}
    </span>
  );
}

export function Bento() {
  return (
    <Section id="possible">
      <SectionHeader
        eyebrow="What light makes possible"
        title="Small light. Big difference."
        lead="Reliable light after sunset changes how a family studies, earns and breathes. Here's what it has already done in Chilumba."
      />

      <RevealGroup className="grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-6 md:gap-5">
        {/* Education: large photo tile */}
        <Tile className="min-h-[440px] p-0 md:col-span-4 md:row-span-2 md:min-h-[560px] md:p-0">
          <Image
            src="/images/photos/children-studying-solar.jpg"
            alt="Two pupils reading a textbook by the light of a small solar lamp."
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="object-cover transition-transform duration-[1.6s] ease-apple group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
            <p className="eyebrow mb-3">Education</p>
            <h3 className="max-w-md text-3xl font-semibold tracking-tight text-white md:text-4xl text-balance">
              Study hours that start at sunset.
            </h3>
            <p className="mt-3 max-w-md text-platinum-soft/90">
              The challenge for rural pupils isn&apos;t ability. It&apos;s light. Solar lets them use the quiet hours of the
              night to learn.
            </p>
            <Link
              href="/impact#rural-education"
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-photon-light hover:text-white"
            >
              Read the story <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Tile>

        {/* Livelihoods: evening dial */}
        <Tile className="flex flex-col md:col-span-2">
          <p className="eyebrow mb-2">Livelihoods</p>
          <h3 className="text-xl font-semibold tracking-tight text-white">Open until 9 pm.</h3>
          <div className="my-6 flex-1">
            <EveningDial />
          </div>
          <p className="text-sm leading-relaxed text-platinum">
            Moses&apos;s grocery in Chilumba used to close at{" "}
            <span className="font-medium text-ember-light">17:30</span>. With solar light it stays open until{" "}
            <span className="font-medium text-white">21:00</span>.
          </p>
        </Tile>

        {/* Jobs */}
        <Tile className="md:col-span-2">
          <TileIcon>
            <Users aria-hidden className="size-5" />
          </TileIcon>
          <p className="text-6xl font-semibold tracking-tight text-gradient tabular">3</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Local Sales Agents</h3>
          <p className="mt-2 text-sm leading-relaxed text-platinum">
            Trained in customer care and mini-grid solar installation, earning commission on every sale.
          </p>
        </Tile>

        {/* Clean air */}
        <Tile className="md:col-span-2">
          <TileIcon tone="ember">
            <Wind aria-hidden className="size-5" />
          </TileIcon>
          <h3 className="text-2xl font-semibold tracking-tight text-white">No smoke indoors.</h3>
          <p className="mt-3 text-sm leading-relaxed text-platinum">
            Solar light replaces kerosene lamps, which fill homes with fumes and put families at risk of fire.
          </p>
        </Tile>

        {/* Affordability */}
        <Tile className="md:col-span-2">
          <TileIcon>
            <Banknote aria-hidden className="size-5" />
          </TileIcon>
          <h3 className="text-2xl font-semibold tracking-tight text-white">Pay monthly.</h3>
          <p className="mt-3 text-sm leading-relaxed text-platinum">
            A subscription instead of a big upfront cost. EcoLight owns, maintains and supports the system.
          </p>
        </Tile>

        {/* Climate education */}
        <Tile className="md:col-span-2">
          <TileIcon>
            <GraduationCap aria-hidden className="size-5" />
          </TileIcon>
          <h3 className="text-2xl font-semibold tracking-tight text-white">Climate lessons.</h3>
          <p className="mt-3 text-sm leading-relaxed text-platinum">
            Outreach in schools like Tubalange Primary, so the next generation understands the energy transition.
          </p>
        </Tile>
      </RevealGroup>
    </Section>
  );
}
