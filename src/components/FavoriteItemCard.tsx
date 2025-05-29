'use client';

import Image from 'next/image';
import type { MenuItem } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, XCircle, Building } from 'lucide-react';
import { useContext } from 'react';
import { FavoritesContext } from '@/context/FavoritesContext';
import { CartContext } from '@/context/CartContext';
import { restaurants } from '@/lib/data'; // to get restaurant name
import Link from 'next/link';

interface FavoriteItemCardProps {
  item: MenuItem;
}

export function FavoriteItemCard({ item }: FavoriteItemCardProps) {
  const favoritesContext = useContext(FavoritesContext);
  const cartContext = useContext(CartContext);

  if (!favoritesContext || !cartContext) throw new Error("Context not found");
  
  const { removeFavoriteItem } = favoritesContext;
  const { addToCart } = cartContext;

  const restaurant = restaurants.find(r => r.id === item.restaurantId);

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl relative group">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-background/70 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => removeFavoriteItem(item.id)}
        aria-label="Remove from favorites"
      >
        <XCircle className="h-5 w-5 text-destructive" />
      </Button>
      <Link href={`/restaurants/${item.restaurantId}`} passHref className="flex flex-col h-full">
        <CardHeader className="p-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={400}
            height={250}
            className="w-full h-40 object-cover"
            data-ai-hint={item.dataAiHint || "food dish"}
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
          {restaurant && (
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <Building className="h-3 w-3 mr-1"/>
              <span>From: {restaurant.name}</span>
            </div>
          )}
          <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
            {item.description}
          </p>
          <p className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 mt-auto">
        <Button 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
          onClick={() => addToCart(item, 1)}
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
