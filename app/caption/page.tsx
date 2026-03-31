import type { Metadata } from "next";
import { CaptionPageClient } from "./client";
import { AdBanner } from "@/components/AdBanner";
import { SITE_URL, webAppSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/caption`;

export const metadata: Metadata = {
  title: "Instagram Caption Generator — Free Captions for Any Topic",
  description:
    "Generate engaging Instagram captions for any topic and tone instantly. Free caption generator — funny, motivational, aesthetic, professional & more. No account needed.",
  keywords: [
    "instagram caption generator",
    "instagram captions",
    "caption generator free",
    "instagram captions for posts",
    "funny instagram captions",
    "motivational instagram captions",
    "aesthetic captions for instagram",
    "best instagram captions",
    "caption ideas for instagram",
    "auto caption generator instagram",
    "ai instagram caption generator",
    "free caption generator",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Instagram Caption Generator — Free Captions for Any Topic",
    description: "Generate viral Instagram captions in seconds. 7 tones, any topic. 100% free, no login.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Caption Generator — Free",
    description: "Generate captions for Instagram instantly. Funny, motivational, aesthetic & more.",
  },
};

const FAQS = [
  { q: "How do I generate Instagram captions?", a: "Enter your topic (e.g. fitness, travel, food), select a tone, and click Generate. You'll get 5 ready-to-use captions instantly." },
  { q: "Is the Instagram caption generator free?", a: "Yes, completely free. No account, no subscription, no credit card required." },
  { q: "How many captions can I generate?", a: "You can generate unlimited captions. Just change the topic or tone to get fresh results." },
  { q: "What tones are available?", a: "We offer 7 tones: Neutral, Cool, Motivational, Funny, Professional, Casual, and Aesthetic." },
];

export default function CaptionPage() {
  const jsonLd = [
    webAppSchema("Instagram Caption Generator", "Generate engaging Instagram captions for any topic and tone for free.", PAGE_URL),
    faqSchema(FAQS),
    breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Caption Generator", url: PAGE_URL }]),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <AdBanner slot="header" className="mb-10" />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Instagram <span className="gradient-brand-text">Caption Generator</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Enter your topic, pick a tone, and get engaging captions instantly. 100% free.
        </p>
      </div>

      <CaptionPageClient />

      <AdBanner slot="in-content" className="mt-12" />

      <section className="mt-12 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold mb-3">How to write a great Instagram caption</h2>
        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>✅ Start with a hook — the first line determines if users expand the caption</li>
          <li>✅ Add a call to action (like, comment, save, or DM)</li>
          <li>✅ Use emojis to break up text and add personality</li>
          <li>✅ Keep it authentic to your brand voice</li>
          <li>✅ Add hashtags at the end or in the first comment</li>
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
