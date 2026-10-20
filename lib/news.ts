/** Article date as the news cards show it, e.g. "3 marzo 2026". */
export function formatNewsDate(iso: string): string {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
