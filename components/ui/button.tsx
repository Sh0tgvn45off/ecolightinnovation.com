"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "photon" | "glass" | "text";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium transition-colors duration-200 ease-apple disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-white text-black hover:bg-white/90",
  photon: "bg-photon text-black shadow-photon hover:bg-photon-light",
  glass: "border border-hairline-strong bg-white/[0.06] text-white backdrop-blur-xl hover:bg-white/[0.1]",
  text: "rounded-md px-0 text-photon-light hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-7 text-base",
};

const press = { scale: 0.96 };
const spring = { type: "spring", stiffness: 500, damping: 30, mass: 0.6 } as const;

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string }) {
  return cn(base, variants[variant], variant === "text" ? "h-auto" : sizes[size], className);
}

const MotionLink = motion.create(Link);

type ButtonLinkProps = Omit<ComponentProps<typeof MotionLink>, "className" | "children"> & {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Adds an Apple-style trailing chevron. */
  chevron?: boolean;
};

export function ButtonLink({ variant = "primary", size = "md", className, chevron, children, ...props }: ButtonLinkProps) {
  return (
    <MotionLink
      whileTap={press}
      transition={spring}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
      {chevron && <ChevronRight aria-hidden className="size-4 -mr-1 opacity-80" strokeWidth={2.25} />}
    </MotionLink>
  );
}

type ButtonProps = Omit<HTMLMotionProps<"button">, "className" | "children"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, type = "button", children, ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileTap={props.disabled ? undefined : press}
      transition={spring}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
    </motion.button>
  );
});
