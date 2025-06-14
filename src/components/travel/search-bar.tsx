"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Search, DollarSign, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export interface SearchCriteria {
  destination: string;
  date: Date | undefined;
  budget: string;
}

interface SearchBarProps {
  onSearch: (criteria: SearchCriteria) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [budget, setBudget] = useState(''); // 'all', 'budget', 'mid-range', 'luxury'

  const handleSearch = () => {
    onSearch({ destination, date, budget });
  };

  return (
    <div className="p-6 bg-card rounded-xl shadow-lg space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
      <div className="flex-grow space-y-1">
        <label htmlFor="destination" className="text-sm font-medium text-foreground/80 flex items-center gap-1"><MapPin size={16}/> Destination</label>
        <Input
          id="destination"
          type="text"
          placeholder="e.g., Paris, Bali"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-background"
        />
      </div>

      <div className="flex-grow space-y-1">
        <label htmlFor="date" className="text-sm font-medium text-foreground/80 flex items-center gap-1"><CalendarIcon size={16}/> Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={`w-full justify-start text-left font-normal bg-background ${!date && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex-grow space-y-1">
        <label htmlFor="budget" className="text-sm font-medium text-foreground/80 flex items-center gap-1"><DollarSign size={16}/> Budget</label>
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger id="budget" className="w-full bg-background">
            <SelectValue placeholder="Any Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Budget</SelectItem>
            <SelectItem value="budget">Budget Friendly</SelectItem>
            <SelectItem value="mid-range">Mid-Range</SelectItem>
            <SelectItem value="luxury">Luxury</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSearch} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </div>
  );
}
