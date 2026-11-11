import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-36", className)}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-14 max-w-3xl md:mb-20",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-display-md font-semibold text-gradient text-balance">{title}</h2>
      {lead && <p className="mt-6 text-lg leading-relaxed text-platinum md:text-xl text-pretty">{lead}</p>}
    </Reveal>
  );
}

/** Large hero used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-52">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 bg-photon-glow opacity-60 blur-3xl" />
        <div className="absolute right-[10%] top-24 h-[280px] w-[380px] bg-ember-glow opacity-40 blur-3xl" />
      </div>
      <div className="container relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="text-display-lg font-semibold text-gradient text-balance">{title}</h1>
          {lead && (
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-platinum md:text-xl text-pretty">{lead}</p>
          )}
          {children && <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{children}</div>}
        </Reveal>
      </div>
    </header>
  );
}
