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
