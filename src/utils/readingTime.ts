export function calculateReadingTime(body: string): string {
  const wordCount = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
}
