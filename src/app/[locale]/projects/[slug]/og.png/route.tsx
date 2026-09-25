import { cases } from "@/lib/cases";
import { projects, ui } from "@/lib/content";
import { isLocale, locales, localize } from "@/lib/i18n";
import { caseImage } from "@/lib/og";

// same reason as [locale]/og.png for not using opengraph-image
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) => cases.map((c) => ({ locale, slug: c.slug })));
}

export async function GET(_: Request, { params }: RouteContext<"/[locale]/projects/[slug]/og.png">) {
  const { locale: l, slug } = await params;
  const locale = isLocale(l) ? l : "en";
  const c = localize(cases.find((x) => x.slug === slug)!, locale);
  const p = localize(projects.find((x) => x.slug === slug)!, locale);
  return caseImage({ name: p.name, tagline: c.tagline, numbers: p.numbers, label: localize(ui, locale).projects.caseStudy });
}
