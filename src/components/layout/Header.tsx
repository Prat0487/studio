import Link from 'next/link';
import { Utensils, ShoppingCart, Star, Sparkles, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/CartContext';
import React, { useContext } from 'react';

export function Header() {
  // This component needs to be a client component to use useContext
  // However, we'll keep it simple for now. A real cart count would require it.
  // For now, let's make it a client component to allow for future cart count.
  // const { cart } = useContext(CartContext);
  // const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Utensils className="h-7 w-7" />
          <span>FoodieFast</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home size={18} /> Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/recommendations" className="flex items-center gap-1">
              <Sparkles size={18} /> Recommendations
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/favorites" className="flex items-center gap-1">
              <Star size={18} /> Favorites
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/checkout" className="flex items-center gap-1">
              <ShoppingCart size={18} /> Cart
              {/* {itemCount > 0 && (
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )} */}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
