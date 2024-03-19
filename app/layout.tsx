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

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Koalify',
  description: 'A financial calculator for the future.',
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
            <div className='flex w-full h-full pb-32 lg:pb-0'>
              <Navigation />
              <div className='w-full px-8 py-24 lg:p-8 overflow-y-auto min-h-screen'>
                {children}
              </div>
            </div>
            <Toaster
              className='dark:brightness-125 dark:contrast-125'
              richColors
              closeButton
            />
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
