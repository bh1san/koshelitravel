
"use client";

import { useState, useMemo } from 'react';
import type { TravelPackage } from '@/lib/mock-data';
import { PackageCard } from './package-card';
import { SearchBar, type SearchCriteria } from './search-bar';
import { format } from 'date-fns';

interface PackagesViewProps {
  initialPackages: TravelPackage[];
}

export function PackagesView({ initialPackages }: PackagesViewProps) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    destination: '',
    date: undefined,
    budget: '',
  });

  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
  };

  const filteredPackages = useMemo(() => {
    if (!initialPackages) return [];
    return initialPackages.filter((pkg) => {
      const destinationMatch = pkg.destination.toLowerCase().includes(searchCriteria.destination.toLowerCase());
      const dateMatch = searchCriteria.date ? format(searchCriteria.date, "yyyy-MM-dd") === pkg.date : true;
      const budgetMatch = searchCriteria.budget && searchCriteria.budget !== 'all' ? pkg.budgetCategory === searchCriteria.budget : true;
      return destinationMatch && dateMatch && budgetMatch;
    });
  }, [searchCriteria, initialPackages]);

  return (
    <div>
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
  );
}
