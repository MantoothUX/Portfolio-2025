# Content Update Instructions

## Quick Start

To update the portfolio content for Josh Mantooth's portfolio, edit the file `src/content.json` with project information, bio, and contact details.

## Content Structure

### Projects
Each project should have:
- `id`: Unique identifier (e.g., "1", "2", "3")
- `title`: Project title
- `company`: Company/client name
- `description`: Brief one-line description
- `image`: URL to project image (can be Unsplash, your own hosting, etc.)
- `tags`: Array of relevant tags (e.g., ["UX Research", "UI Design"])
- `year`: Year the project was completed
- `role`: Your role on the project
- `overview`: Detailed paragraph about the project
- `challenges`: Array of challenge statements
- `solutions`: Array of solution statements
- `outcomes`: Array of outcome/metric statements

### About Section
- `bio`: Array of paragraph strings for your bio
- `skills`: Object with category names as keys and arrays of skills as values

### Contact
- `email`: Your email address
- `linkedin`: Full LinkedIn profile URL
- `github`: Full GitHub profile URL

### Hero
- `title`: Main headline on the homepage
- `subtitle`: Optional subtitle (currently hidden but can be enabled)

## Example

```json
{
  "projects": [
    {
      "id": "1",
      "title": "Shopify Marketing Automations",
      "company": "Shopify",
      "description": "End-to-end design from MVP launch to full-scale platform",
      "image": "/projects/marketing-automations/marketing_automations_hero.png",
      "tags": ["UX/UI Design", "User Research"],
      "year": "2021-2023",
      "role": "Design, research, user testing",
      "overview": "Designed, launched and evolved a no-code automated email marketing platform...",
      "challenges": ["Shopify did not offer customizable marketing email workflows"],
      "solutions": ["I collaborated with multiple designers and cross-functional teams..."],
      "outcomes": ["Successfully launched Marketing Automations platform"]
    }
  ],
  "about": {
    "headline": "Hi, I'm Josh",
    "bio": [
      "I'm a staff-level product designer with 10+ years solving complex problems...",
      "For the past 4+ years at Shopify, I led teams and designed features..."
    ],
    "skills": {
      "Design": ["Collaborative design", "Rapid prototyping", "UI design"],
      "Tools": ["Figma", "FigJam", "Framer", "Cursor"],
      "Strategy & research": ["User research", "Concept and usability testing"]
    }
  },
  "contact": {
    "email": "mantoothux@gmail.com",
    "linkedin": "https://linkedin.com/in/joshmantooth",
    "github": "https://github.com/MantoothUX"
  },
  "hero": {
    "title": "Staff UX designer solving complex problems with delightful experiences"
  }
}
```

## Tips

1. All project images should be placed in the `public/projects/[project-name]/` directory
2. For images:
   - Upload project images to `public/projects/[project-name]/`
   - Reference them in content.json as `/projects/[project-name]/filename.png`
3. After updating content.json, run `npm run dev` to preview changes locally
4. The site uses the content from `src/content.json` - make sure all required fields are populated

