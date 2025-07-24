
'use server';
/**
 * @fileOverview An AI flow for generating travel recommendations.
 *
 * - getTravelRecommendations - A function that suggests travel destinations.
 * - TravelRecommendationsInput - The input type for the function.
 * - TravelRecommendationsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const TravelRecommendationsInputSchema = z.object({
  preferences: z.string().describe('User preferences for travel, like activities, climate, and style.'),
  browsingHistory: z.string().optional().describe('Optional list of places the user has recently looked at.'),
});
export type TravelRecommendationsInput = z.infer<typeof TravelRecommendationsInputSchema>;

export const TravelRecommendationsOutputSchema = z.object({
  destinations: z.array(z.string()).describe('A list of recommended travel destinations.'),
  reasons: z.array(z.string()).describe('A corresponding list of reasons why each destination is recommended.'),
});
export type TravelRecommendationsOutput = z.infer<typeof TravelRecommendationsOutputSchema>;


export async function getTravelRecommendations(input: TravelRecommendationsInput): Promise<TravelRecommendationsOutput> {
  return travelRecommendationFlow(input);
}


const travelRecommendationFlow = ai.defineFlow(
  {
    name: 'travelRecommendationFlow',
    inputSchema: TravelRecommendationsInputSchema,
    outputSchema: TravelRecommendationsOutputSchema,
  },
  async (input) => {
    const prompt = `Based on the following user preferences, suggest three unique travel destinations. For each destination, provide a compelling, one-sentence reason why it's a great fit.

User Preferences: "${input.preferences}"
${input.browsingHistory ? `User's Recent Browsing History: "${input.browsingHistory}"` : ''}

Return the data in a structured format.`;

    const { output } = await ai.generate({
      prompt: prompt,
      output: {
        schema: TravelRecommendationsOutputSchema,
      },
    });

    return output || { destinations: [], reasons: [] };
  }
);
