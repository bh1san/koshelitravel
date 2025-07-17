
'use client';

import { useState, useMemo } from 'react';
import { readPackages } from '@/lib/package-store';
import { type TravelPackage } from '@/lib/mock-data';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { Search, DollarSign, Clock, CalendarDays, ListFilter } from 'lucide-react';

export default function PackagesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [searchTerm, setSearchTerm] = useState((searchParams.q as string) || '');
  const [budgetCategory, setBudgetCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  useState(() => {
    async function loadPackages() {
      const pkgs = await readPackages();
      setPackages(pkgs);
    }
    loadPackages();
  });

  const filteredAndSortedPackages = useMemo(() => {
    let filtered = packages
      .filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(pkg => 
        budgetCategory === 'all' || pkg.budgetCategory === budgetCategory
      );

    const priceToNumber = (price: string) => parseFloat(price.replace(/[^0-9.]/g, ''));

    switch (sortOrder) {
      case 'price_asc':
        filtered.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
        break;
      case 'price_desc':
        filtered.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
        break;
      case 'date_asc':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date_desc':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    return filtered;
  }, [packages, searchTerm, budgetCategory, sortOrder]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container text-center animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Explore Our Packages</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Find your next adventure from our curated list of world-class travel packages.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            {/* Filter and Sort Controls */}
            <Card className="mb-10 p-4 md:p-6 shadow-md bg-card">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="search" className="flex items-center gap-2 font-semibold"><Search size={16} /> Search Packages</Label>
                  <Input
                    id="search"
                    placeholder="e.g., Paris, beach, adventure..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="flex items-center gap-2 font-semibold"><DollarSign size={16} /> Budget</Label>
                  <Select value={budgetCategory} onValueChange={setBudgetCategory}>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="All Budgets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Budgets</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="mid-range">Mid-Range</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sort" className="flex items-center gap-2 font-semibold"><ListFilter size={16}/> Sort By</Label>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger id="sort">
                            <SelectValue placeholder="Default" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="price_asc">Price: Low to High</SelectItem>
                            <SelectItem value="price_desc">Price: High to Low</SelectItem>
                            <SelectItem value="date_asc">Date: Sooner to Later</SelectItem>
                            <SelectItem value="date_desc">Date: Later to Sooner</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <Button onClick={() => { setSearchTerm(''); setBudgetCategory('all'); setSortOrder('default'); }} variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </div>
            </Card>

            {/* Packages Grid */}
            {filteredAndSortedPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedPackages.map((pkg) => (
                    <Card key={pkg.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={pkg.dataAiHint}
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>{pkg.title}</CardTitle>
                        <p className="text-sm text-muted-foreground pt-1">{pkg.destination}</p>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2"><CalendarDays size={16} className="text-primary"/><span>{pkg.date}</span></div>
                            <div className="flex items-center gap-2"><Clock size={16} className="text-primary"/><span>{pkg.duration}</span></div>
                        </div>
                        <p className="text-sm text-foreground/80 line-clamp-3">{pkg.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center bg-secondary/50 p-4">
                        <div>
                            <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                        </div>
                        <Button asChild>
                            <Link href={`/packages/${pkg.id}`}>View Details</Link>
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-2xl font-semibold">No Packages Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
                </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
