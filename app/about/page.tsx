import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About InstaToolkit",
  description:
    "Learn about InstaToolkit — the free Instagram tools platform for creators. Download reels, generate captions, hashtags, bios & usernames.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-6">About InstaToolkit</h1>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
        InstaToolkit is a free platform built for Instagram creators, marketers, and everyday users
        who want to get more out of Instagram without the complexity, paywalls, or sign-up friction.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We believe powerful Instagram tools should be accessible to everyone — not just those who
            can afford premium subscriptions. InstaToolkit provides a suite of tools that help
            creators save time, grow their audience, and create better content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">What We Offer</h2>
          <ul className="space-y-3">
            {[
              { tool: "Reel Downloader", href: "/download", desc: "Download public Instagram reels and videos for offline viewing." },
              { tool: "Caption Generator", href: "/caption", desc: "AI-ready caption generator for any topic and tone." },
              { tool: "Hashtag Generator", href: "/hashtags", desc: "Optimized hashtag sets for maximum reach in your niche." },
              { tool: "Bio Generator", href: "/bio", desc: "Compelling Instagram bios that convert visitors to followers." },
              { tool: "Username Generator", href: "/username", desc: "Unique, memorable username ideas for your brand." },
            ].map((item) => (
              <li key={item.tool} className="flex items-start gap-3">
                <span className="text-pink-500 mt-0.5">→</span>
                <div>
                  <Link href={item.href} className="font-semibold hover:text-pink-500 transition-colors">
                    {item.tool}
                  </Link>
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm"> — {item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Privacy First</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We do not store, log, or share any user data. URLs you submit for downloading are
            processed in real-time and immediately discarded. No account is required for any tool.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Disclaimer</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            InstaToolkit is not affiliated with, endorsed by, or connected to Instagram or Meta Platforms, Inc.
            Our tools are intended for personal and educational use only.{" "}
            <Link href="/disclaimer" className="text-pink-500 hover:underline">
              Read full disclaimer →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
