# Content Update Instructions

## Quick Start

To update your portfolio content, edit the file `src/content.json` with your real information from mantoothux.com.

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
      "title": "E-commerce Platform Redesign",
      "company": "Tech Company",
      "description": "Redesigned checkout flow resulting in 30% conversion increase",
      "image": "https://example.com/project-image.jpg",
      "tags": ["UX Research", "UI Design"],
      "year": "2024",
      "role": "Lead UX Designer",
      "overview": "Led a complete redesign of the e-commerce platform...",
      "challenges": ["High cart abandonment", "Complex checkout process"],
      "solutions": ["Simplified to 3 steps", "Added trust indicators"],
      "outcomes": ["30% conversion increase", "40% reduction in abandonment"]
    }
  ],
  "about": {
    "bio": [
      "Your first bio paragraph here...",
      "Your second bio paragraph here..."
    ],
    "skills": {
      "User Research": ["Usability Testing", "User Interviews"],
      "Design": ["UI Design", "Prototyping"]
    }
  },
  "contact": {
    "email": "josh@mantoothux.com",
    "linkedin": "https://linkedin.com/in/joshmantooth",
    "github": "https://github.com/joshmantooth"
  },
  "hero": {
    "title": "Staff-level UX designer crafting impactful and delightful experiences"
  }
}
```

## Tips

1. Copy content directly from your Squarespace site (mantoothux.com)
2. For images, you can:
   - Use Unsplash URLs (free stock photos)
   - Upload to a service like Cloudinary or Imgur
   - Host them in your project's public folder
3. After updating content.json, run `npm run build` to test locally
4. The site will automatically use mock data if content.json is empty or missing projects

