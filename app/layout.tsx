import Navigation from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { GlobalSearchBar } from '@/components/ui/global-search';
import { siteConfig } from '@/config/site';

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
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          socialButtonsBlockButtonText: 'text-primary',
          socialButtonsBlockButton: '[border-width:2px!important] border-input',
          footerActionLink: 'text-primary',
          formFieldInput: '[border-width:2px!important] border-input',
          formFieldInput__identifier: 'email',
          modalCloseButton: 'text-primary',
        },
      }}
    >
      <html className='antialiased' lang='en' suppressHydrationWarning>
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
          >
            <div className='flex w-full h-full pb-48 md:pb-0'>
              <Suspense fallback={null}>
                <Navigation />
              </Suspense>
              <div className='w-full px-8 pt-8 pb-32 overflow-y-auto min-h-screen'>
                {children}
              </div>
            </div>
            <Toaster
              className='dark:brightness-125 dark:contrast-125'
              richColors
              closeButton
            />
            <GlobalSearchBar />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
