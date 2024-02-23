import { getAllPosts } from '@/lib/api';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  return [
    {
      url: 'https://jtmthf.com',
      lastModified: new Date(),
      changefreq: 'daily',
      priority: 1,
    },
    ...allPosts.map((post) => {
      return {
        url: `https://jtmthf.com/posts/${post.slug}`,
        lastModified: new Date(),
        changefreq: 'weekly',
        priority: 0.5,
      };
    }),
  ] satisfies MetadataRoute.Sitemap;
}
