"use client";

import { useEffect, useState } from "react";
import { cn, formatDate } from "@/lib/utils";

type Item = { slug: string; date: string; title: string };

/** Sticky list of stories that highlights whichever one is currently being read. */
export function TimelineNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        // The story nearest the top of the list that is on screen wins.
        const current = items.find((item) => (visible.get(item.slug) ?? 0) > 0);
        if (current) setActive(current.slug);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] },
    );
    for (const item of items) {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Impact milestones" className="sticky top-28">
      <p className="mb-5 text-xs font-semibold text-white">Milestones</p>
      <ol className="relative space-y-1 border-l border-hairline">
        {items.map((item) => {
          const isActive = item.slug === active;
          return (
            <li key={item.slug} className="relative">
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[5px] top-3 size-[9px] rounded-full border transition-colors duration-300",
                  isActive ? "border-photon-light bg-photon-light shadow-[0_0_12px_rgba(52,211,153,0.8)]" : "border-white/25 bg-black",
                )}
              />
              <a
                href={`#${item.slug}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block rounded-lg py-2 pl-5 pr-2 transition-colors duration-300",
                  isActive ? "text-white" : "text-platinum-dim hover:text-platinum-soft",
                )}
              >
                <span className="block text-[11px] tabular">{formatDate(item.date)}</span>
                <span className="mt-0.5 block text-sm leading-snug">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
