import { createClient } from 'tinacms/dist/client';

// Branch detection matching tina/config.ts
const branch =
  import.meta.env.VITE_GITHUB_BRANCH ||
  import.meta.env.VITE_RENDER_GIT_BRANCH ||
  import.meta.env.VITE_VERCEL_GIT_COMMIT_REF ||
  import.meta.env.VITE_HEAD ||
  'main';

// Check if TinaCMS credentials are configured
const clientId = import.meta.env.VITE_TINA_PUBLIC_CLIENT_ID;
const token = import.meta.env.VITE_TINA_TOKEN;
const isTinaConfigured = !!(clientId && token);

// Only create the client if we're in dev mode OR have proper credentials
// In production without credentials, we'll use static content fallback
let client: ReturnType<typeof createClient> | null = null;

if (import.meta.env.DEV) {
  // In development, always try to connect to local Tina server
  try {
    client = createClient({
      url: 'http://localhost:4001/graphql',
      token: token || '',
    });
  } catch (error) {
    console.warn('TinaCMS client initialization failed in dev mode:', error);
  }
} else if (isTinaConfigured) {
  // In production, only create client if credentials are available
  try {
    client = createClient({
      url: `https://content.tinajs.io/content/${clientId}/github/${branch}`,
      token: token,
    });
  } catch (error) {
    console.warn('TinaCMS client initialization failed:', error);
  }
}

export { client, client as tinaClient };
