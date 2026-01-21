import { createClient } from 'tinacms/dist/client';

// =============================================================================
// Environment Variables (standardized naming per TinaCMS guide)
// =============================================================================

// Branch detection matching tina/config.ts
const branch =
  import.meta.env.VITE_TINA_BRANCH ||
  import.meta.env.VITE_GITHUB_BRANCH ||
  import.meta.env.VITE_RENDER_GIT_BRANCH ||
  import.meta.env.VITE_VERCEL_GIT_COMMIT_REF ||
  import.meta.env.VITE_HEAD ||
  'main';

// Check if TinaCMS credentials are configured (standardized naming)
const clientId = 
  import.meta.env.VITE_TINA_CLIENT_ID ||
  // Legacy fallback (deprecated)
  import.meta.env.VITE_TINA_PUBLIC_CLIENT_ID;

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

/**
 * Check if visual editing mode is enabled (inside TinaCMS admin iframe)
 * This is used to conditionally enable useTina subscriptions only when needed,
 * preventing performance issues from multiple concurrent subscriptions in production.
 */
export function isVisualEditingEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if we're inside an iframe (TinaCMS admin embeds the site in an iframe)
  const isInIframe = window.self !== window.top;
  
  // Check for Tina-specific URL parameters
  const hasTinaParam = window.location.search.includes('tinaPreview') || 
                       window.location.search.includes('tina-iframe');
  
  // Check if we're on the /admin path
  const isAdminPath = window.location.pathname.includes('/admin');
  
  const result = isInIframe || hasTinaParam || isAdminPath;
  
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/984a66b5-88db-4299-9992-dc0fd2248136',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'client.ts:isVisualEditingEnabled',message:'Visual editing check',data:{isInIframe,hasTinaParam,isAdminPath,result,pathname:window.location.pathname,search:window.location.search},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  return result;
}

export { client, client as tinaClient };
