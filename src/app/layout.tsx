import type { Metadata, Viewport } from "next";
import { Commissioner, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { MotionRoot } from "@/components/Reveal";
import "./globals.css";

// Commissioner, by a Greek type designer, for text; JetBrains Mono for labels, dates and code.
// Both cover Greek, including accented capitals.
const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["greek", "latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["greek", "latin"],
});

export const metadata: Metadata = {
  title: "David Gavriilidis · Software Engineer",
  description:
    "Δαβίδ Γαβριηλίδης, software engineer in Athens. Backends, data pipelines and browser extensions in Rust, TypeScript, Python and Java.",
  authors: [{ name: "David Gavriilidis", url: "https://github.com/vwdshka" }],
};

export const viewport: Viewport = {
  themeColor: "#121316",
};

// Runs before the first paint so a saved light theme doesn't flash dark.
const THEME_INIT = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script may set data-theme before hydration, so React must not compare it.
    <html
      lang="en"
      className={`${commissioner.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
