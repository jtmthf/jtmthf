// @ts-check

import createMDX from '@next/mdx';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { getHighlighterCore } from 'shiki/core';
import getWasm from 'shiki/wasm';

const highlighter = await getHighlighterCore({
  themes: [
    import('shiki/themes/github-light.mjs'),
    import('shiki/themes/github-dark.mjs'),
  ],
  langs: [
    import('shiki/langs/json.mjs'),
    import('shiki/langs/sh.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/typescript.mjs'),
  ],
  loadWasm: getWasm,
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
