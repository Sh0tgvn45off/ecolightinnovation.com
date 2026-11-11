import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { Story, StoryBlock } from "@/lib/content/stories";
import { cn, formatDate } from "@/lib/utils";

function Block({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h":
      return <h3 className="pt-4 text-xl font-semibold tracking-tight text-white">{block.text}</h3>;
    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-photon-light" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="glass my-4 rounded-3xl p-6 md:p-8">
          <Quote aria-hidden className="mb-4 size-6 text-ember-light" />
          <blockquote className="text-lg leading-relaxed text-white md:text-xl">&ldquo;{block.text}&rdquo;</blockquote>
          {block.cite && <figcaption className="mt-4 text-sm text-platinum">{block.cite}</figcaption>}
        </figure>
      );
  }
}

export function StoryArticle({ story, priority = false }: { story: Story; priority?: boolean }) {
  const images = story.media.filter((m) => m.kind === "image");
  const video = story.media.find((m) => m.kind === "video");

  return (
    <article id={story.slug} className="scroll-mt-28 border-b border-hairline pb-20 pt-4 last:border-0 md:pb-28">
      <Reveal>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-platinum-dim">
          <time dateTime={story.date}>{formatDate(story.date)}</time>
          <span aria-hidden>·</span>
          <span className="rounded-full border border-photon/25 bg-photon/10 px-2.5 py-0.5 text-xs font-medium text-photon-light">
            {story.category}
          </span>
        </p>
        <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-tight tracking-tight text-gradient text-balance">
          {story.headline}
        </h2>
        <p className="mt-4 text-lg text-platinum text-pretty">{story.summary}</p>
      </Reveal>

      <Reveal className="mt-10">
        {video && (
          <video
            controls
            preload="metadata"
            playsInline
            aria-label={video.title}
            className={cn(
              "w-full rounded-[28px] border border-hairline bg-obsidian-800 object-contain",
              video.portrait ? "mx-auto aspect-[9/16] max-w-[380px]" : "aspect-video",
            )}
          >
            <source src={video.src} type="video/mp4" />
            Your browser doesn&apos;t support embedded video.{" "}
            <a href={video.src} className="underline">
              Download the video
            </a>
            .
          </video>
        )}
        {images.length > 0 && (
          <div className={cn("grid gap-4", images.length > 1 && "grid-cols-2")}>
            {images.map((image, i) =>
              image.kind === "image" ? (
                <div key={image.src} className="overflow-hidden rounded-[28px] border border-hairline bg-obsidian-800">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={images.length > 1 ? "(min-width: 1024px) 380px, 50vw" : "(min-width: 1024px) 780px, 100vw"}
                    className="h-auto w-full"
                    priority={priority && i === 0}
                  />
                </div>
              ) : null,
            )}
          </div>
        )}
      </Reveal>

      <Reveal className="mt-10 max-w-[68ch] space-y-5 text-[1.0625rem] leading-[1.75] text-platinum-soft/90">
        {story.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </Reveal>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tags">
        {story.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-hairline px-3 py-1 text-xs text-platinum-dim">
            #{tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
