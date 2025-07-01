
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  DEFAULT_BANNER_IMAGE_URL, 
  DEFAULT_BANNER_TITLE, 
  DEFAULT_BANNER_SUBTITLE,
  BANNER_IMAGE_URL_STORAGE_KEY,
  BANNER_TITLE_STORAGE_KEY,
  BANNER_SUBTITLE_STORAGE_KEY
} from '@/lib/mock-data';

export function HeroSection() {
  const [imageUrl, setImageUrl] = useState(DEFAULT_BANNER_IMAGE_URL);
  const [title, setTitle] = useState(DEFAULT_BANNER_TITLE);
  const [subtitle, setSubtitle] = useState(DEFAULT_BANNER_SUBTITLE);

  useEffect(() => {
    // This effect runs on the client to get the latest values
    const storedImageUrl = localStorage.getItem(BANNER_IMAGE_URL_STORAGE_KEY);
    const storedTitle = localStorage.getItem(BANNER_TITLE_STORAGE_KEY);
    const storedSubtitle = localStorage.getItem(BANNER_SUBTITLE_STORAGE_KEY);

    if (storedImageUrl) setImageUrl(storedImageUrl);
    if (storedTitle) setTitle(storedTitle);
    if (storedSubtitle) setSubtitle(storedSubtitle);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === BANNER_IMAGE_URL_STORAGE_KEY && event.newValue) {
        setImageUrl(event.newValue);
      }
      if (event.key === BANNER_TITLE_STORAGE_KEY && event.newValue) {
        setTitle(event.newValue);
      }
      if (event.key === BANNER_SUBTITLE_STORAGE_KEY && event.newValue) {
        setSubtitle(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <section
      key={imageUrl} // Add key to force re-render if URL changes
      className="relative bg-cover bg-center text-primary-foreground py-20 md:py-32 min-h-[60vh] flex items-center"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div> {/* Dark overlay for text readability */}
      <div className="container relative z-10 text-center animate-fadeIn">
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
