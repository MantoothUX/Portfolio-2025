# Deployment Guide - Mantoothux.com

This guide will walk you through deploying your portfolio website to replace your Squarespace site.

## Prerequisites

- ✅ Your site builds successfully (`npm run build`)
- ✅ You have access to your domain's DNS settings
- ✅ You have a GitHub account (recommended for easy deployment)

## Step 1: Update Your Content

Before deploying, make sure to update `src/content.json` with your real content from mantoothux.com:

1. Open `src/content.json`
2. Replace all placeholder content with your actual:
   - Projects (copy from your Squarespace site)
   - About section (bio, skills)
   - Contact information (email, LinkedIn, GitHub)
   - Hero title
3. See `CONTENT_INSTRUCTIONS.md` for detailed structure

## Step 2: Test Locally

```bash
npm run build
npm run preview
```

Visit the preview URL to verify everything looks correct.

## Step 3: Deploy to Netlify (Recommended)

### Option A: Deploy via Netlify Dashboard (Easiest)

1. **Prepare your code:**
   - Make sure all changes are committed to git
   - Push to GitHub (create a repo if needed)

2. **Sign up/Login to Netlify:**
   - Go to [netlify.com](https://www.netlify.com)
   - Sign up with GitHub (easiest option)

3. **Deploy:**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify will auto-detect settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Configure Custom Domain:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter `mantoothux.com`
   - Follow Netlify's instructions for DNS setup

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy (first time)
netlify deploy --prod

# For subsequent deployments
netlify deploy --prod --dir=dist
```

## Step 4: Configure DNS

Once your site is deployed on Netlify, you'll need to update your DNS records:

### If Netlify provides a CNAME:
1. Go to your domain registrar (where you bought mantoothux.com)
2. Find DNS settings
3. Add/Update CNAME record:
   - Name: `@` (or root domain)
   - Value: Netlify's provided domain (e.g., `your-site.netlify.app`)

### If Netlify provides A records:
1. Add A records pointing to Netlify's IP addresses:
   - `75.2.60.5`
   - (Netlify will show you the exact IPs in the domain settings)

### For www subdomain:
- Add CNAME record:
  - Name: `www`
  - Value: `your-site.netlify.app`

**Note:** DNS changes can take 24-48 hours to propagate. Netlify will automatically provision an SSL certificate once DNS is configured.

## Step 5: Verify Deployment

1. Wait for DNS propagation (check with [whatsmydns.net](https://www.whatsmydns.net))
2. Visit `mantoothux.com` to verify it's working
3. Test all pages and links
4. Check mobile responsiveness

## Alternative: Deploy to Vercel

If you prefer Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Vercel will auto-detect Vite settings
5. Add custom domain: `mantoothux.com`
6. Update DNS as instructed by Vercel

## Troubleshooting

### Build fails
- Check that all dependencies are installed: `npm install`
- Verify `content.json` is valid JSON
- Check console for specific errors

### DNS not working
- Wait 24-48 hours for propagation
- Verify DNS records are correct
- Check domain registrar's DNS settings

### Site shows old Squarespace content
- Clear browser cache
- Check DNS is pointing to new hosting
- Verify Netlify/Vercel deployment is active

## Quick Reference

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Content file:** `src/content.json`
- **Netlify config:** `netlify.toml` (already created)

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- Check `CONTENT_INSTRUCTIONS.md` for content structure

