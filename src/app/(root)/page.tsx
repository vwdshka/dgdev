import type { Metadata } from "next";
import { InlineScript } from "@/components/InlineScript";

const base = process.env.BASE_PATH ?? "";

// pages can't redirect on Accept-Language, so the browser decides (greek -> /el, rest -> /en).
// meta refresh + the links cover no-JS
const PICK = `location.replace(${JSON.stringify(base)}+(/^el\\b/i.test(navigator.language)?"/el/":"/en/"))`;

export const metadata: Metadata = {
  title: "David Gavriilidis",
  robots: { index: false },
};

export default function Pick() {
  return (
    <main style={{ display: "grid", placeItems: "center", minHeight: "100vh", fontSize: 14 }}>
      <InlineScript html={PICK} />
      <meta httpEquiv="refresh" content={`2;url=${base}/en/`} />
      <p>
        <a href={`${base}/en/`} style={{ color: "#e8894a" }}>
          English
        </a>
        {" · "}
        <a href={`${base}/el/`} style={{ color: "#e8894a" }} lang="el">
          Ελληνικά
        </a>
      </p>
    </main>
  );
}
