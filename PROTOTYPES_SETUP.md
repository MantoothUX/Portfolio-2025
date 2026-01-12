# Prototypes Setup Guide

## Overview

The prototypes page (`/prototypes`) allows you to showcase interactive prototypes directly on your portfolio site. Prototypes can be embedded in project modals or viewed as standalone pages.

## Adding a New Prototype

### 1. Add Prototype Files

Place your prototype files in the `public/prototypes/{slug}/` directory:

```
public/
  prototypes/
    music-player-chrome-extension/
      index.html
      (other assets)
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

### 3. Link from Project Modal (Optional)

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

## Cloudinary Setup (Optional)

For optimized image/video hosting:

1. Create a Cloudinary account: https://cloudinary.com
2. Get your credentials from the dashboard
3. Add environment variables to Vercel:
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_API_KEY`
   - `VITE_CLOUDINARY_API_SECRET` (server-side only)

4. Use the `OptimizedImage` component:

```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  cloudinaryPublicId="portfolio/projects/image-name"
  width={800}
/>
```

## Prototype Structure

Each prototype should have:
- `index.html` as the entry point
- All assets (CSS, JS, images) relative to the prototype directory
- Self-contained (no external dependencies unless using CDN)

## Example: Music Player Chrome Extension

The Music Player Chrome Extension prototype is set up as:
- Files: `public/prototypes/music-player-chrome-extension/`
- Entry: `public/prototypes/music-player-chrome-extension/index.html`
- Linked from project with ID "15" via `prototypeUrl`

## Troubleshooting

### Prototype not loading?
- Check that `index.html` exists in `public/prototypes/{slug}/`
- Verify the slug matches in `prototypes.json`
- Check browser console for errors

### Password not working?
- Ensure password is set correctly in `prototypes.json`
- Check that password modal is showing (check browser console)

### Images/videos not optimized?
- Set up Cloudinary credentials (see above)
- Use `OptimizedImage` component with `cloudinaryPublicId`
- Or manually optimize images before adding to `public/`
