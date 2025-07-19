
'use server';

import {genkit, GenkitError, GenkitFlow, Runner} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import type {z} from 'zod';

const plugins = [];
const isConfigured = !!process.env.GOOGLE_API_KEY;

const genkitConfig: Parameters<typeof genkit>[0] = {
  plugins: [],
};

if (isConfigured) {
  genkitConfig.plugins!.push(googleAI());
  genkitConfig.model = 'googleai/gemini-1.5-flash-latest';
} else {
  // This warning will appear in your server logs (e.g., pm2 logs kosheli-travel)
  console.warn(`
/************************************************************/
/*                                                          */
/*   WARN: GOOGLE_API_KEY environment variable is not set.  */
/*   AI features will be disabled.                          */
/*                                                          */
/************************************************************/
  `);
}

// A custom flow runner to handle cases where no AI plugin is configured.
const customFlowRunner: Runner = async (
  flow: GenkitFlow<any, any, any>,
  input?: z.infer<any>,
  streamingCallback?: (chunk: z.infer<any>) => void
) => {
  if (!isConfigured) {
    throw new GenkitError({
      status: 'UNIMPLEMENTED',
      message:
        'AI features are disabled because the GOOGLE_API_KEY is not configured on the server.',
    });
  }
  // Default flow runner logic if plugins are available.
  return flow.fn(input, streamingCallback);
};

genkitConfig.flowRunner = customFlowRunner;

export const ai = genkit(genkitConfig);
