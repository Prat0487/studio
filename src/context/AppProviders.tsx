'use client';

import React, { ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </CartProvider>
  );
}
