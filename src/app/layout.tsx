import Footer from '@/app/_components/footer';
import { HOME_OG_IMAGE_URL, SITE_URL } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from 'next-themes';
import { Feed } from './_components/feed';
import { ThemeToggle } from './_components/theme-toggle';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jack Moore's Blog",
  description: 'Jack Moore’s personal blog.',
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
  alternates: {
    types: {
      'application/rss+xml': `${SITE_URL}/feed`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
