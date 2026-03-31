"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { CopyButton } from "@/components/CopyButton";

const TONES = [
  { value: "neutral", label: "Neutral" },
  { value: "cool", label: "Cool 😎" },
  { value: "motivational", label: "Motivational 🔥" },
  { value: "funny", label: "Funny 😂" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual ✌️" },
  { value: "aesthetic", label: "Aesthetic 🌸" },
];

const BLOCK_LABELS = ["Set 1 — High Reach", "Set 2 — Mid Niche", "Set 3 — Micro Niche"];

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function HashtagPageClient() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("neutral");
  const [blocks, setBlocks] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setBlocks([]);

    try {
      const data = await api.hashtags(topic.trim(), tone, 30);
      if (!data.success) throw new Error(data.error || "Failed to generate hashtags.");

      // Flatten all tags (API returns them space-separated in results array)
      const allTags = data.results.flatMap((r) => r.split(" ").filter(Boolean));
      const unique = Array.from(new Set(allTags)).slice(0, 30);

      // Pad to exactly 30 if fewer returned
      while (unique.length < 30) unique.push(`#${topic.toLowerCase()}${unique.length + 1}`);

      setBlocks(chunkArray(unique, 10));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Form */}
      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. fitness, food photography, travel vlog..."
            maxLength={100}
            className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700
              bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100
              placeholder:text-zinc-400 dark:placeholder:text-zinc-600
              focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-base"
          />
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="px-6 py-3 rounded-xl font-semibold text-white gradient-brand
              disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>

        {/* Tone pills */}
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTone(t.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                tone === t.value
                  ? "gradient-brand text-white border-transparent"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-pink-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Loading skeletons — 3 full-width blocks */}
      {loading && (
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden animate-pulse">
              <div className="px-5 py-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-40" />
              </div>
              <div className="px-5 py-4 space-y-2">
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full" />
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3 full-width hashtag blocks */}
      {!loading && blocks.length > 0 && (
        <div className="mt-6 space-y-4">
          {blocks.map((group, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {BLOCK_LABELS[i]}
                </span>
                <CopyButton text={group.join(" ")} label="Copy" />
              </div>

              {/* All 10 tags as a paragraph */}
              <p className="px-5 py-4 text-sm leading-loose text-pink-600 dark:text-pink-400 font-medium">
                {group.join("  ")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Copy all */}
      {!loading && blocks.length > 0 && (
        <div className="mt-4 flex justify-center">
          <CopyButton
            text={blocks.flat().join(" ")}
            label="Copy All 30 Hashtags"
            className="px-5 py-2 text-sm"
          />
        </div>
      )}
    </div>
  );
}
