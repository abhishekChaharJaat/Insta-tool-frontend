"use client";

import { api } from "@/lib/api";
import { GeneratorForm } from "@/components/GeneratorForm";
import { CopyButton } from "@/components/CopyButton";

export function CaptionPageClient() {
  return (
    <GeneratorForm
      title="Caption Generator"
      placeholder="e.g. fitness, travel, food, coffee..."
      onGenerate={(topic, tone) => api.caption(topic, tone, 5).then((r) => r.results)}
      renderResult={(caption, i) => (
        <div
          key={i}
          className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 group"
        >
          <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
            {caption}
          </p>
          <div className="mt-3 flex justify-end">
            <CopyButton text={caption} />
          </div>
        </div>
      )}
    />
  );
}
