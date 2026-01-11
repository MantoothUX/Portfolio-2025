# Complete Stylesheet Documentation
## Josh Mantooth Portfolio Website

---

## 📐 Typography

### Font Families

#### Primary Fonts (Loaded via HTML)
- **Balto** (Adobe Typekit): `'balto', sans-serif`
  - Used for: Subtitle text
  - Weight: 300 (Light)
  - Loaded via: `<link rel="stylesheet" href="https://use.typekit.net/tjw3qnb.css">`

- **Instrument Serif**: `'Instrument Serif', serif`
  - Used for: Hero title, section headings (Overview, Challenges, Solution, etc.)
  - Weight: 400 (Regular)
  - Loaded via: Google Fonts

- **Cormorant Garamond**: `'Cormorant Garamond', serif`
  - Used for: Display text (via `--font-serif-display` variable)
  - Weight: 600 (Semi-bold)
  - Loaded via: Google Fonts

#### System Fonts
- **Sans-serif**: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`
  - Used for: Body text, navigation, buttons, project cards
  - Default fallback for most UI elements

- **Monospace**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`
  - Used for: Code elements (if any)

### Font Sizes

| Class | Size (rem) | Size (px) | Usage |
|-------|------------|-----------|-------|
| `text-xs` | 0.75rem | 12px | Tags, badges, small labels |
| `text-sm` | 0.875rem | 14px | Navigation links, project card descriptions, modal metadata |
| `text-base` | 1rem | 16px | Project card titles, skills list items, default body text |
| `text-lg` | 1.125rem | 18px | Project modal descriptions |
| `text-xl` | 1.25rem | 20px | Previously used for subtitle |
| `text-2xl` | 1.5rem | 24px | Section headings (Overview, Challenges, Solution, etc.) |
| `text-3xl` | 1.875rem | 30px | **Subtitle (current)** |
| `text-4xl` | 2.25rem | 36px | Project modal titles (responsive - medium screens) |
| `text-5xl` | 3rem | 48px | Project modal titles (responsive - large screens) |

### Responsive Font Sizes

- **Hero Title**: `clamp(2.5rem, 5vw, 5rem)` 
  - Responsive: 40px on small screens → 80px on large screens
  - Font: Instrument Serif, weight 400

- **About Page Headline**: `clamp(2.5rem, 5vw, 5rem)`
  - Same responsive scaling as hero title

- **Typing Footer Text**: `clamp(1rem, 2vw, 1.5rem)`
  - Responsive: 16px on small screens → 24px on large screens
  - Font: Instrument Serif

- **Project Modal Title**: `text-3xl sm:text-4xl md:text-5xl`
  - 30px → 36px → 48px based on breakpoint

---

## 🎨 Color Palette

### Primary Brand Colors

#### Light Mode
- **Primary Green**: `#13531C` (Dark green)
  - Used for: Active navigation, buttons, links, hero title, section headings
  - RGB: `rgb(19, 83, 28)`
  - HSL: `hsl(135, 63%, 20%)`

- **Accent Green**: `#7bf1a8` (Light green)
  - Used for: Dark mode hero title, dark mode section headings
  - RGB: `rgb(123, 241, 168)`
  - HSL: `hsl(145, 80%, 71%)`

#### Dark Mode
- **Primary Green**: `#7bf1a8` (Light green)
  - Used for: Hero title, section headings, active states
- **Dark Green**: `#13531C` (Dark green)
  - Used for: Backgrounds, borders in some contexts

### Gray Scale

#### Light Mode
- **Background**: `#ffffff` (White)
- **Foreground**: `hsl(212 24% 14%)` (Very dark blue-gray)
- **Text Primary**: `text-gray-900` → `#111827`
- **Text Secondary**: `text-gray-700` → `#374151`
- **Text Tertiary**: `text-gray-500` → `#6b7280`
- **Text Muted**: `text-gray-400` → `#9ca3af`
- **Borders**: `border-gray-200` → `#e5e7eb`
- **Card Background**: `bg-white` → `#ffffff`

#### Dark Mode
- **Background**: `#18181b` (zinc-950)
- **Foreground**: `hsl(0 0% 98%)` (Near white)
- **Text Primary**: `text-white` → `#ffffff`
- **Text Secondary**: `text-gray-300` → `#d1d5db`
- **Text Tertiary**: `text-gray-400` → `#9ca3af`
- **Text Muted**: `text-gray-500` → `#6b7280`
- **Borders**: `border-zinc-800` → `#27272a`
- **Card Background**: `bg-zinc-900` → `#18181b`

### Green Variants (Tailwind)

#### Light Mode
- `green-50`: `#f0fdf4` - Hover backgrounds
- `green-100`: `#dcfce7` - Hover states
- `green-200`: `#bbf7d0` - Borders, dividers
- `green-300`: `#86efac` - Hover text
- `green-400`: `#4ade80` - Links, icons
- `green-500`: `#22c55e` - Bullet points
- `green-600`: `#16a34a` - Hover states
- `green-700`: `#15803d` - Dark mode buttons, active states
- `green-800`: `#166534` - Button hover
- `green-900`: `#14532d` - Dark mode borders

