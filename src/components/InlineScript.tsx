"use client";

// A script that runs while the HTML parses, before the first paint. On the client the type flips
// to text/plain: React won't execute it there anyway, and this keeps it from warning about that
// (the pattern from Next's "preventing flash" guide).
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
