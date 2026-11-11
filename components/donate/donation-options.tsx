"use client";

import { ArrowUpRight, Handshake, Landmark, Repeat, Smartphone } from "lucide-react";
import { useId, useState } from "react";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { donation } from "@/lib/content/donate";
import { pilot } from "@/lib/content/eaas";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function AmountPicker({
  amounts,
  value,
  onChange,
  suffix = "",
  label,
}: {
  amounts: readonly number[];
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  label: string;
}) {
  const customId = useId();
  const isPreset = amounts.includes(value);
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {amounts.map((amount) => (
          <button
            key={amount}
            type="button"
            aria-pressed={value === amount}
            onClick={() => onChange(amount)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-200 tabular",
              value === amount
                ? "border-white bg-white text-black"
                : "border-hairline-strong text-platinum-soft hover:border-white/30 hover:text-white",
            )}
          >
            ${amount}
            {suffix}
          </button>
        ))}
        <div className="relative">
          <label htmlFor={customId} className="sr-only">
            Other amount in US dollars
          </label>
          <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-platinum">
            $
          </span>
          <input
            id={customId}
            type="number"
            inputMode="numeric"
            min={1}
            max={100000}
            placeholder="Other"
            value={isPreset || value === 0 ? "" : value}
            onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
            className={cn(
              "h-10 w-28 rounded-full border bg-transparent pl-7 pr-3 text-sm text-white outline-none transition-colors tabular placeholder:text-platinum-dim focus:border-photon-light/70 focus:ring-4 focus:ring-photon/20",
              !isPreset && value > 0 ? "border-white" : "border-hairline-strong",
            )}
          />
        </div>
      </div>
    </fieldset>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <RevealItem className={cn("glass flex flex-col rounded-[28px] p-7 md:p-9", className)}>{children}</RevealItem>;
}

function CardHeader({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <>
      <span className="mb-6 grid size-11 place-items-center rounded-2xl border border-photon/25 bg-photon/10 text-photon-light">
        {icon}
      </span>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 leading-relaxed text-platinum">{body}</p>
    </>
  );
}

export function DonationOptions() {
  const [oneTime, setOneTime] = useState<number>(25);
  const [monthly, setMonthly] = useState<number>(10);

  const monthlyMail = `mailto:${site.email}?subject=${encodeURIComponent(
    "Monthly donor enrolment - EcoLight Innovations",
  )}&body=${encodeURIComponent(
    [
      "Dear EcoLight Innovations team,",
      "",
      "I would like to become a monthly donor to support your work bringing sustainable energy to rural communities in Zambia.",
      "",
      "Full name: ",
      "Phone number: ",
      `Monthly contribution: $${monthly || "__"} USD`,
      "Preferred payment method (Mobile Money / PayPal / Bank transfer): ",
      "Start date: ",
      "Comments (optional): ",
      "",
      "Best regards,",
    ].join("\n"),
  )}`;

  return (
    <RevealGroup className="grid gap-5 lg:grid-cols-2">
      {/* One-time */}
      <Card className="lg:row-span-2">
        <CardHeader
          icon={<ArrowUpRight aria-hidden className="size-5" />}
          title="One-time gift"
          body="Make a single contribution to fund projects happening right now."
        />
        <div className="mt-7">
          <AmountPicker label="One-time amount" amounts={donation.oneTimeAmounts} value={oneTime} onChange={setOneTime} />
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl border border-hairline bg-white/[0.02] p-5">
            <p className="text-sm font-medium text-white">International: PayPal or card</p>
            <p className="mt-1 text-sm text-platinum">
              Sent securely through PayPal to <span className="text-platinum-soft">{donation.paypal.email}</span>.
            </p>
            <a
              href={donation.paypal.link(oneTime)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: "primary", className: "mt-4 w-full sm:w-auto" })}
            >
              {oneTime > 0 ? `Give $${oneTime} with PayPal` : "Give with PayPal"}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>

          <div className="rounded-3xl border border-hairline bg-white/[0.02] p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Smartphone aria-hidden className="size-4 text-photon-light" /> Within Africa: mobile money
            </div>
            <p className="mt-1 text-sm text-platinum">
              Send your gift with {donation.mobileMoney.providers.join(", ")} to:
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-black/40 px-4 py-3">
              <span className="text-xl font-semibold tracking-tight text-white tabular">{donation.mobileMoney.number}</span>
              <CopyButton value={donation.mobileMoney.number.replace(/\s/g, "")} label="mobile money number" />
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly */}
      <Card>
        <CardHeader
          icon={<Repeat aria-hidden className="size-5" />}
          title="Monthly giving"
          body="Become a recurring donor and sustain our long-term work."
        />
        <div className="mt-7">
          <AmountPicker
            label="Monthly amount"
            amounts={donation.monthlyAmounts}
            value={monthly}
            onChange={setMonthly}
            suffix="/mo"
          />
        </div>
        <a href={monthlyMail} className={buttonClasses({ variant: "glass", className: "mt-7 self-start" })}>
          Become a monthly donor
        </a>
        <p className="mt-3 text-xs text-platinum-dim">Opens a pre-filled email to our team to set it up.</p>
      </Card>

      {/* Bank */}
      <Card>
        <CardHeader
          icon={<Landmark aria-hidden className="size-5" />}
          title="Bank transfer"
          body="For larger gifts or direct transfers."
        />
        <dl className="mt-6 divide-y divide-white/[0.08] rounded-2xl border border-hairline">
          {donation.bank.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-2.5 pl-4 pr-2 text-sm">
              <dt className="text-platinum-dim">{row.label}</dt>
              <dd className="flex items-center gap-1 text-right text-white tabular">
                {row.value}
                <CopyButton value={row.value} label={row.label.toLowerCase()} className="size-7" />
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      {/* Partnerships */}
      <Card className="lg:col-span-2 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div>
          <CardHeader
            icon={<Handshake aria-hidden className="size-5" />}
            title="Partnerships, grants & seed funding"
            body={`Grants, seed funding, CSR or strategic partnerships: help us launch our ${pilot.systems}-system solar pilot in ${pilot.location} and grow from there.`}
          />
        </div>
        <ButtonLink href="/contact#inquire" variant="photon" chevron className="mt-7 self-start lg:mt-0 lg:self-center">
          Partner with us
        </ButtonLink>
      </Card>
    </RevealGroup>
  );
}
