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

## Cloudinary Setup (Optional - for Media Optimization)

For optimized image/video hosting:

1. **Create a Cloudinary account**: https://cloudinary.com (free tier: 25GB storage, 25GB bandwidth/month)

2. **Get your credentials** from the Cloudinary dashboard:
   - Cloud Name
   - API Key
   - API Secret

3. **Add environment variables** to Vercel project settings:
   - `VITE_CLOUDINARY_CLOUD_NAME` - Your cloud name
   - `VITE_CLOUDINARY_API_KEY` - Your API key
   - `CLOUDINARY_API_SECRET` - Your API secret (server-side only, if needed)

4. **Create `.env.local` file** for local development (add to `.gitignore`):
   ```
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_API_KEY=your-api-key
   ```

5. **Use the `OptimizedImage` component**:

```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  cloudinaryPublicId="portfolio/projects/image-name"
  width={800}
/>
```

### Cloudinary Benefits

- **Automatic optimization**: Upload originals, Cloudinary optimizes automatically
- **Format conversion**: Auto WebP/AVIF when browser supports
- **Responsive images**: Automatic sizing based on device
- **Video optimization**: Automatic transcoding and multiple quality levels
- **Global CDN**: Fast worldwide delivery
- **Zero pre-processing**: Upload originals, use transformation URLs

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
- Set up Cloudinary credentials (see above)
- Use `OptimizedImage` component with `cloudinaryPublicId`
- Or manually optimize images before adding to `public/`
- Check that environment variables are set in Vercel

### Build errors?
- Ensure all prototype dependencies are in `package.json`
- Check for TypeScript errors in prototype components
- Verify all imports are correct
- Check that lazy imports use correct paths
