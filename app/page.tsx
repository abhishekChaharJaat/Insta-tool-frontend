import type { Metadata } from "next";
import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { ToolCard } from "@/components/ToolCard";
import { DownloaderWidget } from "@/components/DownloaderWidget";

export const metadata: Metadata = {
  title: "InstaToolkit — Free Instagram Tools",
  description:
    "Download Instagram reels for free. Generate captions, hashtags & bios. The ultimate Instagram toolkit for creators.",
};

const TOOLS = [
  {
    href: "/download",
    icon: "⬇️",
    title: "Reel Downloader",
    description: "Download Instagram reels, videos & images instantly. No watermark, no login required.",
    badge: "Popular",
  },
  {
    href: "/caption",
    icon: "✍️",
    title: "Caption Generator",
    description: "Generate viral Instagram captions for any topic and tone in seconds.",
  },
  {
    href: "/hashtags",
    icon: "#️⃣",
    title: "Hashtag Generator",
    description: "Get the best hashtags for your niche to maximize reach and engagement.",
  },
  {
    href: "/bio",
    icon: "👤",
    title: "Bio Generator",
    description: "Craft the perfect Instagram bio that converts visitors to followers.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Header Ad */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <AdBanner slot="header" />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
          bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800 mb-6">
          ✨ 100% Free — No Sign-up Required
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          The Ultimate
          <span className="gradient-brand-text"> Instagram </span>
          Toolkit
        </h1>

        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Download reels, generate captions, hashtags & bios — everything a creator needs,
          completely free.
        </p>

        {/* Inline downloader */}
        <DownloaderWidget />

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {TOOLS.slice(1).map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-700
                text-zinc-600 dark:text-zinc-400 hover:border-pink-400 hover:text-pink-500 transition-colors"
            >
              {tool.icon} {tool.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500K+", label: "Downloads" },
            { value: "1M+", label: "Captions Generated" },
            { value: "4", label: "Free Tools" },
            { value: "0", label: "Sign-ups Required" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold gradient-brand-text">{stat.value}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">All Free Tools</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Everything you need to grow on Instagram</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* In-content ad */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <AdBanner slot="in-content" />
      </div>

      {/* Features */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why InstaToolkit?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Lightning Fast", desc: "Results in under a second. No waiting, no delays." },
              { icon: "🔒", title: "Private & Secure", desc: "We never store your data or downloaded content." },
              { icon: "🆓", title: "Always Free", desc: "No subscriptions, no hidden fees, no account needed." },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
