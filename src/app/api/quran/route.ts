// app/api/quran/route.ts
import { NextResponse } from "next/server";

const BASE = "http://api.alquran.cloud/v1";
const FETCH_TIMEOUT_MS = 10000; // 10s

// Only allow specific path patterns to avoid SSRF:
const ALLOWED_PATTERNS = [
  // surah/ID/reciterOrTafsir
  /^surah\/\d{1,3}\/[a-zA-Z0-9_.-]+$/,
  // juz/ID/reciterOrTafsir
  /^juz\/\d{1,2}\/[a-zA-Z0-9_.-]+$/,
];

function isAllowedPath(p: string) {
  return ALLOWED_PATTERNS.some((rx) => rx.test(p));
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        { error: "Missing 'path' query param" },
        { status: 400 }
      );
    }

    if (!isAllowedPath(path)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const upstream = `${BASE}/${path}`;

    const res = await fetch(upstream, {
      signal: controller.signal,
      // You can forward headers if necessary:
      // headers: { 'User-Agent': 'MyApp/1.0' }
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return NextResponse.json(
        { error: "Upstream error", status: res.status, message: txt },
        { status: 502 }
      );
    }

    const data = await res.json();

    // Cache-control: you can tune this for your needs.
    // Example: cache for 60 seconds (CDN/proxy), then revalidate:
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Upstream request timed out" },
        { status: 504 }
      );
    }
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
