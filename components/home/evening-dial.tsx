"use client";

import { motion } from "framer-motion";

const SIZE = 200;
const C = SIZE / 2;
const R = 78;

/** Clock angle (degrees, 0 = 3 o'clock, clockwise) for a time in hours on a 12-hour face. */
const angleFor = (hours: number) => ((hours % 12) / 12) * 360 - 90;

const point = (deg: number, r = R) => {
  const rad = (deg * Math.PI) / 180;
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)] as const;
};

function arc(fromHours: number, toHours: number) {
  const a1 = angleFor(fromHours);
  const a2 = angleFor(toHours);
  const [x1, y1] = point(a1);
  const [x2, y2] = point(a2);
  const sweep = (a2 - a1 + 360) % 360;
  return `M ${x1} ${y1} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

/**
 * A 12-hour clock face showing the extra evening trading time solar light gave one shop:
 * closing moved from 17:30 to 21:00.
 */
export function EveningDial({ from = 17.5, to = 21 }: { from?: number; to?: number }) {
  const extra = to - from;
  const [sx, sy] = point(angleFor(from));
  const [ex, ey] = point(angleFor(to));

  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[220px]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="size-full"
        role="img"
        aria-label={`Clock showing the shop now closing at 21:00 instead of 17:30: ${extra} extra hours each evening.`}
      >
        <defs>
          <linearGradient id="dial-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={14} />

        {/* Hour ticks */}
        {Array.from({ length: 12 }, (_, i) => {
          const deg = i * 30 - 90;
          const [x1, y1] = point(deg, R - 18);
          const [x2, y2] = point(deg, R - (i % 3 === 0 ? 26 : 22));
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth={i % 3 === 0 ? 2 : 1.25}
              strokeLinecap="round"
            />
          );
        })}

        {/* Extra hours */}
        <motion.path
          d={arc(from, to)}
          fill="none"
          stroke="url(#dial-arc)"
          strokeWidth={14}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          style={{ filter: "drop-shadow(0 0 8px rgba(16,185,129,0.55))" }}
        />

        {/* Old closing time */}
        <circle cx={sx} cy={sy} r={5} fill="#000" stroke="#FBBF24" strokeWidth={2.5} />
        {/* New closing time */}
        <circle cx={ex} cy={ey} r={5} fill="#fff" />
      </svg>

      <figcaption className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-4xl font-semibold tracking-tight text-white tabular">+{extra}</p>
          <p className="text-xs text-platinum">hours a night</p>
        </div>
      </figcaption>
    </figure>
  );
}
