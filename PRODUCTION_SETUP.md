# Production Deployment Setup

## TinaCMS Admin in Production

The admin panel is currently **disabled in production** to prevent CORS errors. Follow these steps to enable it:

### 1. Set Up Tina Cloud (Required for Production)

1. Visit [app.tina.io](https://app.tina.io)
2. Sign in with GitHub
3. Click "Create New Project"
4. Select your repository: `Website---IVANGS-BEDACHUNGEN`
5. Follow the onboarding wizard

### 2. Get Your Credentials

Tina Cloud will provide:
- **Client ID**: `VITE_TINA_CLIENT_ID` (starts with a long string)
- **Read-only Token**: `TINA_TOKEN` (long alphanumeric string)

### 3. Add Environment Variables to Render

In your Render dashboard:

1. Go to your site
2. Navigate to **Environment** tab
3. Add these variables:

| Variable | Value |
|----------|-------|
| `VITE_TINA_CLIENT_ID` | Your Client ID from Tina Cloud |
| `TINA_TOKEN` | Your Read Token from Tina Cloud |

4. Click **Save Changes**

### 4. Re-enable Admin Panel

Update `public/_redirects`:

```
# SPA fallback
/*  /index.html  200
```

Remove the admin redirect line.

### 5. Trigger Rebuild

In Render:
1. Go to **Manual Deploy** → **Deploy latest commit**
2. Or push a new commit to trigger automatic deployment

The build process will now:
- ✅ Run `npm run tina:build` successfully
- ✅ Generate production admin assets
- ✅ Admin panel accessible at `https://your-site.onrender.com/admin/index.html`

## Local Development

For local development, TinaCMS works without Tina Cloud:

```bash
npm run dev
```

Access admin at: `http://localhost:3000/admin/index.html`

## Content Management Workflow

### With Tina Cloud (Recommended)
1. Editors access admin panel on production site
2. Make changes through visual interface
3. Changes commit directly to GitHub
4. Automatic deployment via Render

### Without Tina Cloud (Local Only)
1. Run `npm run dev` locally
2. Edit content at `http://localhost:3000/admin/index.html`
3. Commit and push changes manually
4. Render deploys automatically

## Troubleshooting

### "Failed loading TinaCMS assets"

**Cause**: Tina Cloud credentials not set or build failed

**Fix**:
1. Verify environment variables are set in Render
2. Check Render build logs for errors
3. Ensure variables start with `VITE_` for client-side access

### "Permission denied" or CORS errors

**Cause**: Admin panel trying to use localhost in production

**Fix**: 
- Admin panel is currently redirected to /404
- Follow steps above to set up Tina Cloud properly

### Content not updating

**Cause**: Cache or build issues

**Fix**:
1. Clear browser cache
2. Trigger manual deployment in Render
3. Check that changes were committed to GitHub

## Cost

- **Tina Cloud Free Tier**: 
  - 2 users
  - Unlimited documents
  - Perfect for small teams
  
- **Render**: Your existing plan covers everything

## Support

- [TinaCMS Documentation](https://tina.io/docs/)
- [Tina Cloud Dashboard](https://app.tina.io)
- [Render Documentation](https://render.com/docs)
