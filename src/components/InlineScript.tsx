"use client";

// runs while the html is parsed, before first paint. type flips to text/plain on the client
// so react doesn't warn about a script it wouldn't run anyway
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
