import { createClient } from 'tinacms/dist/client';

// Branch detection matching tina/config.ts
const branch =
  import.meta.env.VITE_GITHUB_BRANCH ||
  import.meta.env.VITE_RENDER_GIT_BRANCH ||
  import.meta.env.VITE_VERCEL_GIT_COMMIT_REF ||
  import.meta.env.VITE_HEAD ||
  'main';

export const client = createClient({
  url: import.meta.env.DEV
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${import.meta.env.VITE_TINA_PUBLIC_CLIENT_ID}/github/${branch}`,
  token: import.meta.env.VITE_TINA_TOKEN,
});

export { client as tinaClient };
