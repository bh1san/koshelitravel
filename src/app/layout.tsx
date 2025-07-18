
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { WhatsappChat } from '@/components/common/whatsapp-chat';

export const metadata: Metadata = {
  title: 'KosheliTravel - Your Next Adventure Awaits',
  description: 'Personalized travel planning with AI-powered recommendations. Discover unique destinations with KosheliTravel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3785928841766736"
     crossorigin="anonymous"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground">
        {children}
        <Toaster />
        <WhatsappChat />
      </body>
    </html>
  );
}
