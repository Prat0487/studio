
'use client';

import type { PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations'; // From Genkit type
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Utensils, Package, AlertTriangle } from 'lucide-react';

interface RecommendationResultsProps {
  results: PersonalizedRecommendationsOutput | null;
  error?: string;
}

export function RecommendationResults({ results, error }: RecommendationResultsProps) {
  if (error) {
    return (
      <Card className="mt-6 border-destructive bg-destructive/10">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-6 w-6" />
            Error Fetching Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return null; // No results to display yet, or form not submitted
  }

  const { recommendedItems, recommendedMeals } = results;

  if (recommendedItems.length === 0 && recommendedMeals.length === 0) {
     return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>No Recommendations Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We couldn't find any recommendations based on your input. Try adjusting your preferences.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {recommendedItems.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><Utensils className="mr-2 h-6 w-6 text-primary" />Recommended Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedItems.map((item) => (
              <Card key={item.itemId} className="overflow-hidden hover:shadow-xl transition-shadow">
                <Image 
                  src={`https://placehold.co/600x400.png`} 
                  alt={item.itemName} 
                  width={600} 
                  height={400} 
                  className="w-full h-40 object-cover"
                  data-ai-hint={item.dataAiHint || "food item"}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{item.itemName}</h3>
                  <p className="text-sm text-muted-foreground mb-1">From Restaurant ID: {item.restaurantId}</p>
                  <p className="text-sm text-muted-foreground mb-3 h-16 overflow-y-auto">{item.description}</p>
                  <Button asChild variant="outline" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    {/* Assuming a route like /restaurants/:restaurantId/item/:itemId or similar */}
                    <Link href={`/restaurants/${item.restaurantId}`}>View Item</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {recommendedMeals.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><Package className="mr-2 h-6 w-6 text-primary" />Recommended Meals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedMeals.map((meal) => (
              <Card key={meal.mealName} className="overflow-hidden hover:shadow-xl transition-shadow">
                 <Image 
                  src={`https://placehold.co/600x400.png`}
                  alt={meal.mealName} 
                  width={600} 
                  height={400} 
                  className="w-full h-40 object-cover"
                  data-ai-hint={meal.dataAiHint || "meal platter"}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{meal.mealName}</h3>
                  <p className="text-sm text-muted-foreground mb-1">From Restaurant ID: {meal.restaurantId}</p>
                  <p className="text-sm text-muted-foreground mb-2">Includes: {meal.items.join(', ')}</p>
                  <p className="text-sm text-muted-foreground mb-3 h-16 overflow-y-auto">{meal.description}</p>
                   <Button asChild variant="outline" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href={`/restaurants/${meal.restaurantId}`}>Explore Meal</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
