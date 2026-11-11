"use client";

import { Clock, Cloud, Droplet, Info, Wallet } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { estimateImpact, IMPACT_ASSUMPTIONS, IMPACT_RANGES, type ImpactInputs } from "@/lib/impact";

const int = (n: number) => Math.round(n).toLocaleString("en-US");
const oneDecimal = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  valueText: string;
  onChange: (v: number) => void;
};

function Slider({ label, value, min, max, step, display, valueText, onChange }: SliderProps) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-platinum-soft">
          {label}
        </label>
        <span className="text-lg font-semibold tracking-tight text-white tabular">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
      <div className="mt-1.5 flex justify-between text-[11px] text-platinum-dim tabular">
        <span>{min.toLocaleString("en-US")}</span>
        <span>{max.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  format,
  unit,
  tone = "photon",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  format: (n: number) => string;
  unit: string;
  tone?: "photon" | "ember";
}) {
  return (
    <div className="glass flex flex-col justify-between rounded-3xl p-6">
      <div className="flex items-center gap-2 text-sm text-platinum">
        <span className={tone === "photon" ? "text-photon-light" : "text-ember-light"}>{icon}</span>
        {label}
      </div>
      <p className="mt-6 text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-none tracking-tight text-white tabular">
        <AnimatedNumber value={value} format={format} />
      </p>
      <p className="mt-2 text-sm text-platinum-dim">{unit}</p>
    </div>
  );
}

export function ImpactCalculator() {
  const [inputs, setInputs] = useState<ImpactInputs>({
    households: IMPACT_RANGES.households.initial,
    hoursPerNight: IMPACT_RANGES.hoursPerNight.initial,
    kerosenePrice: IMPACT_RANGES.kerosenePrice.initial,
  });
  const result = useMemo(() => estimateImpact(inputs), [inputs]);
  const set = (key: keyof ImpactInputs) => (v: number) => setInputs((prev) => ({ ...prev, [key]: v }));

  const { households, hoursPerNight, kerosenePrice } = inputs;

  return (
    <Section id="calculator" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-1/3 h-[520px] w-[620px] bg-photon-glow opacity-40 blur-3xl" />
      </div>

      <SectionHeader
        eyebrow="Impact calculator"
        title="See what switching to solar saves."
        lead="Every home that swaps a kerosene lamp for solar light stops buying fuel and stops breathing smoke. Move the sliders to estimate the change."
      />

      <Reveal className="relative grid gap-5 lg:grid-cols-12">
        <div className="glass rounded-[28px] p-7 md:p-9 lg:col-span-5">
          <h3 className="text-lg font-semibold text-white">Your scenario</h3>
          <p className="mt-1 text-sm text-platinum">One kerosene lamp replaced per home.</p>
          <div className="mt-8 space-y-9">
            <Slider
              label="Homes switched to solar"
              {...IMPACT_RANGES.households}
              value={households}
              display={int(households)}
              valueText={`${households} homes`}
              onChange={set("households")}
            />
            <Slider
              label="Hours of light each evening"
              {...IMPACT_RANGES.hoursPerNight}
              value={hoursPerNight}
              display={`${hoursPerNight} h`}
              valueText={`${hoursPerNight} hours`}
              onChange={set("hoursPerNight")}
            />
            <Slider
              label="Kerosene price (kwacha per litre)"
              {...IMPACT_RANGES.kerosenePrice}
              value={kerosenePrice}
              display={`K${kerosenePrice}`}
              valueText={`${kerosenePrice} kwacha per litre`}
              onChange={set("kerosenePrice")}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <Stat
            icon={<Wallet aria-hidden className="size-4" />}
            label="Saved on fuel"
            value={result.savingsZmw}
            format={(n) => `K${int(n)}`}
            unit="kwacha a year, kept by families"
            tone="ember"
          />
          <Stat
            icon={<Droplet aria-hidden className="size-4" />}
            label="Kerosene not burned"
            value={result.litres}
            format={int}
            unit="litres a year"
            tone="ember"
          />
          <Stat
            icon={<Cloud aria-hidden className="size-4" />}
            label="CO₂ avoided"
            value={result.co2Tonnes}
            format={oneDecimal}
            unit="tonnes a year"
          />
          <Stat
            icon={<Clock aria-hidden className="size-4" />}
            label="Clean light delivered"
            value={result.lightHours}
            format={int}
            unit="hours of light a year"
          />
        </div>
      </Reveal>

      <Reveal className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <p className="flex max-w-2xl gap-2 text-xs leading-relaxed text-platinum-dim">
          <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Estimates. Assumes one wick lamp per home burning {IMPACT_ASSUMPTIONS.keroseneLitresPerLampHour} L of kerosene an
            hour (typical range 0.02–0.04 L), {IMPACT_ASSUMPTIONS.co2KgPerLitre} kg of CO₂ per litre burned (IPCC default
            factor), every night of the year. Adjust the kerosene price to match your area.
          </span>
        </p>
        <ButtonLink href="/#packages" variant="photon" chevron className="shrink-0">
          Find your package
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
