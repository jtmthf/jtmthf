import Footer from '@/app/_components/footer';
import { SITE_URL } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { Feed } from './_components/feed';
import { ThemeToggle } from './_components/theme-toggle';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jack Moore's Blog",
    template: '%s | Jack Moore',
  },
  description:
    "Jack Moore's personal blog about web development, JavaScript, and technology.",
  keywords: [
    'Jack Moore',
    'blog',
    'web development',
    'JavaScript',
    'programming',
    'technology',
  ],
  authors: [{ name: 'Jack Moore', url: SITE_URL }],
  creator: 'Jack Moore',
  publisher: 'Jack Moore',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Jack Moore',
    title: "Jack Moore's Blog",
    description:
      "Jack Moore's personal blog about web development, JavaScript, and technology.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Jack Moore's Blog",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jack Moore's Blog",
    description:
      "Jack Moore's personal blog about web development, JavaScript, and technology.",
    creator: '@jtmthf',
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/feed`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jack Moore',
    url: SITE_URL,
    sameAs: ['https://github.com/jtmthf', 'https://twitter.com/jtmthf'],
    jobTitle: 'Software Engineer',
    description:
      "Jack Moore's personal blog about web development, JavaScript, and technology.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <nav className="flex justify-end p-8">
              <Feed />
              <ThemeToggle />
            </nav>
          </header>
          <div className="min-h-screen">{children}</div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
