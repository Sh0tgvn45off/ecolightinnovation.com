import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/mission", "/impact", "/about", "/contact", "/donate"];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: route === "/impact" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
