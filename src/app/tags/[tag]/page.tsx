import Container from '@/app/_components/container';
import Header from '@/app/_components/header';
import { PostPreview } from '@/app/_components/post-preview';
import { getAllTags, getPostsByTag, slugifyTag } from '@/lib/api';
import { SITE_URL } from '@/lib/constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{
    tag: string;
  }>;
};

export default async function TagPage(props: Params) {
  const params = await props.params;
  const posts = await getPostsByTag(params.tag);
  const allTags = await getAllTags();
  const matchedTag = allTags.find(
    ({ tag }) => slugifyTag(tag) === params.tag,
  )?.tag;

  if (!matchedTag) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <Header />
        <section className="mb-32">
          <h2 className="mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
            #{matchedTag}
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
          <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
            {posts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
                tags={post.tags}
              />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const allTags = await getAllTags();
  const matchedTag = allTags.find(
    ({ tag }) => slugifyTag(tag) === params.tag,
  )?.tag;

  if (!matchedTag) {
    return notFound();
  }

  const title = `#${matchedTag}`;
  const description = `All posts tagged with ${matchedTag}`;
  const url = `${SITE_URL}/tags/${params.tag}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const allTags = await getAllTags();

  return allTags.map(({ tag }) => ({
    tag: slugifyTag(tag),
  }));
}
