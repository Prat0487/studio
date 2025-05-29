
'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { CheckoutForm } from '@/components/CheckoutForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { MinusCircle, PlusCircle, Trash2, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Loading Cart...</h1>
      </div>
    );
  }

  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = cartContext;

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-primary-foreground flex items-center justify-center">
            <ShoppingBag className="mr-3 h-10 w-10" /> Your Order
        </h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xl text-muted-foreground">Your cart is empty.</p>
                  <Button asChild className="mt-6">
                    <Link href="/">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <Image 
                        src={`https://placehold.co/80x80.png`} 
                        alt={item.name} 
                        width={80} 
                        height={80} 
                        className="rounded-md object-cover" 
                        data-ai-hint={item.dataAiHint || "food item"}
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                        {item.specialRequests && <p className="text-xs text-muted-foreground italic">Requests: {item.specialRequests}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                          <MinusCircle className="h-5 w-5" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                          <PlusCircle className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {cart.length > 0 && (
              <CardFooter className="flex justify-end items-center pt-4 border-t">
                <div className="text-xl font-bold">
                  Total ({totalItems} items): <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
