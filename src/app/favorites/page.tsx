'use client';

import { useContext } from 'react';
import { FavoritesContext } from '@/context/FavoritesContext';
import { FavoriteRestaurantCard } from '@/components/FavoriteRestaurantCard';
import { FavoriteItemCard } from '@/components/FavoriteItemCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, Utensils } from 'lucide-react';

export default function FavoritesPage() {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Loading Favorites...</h1>
      </div>
    );
  }

  const { favoriteRestaurants, favoriteItems } = favoritesContext;

  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-primary-foreground flex items-center justify-center">
            <Star className="mr-3 h-10 w-10 fill-white text-white" /> Your Favorites
        </h1>
        <p className="mt-2 text-lg text-primary-foreground/90">All your saved restaurants and dishes in one place.</p>
      </section>

      {favoriteRestaurants.length === 0 && favoriteItems.length === 0 && (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <p className="text-xl text-muted-foreground">You haven't added any favorites yet.</p>
          <Button asChild className="mt-6">
            <Link href="/">Explore Restaurants</Link>
          </Button>
        </div>
      )}

      {favoriteRestaurants.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <Utensils className="mr-2 h-7 w-7 text-primary"/>Favorite Restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteRestaurants.map(restaurant => (
              <FavoriteRestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      )}

      {favoriteItems.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <Star className="mr-2 h-7 w-7 text-primary fill-primary"/>Favorite Menu Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteItems.map(item => (
              <FavoriteItemCard key={`${item.restaurantId}-${item.id}`} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
