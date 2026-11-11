import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="EcoLight Innovations, home"
      className={cn("group inline-flex items-center gap-2.5 rounded-full", className)}
    >
      <span className="relative grid size-8 place-items-center">
        {/* Soft photon glow behind the mark */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-ember/30 blur-md transition-opacity duration-500 group-hover:opacity-100 md:opacity-60"
        />
        <Image
          src="/images/brand/logo-mark-trim.png"
          alt=""
          width={227}
          height={204}
          className="relative h-7 w-auto"
          priority
        />
      </span>
      <span className="flex items-baseline gap-1.5 text-[15px] font-semibold tracking-tight text-white">
        EcoLight
        {!compact && <span className="hidden font-normal text-platinum sm:inline">Innovations</span>}
      </span>
    </Link>
  );
}
