
"use client";

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  DEFAULT_BANNER_IMAGE_URL, 
  DEFAULT_BANNER_TITLE, 
  DEFAULT_BANNER_SUBTITLE,
  BANNER_IMAGE_URL_STORAGE_KEY,
  BANNER_TITLE_STORAGE_KEY,
  BANNER_SUBTITLE_STORAGE_KEY
} from '@/lib/mock-data';

export function HeroSection() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);

  // This function will be reused to load data from localStorage
  const loadDataFromStorage = useCallback(() => {
    const storedImageUrl = localStorage.getItem(BANNER_IMAGE_URL_STORAGE_KEY);
    const storedTitle = localStorage.getItem(BANNER_TITLE_STORAGE_KEY);
    const storedSubtitle = localStorage.getItem(BANNER_SUBTITLE_STORAGE_KEY);
    
    setImageUrl(storedImageUrl || DEFAULT_BANNER_IMAGE_URL);
    setTitle(storedTitle || DEFAULT_BANNER_TITLE);
    setSubtitle(storedSubtitle || DEFAULT_BANNER_SUBTITLE);
  }, []);

  useEffect(() => {
    // Load initial data on client mount
    loadDataFromStorage();

    // Define the event handler for cross-tab updates
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === BANNER_IMAGE_URL_STORAGE_KEY ||
        event.key === BANNER_TITLE_STORAGE_KEY ||
        event.key === BANNER_SUBTITLE_STORAGE_KEY
      ) {
        // When storage changes in another tab, reload the data
        loadDataFromStorage();
      }
    };

    // Add event listener for the 'storage' event
    window.addEventListener('storage', handleStorageChange);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadDataFromStorage]);

  // While loading on the client for the first time, show a skeleton.
  // This prevents hydration errors and provides a better loading experience.
  if (imageUrl === null || title === null || subtitle === null) {
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
      key={imageUrl} // Using a key forces a re-render on image change, helping with background updates
      className="relative bg-cover bg-center text-primary-foreground py-20 md:py-32 min-h-[60vh] flex items-center transition-all duration-500 animate-fadeIn"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6 text-white shadow-text">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 shadow-text">
          {subtitle}
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
