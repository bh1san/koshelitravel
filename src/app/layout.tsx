
import type {Metadata} from 'next';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { WhatsappChat } from '@/components/common/whatsapp-chat';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { readSettings } from '@/lib/settings-store';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KosheliTravel - Your Next Adventure Awaits',
  description: 'Personalized travel planning with AI-powered recommendations. Discover unique destinations with KosheliTravel.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await readSettings();
  const logoUrl = settings.logoUrl;

  return (
    <html lang="en">
       <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3785928841766736"
     crossOrigin="anonymous"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <Header logoUrl={logoUrl} />
        {children}
        <Footer logoUrl={logoUrl} />
        <Toaster />
        <WhatsappChat />
      </body>
    </html>
  );
}
