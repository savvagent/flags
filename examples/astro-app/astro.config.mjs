import { defineConfig } from 'astro/config';
import savvagentFlags from '@savvagent/flags-astro';

export default defineConfig({
  integrations: [
    savvagentFlags({
      apiUrl: process.env.SAVVAGENT_FLAGS_API_URL || 'http://localhost:8080',
      sdkKey: process.env.SAVVAGENT_FLAGS_SDK_KEY || 'your-sdk-key',
      environment: 'development',
    }),
  ],
});
