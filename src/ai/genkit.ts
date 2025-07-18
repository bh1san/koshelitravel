
'use server';

import {genkit, GenkitError} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins = [];
const isConfigured = !!process.env.GOOGLE_API_KEY;

if (isConfigured) {
  plugins.push(googleAI());
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

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-1.5-flash-latest',
  // A custom flow runner to handle cases where no AI plugin is configured.
  flowRunner: async (flow, input, streamingCallback) => {
    if (!isConfigured) {
      throw new GenkitError({
        status: 'UNIMPLEMENTED',
        message: 'AI features are disabled because the GOOGLE_API_KEY is not configured on the server.',
      });
    }
    // Default flow runner logic if plugins are available.
    return flow.fn(input, streamingCallback);
  },
});
