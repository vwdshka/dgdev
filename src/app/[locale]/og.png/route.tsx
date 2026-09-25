import { ui } from "@/lib/content";
import { isLocale, locales, localize } from "@/lib/i18n";
import { homeImage } from "@/lib/og";

// og.png instead of opengraph-image so the exported file has an extension -
// pages sets the content type from it, and linkedin ignores previews that aren't image/*
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_: Request, { params }: RouteContext<"/[locale]/og.png">) {
  const { locale } = await params;
  const t = localize(ui, isLocale(locale) ? locale : "en");
  return homeImage({ role: t.hero.output, place: t.contact.place, label: locale.toUpperCase() });
}
