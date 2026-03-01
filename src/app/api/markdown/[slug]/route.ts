import yaml from 'js-yaml';
import { notFound } from 'next/navigation';
import { join } from 'path';
import rehypeRemark from 'rehype-remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { read } from 'to-vfile';
import { unified } from 'unified';
import { matter } from 'vfile-matter';

const postsDirectory = join(process.cwd(), 'src/_posts');

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);

  let file;
  try {
    file = await read(fullPath);
  } catch {
    return notFound();
  }

  matter(file);

  const frontmatter = file.data.matter as Record<string, unknown>;

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkMdxFrontmatter)
    .use(remarkRehype)
    .use(rehypeRemark)
    .use(remarkStringify);

  const result = await processor.process(file);
  const markdownContent = String(result);

  const yamlFrontmatter = yaml.dump(frontmatter);

  const fullMarkdown = `---\n${yamlFrontmatter}\n---\n\n${markdownContent}`;

  return new Response(fullMarkdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/api');
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
