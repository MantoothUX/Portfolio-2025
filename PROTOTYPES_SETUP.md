# Prototypes Setup Guide

## Overview

The prototypes page (`/prototypes`) allows you to showcase interactive prototypes directly on your portfolio site. Prototypes are React components that are imported directly into the portfolio codebase for optimal performance and integration.

## Adding a New Prototype

### 1. Create Prototype Component

Create your prototype as a React component in `src/prototypes/{slug}/`:

```
src/
  prototypes/
    your-prototype-slug/
      YourPrototype.tsx
      (other component files)
```

### 2. Add to prototypes.json

Add your prototype to `src/content/prototypes.json`:

```json
{
  "categories": [
    {
      "name": "Your Category",
      "items": [
        {
          "id": "your-prototype-id",
          "title": "Your Prototype Title",
          "slug": "your-prototype-slug",
          "iterations": 1,
          "password": null  // or "your-password" for protection
        }
      ]
    }
  ]
}
```

### 3. Register in PrototypesPage.tsx

Add a lazy import and case in the `PrototypeViewer` component's switch statement:

```tsx
// At top of PrototypesPage.tsx
const YourPrototype = lazy(() => import('../prototypes/your-prototype-slug/YourPrototype'));

// In PrototypeViewer switch statement
case 'your-prototype-slug':
  return lazy(() => import('../prototypes/your-prototype-slug/YourPrototype'));
```

### 4. Link from Project Modal (Optional)

To embed a prototype in a project modal, add `prototypeUrl` to the project in `src/content.json`:

```json
{
  "id": "15",
  "title": "My Project",
  "prototypeUrl": "/prototypes/your-prototype-slug"
}
```

## Password Protection

To password-protect a prototype, set the `password` field in `prototypes.json`:

```json
{
  "password": "your-secret-password"
}
```

**Note:** This is client-side protection only. It prevents casual access but can be bypassed by inspecting the code. Suitable for portfolio demos but not for real security.

## Cloudflare Setup (Optional - for Media Optimization)

This project uses Cloudflare for optimized image and video hosting:
- **Cloudflare Images** - For images (automatic optimization, WebP/AVIF conversion)
- **Cloudflare R2** - For videos and large GIFs (> 10MB)

### Setup Steps

1. **Enable Cloudflare Images** in your Cloudflare dashboard

2. **Create an R2 bucket** for videos/large files

3. **Get your credentials**:
   - Account ID (from Cloudflare dashboard)
   - Images API Token (Account → Cloudflare Images → Edit)
   - R2 Access Key ID and Secret (R2 → Manage R2 API Tokens)

4. **Create `.env.local` file** for local development:
   ```
   VITE_CLOUDFLARE_ACCOUNT_ID=your_account_id
   VITE_CLOUDFLARE_ACCOUNT_HASH=your_account_hash
   CLOUDFLARE_IMAGES_API_TOKEN=your_images_api_token
   CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key
   CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret
   CLOUDFLARE_R2_BUCKET_NAME=portfolio-assets
   CLOUDFLARE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
   ```

5. **Upload assets**:
   ```bash
   npm run upload:images    # Upload images to Cloudflare Images
   npm run upload:r2        # Upload videos/large GIFs to R2
   npm run update:cloudflare-content  # Update content.json with IDs
   ```

6. **Use the `OptimizedImage` component**:

```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  cloudflareImageId="image-uuid-from-cloudflare"
/>
```

### Benefits

- **High quality images** - No compression artifacts
- **Automatic optimization** - WebP/AVIF when browser supports
- **No file size limits** - Large files go to R2
- **Global CDN** - Fast worldwide delivery
- **Cost effective** - Pay for what you use

## Prototype Structure

Each prototype should be:
- A React component exported as default
- Self-contained with its own dependencies
- Responsive and work in both light/dark modes (if applicable)
- Accessible and performant

## Migrated Prototypes

Currently migrated prototypes:
- ✅ **Door Handle Check-in** (`door-handle-checkin`) - Design & Motion Experiments
- ✅ **Music Player Chrome Extension** (`music-player-chrome-extension`) - Design & Motion Experiments
- ⏳ **Order Printer** (`order-printer`) - Shopify projects (coming soon)

## Troubleshooting

### Prototype not loading?
- Check that the component file exists in `src/prototypes/{slug}/`
- Verify the slug matches in `prototypes.json`
- Ensure the component is registered in `PrototypesPage.tsx`
- Check browser console for import/compilation errors

### Password not working?
- Ensure password is set correctly in `prototypes.json`
- Check that password modal is showing (check browser console)
- Verify password comparison logic (case-sensitive)

### Images/videos not optimized?
- Set up Cloudflare credentials (see above)
- Run upload scripts to push assets to Cloudflare
- Use `OptimizedImage` component with `cloudflareImageId`
- Check that environment variables are set in Vercel

### Build errors?
- Ensure all prototype dependencies are in `package.json`
- Check for TypeScript errors in prototype components
- Verify all imports are correct
- Check that lazy imports use correct paths
