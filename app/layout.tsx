import Navigation from '@/app/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { GlobalSearchBar } from '@/components/ui/global-search';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { headers } from 'next/headers';
import { getSelectorsByUserAgent } from 'react-device-detect';

import './globals.css';
import { themes } from '@/lib/theme';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
    'shadcn UI',
  ],
  authors: [
    {
      name: 'raslan',
      url: 'https://raslan.dev',
    },
  ],
  creator: 'raslan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@raslandev',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/manifest.json`,
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteConfig.name,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
};
export const viewport: Viewport = {
  themeColor: '#09090b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get('user-agent') ?? ''
  );
  const path = new URL(headers()?.get('x-url') as string).pathname;
  return (
    <html className='antialiased' lang='en' suppressHydrationWarning dir='ltr'>
      <head />
      <body
        className={cn(
          'min-h-screen h-full bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          themes={themes.map((theme) => theme.theme)}
        >
          <div className='flex w-full h-full pb-48 md:pb-0'>
            <Navigation path={path} isMobile={isMobile} />
            <div className='w-full px-8 md:pl-4 md:pr-8 pt-8 pb-32 overflow-y-auto min-h-screen'>
              {children}
            </div>
          </div>
          <Toaster richColors closeButton />
          <GlobalSearchBar />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
