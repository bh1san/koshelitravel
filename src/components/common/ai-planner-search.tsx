
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function AIPlannerSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/ai-planner?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., 'a relaxing beach vacation in asia'"
        className="flex-grow bg-background/80 text-foreground placeholder:text-muted-foreground border-input-border"
        aria-label="Travel preferences for AI planner"
      />
      <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <Search className="mr-2 h-4 w-4" />
        Get Ideas
      </Button>
    </form>
  );
}
