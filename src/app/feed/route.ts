import { getAllPosts } from '@/lib/api';
import { SITE_URL } from '@/lib/constants';
import { formatDateToRFC822 } from '@/lib/format-date';
import { stripIndent as xml } from '@/lib/strip-indent';

export async function GET(): Promise<Response> {
  const allPosts = await getAllPosts();

  const rssFeed = xml`
    <?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>Jack Moore's Blog</title>
        <link>${SITE_URL}</link>
        <description>Jack Moore’s personal blog</description>
        <lastBuildDate>${formatDateToRFC822(new Date())}</lastBuildDate>
        <pubDate>${formatDateToRFC822(new Date())}</pubDate>
        <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml" />
        ${allPosts
          .map(
            (post) => xml`
              <item>
                <title>${post.title}</title>
                <link>${SITE_URL}/posts/${post.slug}</link>
                <description>${post.excerpt}</description>
                <guid isPermaLink="false">${post.id}</guid>
                <pubDate>${formatDateToRFC822(new Date(post.date))}</pubDate>
              </item>
            `,
          )
          .join('\n')}
      </channel>
    </rss>
  `;

  return new Response(rssFeed, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
