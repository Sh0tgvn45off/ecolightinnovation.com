import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { footerColumns, site } from "@/lib/site";
import { Wordmark } from "./wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline bg-obsidian-900">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-platinum">
              Solar Energy-as-a-Service for rural Zambian homes and small businesses: reliable light and power by monthly
              subscription.
            </p>
            <p className="mt-2 text-sm font-medium text-white/90">{site.tagline}.</p>
            <div className="mt-6 flex gap-2">
              {[
                { href: site.socials.facebook, label: "EcoLight on Facebook", Icon: FacebookIcon },
                { href: site.socials.linkedin, label: "EcoLight on LinkedIn", Icon: LinkedInIcon },
                { href: site.phone.whatsapp, label: "Message EcoLight on WhatsApp", Icon: WhatsAppIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-hairline text-platinum transition-colors hover:border-hairline-strong hover:text-white"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_1fr_1fr_1.5fr] md:col-span-8 lg:col-span-9">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-platinum transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold text-white">Reach us</h3>
              <ul className="mt-4 space-y-3 text-sm text-platinum">
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white">
                    <Mail aria-hidden className="size-4 shrink-0" />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.phone.whatsapp} className="inline-flex items-center gap-2 hover:text-white">
                    <WhatsAppIcon className="size-4 shrink-0" />
                    {site.phone.display}
                  </a>
                </li>
                <li className="inline-flex items-start gap-2">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
                  <span>
                    Office: {site.office}
                    <br />
                    Field work: {site.firstCommunity}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hairline-x mt-14" />

        <div className="mt-8 space-y-4 text-xs leading-relaxed text-platinum-dim">
          <p>
            <span className="text-platinum">Impact figures.</span> Calculator results on this site are estimates based on the
            assumptions shown beside them (typical kerosene wick-lamp use and the IPCC emission factor for kerosene). Actual
            savings vary by household, lamp and local fuel price.
          </p>
          <p>
            <span className="text-platinum">Packages and pricing.</span> Subscription prices and system designs are for the
            Chilumba pilot and are preliminary. Final equipment specifications, prices and terms are confirmed in each
            customer&apos;s agreement before installation.
          </p>
          <p>
            <span className="text-platinum">Donations.</span> Every contribution goes towards solar lighting, education and
            capacity-building in rural Zambian communities. Financial statements are available on request at{" "}
            <a href={`mailto:${site.email}`} className="underline decoration-white/20 underline-offset-2 hover:text-white">
              {site.email}
            </a>
            .
          </p>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <p>Lusaka · Chilumba · Zambia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
