
'use server';
/**
 * @fileOverview An AI flow for generating images from a text prompt.
 *
 * - generateImage - A function that takes a prompt and returns an image data URI.
 * - GenerateImageInput - The input type for the function.
 * - GenerateImageOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {googleAI} from '@genkit-ai/googleai';


export const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

export const GenerateImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'"
    ),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: googleAI('gemini-2.0-flash-preview-image-generation'),
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
        throw new Error('Image generation failed to return an image.');
    }

    return { imageUrl: media.url };
  }
);
