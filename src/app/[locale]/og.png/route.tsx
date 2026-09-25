import { ui } from "@/lib/content";
import { isLocale, locales, localize } from "@/lib/i18n";
import { homeImage } from "@/lib/og";

// A route named og.png rather than Next's opengraph-image convention: the export then writes a
// real .png file, which GitHub Pages serves as image/png (it picks the type by extension).
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_: Request, { params }: RouteContext<"/[locale]/og.png">) {
  const { locale } = await params;
  const t = localize(ui, isLocale(locale) ? locale : "en");
  return homeImage({ role: t.hero.output, place: t.contact.place, label: locale.toUpperCase() });
}
