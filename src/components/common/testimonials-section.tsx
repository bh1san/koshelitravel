"use client";

import { mockTestimonials } from '@/lib/mock-data';
import { TestimonialCard } from './testimonial-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Assuming carousel is available

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
      </div>
    </section>
  );
}
