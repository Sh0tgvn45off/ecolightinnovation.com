"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { Sheet } from "@/components/ui/sheet";
import { programs } from "@/lib/content/programs";
import { cn } from "@/lib/utils";

export function Solutions() {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const detailsButton = useRef<HTMLButtonElement>(null);
  const program = programs[active];
  const closeDetails = useCallback(() => setDetailsOpen(false), []);

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    const last = programs.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <Section id="solutions" className="bg-gradient-to-b from-black via-obsidian-900 to-black">
      <SectionHeader
        eyebrow="Solutions"
        title="Built for life after sunset."
        lead="Three programs, one goal: close the energy gap for rural communities, starting in Chilumba."
      />

      <Reveal className="flex justify-center">
        <div
          role="tablist"
          aria-label="EcoLight programs"
          className="glass no-scrollbar relative flex max-w-full gap-1 overflow-x-auto rounded-full p-1"
        >
          {programs.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${baseId}-tab-${p.id}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "relative h-10 shrink-0 rounded-full px-5 text-sm font-medium transition-colors duration-300",
                i === active ? "text-black" : "text-platinum-soft hover:text-white",
              )}
            >
              {i === active && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{p.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${program.id}`}
        className="mt-12 md:mt-16"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass grid overflow-hidden rounded-[32px] md:grid-cols-2"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
              <Image
                src={program.image.src}
                alt={program.image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl text-balance">{program.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-platinum text-pretty">{program.summary}</p>

              <ul className="mt-8 space-y-3">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-platinum-soft">
                    <span className="grid size-6 place-items-center rounded-full bg-photon/15 text-photon-light">
                      <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button ref={detailsButton} variant="glass" onClick={() => setDetailsOpen(true)} aria-haspopup="dialog">
                  View details
                </Button>
                <Link
                  href={`/impact#${program.storySlug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-photon-light hover:text-white"
                >
                  See it in the field <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Sheet open={detailsOpen} onClose={closeDetails} title={program.title} returnFocusTo={detailsButton}>
        <p className="text-sm leading-relaxed text-platinum">{program.summary}</p>
        <dl className="mt-6 divide-y divide-white/[0.08] rounded-2xl border border-hairline">
          {program.details.map((row) => (
            <div key={row.label} className="grid grid-cols-[110px_1fr] gap-4 px-4 py-3.5 text-sm">
              <dt className="text-platinum-dim">{row.label}</dt>
              <dd className="text-white">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink href="/contact#inquire" variant="photon" onClick={closeDetails}>
            Ask about this program
          </ButtonLink>
          <ButtonLink href={`/impact#${program.storySlug}`} variant="glass" onClick={closeDetails}>
            Read the field story
          </ButtonLink>
        </div>
      </Sheet>
    </Section>
  );
}
