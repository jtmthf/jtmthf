import { ImageResponse } from 'next/og';

export const alt = "Jack Moore's Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 64,
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
            fontSize: 24,
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
            fontSize: 48,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Blog
        </div>
        <div
          style={{
            color: '#a0a0a0',
            fontSize: 20,
            marginTop: 24,
          }}
        >
          Web Development & Technology
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
