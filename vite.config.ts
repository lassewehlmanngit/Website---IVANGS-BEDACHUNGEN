import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

/**
 * Vite plugin to handle /admin routes in development mode.
 * Serves public/admin/index.html for the TinaCMS admin panel.
 */
function adminRouteHandler(): PluginOption {
  return {
    name: 'admin-route-handler',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const [pathName] = url.split('?');
        
        // Handle /admin routes
        if (pathName === '/admin' || pathName.startsWith('/admin/')) {
          // Redirect /admin to /admin/ for consistency
          if (pathName === '/admin') {
            res.writeHead(302, { Location: '/admin/' });
            res.end();
            return;
          }
          
          // Serve admin/index.html for non-asset routes
          if (pathName === '/admin/' || !pathName.startsWith('/admin/assets/')) {
            const adminHtmlPath = path.join(__dirname, 'public', 'admin', 'index.html');
            if (existsSync(adminHtmlPath)) {
              const html = readFileSync(adminHtmlPath, 'utf-8');
              res.setHeader('Content-Type', 'text/html');
              res.end(html);
              return;
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      imagetools({
        defaultDirectives: (url) => {
          if (url.searchParams.has('avif')) return new URLSearchParams('format=avif');
          if (url.searchParams.has('webp')) return new URLSearchParams('format=webp');
          return new URLSearchParams('format=webp;quality=80');
        },
      }),
      // Handle TinaCMS admin panel routes in development
      adminRouteHandler(),
    ],
    // Serve content/ folder as static assets during dev
    publicDir: 'public',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@content': path.resolve(__dirname, 'content'),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENVIRONMENT || mode),
    },
    build: {
      chunkSizeWarningLimit: 500,
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 2,
        },
      },
      // Copy content/ to dist so it's available at runtime
      copyPublicDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-router': ['react-router-dom'],
            'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
            'vendor-ui': ['lucide-react'],
            'vendor-helmet': ['react-helmet-async'],
            'vendor-markdown': ['react-markdown'],
            'vendor-tina': ['tinacms/dist/react', 'tinacms/dist/client'],
          },
        },
      },
    },
  };
});
