import { getAllPosts, getAllTags, slugifyTag } from '@/lib/api';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPosts, allTags] = await Promise.all([getAllPosts(), getAllTags()]);

  return [
    {
      url: 'https://www.jtmthf.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.jtmthf.com/tags',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...allPosts.map((post) => {
      return {
        url: `https://www.jtmthf.com/posts/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      } satisfies MetadataRoute.Sitemap[number];
    }),
    ...allTags.map(({ tag }) => {
      return {
        url: `https://www.jtmthf.com/tags/${slugifyTag(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.4,
      } satisfies MetadataRoute.Sitemap[number];
    }),
  ];
}
