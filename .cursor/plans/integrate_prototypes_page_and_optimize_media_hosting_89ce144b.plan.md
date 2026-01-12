---
name: Integrate prototypes page and optimize media hosting
overview: Create a /prototypes page integrated into mantoothux.com, copy the prototypes landing page design, add lazy-loaded iframe support for prototypes, and set up Cloudinary for automatic image/video optimization (no pre-processing required).
todos: []
---

# Integrate Prototypes Page and Optimize Media Hosting

## Overview

Integrate the prototypes site (shopproto.vercel.app) into mantoothux.com as a new `/prototypes` page, matching the portfolio design system with dark mode support. Set up Cloudinary for automatic image/video optimization (no pre-processing required) to improve performance.

## Current State Analysis

### Prototypes Site Structure

- Simple folder/file navigation structure
- Categories: "Design & Motion Experiments", "Shopify projects"
- Items: "Door Handle Check-in", "Order Printer 🔒" (password protected)
- URL: https://shopproto.vercel.app/

### Current Media Hosting Issues

- **114MB** total in `/public/projects/`
- Videos: 4K MP4 files (2.1MB+) stored directly
- No image optimization
- No responsive images
- No CDN delivery
- Large files slow page loads

## Implementation Plan

### Phase 1: Set Up Cloudinary for Media Optimization

#### 1.1 Create Cloudinary Account & Configure

- Sign up for Cloudinary free tier (25GB storage, 25GB bandwidth/month)
- Get API credentials (cloud name, API key, API secret)
- Set up environment variables in Vercel project settings

#### 1.2 Install Cloudinary SDK

- Add `cloudinary` package for Node.js/server-side operations
- For client-side: Use Cloudinary URL API directly (no SDK needed)
- Configure Cloudinary client for uploads

#### 1.3 Migrate Images to Cloudinary

- Upload existing images to Cloudinary (can use dashboard or API)
- Update image URLs in `content.json` to use Cloudinary URLs
- Use Cloudinary transformation URLs for automatic optimization:
  - `f_auto` (auto format: WebP/AVIF when supported)
  - `q_auto` (automatic quality optimization)
  - `w_auto` (responsive width based on device)
  - `c_limit` (maintain aspect ratio)
  - `dpr_auto` (device pixel ratio optimization)

#### 1.4 Migrate Videos to Cloudinary

- Upload videos to Cloudinary
- Cloudinary automatically generates:
  - Multiple quality levels (auto-generated)
  - Multiple formats (MP4, WebM)
  - Thumbnail generation
  - Streaming optimization
- Use Cloudinary video transformation URLs for optimization

#### 1.5 Update Image Components

- Create optimized image component wrapper
- Use Cloudinary URLs with transformations (automatic optimization)
- Add lazy loading attributes (`loading="lazy"`)
- Implement responsive image sizes using Cloudinary's `w_auto` or explicit widths
- Cloudinary automatically serves WebP/AVIF when browser supports it

### Phase 2: Create Prototypes Page

#### 2.1 Add Route

- Add `/prototypes` route to [`src/App.tsx`](src/App.tsx)
- Create `PrototypesPage` component

#### 2.2 Copy Landing Page Design

- Recreate the folder/file navigation structure from shopproto.vercel.app
- Match portfolio design system:
  - Use Balto font
  - Green color scheme (#13531C / #7bf1a8)
  - Dark mode support
  - Same navigation style

#### 2.3 Prototype Structure

- Create prototype data structure (similar to projects)
- Support categories and items
- Password protection (client-side)
- Lazy-loaded iframe embedding

#### 2.4 Navigation Integration

- Add "Prototypes" link to navigation component
- Update navigation logic to highlight active route
- Add icon (could use Code/Box icon from lucide-react)

### Phase 3: Prototype Embedding System

#### 3.1 Prototype Routes

- Create `/prototypes/[prototype-slug]` routes
- Each prototype is a separate page/component
- Support iframe embedding from project modals

#### 3.2 Lazy Loading Implementation

- Load prototypes only when needed
- Use React lazy loading for prototype components
- Iframe lazy loading with `loading="lazy"`

#### 3.3 Password Protection

- Client-side password check
- Store passwords in component state or config
- Show password input modal for protected prototypes
- Simple validation (no backend needed)

#### 3.4 Update Project Modals

- Add option to embed prototypes from `/prototypes/[slug]`
- Use relative URLs: `/prototypes/music-player-chrome-extension`
- Fallback to external URL if needed

### Phase 4: Content Migration

#### 4.1 Prototype Content Structure

- Create `prototypes.json` or add to `content.json`
- Structure:
  ```json
  {
    "categories": [
      {
        "name": "Design & Motion Experiments",
        "items": [
          {
            "id": "door-handle-checkin",
            "title": "Door Handle Check-in",
            "slug": "door-handle-checkin",
            "iterations": 1,
            "password": null
          }
        ]
      },
      {
        "name": "Shopify projects",
        "items": [
          {
            "id": "order-printer",
            "title": "Order Printer",
            "slug": "order-printer",
            "iterations": 3,
            "password": "your-password-here"
          }
        ]
      }
    ]
  }
  ```


#### 4.2 Migrate Existing Prototypes

- Copy prototype code/assets to portfolio
- Set up routing for each prototype
- Update URLs to use relative paths

## Technical Implementation Details

### Cloudinary Integration

```typescript
// Example: Upload to Cloudinary (server-side or via API)
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image
const uploadImage = async (file: File) => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'portfolio/projects',
    resource_type: 'auto' // Auto-detect image or video
  });
  return result.secure_url;
};

// Example: Generate optimized image URL (client-side, no SDK needed)
const getOptimizedImageUrl = (publicId: string, width?: number) => {
  const cloudName = 'your-cloud-name';
  const transformations = [
    'f_auto', // Auto format (WebP/AVIF)
    'q_auto', // Auto quality
    width ? `w_${width}` : 'w_auto', // Responsive width
    'c_limit', // Maintain aspect ratio
    'dpr_auto' // Device pixel ratio
  ].join(',');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
};

// Example: Optimized video URL
const getOptimizedVideoUrl = (publicId: string) => {
  const cloudName = 'your-cloud-name';
  const transformations = [
    'f_auto', // Auto format (MP4/WebM)
    'q_auto', // Auto quality
    'sp_auto' // Streaming profile
  ].join(',');
  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations}/${publicId}`;
};
```

### Prototypes Page Component Structure

```tsx
<PrototypesPage>
  <PrototypesLanding>
    {categories.map(category => (
      <CategorySection>
        {items.map(item => (
          <PrototypeItem 
            onClick={() => navigate(`/prototypes/${item.slug}`)}
            passwordProtected={!!item.password}
          />
        ))}
      </CategorySection>
    ))}
  </PrototypesLanding>
