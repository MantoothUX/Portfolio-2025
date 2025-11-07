<!-- 2fa175e9-cd7f-4b1c-a4f3-d282166a0aa0 1cb9cb32-569c-40b6-b5ad-f6d9fa9bdd81 -->
# Build Work Cards and Project Pages

## Overview

Build out the work section of the portfolio with real project data, enhance project card designs, and improve the project detail modals/pages.

## Current State

- Only 1 placeholder project in `src/content.json`
- Project cards display: company, year, title, description, tags (first 2)
- Project modal shows: full title, description, tags, image, overview, challenges, solutions, outcomes
- Mock data exists as fallback in `PortfolioWebsite.tsx`
- Images currently use Unsplash placeholders

## Tasks

### 1. Add Real Project Data

- Update `src/content.json` with real projects from your work
- Each project needs:
- `id`: Unique identifier
- `title`: Project name
- `company`: Company/client name
- `description`: Brief description (shown on card)
- `image`: Project image URL or path
- `tags`: Array of skills/technologies
- `year`: Project year
- `role`: Your role on the project
- `overview`: Detailed project overview
- `challenges`: Array of challenges faced
- `solutions`: Array of solutions implemented
- `outcomes`: Array of results/metrics

### 2. Enhance Project Cards (Optional)

- Current design shows: company, year, title, description, first 2 tags
- Potential improvements:
- Show more tags or better tag display
- Add hover effects
- Improve image display
- Add project type/category indicator

### 3. Enhance Project Modal/Detail Page (Optional)

- Current modal shows all project information
- Potential improvements:
- Better image gallery support
- More visual hierarchy
- Additional sections (process, tools used, etc.)
- Better mobile experience

### 4. Add Project Images

- Add project images to `public/` directory
- Update image paths in `content.json`
- Ensure images are optimized for web

## Questions to Answer

1. How many projects do you want to showcase? (Recommended: 4-8)
2. Do you have project images ready, or need placeholders?
3. What projects should be included? (Shopify work, agency work, etc.)
4. Any specific design improvements you want for cards/modals?

## Files to Modify

- `src/content.json` - Add real project data
- `src/components/generated/PortfolioWebsite.tsx` - Enhance card/modal designs (if needed)
- `public/` - Add project images

## Next Steps

1. Gather project information and images
2. Structure project data
3. Add to content.json
4. Test display and make design adjustments

### To-dos

- [ ] Decide on hosting service (AWS S3+CloudFront, AWS Amplify, Netlify, or Vercel)
- [ ] Set up hosting service and connect GitHub repository
- [ ] Configure custom domain (mantoothux.com) in hosting service
- [ ] Update DNS records to point mantoothux.com to new hosting
- [ ] Test deployed site and verify all functionality works
- [ ] Monitor site for reliability and performance