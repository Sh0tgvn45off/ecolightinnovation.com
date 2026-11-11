"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { LightCompare } from "./light-compare";

const ease = [0.25, 0.1, 0.25, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, ease, delay },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pb-36 md:pt-48">
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12%] h-[640px] w-[1100px] -translate-x-1/2 bg-photon-glow opacity-50 blur-3xl" />
        <div className="absolute left-[8%] top-[38%] h-[360px] w-[460px] bg-ember-glow opacity-50 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p {...rise(0.05)} className="eyebrow mb-5">
            Solar Energy-as-a-Service · Zambia
          </motion.p>
          <motion.h1 {...rise(0.15)} className="text-display-xl font-semibold text-balance">
            <span className="text-gradient">Light, beyond</span>{" "}
            <span className="text-gradient-photon">the grid.</span>
          </motion.h1>
          <motion.p
            {...rise(0.3)}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-platinum md:text-[1.375rem] md:leading-relaxed text-pretty"
          >
            Reliable solar power by monthly subscription, for rural homes and small businesses. We install it, own it and
            keep it running. Starting in {site.firstCommunity}.
          </motion.p>
          <motion.div {...rise(0.45)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/#packages" size="lg">
              See packages
            </ButtonLink>
            <ButtonLink href="/#how-it-works" variant="glass" size="lg">
              How it works
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.55 }}
          className="mx-auto mt-16 max-w-5xl md:mt-24"
        >
          <LightCompare />
          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-platinum-dim">
            Drag across the page. On one side, the kerosene lamp many rural homes still rely on; on the other, clean solar
            light.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
