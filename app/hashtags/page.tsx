import type { Metadata } from "next";
import { HashtagPageClient } from "./client";
import { AdBanner } from "@/components/AdBanner";
import { SITE_URL, webAppSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/hashtags`;

export const metadata: Metadata = {
  title: "Instagram Hashtag Generator — Best Hashtags for Every Niche (Free)",
  description:
    "Generate the best Instagram hashtags for your niche instantly. Get 30 relevant, high-reach hashtags for fitness, food, travel, engineering, tech & more. Free, no login.",
  keywords: [
    "instagram hashtag generator",
    "best hashtags for instagram",
    "hashtag generator free",
    "instagram hashtags for likes",
    "hashtags for instagram growth",
    "most popular instagram hashtags",
    "niche hashtags instagram",
    "hashtags for reels",
    "instagram hashtag finder",
    "free hashtag generator",
    "hashtags for fitness instagram",
    "hashtags for travel instagram",
    "hashtags for food instagram",
    "engineering hashtags instagram",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Instagram Hashtag Generator — 30 Best Hashtags for Your Niche",
    description: "Get 30 niche-specific, high-reach Instagram hashtags instantly. Boost your reach and grow your audience. Free.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Hashtag Generator — Free",
    description: "Generate 30 niche-relevant hashtags for any topic instantly.",
  },
};

const FAQS = [
  { q: "How many hashtags should I use on Instagram?", a: "Instagram allows up to 30 hashtags. Research shows 5–15 highly relevant hashtags outperform 30 generic ones for engagement." },
  { q: "Are the hashtags relevant to my niche?", a: "Yes. Our generator matches your topic to a specific niche (fitness, tech, food, engineering, etc.) and returns only relevant hashtags ordered by popularity." },
  { q: "Can I use all 30 hashtags in one post?", a: "Yes. We provide 3 sets of 10 so you can use all of them or pick the most relevant ones. Rotating sets between posts helps avoid shadowbanning." },
  { q: "How often should I change my hashtags?", a: "Rotate your hashtag sets every 3–5 posts to avoid Instagram's spam detection and reach new audiences each time." },
];

export default function HashtagsPage() {
  const jsonLd = [
    webAppSchema("Instagram Hashtag Generator", "Generate the best niche-relevant Instagram hashtags for free.", PAGE_URL),
    faqSchema(FAQS),
    breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Hashtag Generator", url: PAGE_URL }]),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <AdBanner slot="header" className="mb-10" />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Instagram <span className="gradient-brand-text">Hashtag Generator</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Get 30 niche-specific, high-reach hashtags for your post. Enter your topic and generate instantly.
        </p>
      </div>

      <HashtagPageClient />

      <AdBanner slot="in-content" className="mt-12" />

      <section className="mt-12 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold mb-3">Hashtag best practices</h2>
        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>✅ Use 5–15 relevant hashtags per post for optimal reach</li>
          <li>✅ Mix popular tags with niche-specific ones</li>
          <li>✅ Place hashtags in caption or first comment</li>
          <li>✅ Avoid banned or spammy hashtags</li>
          <li>✅ Rotate hashtags between posts to avoid shadowban</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div key={faq.q} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <h3 className="font-semibold mb-1">{faq.q}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
