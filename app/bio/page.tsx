import type { Metadata } from "next";
import { BioPageClient } from "./client";
import { AdBanner } from "@/components/AdBanner";
import { SITE_URL, webAppSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/bio`;

export const metadata: Metadata = {
  title: "Instagram Bio Generator — Write the Perfect Instagram Bio Free",
  description:
    "Generate the perfect Instagram bio in seconds. Get creative, professional, funny or aesthetic bio ideas for any niche. Free bio generator — no login needed.",
  keywords: [
    "instagram bio generator",
    "instagram bio ideas",
    "best instagram bio",
    "cool instagram bios",
    "creative instagram bio",
    "instagram bio for girls",
    "instagram bio for boys",
    "instagram bio aesthetic",
    "funny instagram bio",
    "professional instagram bio",
    "instagram bio with emoji",
    "short instagram bio ideas",
    "instagram bio generator free",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Instagram Bio Generator — Perfect Bio in Seconds",
    description: "Generate creative, professional or funny Instagram bios for any niche. Free, instant, no login.",
    url: PAGE_URL,
    type: "website",
  },
};

const FAQS = [
  { q: "How do I write a good Instagram bio?", a: "A good Instagram bio states who you are, what you do, and includes a call to action. Our generator creates all of this for you based on your niche and tone." },
  { q: "How long can an Instagram bio be?", a: "Instagram allows 150 characters in your bio. Our generator keeps all bios within this limit." },
  { q: "Can I use the generated bio directly?", a: "Yes! Just copy the bio and paste it into your Instagram profile editor. You can also customize it after copying." },
];

export default function BioPage() {
  const jsonLd = [
    webAppSchema("Instagram Bio Generator", "Generate the perfect Instagram bio for any niche and tone for free.", PAGE_URL),
    faqSchema(FAQS),
    breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Bio Generator", url: PAGE_URL }]),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <AdBanner slot="header" className="mb-10" />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Instagram <span className="gradient-brand-text">Bio Generator</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Your bio is your first impression. Make it count. Enter your niche and let us craft the perfect bio.
        </p>
      </div>

      <BioPageClient />

      <AdBanner slot="in-content" className="mt-12" />

      <section className="mt-12 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold mb-3">What makes a great Instagram bio?</h2>
        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>✅ Tell visitors who you are and what you do in the first line</li>
          <li>✅ Add a clear value proposition (what do followers gain?)</li>
          <li>✅ Include a call to action with a link in bio</li>
          <li>✅ Use emojis as bullet points to improve readability</li>
          <li>✅ Keep it under 150 characters (Instagram limit)</li>
        </ul>
      </section>
    </div>
  );
}