#### Dark Mode
- `green-50`: `#f0fdf4` - Active text
- `green-300`: `#86efac` - Hover text
- `green-400`: `#4ade80` - Links, icons
- `green-500`: `#22c55e` - Bullet points
- `green-600`: `#16a34a` - Button hover
- `green-700`: `#15803d` - Buttons, active states
- `green-900/50`: `rgba(20, 83, 45, 0.5)` - Borders with opacity

---

## 🎯 Component Styles

### Hero Section

```css
/* Hero Title */
font-family: 'Instrument Serif', serif;
font-weight: 400;
font-size: clamp(2.5rem, 5vw, 5rem);
color: #13531C; /* Light mode */
color: #7bf1a8; /* Dark mode */

/* Subtitle */
font-family: 'balto', sans-serif;
font-weight: 300; /* Light */
font-size: 1.875rem; /* text-3xl = 30px */
color: text-gray-700; /* Light mode */
color: text-gray-300; /* Dark mode */
max-width: 48rem; /* max-w-3xl */
```

### Navigation

```css
/* Navigation Container */
background: rgba(255, 255, 255, 0.7); /* Light mode */
background: rgba(24, 24, 27, 0.7); /* Dark mode */
backdrop-filter: blur(24px);
border: 1px solid;
border-color: #bbf7d0; /* Light mode */
border-color: rgba(20, 83, 45, 0.5); /* Dark mode */
border-radius: 9999px; /* rounded-full */
box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.1); /* Light mode */
box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.2); /* Dark mode */

/* Active Navigation Link */
background: #13531C; /* Light mode */
background: #15803d; /* Dark mode */
color: white; /* Light mode */
color: #f0fdf4; /* Dark mode */

/* Inactive Navigation Link */
color: #15803d; /* Light mode */
color: #4ade80; /* Dark mode */
hover-background: #f0fdf4; /* Light mode */
hover-background: rgba(20, 83, 45, 0.3); /* Dark mode */
```

### Project Cards

```css
/* Card Container */
background: white; /* Light mode */
background: #18181b; /* Dark mode */
border: 1px solid;
border-color: #e5e7eb; /* Light mode */
border-color: #27272a; /* Dark mode */
border-radius: 12px;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
hover-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
hover-transform: scale(1.05) translateY(-8px);

/* Card Title */
font-size: 1rem; /* text-base */
font-weight: 600; /* font-semibold */
color: #111827; /* Light mode */
color: white; /* Dark mode */
hover-color: #13531C; /* Light mode */
hover-color: #86efac; /* Dark mode */

/* Card Description */
font-size: 0.875rem; /* text-sm */
color: #374151; /* Light mode */
color: #d1d5db; /* Dark mode */
line-clamp: 2; /* Truncate to 2 lines */
```

### Project Modal

```css
/* Modal Backdrop */
background: rgba(0, 0, 0, 0.6); /* Light mode */
background: rgba(0, 0, 0, 0.8); /* Dark mode */
backdrop-filter: blur(4px);

/* Modal Container */
background: white; /* Light mode */
background: #18181b; /* Dark mode */
border-radius: 16px; /* rounded-2xl */
max-width: 72rem; /* max-w-6xl */
max-height: 90vh;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Modal Header */
background: rgba(255, 255, 255, 0.95); /* Light mode */
background: rgba(24, 24, 27, 0.95); /* Dark mode */
backdrop-filter: blur(4px);
border-bottom: 1px solid;
border-color: #e5e7eb; /* Light mode */
border-color: #27272a; /* Dark mode */

/* Section Headings */
font-family: 'Instrument Serif', serif;
font-weight: 400;
font-size: 1.5rem; /* text-2xl */
color: #111827; /* Light mode */
color: white; /* Dark mode */

/* Bullet Points */
color: #22c55e; /* green-500 */
font-weight: 600; /* font-semibold */
```

### Buttons

```css
/* Primary Button */
background: #13531C; /* Light mode */
background: #15803d; /* Dark mode */
color: white; /* Light mode */
color: #f0fdf4; /* Dark mode */
border-radius: 9999px; /* rounded-full */
padding: 0.75rem 1.5rem; /* px-6 py-3 */
font-weight: 600; /* font-semibold */
hover-background: #166534; /* Light mode */
hover-background: #16a34a; /* Dark mode */

/* Secondary Button */
background: transparent;
border: 1px solid;
border-color: #d1d5db; /* Light mode */
border-color: #3f3f46; /* Dark mode */
color: #111827; /* Light mode */
color: white; /* Dark mode */
hover-background: #f9fafb; /* Light mode */
hover-background: #27272a; /* Dark mode */
```

### Category Filters

