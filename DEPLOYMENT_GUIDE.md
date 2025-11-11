# Deployment Guide - Josh Mantooth Portfolio

This guide will walk you through deploying Josh Mantooth's portfolio website to mantoothux.com.

## Prerequisites

- ✅ Your site builds successfully (`npm run build`)
- ✅ You have access to your domain's DNS settings
- ✅ You have a GitHub account (recommended for easy deployment)

## Step 1: Update Your Content

Before deploying, make sure `src/content.json` contains all of Josh's portfolio content:

1. Open `src/content.json`
2. Verify all content is up to date:
   - Projects (portfolio work samples)
   - About section (bio, skills, photo)
   - Contact information (email, LinkedIn, GitHub)
   - Hero title
3. See `CONTENT_INSTRUCTIONS.md` for detailed content structure

## Step 2: Test Locally

```bash
npm run build
npm run preview
```

Visit the preview URL to verify everything looks correct.

## Step 3: Deploy to Vercel (Recommended)

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Prepare your code:**
   - Make sure all changes are committed to git
   - Push to GitHub

2. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://www.vercel.com)
   - Sign up with GitHub (easiest option)

3. **Deploy:**
   - Click "Add New Project"
   - Import your GitHub repository: `MantoothUX/Portfolio-2025`
   - Vercel will auto-detect settings from `vercel.json`:
     - Build command: `npm run build`
     - Output directory: `dist`
     - Framework: None (Vite)
   - Click "Deploy"

4. **Configure Custom Domain:**
   - Go to Project Settings → Domains
   - Add `mantoothux.com`
   - Follow Vercel's instructions for DNS setup

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

## Step 4: Deploy to Netlify (Alternative)

### Option A: Deploy via Netlify Dashboard

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

## Step 5: Configure DNS

Once your site is deployed on Vercel or Netlify, you'll need to update your DNS records:

### For Vercel:
1. Go to Project Settings → Domains
2. Add `mantoothux.com` and `www.mantoothux.com`
3. Vercel will provide DNS records to add:
   - A record or CNAME for root domain
   - CNAME for www subdomain
4. Update DNS at your domain registrar (GoDaddy, etc.)

### For Netlify:

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

## Step 6: Verify Deployment

1. Wait for DNS propagation (check with [whatsmydns.net](https://www.whatsmydns.net))
2. Visit `mantoothux.com` to verify it's working
3. Test all pages and links
4. Check mobile responsiveness


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
- **Vercel config:** `vercel.json` (already created)
- **Netlify config:** `netlify.toml` (alternative deployment option)

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- Check `CONTENT_INSTRUCTIONS.md` for content structure