</PrototypesPage>
```

### Lazy Loading Pattern

```tsx
const PrototypeViewer = lazy(() => import(`./prototypes/${slug}`));

// In component
<Suspense fallback={<LoadingSpinner />}>
  <PrototypeViewer />
</Suspense>
```

## Files to Create/Modify

### New Files

- `src/components/PrototypesPage.tsx` - Main prototypes landing page
- `src/components/PrototypeViewer.tsx` - Individual prototype viewer with iframe
- `src/components/OptimizedImage.tsx` - Cloudinary-optimized image component
- `src/prototypes/[slug]/` - Individual prototype components/pages
- `src/content/prototypes.json` - Prototypes content structure

### Modified Files

- `src/App.tsx` - Add `/prototypes` route
- `src/components/generated/PortfolioWebsite.tsx` - Add Prototypes nav link, update modal prototype embedding
- `src/content.json` - Add prototypes data or reference to prototypes.json
- `vite.config.ts` - Add Cloudinary environment variables if needed
- `.env.example` - Document Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)

## Migration Strategy

### Step 1: Set Up Cloudinary (Can be done in parallel)

1. Create Cloudinary account (free tier)
2. Get API credentials from dashboard
3. Add environment variables to Vercel project
4. Install `cloudinary` package (for uploads)
5. Upload sample images to test
6. Update a few project images to use Cloudinary URLs with transformations
7. Test automatic optimization and performance

### Step 2: Build Prototypes Page

1. Create basic prototypes page structure
2. Add navigation link
3. Implement folder/file navigation UI
4. Add dark mode support

### Step 3: Migrate Prototypes

1. Copy prototype code/assets
2. Set up routing
3. Implement password protection
4. Test lazy loading

### Step 4: Update Project Modals

1. Update prototype embedding to use relative URLs
2. Test iframe embedding from modals
3. Ensure lazy loading works

## Performance Benefits

### With Cloudinary:

- **Automatic optimization**: No pre-processing needed - upload originals, Cloudinary optimizes
- **Image optimization**: 60-80% size reduction automatically
  - Auto format conversion (WebP/AVIF when supported)
  - Auto quality optimization
  - Responsive images (right size for each device)
- **Video optimization**: Automatic transcoding
  - Multiple quality levels (auto-generated)
  - Multiple formats (MP4, WebM)
  - Thumbnail generation
- **CDN delivery**: Global CDN for fast worldwide delivery
- **Lazy loading**: Images load only when visible
- **Zero manual work**: Upload originals, use transformation URLs

### With Lazy Loading:

- **Faster initial load**: Prototypes don't load until needed
- **Better UX**: Page feels more responsive
- **Reduced bandwidth**: Only load what's viewed

## Security Considerations

### Client-Side Password Protection

- Passwords stored in code/config (not secure, but fine for portfolio)
- Simple password check before showing prototype
- Can be bypassed by inspecting code (acceptable for portfolio use case)

## Next Steps After Implementation

1. **Monitor Performance**: Check Cloudinary usage and bandwidth, optimize transformations if needed
2. **Add More Prototypes**: Easy to add new prototypes to the system
3. **Analytics**: Track which prototypes are viewed most
4. **Progressive Enhancement**: Add service worker for offline viewing

## Cloudinary Considerations

### Advantages:

- ✅ **Zero pre-processing**: Upload originals, Cloudinary handles everything
- ✅ **Automatic optimization**: Format conversion, quality, responsive sizes
- ✅ **Video transcoding**: Automatic multiple quality levels and formats
- ✅ **Global CDN**: Fast worldwide delivery
- ✅ **Free tier**: 25GB storage, 25GB bandwidth/month (good for portfolio)
- ✅ **Rich transformations**: Extensive URL-based transformation options

### Limitations:

- ⚠️ **External service**: Adds dependency outside Vercel ecosystem
- ⚠️ **Free tier limits**: May need paid plan if traffic/usage grows significantly
- ⚠️ **Learning curve**: Need to understand transformation URL syntax

### Best Practices:

- Use `f_auto` for automatic format selection (WebP/AVIF)
- Use `q_auto` for automatic quality optimization
- Use `w_auto` for responsive images
- Use `dpr_auto` for high-DPI displays
- Lazy load images with `loading="lazy"`
- Use video transformations for optimized video delivery

## Alternative: Keep Current Setup + Manual Optimization

If Cloudinary isn't preferred:

- Use image optimization tools (Squoosh, ImageOptim) before committing
- Manually create responsive image sizes
- Use `<picture>` element with multiple sources
- Compress videos before uploading
- Use Vercel's built-in CDN (automatic with Vercel hosting)
- **Note**: This requires manual work for each image/video