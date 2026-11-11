import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5 pt-24 text-center">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 bg-ember-glow opacity-50 blur-3xl" />
      <div className="relative">
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-display-md font-semibold text-gradient">This page is off the grid.</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-platinum">
          We couldn&apos;t find what you were looking for. Let&apos;s get you back to the light.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/impact" variant="glass">
            Read impact stories
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
