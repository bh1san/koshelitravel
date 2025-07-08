
import { readPackages } from '@/lib/package-store';
import { PackagesView } from './packages-view';

export async function TravelPackagesSection() {
  const allPackages = await readPackages();

  return (
    <section id="packages" className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">Explore Our Travel Packages</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Find your next adventure from our curated list of destinations. Filter by your preferences to get started.
          </p>
        </div>
        
        <PackagesView initialPackages={allPackages} />

      </div>
    </section>
  );
}
