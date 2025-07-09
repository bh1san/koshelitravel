
import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'KosheliTravel - Your Next Adventure Awaits',
  description: 'Explore amazing travel packages and get personalized recommendations with KosheliTravel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" className={inter.variable}>
      <body>
        {adClient && !adClient.includes('YOUR_ADSENSE_CLIENT_ID') && (
            <Script
              id="adsense-script"
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
