# TinaCMS Visual Editor Setup Guide

## What's Been Completed

✅ **Phase 1**: English language support removed
✅ **Phase 2**: TinaCMS schemas created for all content types
✅ **Phase 3**: Initial content files created

## What's Next: Tina Cloud Setup

To enable the visual editor, you need to set up Tina Cloud:

### Step 1: Create Tina Cloud Account

1. Go to [app.tina.io](https://app.tina.io)
2. Sign up with GitHub
3. Create a new project
4. Connect this GitHub repository

### Step 2: Get Your Credentials

After connecting your repository, Tina will provide:
- `TINA_CLIENT_ID` (Client ID)
- `TINA_TOKEN` (Read-only Token)

### Step 3: Configure Environment Variables

Create `.env.local` in the project root:

```env
VITE_TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
```

### Step 4: Rebuild TinaCMS

```bash
npm run tina:build
```

### Step 5: Restart Dev Server

```bash
npm run dev
```

## Current Content Structure

### Collections Available in TinaCMS Admin

Access at `http://localhost:3000/admin/index.html`:

1. **Startseite** (Home Page) - `/content/home/startseite.json`
   - SEO, Hero, Stats, Services Section, CEO Quote, Projects, Final CTA

2. **Team Mitglieder** (Team Members) - `/content/team/*.md`
   - All 14 team members with roles, emails, categories

3. **Leistungen** (Services) - `/content/services/*.md`
   - Steildach, Flachdach, and more services

4. **Stellenangebote** (Jobs) - `/content/jobs/*.md`
   - Current job openings

5. **Über Uns Seite** (About Page) - `/content/about/ueber-uns.json`
   - Company story, values, equipment, team section

6. **Kontakt Seite** (Contact Page) - `/content/contact/kontakt.json`
   - Contact information, address, hours

7. **Einstellungen** (Settings) - `/content/globals/de/settings.json`
   - Site-wide configuration

8. **Navigation** - `/content/globals/de/navigation.json`
   - Main navigation menu items

9. **Footer** - `/content/globals/de/footer.json`
   - Footer links and social media

## Next Implementation Steps

### For Visual Editing (Requires Code Changes)

The current setup provides a functional admin panel at `/admin/index.html`. To enable **visual editing** (editing directly on pages), you'll need to:

1. **Install TinaCMS React package** (if not already installed):
   ```bash
   npm install tinacms
   ```

2. **Create TinaProvider** (`src/app/providers/TinaProvider.tsx`):
   ```typescript
   import { TinaEditProvider } from 'tinacms/dist/edit-state'
   
   export const TinaProvider = ({ children }) => {
     return (
       <TinaEditProvider
         editMode={
           <TinaCMS
             apiURL={process.env.TINA_PUBLIC_IS_LOCAL === 'true' 
               ? 'http://localhost:4001/graphql' 
               : `https://content.tinajs.io/content/${process.env.VITE_TINA_CLIENT_ID}/github/${branch}`
             }
             token={process.env.TINA_TOKEN}
             branch={branch}
           >
             {children}
           </TinaCMS>
         }
       >
         {children}
       </TinaEditProvider>
     )
   }
   ```

3. **Wrap App with TinaProvider** (`src/app/App.tsx`):
   ```typescript
   import { TinaProvider } from './providers/TinaProvider'
   
   export const App = () => (
     <TinaProvider>
       <AppProviders>
         <AppRouter />
       </AppProviders>
     </TinaProvider>
   )
   ```

4. **Update Pages to Use `useTina` Hook**:
   ```typescript
   import { useTina } from 'tinacms/dist/react'
   
   // In HomePage:
   const { data } = useTina({
     query: `query Home($relativePath: String!) {
       homePage(relativePath: $relativePath) {
         seo { title description }
         hero { title description ... }
       }
     }`,
     variables: { relativePath: 'startseite.json' },
     data: initialData
   })
   ```

## Simplified Alternative: Admin Panel Only

If visual editing is not immediately needed, the **admin panel** at `/admin/index.html` works right now:

- ✅ Edit all content through forms
- ✅ Changes save to Git automatically
- ✅ No code changes needed
- ✅ Works with current setup

This is often sufficient for content management.

## Testing

1. **Admin Panel**: Visit `http://localhost:3000/admin/index.html`
2. **Edit Content**: Try editing the home page content
3. **View Changes**: Content changes are saved to Git
4. **Rebuild**: After Tina Cloud setup, run `npm run tina:build`

## Troubleshooting

### White Page in Admin

- Ensure dev server is running: `npm run dev`
- Check TinaCMS server is active (port 4001)
- Clear browser cache

### Content Not Showing

- Check file paths match TinaCMS collection paths
- Verify JSON/Markdown syntax is correct
- Check browser console for errors

### Visual Editor Not Working

- Ensure Tina Cloud credentials are set
- Run `npm run tina:build` after adding credentials
- Check that pages are using `useTina` hook

## Support

- [TinaCMS Documentation](https://tina.io/docs/)
- [TinaCMS Discord](https://discord.gg/zumN63Ybpf)
- [TinaCMS GitHub](https://github.com/tinacms/tinacms)
