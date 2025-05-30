// @ts-check

import createMDX from '@next/mdx';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

const highlighter = await createHighlighterCore({
  themes: [
    import('@shikijs/themes/github-light'),
    import('@shikijs/themes/github-dark'),
  ],
  langs: [
    import('@shikijs/langs/json'),
    import('@shikijs/langs/sh'),
    import('@shikijs/langs/tsx'),
    import('@shikijs/langs/typescript'),
  ],
  engine: createOnigurumaEngine(() => import('shiki/wasm')),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypeShikiFromHighlighter,
        highlighter,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
