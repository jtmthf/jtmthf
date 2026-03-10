import { Post } from '@/interfaces/post';
import fs from 'fs';
import { join } from 'path';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

const postsDirectory = join(process.cwd(), 'src/_posts');

function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const file = await read(fullPath);
  matter(file);

  return {
    ...(file.data.matter as Omit<Post, 'slug'>),
    slug: realSlug,
  } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = (await Promise.all(slugs.map((slug) => getPostBySlug(slug))))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) =>
    (post.tags ?? []).some((tag) => slugifyTag(tag) === tagSlug),
  );
}
