import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ipo-premium | Live IPO GMP & Subscription Tracker",
    short_name: "ipo-premium",
    description: "Track live Indian IPO Grey Market Premium (GMP), real-time subscriptions, allotment status and listing gains.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F9FA",
    theme_color: "#E8B4A0",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
