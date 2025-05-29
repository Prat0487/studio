'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Restaurant } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Heart, Utensils, Flame } from 'lucide-react';
import { useContext } from 'react';
import { FavoritesContext } from '@/context/FavoritesContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const favoritesContext = useContext(FavoritesContext);
  if (!favoritesContext) throw new Error("FavoritesContext not found");
  
  const { addFavoriteRestaurant, removeFavoriteRestaurant, isFavoriteRestaurant } = favoritesContext;
  const isFav = isFavoriteRestaurant(restaurant.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking favorite button
    if (isFav) {
      removeFavoriteRestaurant(restaurant.id);
    } else {
      addFavoriteRestaurant(restaurant);
    }
  };
  
  const getCuisineIcon = (cuisine: string) => {
    switch (cuisine.toLowerCase()) {
      case 'italian': return <Utensils className="h-4 w-4 text-accent" />;
      case 'japanese': return <Flame className="h-4 w-4 text-accent" />; // Using Flame as a generic "exotic" icon
      case 'american': return <Star className="h-4 w-4 text-accent" />; // Using Star as a generic "popular" icon
      default: return <Utensils className="h-4 w-4 text-accent" />;
    }
  };

  return (
    <Link href={`/restaurants/${restaurant.id}`} passHref>
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
        <CardHeader className="p-0 relative">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={restaurant.dataAiHint || "restaurant food"}
          />
           <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/70 hover:bg-background"
            onClick={handleFavoriteToggle}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-xl mb-2">{restaurant.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            {getCuisineIcon(restaurant.cuisine)}
            <span className="ml-1">{restaurant.cuisine}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1">{restaurant.rating.toFixed(1)}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button variant="outline" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            View Menu
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