```css
/* Active Filter */
background: #13531C; /* Light mode */
background: #15803d; /* Dark mode */
color: white; /* Light mode */
color: #f0fdf4; /* Dark mode */

/* Inactive Filter */
background: #f0fdf4; /* Light mode */
background: rgba(20, 83, 45, 0.5); /* Dark mode */
color: #166534; /* Light mode */
color: #86efac; /* Dark mode */
border: 1px solid;
border-color: #bbf7d0; /* Light mode */
border-color: rgba(20, 83, 45, 0.5); /* Dark mode */
hover-background: #dcfce7; /* Light mode */
hover-background: rgba(20, 83, 45, 0.7); /* Dark mode */
```

---

## 📏 Spacing & Layout

### Container Widths
- **Max Container**: `max-w-7xl` → 80rem (1280px)
- **Content Container**: `max-w-4xl` → 56rem (896px)
- **Modal Container**: `max-w-6xl` → 72rem (1152px)
- **Subtitle Max Width**: `max-w-3xl` → 48rem (768px)

### Padding & Margins
- **Page Padding**: `px-4 sm:px-6 lg:px-8` → 1rem → 1.5rem → 2rem
- **Section Spacing**: `space-y-12` → 3rem vertical spacing
- **Card Padding**: `p-4` → 1rem
- **Modal Padding**: `px-4 py-8 sm:px-6 md:px-8 lg:px-12` → Responsive padding

### Grid Layouts
- **Project Grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Skills Grid**: `sm:grid-cols-2`
- **Outcomes Grid**: `sm:grid-cols-2 lg:grid-cols-3`

---

## 🎭 Shadows

### Shadow Definitions
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Custom Shadows
- **Navigation Shadow**: `shadow-lg shadow-green-500/10` (Light mode)
- **Navigation Shadow**: `shadow-lg shadow-green-500/20` (Dark mode)
- **Card Hover Shadow**: `shadow-2xl shadow-gray-500/20` (Light mode)
- **Card Hover Shadow**: `shadow-2xl shadow-black/40` (Dark mode)

---

## 🎨 Background Patterns

### Grid Pattern
```css
/* Light Mode */
background-image: 
  linear-gradient(to right, rgba(128, 128, 128, 0.07) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(128, 128, 128, 0.07) 1px, transparent 1px);
background-size: 24px 24px;

/* Dark Mode */
background-image: 
  linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
background-size: 24px 24px;
```

---

## ✨ Animations & Transitions

### Framer Motion Animations

#### Page Transitions
```css
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
exit: { opacity: 0 }
transition: { delay: 0.1 }
```

#### Navigation
```css
initial: { y: 100, opacity: 0 }
animate: { y: 0, opacity: 1 }
transition: { 
  type: "spring",
  stiffness: 260,
  damping: 20
}
```

#### Project Cards
```css
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
exit: { opacity: 0, y: 20 }
whileHover: { 
  scale: 1.05,
  y: -8,
  transition: { duration: 0.3, ease: "easeOut" }
}
```

#### Modal
```css
initial: { opacity: 0, scale: 0.95, y: 20 }
animate: { opacity: 1, scale: 1, y: 0 }
exit: { opacity: 0, scale: 0.95, y: 20 }
transition: { 
  type: "spring",
  damping: 25,
  stiffness: 300
}
```

### CSS Animations

#### Cursor Blink (Typing Effect)
```css
@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
animation: cursorBlink 0.8s step-end infinite;
```

#### Fade In (Image Fallback)
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 0.3s ease-in-out;
```

### Transitions
- **Color Transitions**: `transition-colors`
- **All Transitions**: `transition-all`
- **Duration**: Default 300ms (0.3s)

---

## 🔲 Border Radius

```css
--radius: 0; /* Base radius */
--radius-sm: calc(var(--radius) - 4px); /* -4px */
--radius-md: calc(var(--radius) - 2px); /* -2px */
--radius-lg: var(--radius); /* 0px */
--radius-xl: calc(var(--radius) + 4px); /* 4px */
```

### Component-Specific Radius
- **Rounded Full**: `9999px` (Navigation, buttons, pills)
- **Rounded 12px**: `12px` (Project cards)
- **Rounded 16px**: `16px` (Modal container)
- **Rounded 20px**: `20px` (Outcome cards, photo borders)

---

## 📱 Responsive Breakpoints

Tailwind CSS default breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

---

## 🎯 Z-Index Layers

```css
z-0: Background grid pattern
z-10: Content layer
z-20: Image gallery controls, navigation elements
z-50: Navigation bar
z-[100]: Project modal
```

---

## 🌓 Dark Mode

Dark mode is activated by adding the `dark` class to the `<html>` element:
```html
<html class="dark">
```

All color values automatically switch based on the `dark` class presence using Tailwind's dark mode variant.

---

## 📝 Notes

- The site uses Tailwind CSS 4.0 with custom CSS variables
- Most styling is done through Tailwind utility classes
- Inline styles are used for dynamic values (colors based on dark mode state)
- Font loading is optimized with `preconnect` for Google Fonts
- Balto font is loaded via Adobe Typekit
- All animations use Framer Motion for smooth transitions
- The design follows a mobile-first responsive approach

---

*Last updated: Based on current implementation as of latest changes*
