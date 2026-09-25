import type { Metadata, Viewport } from "next";
import { Commissioner, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { MotionRoot } from "@/components/Reveal";
import { Contact } from "@/components/Sections";
import { ThemeScript } from "@/components/ThemeScript";
import { profile, ui } from "@/lib/content";
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
    title: meta.title,
    description: meta.description,
    authors: [{ name: profile.name, url: profile.github }],
    alternates: { languages: { en: "/en", el: "/el" } },
  };
}

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
      className={`${commissioner.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
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
