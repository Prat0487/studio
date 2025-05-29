
'use client';

import { useState, useMemo } from 'react';
import type { Restaurant } from '@/types';
import { restaurants as allRestaurants } from '@/lib/data';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from 'lucide-react';
import { RestaurantCard } from '@/components/RestaurantCard'; // Added missing import

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedSort, setSelectedSort] = useState('popularity');

  const cuisines = useMemo(() => {
    if (!Array.isArray(allRestaurants) || allRestaurants.length === 0) {
        console.warn("allRestaurants is not a valid array or is empty. Check data.ts.");
        return ['All'];
    }
    const cuisineSet = new Set(
        allRestaurants
            .map(r => r.cuisine)
            .filter(cuisine => typeof cuisine === 'string' && cuisine.trim() !== '')
    );
    return ['All', ...Array.from(cuisineSet)]; // Ensure 'All' is present and convert Set to Array
  }, []);

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating' },
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
  ];

  const displayedRestaurants = useMemo(() => {
    if (!Array.isArray(allRestaurants)) {
        console.warn("allRestaurants is not an array or is undefined. Check data.ts.");
        return [];
    }

    let filteredRestaurants = [...allRestaurants];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        (restaurant.name?.toLowerCase().includes(lowerSearchTerm) ?? false) ||
        (restaurant.cuisine?.toLowerCase().includes(lowerSearchTerm) ?? false)
      );
    }

    if (selectedCuisine && selectedCuisine !== 'All') {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant.cuisine === selectedCuisine
      );
    }

    const sortedRestaurants = [...filteredRestaurants];

    switch (selectedSort) {
      case 'popularity':
        sortedRestaurants.sort((a, b) => (b.popularityIndex ?? 0) - (a.popularityIndex ?? 0));
        break;
      case 'rating':
        sortedRestaurants.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'name_asc':
        sortedRestaurants.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        break;
      case 'name_desc':
        sortedRestaurants.sort((a, b) => (b.name ?? "").localeCompare(a.name ?? ""));
        break;
      default:
        break;
    }
    return sortedRestaurants;
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
              aria-label="Search restaurants or cuisines"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Select
            value={selectedCuisine}
            onValueChange={setSelectedCuisine}
          >
            <SelectTrigger className="text-base h-12" aria-label="Filter by Cuisine">
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
            <SelectTrigger className="text-base h-12" aria-label="Sort by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
