// ixnos-data's public static edition: meta.json holds the record count and the last refresh.
export const IXNOS_META = "https://vwdshka.github.io/ixnos-data/data/meta.json";

export type IxnosMeta = { count: number; generatedAt: string };

/** Read at build time so the number is in the HTML; null if ixnos-data can't be reached. */
export async function getIxnosMeta(): Promise<IxnosMeta | null> {
  try {
    const res = await fetch(IXNOS_META);
    if (!res.ok) return null;
    const { count, generatedAt } = (await res.json()) as IxnosMeta;
    return { count, generatedAt };
  } catch {
    return null;
  }
}
