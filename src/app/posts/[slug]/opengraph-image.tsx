import { getPostBySlug } from '@/lib/api';
import { ImageResponse } from 'next/og';

export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return [];
  }

  return [
    {
      id: post.slug,
      alt: post.title,
      size,
      contentType,
    },
  ];
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title || 'Blog Post';

  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: 'linear-gradient(to bottom right, #1a1a2e, #16213e)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#e94560',
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 16,
            letterSpacing: 4,
          }}
        >
          JACK MOORE
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: 42,
            fontWeight: 700,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          {title}
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
