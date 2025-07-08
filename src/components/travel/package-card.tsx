
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { TravelPackage } from '@/lib/mock-data';
import { MapPin, CalendarDays, DollarSign, Tag } from 'lucide-react';

interface PackageCardProps {
  packageInfo: TravelPackage;
}

export function PackageCard({ packageInfo }: PackageCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg animate-fadeIn">
      <CardHeader className="p-0 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={packageInfo.image}
          alt={packageInfo.title}
          width={600}
          height={400}
          className="object-cover w-full h-48 md:h-56"
          data-ai-hint={packageInfo.dataAiHint || 'travel landscape'}
          loading="lazy"
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline font-semibold mb-2 text-primary">{packageInfo.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3">{packageInfo.description}</CardDescription>
        <div className="space-y-1 text-xs text-foreground/80">
          <p className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> {packageInfo.destination}</p>
          <p className="flex items-center gap-1.5"><CalendarDays size={14} className="text-accent" /> {packageInfo.duration}</p>
          <p className="flex items-center gap-1.5"><DollarSign size={14} className="text-accent" /> {packageInfo.price} ({packageInfo.budgetCategory})</p>
        </div>
        {packageInfo.tags && packageInfo.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {packageInfo.tags.map(tag => (
              <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                <Tag size={12}/> {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
