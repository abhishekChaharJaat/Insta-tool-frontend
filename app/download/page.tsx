import type { Metadata } from "next";
import { DownloaderWidget } from "@/components/DownloaderWidget";
import { AdBanner } from "@/components/AdBanner";
import { SITE_URL, webAppSchema, faqSchema, howToSchema, breadcrumbSchema } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/download`;

export const metadata: Metadata = {
  title: "Instagram Reel Downloader — Download Instagram Reels Free (No Watermark)",
  description:
    "Download Instagram reels, videos and photos for free. No watermark, no login, no app required. Paste any public Instagram URL and save instantly. Works on mobile & desktop.",
  keywords: [
    "instagram reel downloader",
    "download instagram reels",
    "instagram video downloader",
    "save instagram reels",
    "instagram downloader free",
    "instagram reels download without watermark",
    "how to download instagram reels",
    "download instagram videos online",
    "instagram reel saver",
    "instagram video saver free",
    "reels downloader online",
    "save instagram videos to phone",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Instagram Reel Downloader — Free, No Watermark",
    description: "Download any public Instagram reel or video in seconds. No watermark, no login. Works on all devices.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Reel Downloader — Free, No Watermark",
    description: "Download Instagram reels instantly. No watermark, no sign-up.",
  },
};

const STEPS = [
  { step: "1", title: "Copy the Link", desc: "Open Instagram, find the reel or post, and copy its link." },
  { step: "2", title: "Paste the URL", desc: "Paste the Instagram URL into the box above." },
  { step: "3", title: "Download", desc: "Click Download and save the video or image to your device." },
];

const FAQS = [
  {
    q: "Is it free to download Instagram reels?",
    a: "Yes, InstaToolkit is completely free. No account, no subscription, no credit card required.",
  },
  {
    q: "Can I download private Instagram posts?",
    a: "No. This tool only works with public Instagram posts and reels. Private content is not accessible.",
  },
  {
    q: "Is there a watermark on downloaded videos?",
    a: "No watermarks are added by our tool. You get the original media file.",
  },
  {
    q: "Is it legal to download Instagram reels?",
    a: "Downloading for personal use is generally acceptable, but always respect copyright. Do not re-upload or redistribute others' content without permission.",
  },
];

export default function DownloadPage() {
  const jsonLd = [
    webAppSchema("Instagram Reel Downloader", "Download Instagram reels and videos for free without watermark.", PAGE_URL),
    howToSchema("How to Download Instagram Reels", STEPS.map(s => ({ title: s.title, desc: s.desc }))),
    faqSchema(FAQS),
    breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Reel Downloader", url: PAGE_URL }]),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      {/* Header ad */}
      <AdBanner slot="header" className="mb-10" />

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Instagram Reel{" "}
          <span className="gradient-brand-text">Downloader</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Download Instagram reels, videos & photos for free. No watermark.
          No sign-up. Works on all devices.
        </p>
      </div>

      {/* Downloader */}
      <DownloaderWidget />

      {/* Disclaimer */}
      <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-sm text-amber-700 dark:text-amber-400 text-center">
        ⚠️ For personal and educational use only. Respect copyright and Instagram&apos;s Terms of Service.
      </div>

      {/* In-content ad */}
      <AdBanner slot="in-content" className="my-10" />

      {/* How it works */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-8">How to Download Instagram Reels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center"
            >
              <div className="w-10 h-10 rounded-full gradient-brand text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
