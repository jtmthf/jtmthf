import { PostBody } from '@/app/_components/post-body';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '../../../lib/api';
import { SITE_URL } from '../../../lib/constants';
import Alert from '../../_components/alert';
import Container from '../../_components/container';
import Header from '../../_components/header';
import { PostHeader } from '../../_components/post-header';

export default async function Post(props: Params) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const Content = await import(`@/_posts/${params.slug}.mdx`).then(
    (mod) => mod.default,
  );

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody>
            <Content />
          </PostBody>
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Jack Moore's Blog`;

  return {
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
