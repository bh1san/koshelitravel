import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/lib/mock-data';
import { Quote, UserCircle } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-card shadow-lg rounded-lg overflow-hidden h-full flex flex-col animate-slideInUp">
      <CardContent className="p-6 flex flex-col flex-grow">
        <Quote className="w-8 h-8 text-primary mb-4" />
        <p className="text-foreground/90 italic mb-4 text-sm md:text-base flex-grow">"{testimonial.quote}"</p>
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            {testimonial.image ? (
              <Image
                src={testimonial.image}
                alt={testimonial.author}
                width={48}
                height={48}
                className="rounded-full object-cover"
                data-ai-hint={testimonial.dataAiHint || 'person'}
              />
            ) : (
              <UserCircle className="w-12 h-12 text-muted-foreground" />
            )}
            <div>
              <p className="font-semibold text-primary font-headline">{testimonial.author}</p>
              {testimonial.location && <p className="text-xs text-muted-foreground">{testimonial.location}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
