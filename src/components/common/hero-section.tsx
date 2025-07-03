
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface BannerData {
  imageUrl: string;
  title: string;
  subtitle: string;
}

export function HeroSection() {
  const [data, setData] = useState<BannerData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    async function fetchBannerData() {
      try {
        // Add cache-busting query parameter
        const response = await fetch(`/api/settings/banner?t=${new Date().getTime()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const bannerData = await response.json();
        setData(bannerData);
      } catch (error) {
        console.error("Failed to fetch banner data:", error);
        // Set to empty strings to avoid showing stale data on error
        setData({ imageUrl: '', title: 'Error Loading Banner', subtitle: 'Could not load banner content.' });
      }
    }
    
    fetchBannerData();
  }, []);

  if (!isMounted || !data) {
    return (
      <section className="relative py-20 md:py-32 min-h-[60vh] flex items-center bg-muted">
         <Skeleton className="absolute inset-0" />
         <div className="container relative z-10 text-center">
             <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
             <Skeleton className="h-6 w-1/2 mx-auto" />
             <div className="mt-8 flex justify-center gap-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-40" />
             </div>
         </div>
      </section>
    );
  }

  return (
    <section
      key={data.imageUrl}
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
      <style jsx global>{`
        .shadow-text {
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
}
