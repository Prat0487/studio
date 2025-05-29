
'use client';

import React, { useState, useContext } from 'react';
import type { MenuItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { MinusCircle, PlusCircle } from 'lucide-react';

interface OrderCustomizationDialogProps {
  item: MenuItem;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderCustomizationDialog({ item, isOpen, onOpenChange }: OrderCustomizationDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    // This should ideally not happen if context is set up correctly
    return null; 
  }
  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    addToCart(item, quantity, specialRequests);
    onOpenChange(false); // Close dialog
    // Reset state for next time
    setQuantity(1);
    setSpecialRequests('');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Customize Your Order</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-4">
            <Image 
              src={`https://placehold.co/100x100.png`} 
              alt={item.name} 
              width={100} 
              height={100} 
              className="rounded-md object-cover" 
              data-ai-hint={item.dataAiHint || "food item"}
            />
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
            </div>
          </div>
          
          <div>
            <Label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={decrementQuantity} aria-label="Decrease quantity">
                <MinusCircle className="h-5 w-5" />
              </Button>
              <Input 
                id="quantity" 
                type="number" 
                value={quantity} 
                readOnly 
                className="w-16 text-center h-10"
              />
              <Button variant="outline" size="icon" onClick={incrementQuantity} aria-label="Increase quantity">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {item.customizable && (
            <div>
              <Label htmlFor="specialRequests" className="block text-sm font-medium mb-1">Special Requests</Label>
              <Textarea
                id="specialRequests"
                placeholder="e.g., extra sauce, no onions"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
              />
               <p className="text-xs text-muted-foreground mt-1">Additional charges may apply for certain requests.</p>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleAddToCart} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Add to Cart (${(item.price * quantity).toFixed(2)})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
