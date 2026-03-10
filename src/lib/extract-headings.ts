export type Heading = {
  text: string;
  id: string;
  depth: number;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractHeadings(mdxContent: string): Heading[] {
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];

  for (const match of mdxContent.matchAll(headingPattern)) {
    const hashes = match[1];
    const rawText = match[2].trim();
    const depth = hashes.length;
    const text = rawText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
    const id = slugify(text);

    headings.push({ text, id, depth });
  }

  return headings;
}
