import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { stories } from "@/lib/content/stories";
import { formatDate } from "@/lib/utils";

export function StoriesPreview() {
  // Latest three stories that have a photo to lead with.
  const featured = stories.filter((s) => s.media[0]?.kind === "image").slice(0, 3);
  const latestVideo = stories.find((s) => s.media[0]?.kind === "video");

  return (
    <Section id="stories">
      <SectionHeader
        eyebrow="Impact stories"
        title="Told from the field."
        lead="Real people and real places. Follow our work in Chilumba, one community at a time."
      />

      <RevealGroup className="grid gap-5 md:grid-cols-3">
        {featured.map((story) => {
          const image = story.media[0];
          if (image.kind !== "image") return null;
          return (
            <RevealItem key={story.slug}>
              <Link
                href={`/impact#${story.slug}`}
                className="glass group flex h-full flex-col overflow-hidden rounded-[28px] transition-colors duration-500 hover:border-hairline-strong"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-apple group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-platinum-dim">
                    <time dateTime={story.date}>{formatDate(story.date)}</time> · {story.category}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white text-balance">{story.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-platinum">{story.summary}</p>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <ButtonLink href="/impact" variant="glass" chevron>
          All impact stories
        </ButtonLink>
        {latestVideo && (
          <ButtonLink href={`/impact#${latestVideo.slug}`} variant="text" className="gap-2">
            <Play aria-hidden className="size-4" /> Watch: {latestVideo.title}
          </ButtonLink>
        )}
      </div>
    </Section>
  );
}
