import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://instatoolkit.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "InstaToolkit",
  title: {
    default: "InstaToolkit — Free Instagram Tools: Downloader, Caption & Hashtag Generator",
    template: "%s | InstaToolkit",
  },
  description:
    "InstaToolkit — #1 free Instagram toolkit. Download reels without watermark, generate captions, hashtags & bios instantly. No sign-up required.",
  keywords: [
    "instagram downloader",
    "instagram reel downloader",
    "download instagram reels",
    "instagram caption generator",
    "instagram hashtag generator",
    "instagram bio generator",
    "free instagram tools",
    "reels downloader no watermark",
    "save instagram videos",
    "instagram tools online",
    "instagram content creator tools",
  ],
  authors: [{ name: "InstaToolkit" }],
  creator: "InstaToolkit",
  publisher: "InstaToolkit",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "InstaToolkit",
    title: "InstaToolkit — Free Instagram Downloader & Generator Tools",
    description:
      "Download Instagram reels for free. Generate captions, hashtags & bios. The #1 free Instagram toolkit — no login needed.",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "InstaToolkit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaToolkit — Free Instagram Tools",
    description: "Download reels, generate captions, hashtags & more. 100% free, no sign-up.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    // Add your Google Search Console verification token here
    // google: "your-verification-token",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N6ZDWKC78W" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-N6ZDWKC78W');`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
