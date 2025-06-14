"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/70 to-accent/70 text-primary-foreground py-20 md:py-32 min-h-[60vh] flex items-center">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Breathtaking travel destination"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="absolute inset-0 z-0 opacity-40"
        data-ai-hint="travel landscape mountain"
        priority
      />
      <div className="container relative z-10 text-center animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6 text-white shadow-text">
          Your Next Adventure Awaits
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 shadow-text">
          Discover breathtaking destinations and create unforgettable memories with KosheliTravel.
          Personalized plans, expert advice, and exclusive deals.
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
