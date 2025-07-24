import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { readSettings } from '@/lib/settings-store';

export default async function NotFound() {
  const settings = await readSettings();
  const logoUrl = settings.logoUrl;

  return (
    <div className="flex flex-col min-h-screen">
      <Header logoUrl={logoUrl} />
      <main className="flex-grow flex flex-col items-center justify-center bg-background text-foreground text-center px-4">
        <h1 className="text-9xl font-bold text-primary animate-pulse">404</h1>
        <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Oops! The page you are looking for does not exist.
        </p>
        <Button asChild className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </main>
      <Footer logoUrl={logoUrl}/>
    </div>
  );
}
