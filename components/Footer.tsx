import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="gradient-brand-text font-bold text-xl">InstaToolkit</span>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Free Instagram tools for creators. Download reels, generate captions,
              hashtags & bios.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-3">Tools</h3>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              {[
                { href: "/download", label: "Reel Downloader" },
                { href: "/caption", label: "Caption Generator" },
                { href: "/hashtags", label: "Hashtag Generator" },
                { href: "/bio", label: "Bio Generator" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-3">Legal</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
              This tool is for personal and educational use only. We do not store
              any user data or downloaded content.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} InstaToolkit. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400">
            Not affiliated with Instagram or Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}
