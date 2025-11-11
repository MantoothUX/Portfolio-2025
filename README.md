# Portfolio Website - Josh Mantooth

A modern, custom-built portfolio website for **Josh Mantooth**, a staff-level product designer showcasing UX design work and experience. Built with React, TypeScript, and Tailwind CSS.

**Live Site:** [mantoothux.com](https://mantoothux.com)

## ✨ Features

- **Modern Design**: Clean, responsive design with dark/light mode support
- **Project Showcase**: Interactive project cards with detailed modal views and image galleries
- **Project Filtering**: Filter projects by category (Shopify, Personal, etc.)
- **Content Management**: Easy-to-update JSON-based content system
- **Performance**: Fast, optimized React application with Vite
- **Accessibility**: Semantic HTML and keyboard navigation support
- **SEO Ready**: Proper meta tags and semantic structure
- **URL Routing**: Shareable project links with hash-based routing
- **Image Galleries**: Carousel support for multiple project images

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond (headlines, weight 600), System fonts (body)

## 📁 Project Structure

```
├── public/                 # Static assets (images, PDFs)
│   ├── josh-photo.jpg
│   ├── JM_resume_general_11.6.2025.pdf
│   ├── Process_diagram_*.svg  # Process diagrams for About page
│   └── projects/          # Project images organized by project
│       ├── us-capitals-game/
│       ├── marketing-automations/
│       ├── Mantooth_Portfolio/
│       └── ...
├── src/
│   ├── components/
│   │   └── generated/
│   │       └── PortfolioWebsite.tsx  # Main portfolio component
│   ├── content.json       # All site content (projects, about, contact)
│   ├── App.tsx            # Root component with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── vercel.json            # Vercel deployment configuration
├── netlify.toml           # Netlify deployment configuration (alternative)
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MantoothUX/Portfolio-2025.git
cd Portfolio-2025
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📝 Updating Content

All content is managed through `src/content.json`. Simply edit this file to update:

- **Projects**: Add, remove, or modify project entries
- **About Section**: Update bio, skills, and photo
- **Contact Info**: Update email, LinkedIn, GitHub links
- **Hero Title**: Change the main headline

See `CONTENT_INSTRUCTIONS.md` for detailed content structure.

## 🎨 Customization

### Colors

The site uses a green color scheme that adapts to light/dark mode:
- Light mode: `#13531C` (dark green)
- Dark mode: `#7bf1a8` (light green)

These colors are defined inline in components and can be updated in:
- `src/components/generated/PortfolioWebsite.tsx`

### Fonts

- **Headlines & Section Titles**: Cormorant Garamond (weight 600, loaded from Google Fonts)
- **Project Titles**: System UI sans-serif
- **Body Text**: System font stack

To change fonts, update `index.html` and `src/index.css`.

## 🏗️ Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## 🚢 Deployment

This site is configured for deployment on **Vercel** (primary) or Netlify. See `DEPLOYMENT_GUIDE.md` for detailed instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Import your repository
4. Vercel will auto-detect settings from `vercel.json`
5. Configure your custom domain: `mantoothux.com`

### Alternative: Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will auto-detect the build settings from `netlify.toml`
4. Configure your custom domain in Netlify settings

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎯 Features in Detail

### Dark Mode
- Toggle between light and dark themes
- Preference saved in localStorage
- Smooth transitions between modes

### Project Modals
- Click any project card to view detailed project information
- URL hash-based routing for shareable project links (e.g., `/work#project-1`)
- Image galleries with carousel navigation
- Flexible content sections (Overview, Challenges, Solutions, Outcomes, Highlights, Tools Used)
- Smooth animations with Framer Motion

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

## 📚 Documentation

- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `CONTENT_INSTRUCTIONS.md` - How to update site content
- `PREVIEW_GUIDE.md` - Development preview instructions

## 🤝 Contributing

This is a personal portfolio site. If you'd like to use this as a template for your own portfolio, feel free to fork it!

## 📝 License

MIT License - See LICENSE file for details

## 👤 Author

**Josh Mantooth** - Staff-level Product Designer

- Portfolio: [mantoothux.com](https://mantoothux.com)
- LinkedIn: [joshmantooth](https://linkedin.com/in/joshmantooth)
- GitHub: [@MantoothUX](https://github.com/MantoothUX)
- Email: mantoothux@gmail.com

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
