"use client";

import { useState, useEffect, useRef } from "react";
import { api, type DownloadResult } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function buildProxyUrl(mediaUrl: string, filename = "instatoolkit_reel"): string {
  return `${API_URL}/api/proxy-download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;
}

export function DownloaderWidget() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [thumbSrc, setThumbSrc] = useState<string | null>(null);
  const thumbObjectUrl = useRef<string | null>(null);

  // Revoke old blob URL on unmount / result change
  useEffect(() => {
    return () => {
      if (thumbObjectUrl.current) URL.revokeObjectURL(thumbObjectUrl.current);
    };
  }, [result]);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setThumbSrc(null);

    try {
      const data = await api.download(url.trim());
      if (!data.success) {
        setError(data.error || "Failed to fetch media.");
        return;
      }
      setResult(data);

      // Proxy the thumbnail through backend → blob URL → no CORS issues
      if (data.thumbnail) {
        try {
          const res = await fetch(buildProxyUrl(data.thumbnail, "thumbnail"));
          if (res.ok) {
            const blob = await res.blob();
            const objUrl = URL.createObjectURL(blob);
            thumbObjectUrl.current = objUrl;
            setThumbSrc(objUrl);
          }
        } catch {
          // thumbnail failed silently — card still shows without image
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleSaveFile = async () => {
    if (!result?.download_url) return;
    setDownloading(true);
    try {
      const proxyUrl = buildProxyUrl(result.download_url, result.title || "instatoolkit_reel");

      // iOS Safari doesn't support blob download — open in new tab so user can long-press save
      if (isIOS()) {
        window.open(proxyUrl, "_blank");
        return;
      }

      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = result.type === "video" ? "reel.mp4" : "photo.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Delay revoke so browser has time to start download
      setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
    } catch {
      setError("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const isReel = result?.type === "video";

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* URL input */}
      <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Instagram reel / post URL here…"
          className="flex-1 px-4 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700
            bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100
            placeholder:text-zinc-400 dark:placeholder:text-zinc-600
            focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-8 py-3.5 rounded-xl font-semibold text-white gradient-brand
            disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          {loading ? "Downloading…" : "⬇️ Download"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm text-left">
          ⚠️ {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="mt-6 flex justify-center">
          <div className="w-56 animate-pulse">
            <div className="w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" style={{ aspectRatio: "9/16" }} />
            <div className="mt-3 h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mx-auto" />
            <div className="mt-2 h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 mx-auto" />
          </div>
        </div>
      )}

      {/* Result card */}
      {result && !loading && (
        <div className="mt-6 flex flex-col items-center">

          {/* Card */}
          <div
            className={`relative overflow-hidden rounded-2xl shadow-2xl bg-zinc-900 ${isReel ? "w-56" : "w-64"}`}
            style={{ aspectRatio: isReel ? "9/16" : "1/1" }}
          >
            {/* Thumbnail */}
            {thumbSrc ? (
              <img
                src={thumbSrc}
                alt={result.title || "Instagram media"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                <span className="text-5xl opacity-40">{isReel ? "🎬" : "🖼️"}</span>
              </div>
            )}

            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Top-left badge */}
            <div className="absolute top-2.5 left-2.5">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
                {isReel ? (
                  <>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h.5l2 4H2V6zm4.5-2H10l2 4H6.5l-2-4zm6 0H17l2 4h-4.5l-2-4zM2 12h20v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8zm10 2a3 3 0 100 6 3 3 0 000-6z"/>
                    </svg>
                    Reel
                  </>
                ) : (
                  "📷 Photo"
                )}
              </span>
            </div>

            {/* Play button (reels only) */}
            {isReel && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Title at bottom */}
            {result.title && (
              <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none">
                <p className="text-white text-[11px] font-medium leading-snug line-clamp-2 drop-shadow">
                  {result.title}
                </p>
              </div>
            )}
          </div>

          {/* Download button */}
          {result.download_url && (
            <button
              onClick={handleSaveFile}
              disabled={downloading}
              className="mt-5 px-8 py-3 rounded-xl font-semibold text-white gradient-brand
                hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center gap-2 shadow-lg"
            >
              {downloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download {isReel ? "Reel" : "Photo"}
                </>
              )}
            </button>
          )}

          <p className="mt-2.5 text-xs text-zinc-400">
            {isReel ? "MP4 · No watermark" : "JPG · Full quality"}
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-zinc-400 text-center">
        For personal use only. Only works with public posts.
      </p>
    </div>
  );
}
