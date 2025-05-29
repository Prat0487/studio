'use client';

import type { CartItem, MenuItem } from '@/types';
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number, specialRequests?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem('foodieFastCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0 || localStorage.getItem('foodieFastCart')) {
      localStorage.setItem('foodieFastCart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = useCallback((item: MenuItem, quantity: number, specialRequests?: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id && cartItem.restaurantId === item.restaurantId);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        if (specialRequests) { // Append special requests if item already in cart
           updatedCart[existingItemIndex].specialRequests = `${updatedCart[existingItemIndex].specialRequests || ''}; ${specialRequests}`.trim();
        }
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity, specialRequests }];
      }
    });
    toast({ title: `${item.name} added to cart!`, description: `${quantity} x ${item.name}`});
  }, [toast]);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    toast({ title: "Item removed from cart."});
  }, [toast]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('foodieFastCart');
    toast({ title: "Cart cleared."});
  }, [toast]);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
