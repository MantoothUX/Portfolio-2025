# Quick Start - Get Your Portfolio Live Today

## ✅ What's Been Done

1. ✅ Content system set up - Edit `src/content.json` to update all content
2. ✅ Portfolio component updated to read from content.json
3. ✅ Build tested and working
4. ✅ Vercel deployment configuration ready (`vercel.json`)
5. ✅ Deployment guide created

## 🚀 Next Steps (Do These Now)

### 1. Update Your Content (15-30 minutes)

Open `src/content.json` and replace placeholder content with your real content from mantoothux.com:

- **Projects**: Copy each project from your Squarespace site
- **About**: Update bio paragraphs and skills
- **Contact**: Add your real email, LinkedIn, and GitHub URLs
- **Hero**: Update the main headline

See `CONTENT_INSTRUCTIONS.md` for the exact structure.

### 2. Test Locally (2 minutes)

```bash
npm run build
npm run preview
```

Visit the preview URL and verify everything looks good.

### 3. Deploy to Vercel (10-15 minutes)

**Easiest Method:**

1. Push your code to GitHub (if not already)
2. Go to [vercel.com](https://www.vercel.com) and sign up/login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository: `MantoothUX/Portfolio-2025`
5. Vercel auto-detects settings from `vercel.json` (build: `npm run build`, output: `dist`)
6. Click "Deploy"

**Then add your domain:**

1. In Vercel, go to Project Settings → Domains
2. Add `mantoothux.com` and `www.mantoothux.com`
3. Follow Vercel's DNS instructions

### 4. Update DNS (5 minutes)

In your domain registrar's DNS settings:

- Add the DNS records that Vercel provides (A record or CNAME)
- Wait 24-48 hours for DNS propagation
- Vercel automatically provides SSL certificate

## 📋 Files You Need to Know

- `src/content.json` - **Edit this** to update all your content
- `vercel.json` - Vercel deployment config (already set up)
- `DEPLOYMENT_GUIDE.md` - Detailed deployment instructions
- `CONTENT_INSTRUCTIONS.md` - Content structure guide

## ⚡ Fastest Path to Live Site

1. Fill in `src/content.json` with your real content
2. Run `npm run build` to test
3. Push to GitHub
4. Deploy on Vercel (connect GitHub repo)
5. Add custom domain in Vercel
6. Update DNS at your registrar
7. Wait for DNS propagation
8. Done! 🎉

## 🆘 Need Help?

- Content structure: See `CONTENT_INSTRUCTIONS.md`
- Deployment details: See `DEPLOYMENT_GUIDE.md`
- Build issues: Run `npm install` first, then `npm run build`

Your site is ready to go live! Just add your content and deploy. 🚀

