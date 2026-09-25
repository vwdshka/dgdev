export const locales = ["en", "el"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(s: string): s is Locale {
  return (locales as readonly string[]).includes(s);
}

// the same string in both languages
export type T = { en: string; el: string };

// X with every { en, el } pair swapped for one language's string
export type Localized<X> = X extends T
  ? string
  : X extends readonly (infer U)[]
    ? Localized<U>[]
    : X extends object
      ? { [K in keyof X]: Localized<X[K]> }
      : X;

function isT(x: object): x is T {
  const keys = Object.keys(x);
  return keys.length === 2 && "en" in x && "el" in x;
}

export function localize<X>(x: X, locale: Locale): Localized<X> {
  if (Array.isArray(x)) return x.map((v) => localize(v, locale)) as Localized<X>;
  if (x && typeof x === "object") {
    if (isT(x)) return x[locale] as Localized<X>;
    return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, localize(v, locale)])) as Localized<X>;
  }
  return x as Localized<X>;
}
