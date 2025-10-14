/**
 * Generate GitHub-style slugs for markdown headings.
 * GitHub converts emojis and special characters to dashes.
 */
export function githubSlug(text: string): string {
  return (
    text
      .toLowerCase()
      // Remove all emojis and replace with dash
      .replace(
        /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
        "-"
      )
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Remove special characters except hyphens
      .replace(/[^\w-]/g, "")
      // Remove multiple consecutive hyphens
      .replace(/-+/g, "-")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")
      // If the result is empty or started with emoji, add leading dash
      .replace(/^(.+)$/, (match) => {
        // Check if original text started with emoji by seeing if our slug changed significantly
        const startsWithEmoji =
          /^[\u{1F300}-\u{1F9FF}]|^[\u{2600}-\u{26FF}]|^[\u{2700}-\u{27BF}]/u.test(
            text
          );
        return startsWithEmoji ? `-${match}` : match;
      })
  );
}
