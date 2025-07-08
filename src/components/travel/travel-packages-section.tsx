
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { TravelPackage } from '@/lib/mock-data';
import { PackageCard } from './package-card';
import { SearchBar, type SearchCriteria } from './search-bar';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export function TravelPackagesSection() {
  const [allPackages, setAllPackages] = useState<TravelPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    destination: '',
    date: undefined,
    budget: '',
  });

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setAllPackages(data);
      } catch (error) {
        console.error("Failed to load packages:", error);
        // Optionally, show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);


  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
  };

  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      const destinationMatch = pkg.destination.toLowerCase().includes(searchCriteria.destination.toLowerCase());
      const dateMatch = searchCriteria.date ? format(searchCriteria.date, "yyyy-MM-dd") === pkg.date : true;
      const budgetMatch = searchCriteria.budget && searchCriteria.budget !== 'all' ? pkg.budgetCategory === searchCriteria.budget : true;
      return destinationMatch && dateMatch && budgetMatch;
    });
  }, [searchCriteria, allPackages]);

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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[224px] w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPackages.length > 0 ? (
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
