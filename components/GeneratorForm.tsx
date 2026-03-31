"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

const TONES = [
  { value: "neutral", label: "Neutral" },
  { value: "cool", label: "Cool 😎" },
  { value: "motivational", label: "Motivational 🔥" },
  { value: "funny", label: "Funny 😂" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual ✌️" },
  { value: "aesthetic", label: "Aesthetic 🌸" },
];

interface GeneratorFormProps {
  title: string;
  placeholder: string;
  onGenerate: (topic: string, tone: string) => Promise<string[]>;
  renderResult: (result: string, index: number) => React.ReactNode;
}

export function GeneratorForm({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title: _title,
  placeholder,
  onGenerate,
  renderResult,
}: GeneratorFormProps) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("neutral");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await onGenerate(topic.trim(), tone);
      setResults(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Topic input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={placeholder}
            maxLength={100}
            className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700
              bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100
              placeholder:text-zinc-400 dark:placeholder:text-zinc-600
              focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400
              transition-all"
          />
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="px-6 py-3 rounded-xl font-semibold text-white gradient-brand
              disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity
              whitespace-nowrap"
          >
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>

        {/* Tone selector */}
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

      {/* Loading skeleton */}
      {loading && (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {results.length} results generated
            </p>
            <CopyButton
              text={results.join("\n\n")}
              label="Copy All"
            />
          </div>
          {results.map((result, i) => renderResult(result, i))}
        </div>
      )}
    </div>
  );
}
