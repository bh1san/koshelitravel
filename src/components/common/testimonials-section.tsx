
"use client";

import { mockTestimonials } from '@/lib/mock-data';
import { TestimonialCard } from './testimonial-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 md:py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">What Our Travelers Say</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Real stories from our happy customers. Let their experiences inspire your next journey.
          </p>
        </div>
        
        {mockTestimonials.length > 0 ? (
           <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {mockTestimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 hidden sm:flex"/>
            <CarouselNext className="mr-12 hidden sm:flex"/>
          </Carousel>
        ) : (
          <p className="text-center text-lg text-muted-foreground">No testimonials yet. Be the first to share your adventure!</p>
        )}

        <Card className="mt-12 max-w-2xl mx-auto shadow-xl animate-fadeIn bg-card">
          <CardHeader className="items-center text-center">
            <Star className="w-10 h-10 text-yellow-400 mb-2" /> {/* Standard yellow for star rating */}
            <CardTitle className="font-headline text-2xl text-primary">Share Your Experience!</CardTitle>
            <CardDescription className="text-card-foreground/80">
              Loved your trip with KosheliTravel? Help others discover us by leaving a review on Google.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-base">
              <a 
                href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID_HERE" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Write a Google Review for KosheliTravel"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Write a Google Review
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-4 px-4">
              Tip: Replace "YOUR_PLACE_ID_HERE" in the link's destination with your actual Google Place ID to direct users to your Google Business Profile review page. You can find your Place ID using <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Google's Place ID Finder</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
