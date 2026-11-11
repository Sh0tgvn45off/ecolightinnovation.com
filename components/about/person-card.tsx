import Image from "next/image";
import { RevealItem } from "@/components/ui/reveal";
import type { Person } from "@/lib/content/team";

export function PersonCard({ person }: { person: Person }) {
  return (
    <RevealItem className="glass group overflow-hidden rounded-[28px]">
      <div className="relative aspect-[4/5] overflow-hidden bg-obsidian-700">
        <Image
          src={person.photo}
          alt={`Portrait of ${person.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top grayscale-[20%] transition-all duration-700 ease-apple group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold tracking-tight text-white">{person.name}</h3>
        <p className="mt-1 text-sm font-medium text-photon-light">{person.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-platinum">{person.bio}</p>
      </div>
    </RevealItem>
  );
}
