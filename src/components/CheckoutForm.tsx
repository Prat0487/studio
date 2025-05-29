'use client';

import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { submitOrderAction } from '@/lib/actions';
import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';

const checkoutFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  cardNumber: z.string().length(16, { message: "Card number must be 16 digits." }).regex(/^\d+$/, "Card number must contain only digits."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format." }),
  cvv: z.string().length(3, { message: "CVV must be 3 digits." }).regex(/^\d+$/, "CVV must be digits."),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const cartContext = useContext(CartContext);
  const router = useRouter();

  if (!cartContext) throw new Error("CartContext not found");
  const { cart, totalPrice, clearCart } = cartContext;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      address: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    setIsLoading(true);
    const orderData = {
      ...data,
      cartItems: cart, // Send cart items with the order
      totalAmount: totalPrice,
    };
    const result = await submitOrderAction(orderData);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Order Placed!",
        description: `${result.message} Order ID: ${result.orderId}`,
        variant: "default",
      });
      clearCart();
      router.push('/'); // Redirect to home page or an order confirmation page
    } else {
      toast({
        title: "Order Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Lock className="mr-2 h-6 w-6 text-primary" /> Secure Checkout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Foodie St, Flavor Town" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2 pt-4 border-t">
                <p className="text-sm font-medium text-muted-foreground">Payment Details (Simulated)</p>
            </div>
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="•••• •••• •••• ••••" {...field} maxLength={16} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="•••" {...field} maxLength={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <Button type="submit" className="w-full py-3 text-lg bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading || cart.length === 0}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {cart.length === 0 ? "Your cart is empty" : (isLoading ? 'Processing Order...' : `Place Order ($${totalPrice.toFixed(2)})`)}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">
            This is a simulated checkout process. No real payment will be processed.
        </p>
      </CardFooter>
    </Card>
  );
}
