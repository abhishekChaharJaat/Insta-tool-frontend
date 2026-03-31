import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog";
import { AdBanner } from "@/components/AdBanner";
import { SITE_URL, articleSchema, breadcrumbSchema } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: ["InstaToolkit"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

// Minimal markdown-like renderer (no extra deps)
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-zinc-900 dark:text-zinc-100">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-zinc-900 dark:text-zinc-100">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-semibold text-zinc-900 dark:text-zinc-100 mt-4">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={i} className="ml-4 list-disc text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
          {renderInline(line.slice(2))}
        </li>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-pink-500 pl-4 py-2 my-4 text-zinc-600 dark:text-zinc-400 italic text-sm"
        >
          {line.slice(2)}
        </blockquote>
      );
    } else if (line.startsWith("|")) {
      // Skip table lines (simple)
    } else if (line.trim() === "") {
      // empty
    } else {
      elements.push(
        <p key={i} className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 text-sm">
          {renderInline(line)}
        </p>
      );
    }
    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Inline code: `text`
    if (part.includes("`")) {
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cp, j) =>
        cp.startsWith("`") && cp.endsWith("`") ? (
          <code
            key={j}
            className="px-1 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800 font-mono text-pink-600 dark:text-pink-400"
          >
            {cp.slice(1, -1)}
          </code>
        ) : (
          cp
        )
      );
    }
    return part;
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== params.slug).slice(0, 2);
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = [
    articleSchema(post.title, post.description, postUrl, post.date),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
      { name: post.title, url: postUrl },
    ]),
  ];

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
        <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-pink-500 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-zinc-700 dark:text-zinc-300 truncate">{post.title}</span>
      </nav>

      <AdBanner slot="header" className="mb-10" />

      {/* Meta */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-medium px-2 py-1 rounded-full gradient-brand text-white">
          {post.category}
        </span>
        <span className="text-xs text-zinc-400">{post.date}</span>
        <span className="text-xs text-zinc-400">· {post.readTime}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-100 leading-tight">
        {post.title}
      </h1>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed border-b border-zinc-200 dark:border-zinc-800 pb-8">
        {post.description}
      </p>

      {/* Content */}
      <div className="prose-custom">{renderContent(post.content)}</div>

      {/* In-content ad */}
      <AdBanner slot="in-content" className="my-12" />

      {/* More posts */}
      {otherPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-6">More Articles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900
                  hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-md transition-all group"
              >
                <span className="text-xs text-zinc-400">{p.category} · {p.readTime}</span>
                <h3 className="font-semibold mt-2 text-sm group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors leading-snug">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to blog */}
      <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <Link href="/blog" className="text-sm text-pink-500 hover:text-pink-600 transition-colors font-medium">
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
