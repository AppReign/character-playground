export type CdnImageCheckResult = "ok" | "error";

/** Resolves when the URL loads or fails (no throw). */
export function checkCdnImageUrl(url: string): Promise<CdnImageCheckResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve("ok");
    img.onerror = () => resolve("error");
    img.src = url;
  });
}

const DEFAULT_CONCURRENCY = 8;

/** Checks many URLs with a fixed concurrency limit. */
export async function checkCdnImageUrls(
  urls: readonly string[],
  onResult: (url: string, result: CdnImageCheckResult) => void,
  concurrency: number = DEFAULT_CONCURRENCY
): Promise<void> {
  if (!urls.length) return;

  let index = 0;
  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, async () => {
    while (index < urls.length) {
      const i = index++;
      const url = urls[i];
      const result = await checkCdnImageUrl(url);
      onResult(url, result);
    }
  });

  await Promise.all(workers);
}
