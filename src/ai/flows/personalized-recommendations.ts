// use server'

/**
 * @fileOverview Personalized food and meal recommendations based on user history and preferences.
 *
 * - getPersonalizedRecommendations - A function that retrieves personalized food and meal recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  orderHistory: z.array(
    z.object({
      restaurantId: z.string().describe('The ID of the restaurant.'),
      items: z.array(z.string()).describe('List of items ordered.'),
      timestamp: z.string().describe('The timestamp of the order.'),
    })
  ).describe('The user order history.'),
  dietaryRestrictions: z
    .array(z.string())
    .describe('The dietary restrictions of the user.'),
  personalPreferences: z
    .string()
    .describe('The personal preferences of the user.'),
});
export type PersonalizedRecommendationsInput =
  z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedItems: z.array(
    z.object({
      itemId: z.string().describe('The ID of the recommended item.'),
      itemName: z.string().describe('The name of the recommended item.'),
      restaurantId: z.string().describe('The ID of the restaurant.'),
      description: z.string().describe('The description of the item.'),
    })
  ).describe('A list of recommended items.'),
  recommendedMeals: z.array(
    z.object({
      mealName: z.string().describe('The name of the recommended meal.'),
      items: z.array(z.string()).describe('List of item IDs in the meal.'),
      restaurantId: z.string().describe('The ID of the restaurant.'),
      description: z.string().describe('The description of the meal.'),
    })
  ).describe('A list of recommended meals.'),
});
export type PersonalizedRecommendationsOutput =
  z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a personal food recommendation assistant. You will provide
  recommendations to the user based on their order history, dietary restrictions,
  and personal preferences. Use the provided information to create accurate
  recommendations. Only recommend food items and meals that adhere to the
  user's dietary restrictions.

  Order History: {{{orderHistory}}}
  Dietary Restrictions: {{{dietaryRestrictions}}}
  Personal Preferences: {{{personalPreferences}}}

  Based on the information above, provide a list of recommended items and meals
  that the user would enjoy.`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
