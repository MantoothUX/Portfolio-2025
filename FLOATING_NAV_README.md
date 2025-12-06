# FloatingNav Component

A beautiful, animated floating navigation component for React applications. Features smooth spring animations, active route highlighting, and dark mode support.

## Features

- ✨ Smooth spring animations on mount
- 🎯 Active route highlighting
- 🌙 Dark mode toggle support
- 🎨 Fully customizable colors and styling
- 📱 Responsive design with backdrop blur
- 🔧 TypeScript support
- ⚡ Lightweight and performant

## Installation

### Required Dependencies

Install the following packages:

```bash
npm install framer-motion react-router-dom lucide-react clsx tailwind-merge
# or
yarn add framer-motion react-router-dom lucide-react clsx tailwind-merge
```

### Tailwind CSS Setup

Ensure you have Tailwind CSS configured in your project. The component uses Tailwind classes and requires:

- Tailwind CSS v3+ installed
- Dark mode configured (using `class` strategy)
- Backdrop blur support enabled

Add to your `tailwind.config.js`:

```js
module.exports = {
  darkMode: 'class', // Required for dark mode support
  // ... rest of your config
}
```

## Usage

### Basic Example

```tsx
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FloatingNav, NavItem } from './components/FloatingNav';
import { Briefcase, User } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const navItems: NavItem[] = [
    { path: '/work', label: 'Work', icon: Briefcase },
    { path: '/about', label: 'About', icon: User }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {/* Your content */}
        
        <FloatingNav
          items={navItems}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      </div>
    </BrowserRouter>
  );
}
```

### With Icons

To show icons, set `showIcon: true` on your nav items:

```tsx
const navItems: NavItem[] = [
  { 
    path: '/work', 
    label: 'Work', 
    icon: Briefcase,
    showIcon: true // Icons will now be displayed
  },
  { 
    path: '/about', 
    label: 'About', 
    icon: User,
    showIcon: true
  }
];
```

### Custom Colors

Customize the color scheme to match your brand:

```tsx
<FloatingNav
  items={navItems}
  darkMode={darkMode}
  onToggleDarkMode={toggleDarkMode}
  activeBgColor="bg-blue-600 dark:bg-blue-800"
  activeTextColor="text-white dark:text-blue-50"
  inactiveTextColor="text-blue-600 dark:text-blue-400"
  hoverBgColor="hover:bg-blue-50 dark:hover:bg-blue-900/30"
  borderColor="border-blue-200 dark:border-blue-900/50"
  dividerColor="bg-blue-200 dark:bg-blue-900/50"
/>
```

### Custom Position

Change the position from bottom-center to any other position:

```tsx
// Top center
<FloatingNav
  items={navItems}
  darkMode={darkMode}
  onToggleDarkMode={toggleDarkMode}
  position="fixed top-6 left-1/2 -translate-x-1/2"
/>

// Bottom right
<FloatingNav
  items={navItems}
  darkMode={darkMode}
  onToggleDarkMode={toggleDarkMode}
  position="fixed bottom-6 right-6"
/>
```

### Without Dark Mode Toggle

Hide the dark mode toggle button:

```tsx
<FloatingNav
  items={navItems}
  darkMode={darkMode}
  onToggleDarkMode={toggleDarkMode}
  showDarkModeToggle={false}
/>
```

## API Reference

### Props

#### `FloatingNavProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `NavItem[]` | **required** | Array of navigation items to display |
| `darkMode` | `boolean` | **required** | Current dark mode state |
| `onToggleDarkMode` | `() => void` | **required** | Function to toggle dark mode |
| `showDarkModeToggle` | `boolean` | `true` | Whether to show the dark mode toggle button |
| `position` | `string` | `"fixed bottom-6 left-1/2 -translate-x-1/2"` | Custom position classes |
| `backgroundColor` | `string` | `"bg-white/70 dark:bg-zinc-900/70"` | Background color classes |
| `borderColor` | `string` | `"border-green-200 dark:border-green-900/50"` | Border color classes |
| `activeBgColor` | `string` | `"bg-[#13531C] dark:bg-green-700"` | Active item background color |
| `activeTextColor` | `string` | `"text-white dark:text-green-50"` | Active item text color |
| `inactiveTextColor` | `string` | `"text-green-700 dark:text-green-400"` | Inactive item text color |
| `hoverBgColor` | `string` | `"hover:bg-green-50 dark:hover:bg-green-900/30"` | Hover background color |
| `dividerColor` | `string` | `"bg-green-200 dark:bg-green-900/50"` | Divider color classes |
| `zIndex` | `string` | `"z-50"` | Z-index class |
| `className` | `string` | `undefined` | Additional className for the nav element |

#### `NavItem`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `path` | `string` | **required** | The path/route for this navigation item |
| `label` | `string` | **required** | The label to display |
| `icon` | `LucideIcon` | optional | Icon component from lucide-react |
| `showIcon` | `boolean` | optional | Whether to show the icon (default: false) |

## Styling

The component uses Tailwind CSS classes and supports full customization through props. The default theme uses a green color scheme, but you can easily customize it.

### Default Color Scheme

- **Active background**: `#13531C` (green-700 in dark mode)
- **Active text**: White (green-50 in dark mode)
- **Inactive text**: Green-700 (green-400 in dark mode)
- **Hover**: Green-50 (green-900/30 in dark mode)
- **Border**: Green-200 (green-900/50 in dark mode)

### Customization Tips

1. **Match your brand colors**: Use your brand's primary color for active states
2. **Maintain contrast**: Ensure sufficient contrast between active and inactive states
3. **Dark mode**: Always provide dark mode variants for better UX
4. **Backdrop blur**: The component uses `backdrop-blur-xl` for a modern glass effect

## Animation

The component uses Framer Motion with a spring animation:

- **Type**: Spring
- **Stiffness**: 260
- **Damping**: 20
- **Initial**: Slides up from 100px below with fade-in
- **Animate**: Smoothly animates to final position

You can customize animations by modifying the component's `motion.div` props.

## Browser Support

- Modern browsers with CSS backdrop-filter support
- Requires React 18+
- Requires React Router v6+

## Troubleshooting

### Dark mode not working

Ensure you have:
1. Tailwind configured with `darkMode: 'class'`
2. The `dark` class is being toggled on `document.documentElement`
3. Dark mode variants are included in your Tailwind config

### Icons not showing

1. Ensure `showIcon: true` is set on your nav items
2. Verify the icon component is imported from `lucide-react`
3. Check that the icon component is passed correctly

### Positioning issues

1. Ensure parent containers don't have `overflow: hidden` that clips the nav
2. Check z-index conflicts with other elements
3. Verify Tailwind classes are being applied correctly

## License

This component is part of the portfolio project and can be reused freely.

## Credits

Originally created for Josh Mantooth's portfolio website, extracted and packaged for reuse.




