
'use client';

import { useState, useMemo } from 'react';
import type { Restaurant } from '@/types';
import { restaurants as allRestaurants } from '@/lib/data';
import { RestaurantCard } from '@/components/RestaurantCard';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedSort, setSelectedSort] = useState('popularity');

  const cuisines = useMemo(() => ['All', ...new Set(allRestaurants.map(r => r.cuisine))], []);
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating' },
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
  ];

  const displayedRestaurants = useMemo(() => {
    let filteredRestaurants = [...allRestaurants];

    // Filter by search term
    if (searchTerm) {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by cuisine
    if (selectedCuisine !== 'All') {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant.cuisine === selectedCuisine
      );
    }

    // Sort restaurants
    switch (selectedSort) {
      case 'popularity':
        // Assuming higher popularityIndex means more popular
        filteredRestaurants.sort((a, b) => b.popularityIndex - a.popularityIndex);
        break;
      case 'rating':
        filteredRestaurants.sort((a, b) => b.rating - a.rating);
        break;
      case 'name_asc':
        filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filteredRestaurants.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filteredRestaurants;
  }, [searchTerm, selectedCuisine, selectedSort]);

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary-foreground">Welcome to FoodieFast!</h1>
        <p className="mt-4 text-xl text-primary-foreground/90">Your next delicious meal is just a few clicks away.</p>
      </section>

      <div className="p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search restaurants or cuisines..." 
              className="pl-10 text-base h-12" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Select 
            value={selectedCuisine}
            onValueChange={setSelectedCuisine}
          >
            <SelectTrigger className="text-base h-12">
              <SelectValue placeholder="Filter by Cuisine" />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map(cuisine => (
                <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={selectedSort}
            onValueChange={setSelectedSort}
          >
            <SelectTrigger className="text-base h-12">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* 
          <Button 
            className="md:col-span-1 h-12 text-base"
            // onClick={() => { /* This button could trigger a more complex filter modal or apply all filters if needed */ }}
          >
            <SlidersHorizontal className="mr-2 h-5 w-5" /> Apply Filters
          </Button> 
          */}
        </div>
      </div>
      
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Explore Restaurants</h2>
        {displayedRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedRestaurants.map((restaurant: Restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">No restaurants found. Try adjusting your filters!</p>
        )}
      </section>
    </div>
  );
}
