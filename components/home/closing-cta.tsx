import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-glow opacity-70 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[260px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-photon-glow opacity-60 blur-2xl" />
      </div>
      <div className="container relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-lg font-semibold text-gradient text-balance">Every light starts with someone.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-platinum text-pretty">
            A subscription, a partnership or funding for our Chilumba pilot can bring clean light to a family that still
            studies by kerosene.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/#packages" variant="photon" size="lg">
              See packages
            </ButtonLink>
            <ButtonLink href="/contact#inquire" variant="glass" size="lg">
              Partner with us
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
