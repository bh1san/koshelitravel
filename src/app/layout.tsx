import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; 

export const metadata: Metadata = {
  title: 'KosheliTravel - Your Next Adventure Awaits',
  description: 'Explore amazing travel packages and get personalized recommendations with KosheliTravel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
