const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface DownloadResult {
  success: boolean;
  type?: string;
  download_url?: string;
  thumbnail?: string;
  title?: string;
  note?: string;
  error?: string;
}

export interface GeneratorResult {
  success: boolean;
  results: string[];
  error?: string;
}

async function post<T>(path: string, body: object): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || `Request failed (${res.status})`);
  }

  return res.json();
}

export const api = {
  download: (url: string) =>
    post<DownloadResult>("/api/download", { url }),

  caption: (topic: string, tone: string, count = 5) =>
    post<GeneratorResult>("/api/caption", { topic, tone, count }),

  hashtags: (topic: string, tone: string, count = 20) =>
    post<GeneratorResult>("/api/hashtags", { topic, tone, count }),

  bio: (topic: string, tone: string, count = 5) =>
    post<GeneratorResult>("/api/bio", { topic, tone, count }),
};
