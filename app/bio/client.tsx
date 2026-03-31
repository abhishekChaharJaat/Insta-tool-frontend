"use client";

import { api } from "@/lib/api";
import { GeneratorForm } from "@/components/GeneratorForm";
import { CopyButton } from "@/components/CopyButton";

export function BioPageClient() {
  return (
    <GeneratorForm
      title="Bio Generator"
      placeholder="e.g. fitness coach, travel blogger, food creator..."
      onGenerate={(topic, tone) => api.bio(topic, tone, 5).then((r) => r.results)}
      renderResult={(bio, i) => (
        <div
          key={i}
          className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono">
            {bio}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-zinc-400">{bio.length} chars</span>
            <CopyButton text={bio} />
          </div>
        </div>
      )}
    />
  );
}
