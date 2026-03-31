import Link from "next/link";

interface ToolCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

export function ToolCard({ href, icon, title, description, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900 hover:border-pink-400 dark:hover:border-pink-500
        hover:shadow-lg dark:hover:shadow-pink-950/20 transition-all duration-200"
    >
      {badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full
          bg-gradient-to-r from-orange-400 to-pink-500 text-white">
          {badge}
        </span>
      )}
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg mb-1 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
      <span className="mt-4 text-xs font-medium text-pink-500 dark:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Try it free →
      </span>
    </Link>
  );
}
