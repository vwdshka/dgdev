import type { Metadata, Viewport } from "next";
import { Commissioner, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { MotionRoot } from "@/components/Reveal";
import { Contact } from "@/components/Sections";
import { InlineScript } from "@/components/InlineScript";
import { preview, profile, ui } from "@/lib/content";
import { isLocale, locales, localize } from "@/lib/i18n";
import "../globals.css";

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

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = localize(ui, locale);
  return {
    // SITE_URL comes from the Pages workflow; link previews need absolute image URLs.
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    title: meta.title,
    description: meta.description,
    authors: [{ name: profile.name, url: profile.github }],
    alternates: { languages: { en: "/en/", el: "/el/" } },
    openGraph: { type: "website", siteName: "dg.dev", locale: locale === "el" ? "el_GR" : "en_GB", images: preview(`/${locale}/og.png`) },
    twitter: { card: "summary_large_image", images: preview(`/${locale}/og.png`) },
  };
}

// Saved light theme applied before the first paint, so it doesn't flash dark.
const THEME_INIT = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export const viewport: Viewport = {
  themeColor: "#1c1512",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = localize(ui, locale);

  return (
    // The theme script may set data-theme before hydration, so React must not compare it.
    <html
      lang={locale}
      // Lets Next turn off the CSS smooth scrolling while it jumps to the top of a new page.
      data-scroll-behavior="smooth"
      className={`${commissioner.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={THEME_INIT} />
      </head>
      <body>
        <MotionRoot>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
          >
            {t.nav.skip}
          </a>
          <Header locale={locale} t={t.nav} />
          <main id="main">{children}</main>
          <Contact t={t} />
        </MotionRoot>
      </body>
    </html>
  );
}
