import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { AdBanner } from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Blog — Instagram Tips, Growth Strategies & Tutorials",
  description:
    "Read free guides on Instagram growth, how to download reels, best hashtags, going viral, and more.",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AdBanner slot="header" className="mb-10" />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Blog</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Instagram tips, growth strategies, and tutorials for creators.
        </p>
      </div>

      <div className="space-y-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-900 hover:border-pink-400 dark:hover:border-pink-500
              hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium px-2 py-1 rounded-full gradient-brand text-white">
                {post.category}
              </span>
              <span className="text-xs text-zinc-400">{post.date}</span>
              <span className="text-xs text-zinc-400">· {post.readTime}</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {post.description}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-pink-500 dark:text-pink-400">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
