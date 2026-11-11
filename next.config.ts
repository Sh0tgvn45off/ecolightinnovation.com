import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Keep links to the old static site working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about-us.html", destination: "/about", permanent: true },
      { source: "/our-mission.html", destination: "/mission", permanent: true },
      { source: "/impact-stories.html", destination: "/impact", permanent: true },
      { source: "/contact-us.html", destination: "/contact", permanent: true },
      { source: "/donate.html", destination: "/donate", permanent: true },
      { source: "/donate-now.html", destination: "/donate#give", permanent: true },
    ];
  },
};

export default nextConfig;
