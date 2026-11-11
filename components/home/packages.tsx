"use client";

import { Check } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { included, kwacha, packages, pilot, type EnergyPackage } from "@/lib/content/eaas";
import { cn } from "@/lib/utils";

const pilotTones = ["bg-photon-light", "bg-ember-light", "bg-platinum-soft"];

export function Packages() {
  // Keep the last-opened package so the drawer keeps its content while it animates closed.
  const [selected, setSelected] = useState<EnergyPackage | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const returnFocus = useRef<HTMLElement | null>(null);
  const close = useCallback(() => setIsOpen(false), []);

  const open = (pkg: EnergyPackage) => {
    returnFocus.current = triggers.current[pkg.id];
    setSelected(pkg);
    setIsOpen(true);
  };

  return (
    <Section id="packages">
      <SectionHeader
        eyebrow="Packages"
        title="Pick the power you need."
        lead="Three subscriptions, from clean light for a single home to a system that runs a business. Prices are for our Chilumba pilot."
      />

      <RevealGroup className="grid gap-5 lg:grid-cols-3">
        {packages.map((pkg) => (
          <RevealItem key={pkg.id} className="glass flex flex-col rounded-[32px] p-7 md:p-9">
            {/* Fixed header height on wide screens keeps prices aligned when a name wraps. */}
            <div className="lg:min-h-[8rem]">
              <h3 className="text-2xl font-semibold tracking-tight text-white">{pkg.name}</h3>
              <p className="mt-2 leading-relaxed text-platinum">{pkg.tagline}</p>
            </div>

            <div className="mt-8">
              <p className="flex items-baseline gap-1.5">
                <span className="text-5xl font-semibold tracking-tight text-white tabular">{kwacha(pkg.monthly)}</span>
                <span className="text-platinum">/ month</span>
              </p>
              <p className="mt-2 text-sm text-platinum-dim">or {kwacha(pkg.monthly / 2)} every two weeks</p>
              <p className="mt-4 inline-flex rounded-full border border-photon/25 bg-photon/10 px-3 py-1 text-xs font-medium text-photon-light">
                {kwacha(pkg.afterTwoYears)} / month after 24 months
              </p>
            </div>

            <dl className="mt-8 flex-1 divide-y divide-white/[0.08] border-y border-hairline">
              {pkg.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-platinum-dim">{spec.label}</dt>
                  <dd className="text-right text-white">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={`/contact?package=${pkg.id}#inquire`} variant="primary">
                Get this package
              </ButtonLink>
              <Button
                ref={(el) => {
                  triggers.current[pkg.id] = el;
                }}
                variant="glass"
                aria-haspopup="dialog"
                onClick={() => open(pkg)}
              >
                Details
              </Button>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Pilot breakdown: one whole split into three labelled parts */}
      <Reveal className="glass mt-5 rounded-[28px] p-7 md:p-9">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
          <h3 className="text-lg font-semibold text-white">
            Launching with {pilot.systems} systems in {pilot.location}
          </h3>
          <p className="text-sm text-platinum-dim">Pilot plan by package</p>
        </div>
        <div
          className="mt-6 flex h-3 gap-[2px] overflow-hidden rounded-full"
          role="img"
          aria-label={packages.map((p) => `${p.pilotUnits} ${p.name}`).join(", ")}
        >
          {packages.map((p, i) => (
            <div
              key={p.id}
              className={cn("h-full first:rounded-l-full last:rounded-r-full", pilotTones[i])}
              style={{ width: `${(p.pilotUnits / pilot.systems) * 100}%` }}
            />
          ))}
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {packages.map((p, i) => (
            <li key={p.id} className="flex items-center gap-2.5 text-sm">
              <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", pilotTones[i])} />
              <span className="font-semibold text-white tabular">{p.pilotUnits}</span>
              <span className="text-platinum">{p.name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-platinum-dim">
          System designs are preliminary. Final equipment specifications are confirmed through technical validation before
          installation, and prices may change once supplier quotes are final.
        </p>
      </Reveal>

      <Sheet open={isOpen} onClose={close} title={selected?.name ?? ""} returnFocusTo={returnFocus}>
        {selected && (
          <>
            <p className="text-sm leading-relaxed text-platinum">{selected.tagline}</p>

            <h3 className="mt-7 text-xs font-semibold text-white">Pricing</h3>
            <dl className="mt-3 divide-y divide-white/[0.08] rounded-2xl border border-hairline text-sm">
              {[
                { label: "First 24 months", value: `${kwacha(selected.monthly)} / month` },
                { label: "Or every two weeks", value: kwacha(selected.monthly / 2) },
                { label: "After 24 months", value: `${kwacha(selected.afterTwoYears)} / month` },
                { label: "Installation", value: "You pay 50%, EcoLight pays 50%" },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[140px_1fr] gap-4 px-4 py-3">
                  <dt className="text-platinum-dim">{row.label}</dt>
                  <dd className="text-white">{row.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-7 text-xs font-semibold text-white">System (preliminary)</h3>
            <dl className="mt-3 divide-y divide-white/[0.08] rounded-2xl border border-hairline text-sm">
              {selected.specs.map((row) => (
                <div key={row.label} className="grid grid-cols-[140px_1fr] gap-4 px-4 py-3">
                  <dt className="text-platinum-dim">{row.label}</dt>
                  <dd className="text-white">{row.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-7 text-xs font-semibold text-white">Included</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-platinum-soft">
              {included.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-photon-light" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={`/contact?package=${selected.id}#inquire`} variant="photon" onClick={close}>
                Get this package
              </ButtonLink>
            </div>
          </>
        )}
      </Sheet>
    </Section>
  );
}
