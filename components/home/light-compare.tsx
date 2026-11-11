"use client";

import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Flame, Sun } from "lucide-react";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Before/after: the same page of homework under a kerosene wick lamp (left) and solar LED light (right).
 * Drag the handle, use the arrow keys, or pick a preset.
 */
export function LightCompare({ className }: { className?: string }) {
  const id = useId();
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pos = useMotionValue(50);
  const [value, setValue] = useState(50);

  useMotionValueEvent(pos, "change", (v) => setValue(Math.round(v)));

  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(pos, (v) => `${v}%`);

  const setFromPointer = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    pos.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const glide = (to: number) => animate(pos, to, { type: "spring", stiffness: 160, damping: 26 });

  const presets = [
    { label: "Kerosene", to: 100, icon: Flame },
    { label: "Compare", to: 50, icon: null },
    { label: "Solar", to: 0, icon: Sun },
  ] as const;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={frame}
        className="relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] border border-hairline bg-obsidian-800 shadow-glass sm:aspect-[16/10] md:rounded-[36px]"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* Solar (full frame, underneath) */}
        <Scene variant="solar" />

        {/* Kerosene (clipped to the left of the handle) */}
        <motion.div className="absolute inset-0" style={{ clipPath: clip }} aria-hidden>
          <Scene variant="kerosene" />
        </motion.div>

        {/* Labels */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-4 md:p-6">
          <Chip tone="ember" icon={<Flame className="size-3.5" />} visible={value > 8}>
            Kerosene wick lamp
          </Chip>
          <Chip tone="photon" icon={<Sun className="size-3.5" />} visible={value < 92}>
            Solar LED light
          </Chip>
        </div>

        {/* Handle */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-white/80 shadow-[0_0_24px_rgba(255,255,255,0.6)]"
          style={{ left: handleLeft }}
        >
          <div className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/50 backdrop-blur-xl">
            <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>

        {/* Keyboard and screen-reader control */}
        <label htmlFor={id} className="sr-only">
          Compare kerosene and solar light. Higher values show more of the kerosene-lit page.
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => pos.set(Number(e.target.value))}
          aria-valuetext={`${value}% kerosene, ${100 - value}% solar`}
          className="peer absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          style={{ pointerEvents: "none" }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-2 ring-photon-light/0 transition peer-focus-visible:ring-photon-light/70 md:rounded-[36px]" />
      </div>

      <div className="mt-5 flex justify-center">
        <div role="group" aria-label="Lighting presets" className="glass inline-flex gap-1 rounded-full p-1">
          {presets.map(({ label, to, icon: Icon }) => {
            const active = Math.abs(value - to) < 2;
            return (
              <button
                key={label}
                type="button"
                onClick={() => glide(to)}
                aria-pressed={active}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm transition-colors duration-300",
                  active ? "bg-white text-black" : "text-platinum-soft hover:text-white",
                )}
              >
                {Icon && <Icon aria-hidden className="size-3.5" />}
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Chip({
  children,
  icon,
  tone,
  visible,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  tone: "ember" | "photon";
  visible: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl transition-opacity duration-300",
        tone === "ember" ? "border-ember/30 bg-black/50 text-ember-light" : "border-photon/30 bg-black/40 text-photon-light",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** One page of homework, lit two different ways. */
function Scene({ variant }: { variant: "solar" | "kerosene" }) {
  const solar = variant === "solar";
  return (
    <div className="absolute inset-0">
      {/* Room */}
      <div className={cn("absolute inset-0", solar ? "bg-[#0d0f12]" : "bg-[#040302]")} />

      {/* Light source */}
      {solar ? (
        <div className="absolute left-1/2 top-[-30%] h-[120%] w-[140%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,252,240,0.55),rgba(255,248,230,0.18)_45%,transparent_75%)]" />
      ) : (
        <div className="absolute bottom-[-25%] left-[-20%] h-[90%] w-[80%] animate-flicker bg-[radial-gradient(closest-side,rgba(255,150,40,0.55),rgba(200,90,20,0.18)_50%,transparent_78%)]" />
      )}

      {/* Paper */}
      <div
        className="absolute left-1/2 top-1/2 w-[82%] max-w-[620px] -translate-x-1/2 -translate-y-[46%] rotate-[-1.5deg] rounded-md bg-[#f6f3ea] px-[6%] py-[5%] shadow-2xl"
        style={
          solar
            ? undefined
            : { filter: "brightness(0.22) sepia(0.9) saturate(1.7) blur(1.1px) contrast(0.75)" }
        }
      >
        <div className="mb-[4%] flex items-baseline justify-between border-b border-[#c9c3b2] pb-[2.5%]">
          <p className="text-[clamp(11px,1.6vw,17px)] font-semibold text-[#1f2a37]">Grade 7 · Mathematics</p>
          <p className="text-[clamp(9px,1.2vw,13px)] text-[#6b6455]">Homework</p>
        </div>
        <ol className="space-y-[3.5%] text-[clamp(10px,1.45vw,15.5px)] leading-snug text-[#1f2a37]">
          <li>
            <span className="font-semibold">1.</span> A shop used to close at 17:30. With solar light it closes at 21:00. How
            many extra hours does it open in a week?
            <span className="mt-1 block font-mono text-[#1d4ed8]">3.5 × 7 = 24.5 hours</span>
          </li>
          <li>
            <span className="font-semibold">2.</span> A kerosene lamp burns 0.03 litres an hour. How much does it burn in 4
            hours?
            <span className="mt-1 block font-mono text-[#1d4ed8]">0.03 × 4 = 0.12 litres</span>
          </li>
          <li className="hidden sm:block">
            <span className="font-semibold">3.</span> Write one sentence about why good light helps you learn.
          </li>
        </ol>
        {/* Ruled lines */}
        <div aria-hidden className="mt-[4%] space-y-[2.2%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-px bg-[#b9c7dc]" />
          ))}
        </div>
      </div>

      {/* Smoke and soot for the kerosene side */}
      {!solar && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_100%,transparent_20%,rgba(0,0,0,0.55)_75%)]" />
          <div className="absolute bottom-0 left-[8%] h-full w-[40%] animate-flicker bg-[radial-gradient(ellipse_at_bottom,rgba(120,100,80,0.18),transparent_65%)] blur-2xl" />
        </>
      )}
      {solar && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_45%,rgba(0,0,0,0.35)_100%)]" />}
    </div>
  );
}
