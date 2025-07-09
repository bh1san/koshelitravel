
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BannerProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

// This is now a simple, synchronous Server Component that receives data via props.
export function HeroSection({ banner }: { banner: BannerProps }) {
  // Use key to force re-render when the URL changes. This is important for updates.
  return (
    <section
      key={banner.imageUrl} 
      className="relative bg-cover bg-center text-primary-foreground py-20 md:py-32 min-h-[60vh] flex items-center transition-all duration-500 animate-fadeIn"
      style={{ backgroundImage: `url('${banner.imageUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="container relative z-10 text-center">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6 text-[#C7215D] shadow-text"
        >
          Color & Content Test
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 shadow-text">
          {banner.subtitle}
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
