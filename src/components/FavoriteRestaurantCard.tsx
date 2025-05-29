'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Restaurant } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, XCircle, Utensils } from 'lucide-react';
import { useContext } from 'react';
import { FavoritesContext } from '@/context/FavoritesContext';

interface FavoriteRestaurantCardProps {
  restaurant: Restaurant;
}

export function FavoriteRestaurantCard({ restaurant }: FavoriteRestaurantCardProps) {
  const favoritesContext = useContext(FavoritesContext);
  if (!favoritesContext) throw new Error("FavoritesContext not found");
  
  const { removeFavoriteRestaurant } = favoritesContext;

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl relative group">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-background/70 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => removeFavoriteRestaurant(restaurant.id)}
        aria-label="Remove from favorites"
      >
        <XCircle className="h-5 w-5 text-destructive" />
      </Button>
      <Link href={`/restaurants/${restaurant.id}`} passHref className="flex flex-col h-full">
        <CardHeader className="p-0">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={restaurant.dataAiHint || "restaurant food"}
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-xl mb-2">{restaurant.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Utensils className="h-4 w-4 text-accent mr-1" />
            <span>{restaurant.cuisine}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{restaurant.rating.toFixed(1)}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 mt-auto">
          <Button variant="outline" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            View Menu
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
