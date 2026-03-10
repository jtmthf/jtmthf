import Container from '@/app/_components/container';
import Header from '@/app/_components/header';
import { TagChip } from '@/app/_components/tag-chip';
import { getAllTags } from '@/lib/api';
import { SITE_URL } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Tags',
  description: 'Browse all topics and tags from the blog.',
  openGraph: {
    title: 'Tags',
    description: 'Browse all topics and tags from the blog.',
    url: `${SITE_URL}/tags`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/tags`,
  },
};

export default async function TagsPage() {
  const allTags = await getAllTags();

  return (
    <main>
      <Container>
        <Header />
        <section className="mb-32">
          <h2 className="mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
            Tags
          </h2>
          <div className="flex flex-wrap gap-3">
            {allTags.map(({ tag, count }) => (
              <div key={tag} className="flex items-center gap-1.5">
                <TagChip tag={tag} />
                <span className="text-sm text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
