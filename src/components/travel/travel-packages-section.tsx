
"use client";

import { useState, useMemo } from 'react';
import type { TravelPackage } from '@/lib/mock-data';
import { PackageCard } from './package-card';
import { SearchBar, type SearchCriteria } from './search-bar';
import { format } from 'date-fns';

interface TravelPackagesSectionProps {
  initialPackages: TravelPackage[];
}

export function TravelPackagesSection({ initialPackages }: TravelPackagesSectionProps) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    destination: '',
    date: undefined,
    budget: '',
  });

  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
  };

  const filteredPackages = useMemo(() => {
    return initialPackages.filter((pkg) => {
      const destinationMatch = pkg.destination.toLowerCase().includes(searchCriteria.destination.toLowerCase());
      const dateMatch = searchCriteria.date ? format(searchCriteria.date, "yyyy-MM-dd") === pkg.date : true;
      const budgetMatch = searchCriteria.budget && searchCriteria.budget !== 'all' ? pkg.budgetCategory === searchCriteria.budget : true;
      return destinationMatch && dateMatch && budgetMatch;
    });
  }, [searchCriteria, initialPackages]);

  return (
    <section id="packages" className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">Explore Our Travel Packages</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Find your next adventure from our curated list of destinations. Filter by your preferences to get started.
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} />

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} packageInfo={pkg} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground mt-10">
            No packages match your current search criteria. Try broadening your search!
          </p>
        )}
      </div>
    </section>
  );
}
