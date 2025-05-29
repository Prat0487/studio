
'use client';

import React, { useState }  from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { OrderHistoryEntry } from '@/types';
import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { getAIRecommendationsAction } from '@/lib/actions';
import { mockOrderHistory } from '@/lib/data'; // For pre-filling
import { Loader2 } from 'lucide-react';

const recommendationFormSchema = z.object({
  orderHistoryStr: z.string().optional().describe("User's past orders, one per line: restaurantId,item1,item2,YYYY-MM-DDTHH:mm:ss.sssZ"),
  dietaryRestrictions: z.string().optional().describe("Comma-separated dietary restrictions (e.g., vegetarian, gluten-free)"),
  personalPreferences: z.string().min(5, { message: "Please describe your preferences." }).describe("User's food preferences (e.g., spicy, loves Italian, prefers chicken)"),
});

type RecommendationFormValues = z.infer<typeof recommendationFormSchema>;

interface RecommendationFormProps {
  onResults: (results: PersonalizedRecommendationsOutput | null, error?: string) => void;
}

export function RecommendationForm({ onResults }: RecommendationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      orderHistoryStr: mockOrderHistory.map(entry => `${entry.restaurantId},${entry.items.join(';')},${entry.timestamp}`).join('\n'),
      dietaryRestrictions: "vegetarian, lactose-intolerant",
      personalPreferences: "I love spicy Indian food, but also enjoy trying new types of Asian cuisine. Not a big fan of very sweet dishes.",
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    onResults(null); // Clear previous results

    const orderHistory: OrderHistoryEntry[] = data.orderHistoryStr
      ? data.orderHistoryStr.split('\n').map(line => {
          const parts = line.split(',');
          return {
            restaurantId: parts[0]?.trim() || 'unknown',
            items: parts[1]?.split(';').map(item => item.trim()) || [],
            timestamp: parts[2]?.trim() || new Date().toISOString(),
          };
        }).filter(entry => entry.items.length > 0)
      : [];

    const dietaryRestrictionsArray = data.dietaryRestrictions
      ? data.dietaryRestrictions.split(',').map(s => s.trim()).filter(s => s)
      : [];

    const inputForAI = {
      orderHistory,
      dietaryRestrictions: dietaryRestrictionsArray,
      personalPreferences: data.personalPreferences,
    };

    const result = await getAIRecommendationsAction(inputForAI);
    
    if ('error' in result) {
      onResults(null, result.error);
    } else {
      onResults(result);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-card rounded-lg shadow-lg">
        <FormField
          control={form.control}
          name="personalPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Personal Preferences</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your taste, favorite cuisines, ingredients you like or dislike, etc." {...field} rows={4} />
              </FormControl>
              <FormDescription>
                The more details you provide, the better the recommendations!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietaryRestrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Dietary Restrictions (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., vegetarian, gluten-free, nut allergy" {...field} />
              </FormControl>
               <FormDescription>
                Separate multiple restrictions with commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="orderHistoryStr"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Order History (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Format (one order per line): restaurantId,item1;item2,YYYY-MM-DDTHH:mm:ss.sssZ" 
                  {...field} 
                  rows={5} 
                />
              </FormControl>
              <FormDescription>
                Provide past orders for more personalized suggestions. Items within an order should be semicolon-separated.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full py-3 text-lg bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
          {isLoading ? 'Getting Recommendations...' : 'Get AI Recommendations'}
        </Button>
      </form>
    </Form>
  );
}
