import { restaurants } from '@/lib/data';
import { RestaurantCard } from '@/components/RestaurantCard';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Search,SlidersHorizontal } from 'lucide-react';

// This page will be a server component by default.
// Filtering/Sorting would ideally be server-side, but for simplicity, we'll mock client-side controls.
// For a real app, these would trigger re-fetches or use query params.

export default function HomePage() {
  // Mock: In a real app, these would come from state and affect the `restaurants` list.
  const cuisines = ['All', ...new Set(restaurants.map(r => r.cuisine))];
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating' },
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
  ];

  // TODO: Implement actual filtering and sorting logic if this were a client component
  // or pass params to server for server-side logic.
  // For now, display all restaurants.
  const displayedRestaurants = restaurants;

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary-foreground">Welcome to FoodieFast!</h1>
        <p className="mt-4 text-xl text-primary-foreground/90">Your next delicious meal is just a few clicks away.</p>
      </section>

      <div className="p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <Input type="search" placeholder="Search restaurants or cuisines..." className="pl-10 text-base h-12" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Select defaultValue="All">
            <SelectTrigger className="text-base h-12">
              <SelectValue placeholder="Filter by Cuisine" />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map(cuisine => (
                <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="popularity">
            <SelectTrigger className="text-base h-12">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <Button className="md:col-span-1 h-12 text-base">
            <SlidersHorizontal className="mr-2 h-5 w-5" /> Apply Filters
          </Button> */}
        </div>
      </div>
      
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Explore Restaurants</h2>
        {displayedRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedRestaurants.map((restaurant) => (
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
