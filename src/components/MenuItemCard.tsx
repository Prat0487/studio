'use client';

import Image from 'next/image';
import type { MenuItem } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Heart } from 'lucide-react';
import { useState, useContext } from 'react';
import { OrderCustomizationDialog } from './OrderCustomizationDialog';
import { FavoritesContext } from '@/context/FavoritesContext';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) throw new Error("FavoritesContext not found");
  const { addFavoriteItem, removeFavoriteItem, isFavoriteItem } = favoritesContext;
  const isFav = isFavoriteItem(item.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click or other actions
    if (isFav) {
      removeFavoriteItem(item.id);
    } else {
      addFavoriteItem(item);
    }
  };

  return (
    <>
      <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-lg">
        <CardHeader className="p-0 relative">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={400}
            height={250}
            className="w-full h-40 object-cover"
            data-ai-hint={item.dataAiHint || "food dish"}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/70 hover:bg-background z-10"
            onClick={handleFavoriteToggle}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
          <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
            {item.description}
          </p>
          <p className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4">
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Add to Order
          </Button>
        </CardFooter>
      </Card>
      {isDialogOpen && <OrderCustomizationDialog item={item} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />}
    </>
  );
}
