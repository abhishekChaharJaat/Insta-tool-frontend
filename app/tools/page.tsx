import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import { AdBanner } from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "All Instagram Tools",
  description:
    "Browse all free Instagram tools: reel downloader, caption generator, hashtag generator, and bio generator.",
};

const TOOLS = [
  {
    href: "/download",
    icon: "⬇️",
    title: "Reel Downloader",
    description:
      "Download Instagram reels, videos & images in HD. No watermark, no login. Paste URL and download instantly.",
    badge: "Most Popular",
  },
  {
    href: "/caption",
    icon: "✍️",
    title: "Caption Generator",
    description:
      "Generate engaging Instagram captions for any topic. Choose from 7 tones: cool, funny, motivational & more.",
  },
  {
    href: "/hashtags",
    icon: "#️⃣",
    title: "Hashtag Generator",
    description:
      "Get optimized hashtags for your niche. Boost your reach and get discovered by new audiences.",
  },
  {
    href: "/bio",
    icon: "👤",
    title: "Bio Generator",
    description:
      "Craft a compelling Instagram bio that converts profile visitors into followers. Match your brand voice.",
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Ad */}
      <AdBanner slot="header" className="mb-10" />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">All Free Tools</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Every tool you need to grow your Instagram — completely free, no account required.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>

      {/* In-content ad */}
      <AdBanner slot="in-content" className="mt-12" />
    </div>
  );
}
