# How to Preview Your Site

## Quick Start - Live Development Server (Recommended)

This gives you **live updates** as you edit content.json:

```bash
npm run dev
```

Then open your browser to the URL shown (usually `http://localhost:5173`)

**How it works:**
- Edit `src/content.json` 
- Save the file
- The browser will **automatically refresh** and show your changes
- No need to restart the server!

## Preview Production Build

To see exactly how it will look when deployed:

```bash
npm run build
npm run preview
```

Then open the URL shown (usually `http://localhost:4173`)

**Note:** With this method, you need to rebuild (`npm run build`) after each content change.

## Workflow Recommendation

1. **Start dev server:** `npm run dev`
2. **Keep it running** in a terminal
3. **Edit `src/content.json`** in your editor
4. **Save** - browser auto-refreshes!
5. **Repeat** until content looks perfect
6. **When done:** Run `npm run build` to create final production files

## Tips

- Keep the dev server running while editing content
- Changes to `content.json` should appear immediately
- If changes don't appear, try a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- The dev server shows helpful error messages if your JSON is invalid

