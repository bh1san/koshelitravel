
'use client';

import { useEffect, useState } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Function to check and update state from localStorage
    const checkStorage = () => {
      const storedImageUrl = localStorage.getItem(BANNER_IMAGE_URL_STORAGE_KEY) || DEFAULT_BANNER_IMAGE_URL;
      const storedTitle = localStorage.getItem(BANNER_TITLE_STORAGE_KEY) || DEFAULT_BANNER_TITLE;
      const storedSubtitle = localStorage.getItem(BANNER_SUBTITLE_STORAGE_KEY) || DEFAULT_BANNER_SUBTITLE;

      // Only update state if the value has actually changed
      if (storedImageUrl !== imageUrl) {
        setImageUrl(storedImageUrl);
      }
      if (storedTitle !== title) {
        setTitle(storedTitle);
      }
      if (storedSubtitle !== subtitle) {
        setSubtitle(storedSubtitle);
      }
    };

    // Initial check
    checkStorage();

    // Set up polling to check for changes every second
    const intervalId = setInterval(checkStorage, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, [isMounted, imageUrl, title, subtitle]);

  if (!isMounted || !imageUrl || !title || !subtitle) {
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
      key={imageUrl} // Using a key forces a re-render on image change
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
