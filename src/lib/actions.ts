'use server';

import { getPersonalizedRecommendations, PersonalizedRecommendationsInput, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import type { Order } from '@/types';
import { z } from 'zod'; // Zod is already a dependency from Genkit

const SubmitOrderInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  cardNumber: z.string().length(16, "Card number must be 16 digits.").regex(/^\d+$/, "Card number must contain only digits."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be MM/YY."),
  cvv: z.string().length(3, "CVV must be 3 digits.").regex(/^\d+$/, "CVV must be digits."),
  cartItems: z.array(z.any()), // Simplified for action, validation happens in component/context
  totalAmount: z.number(),
});

export async function submitOrderAction(data: z.infer<typeof SubmitOrderInputSchema>): Promise<{ success: boolean; message: string; orderId?: string }> {
  // Simulate payment processing and order placement
  console.log("Order received:", data);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

  const isValid = SubmitOrderInputSchema.safeParse(data);
  if (!isValid.success) {
    // This server-side validation is a fallback. Client-side should catch most issues.
    return { success: false, message: "Invalid order data. " + isValid.error.flatten().fieldErrors };
  }
  
  // Simulate success
  const orderId = `ORD-${Date.now()}`;
  return { success: true, message: "Order placed successfully!", orderId };
}

export async function getAIRecommendationsAction(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput | { error: string }> {
  try {
    // Basic validation for demonstration
    if (!input.personalPreferences && input.orderHistory.length === 0) {
      return { error: "Please provide some preferences or order history for recommendations." };
    }
    const recommendations = await getPersonalizedRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    return { error: "Failed to fetch recommendations. Please try again later." };
  }
}
