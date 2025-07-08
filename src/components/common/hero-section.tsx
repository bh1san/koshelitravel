
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getSiteSettings } from '@/app/actions/settingsActions';

// This is now a robust Server Component.
// It fetches the latest data from the persistent store on the server.
export async function HeroSection() {
  // Directly get the latest data from our server-side store.
  const settings = await getSiteSettings();
  const data = settings.banner;

  return (
    <section
      key={data.imageUrl} // Use key to force re-render when the URL changes
      className="relative bg-cover bg-center text-primary-foreground py-20 md:py-32 min-h-[60vh] flex items-center transition-all duration-500 animate-fadeIn"
      style={{ backgroundImage: `url('${data.imageUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6 text-white shadow-text">
          {data.title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 shadow-text">
          {data.subtitle}
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
            <Link href="#packages">Explore Packages</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
            <Link href="#recommendations">Get AI Recommends</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
