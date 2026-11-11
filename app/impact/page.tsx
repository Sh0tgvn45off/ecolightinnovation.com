import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/closing-cta";
import { StoryArticle } from "@/components/impact/story-article";
import { TimelineNav } from "@/components/impact/timeline-nav";
import { PageHero } from "@/components/ui/section";
import { stories } from "@/lib/content/stories";

export const metadata: Metadata = {
  title: "Impact stories",
  description:
    "Follow EcoLight's work in rural Zambia: solar lighting for pupils and shops, local jobs, and climate change education.",
};

export default function ImpactPage() {
  const items = stories.map(({ slug, date, title }) => ({ slug, date, title }));

  return (
    <>
      <PageHero
        eyebrow="Impact stories"
        title="Community by community."
        lead="Follow our journey of transformation, lit by sustainable innovation. Newest first."
      />

      <div className="container pb-12">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden lg:block">
            <TimelineNav items={items} />
          </aside>
          <div className="mx-auto w-full max-w-[780px]">
            {/* Jump list for smaller screens */}
            <nav aria-label="Impact milestones" className="-mx-5 mb-10 lg:hidden">
              <ul className="no-scrollbar flex gap-2 overflow-x-auto px-5">
                {items.map((item) => (
                  <li key={item.slug} className="shrink-0">
                    <a
                      href={`#${item.slug}`}
                      className="glass block rounded-full px-4 py-2 text-sm text-platinum-soft transition-colors hover:text-white"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {stories.map((story, i) => (
              <StoryArticle key={story.slug} story={story} priority={i === 0} />
            ))}
          </div>
        </div>
      </div>

      <ClosingCta />
    </>
  );
}
