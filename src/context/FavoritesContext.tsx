'use client';

import type { Restaurant, MenuItem } from '@/types';
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
  favoriteRestaurants: Restaurant[];
  favoriteItems: MenuItem[];
  addFavoriteRestaurant: (restaurant: Restaurant) => void;
  removeFavoriteRestaurant: (restaurantId: string) => void;
  isFavoriteRestaurant: (restaurantId: string) => boolean;
  addFavoriteItem: (item: MenuItem) => void;
  removeFavoriteItem: (itemId: string) => void;
  isFavoriteItem: (itemId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<MenuItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedRestaurants = localStorage.getItem('foodieFastFavoriteRestaurants');
    if (storedRestaurants) {
      setFavoriteRestaurants(JSON.parse(storedRestaurants));
    }
    const storedItems = localStorage.getItem('foodieFastFavoriteItems');
    if (storedItems) {
      setFavoriteItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
     if (favoriteRestaurants.length > 0 || localStorage.getItem('foodieFastFavoriteRestaurants')) {
      localStorage.setItem('foodieFastFavoriteRestaurants', JSON.stringify(favoriteRestaurants));
    }
  }, [favoriteRestaurants]);

  useEffect(() => {
    if (favoriteItems.length > 0 || localStorage.getItem('foodieFastFavoriteItems')) {
      localStorage.setItem('foodieFastFavoriteItems', JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  const addFavoriteRestaurant = useCallback((restaurant: Restaurant) => {
    setFavoriteRestaurants((prev) => {
      if (prev.find(r => r.id === restaurant.id)) return prev;
      toast({ title: `${restaurant.name} added to favorites!` });
      return [...prev, restaurant];
    });
  }, [toast]);

  const removeFavoriteRestaurant = useCallback((restaurantId: string) => {
    setFavoriteRestaurants((prev) => {
      const restaurant = prev.find(r => r.id === restaurantId);
      if (restaurant) toast({ title: `${restaurant.name} removed from favorites.`});
      return prev.filter((r) => r.id !== restaurantId);
    });
  }, [toast]);

  const isFavoriteRestaurant = useCallback((restaurantId: string) => {
    return favoriteRestaurants.some(r => r.id === restaurantId);
  }, [favoriteRestaurants]);

  const addFavoriteItem = useCallback((item: MenuItem) => {
    setFavoriteItems((prev) => {
      if (prev.find(i => i.id === item.id && i.restaurantId === item.restaurantId)) return prev;
      toast({ title: `${item.name} added to favorites!` });
      return [...prev, item];
    });
  }, [toast]);

  const removeFavoriteItem = useCallback((itemId: string) => {
    setFavoriteItems((prev) => {
      const item = prev.find(i => i.id === itemId);
      if (item) toast({ title: `${item.name} removed from favorites.`});
      return prev.filter((i) => i.id !== itemId);
    });
  }, [toast]);

  const isFavoriteItem = useCallback((itemId: string) => {
    return favoriteItems.some(i => i.id === itemId);
  }, [favoriteItems]);

  return (
    <FavoritesContext.Provider value={{ 
      favoriteRestaurants, 
      favoriteItems, 
      addFavoriteRestaurant, 
      removeFavoriteRestaurant, 
      isFavoriteRestaurant,
      addFavoriteItem, 
      removeFavoriteItem,
      isFavoriteItem
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
