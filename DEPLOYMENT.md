# Mertology Deployment Guide

## 🚀 Netlify Deployment

### 1. Sanity Studio Deploy

**Repository:** `studio-mertology/`
**Build Command:** `npm run build`
**Publish Directory:** `dist`
**Node Version:** 18

**Environment Variables:**
```
SANITY_STUDIO_PROJECT_ID=ihv04p7t
SANITY_STUDIO_DATASET=production
```

### 2. Mertology Frontend Deploy

**Repository:** Root directory
**Build Command:** `npm run build`
**Publish Directory:** `.next`
**Node Version:** 18

**Environment Variables:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=ihv04p7t
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-12-01
NEXT_PUBLIC_SANITY_USE_CDN=true
```

## 📋 Deployment Steps

### Sanity Studio (CMS)
1. Create new Netlify site from Git
2. Connect `studio-mertology` repository
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
4. Add environment variables
5. Deploy

### Mertology Frontend
1. Create new Netlify site from Git
2. Connect main repository
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18
4. Add environment variables
5. Deploy

## 🔧 Post-Deployment

1. **Sanity Studio URL:** `https://your-studio-name.netlify.app`
2. **Frontend URL:** `https://your-frontend-name.netlify.app`
3. **Update CORS settings** in Sanity project settings
4. **Test content creation** in Studio
5. **Verify frontend** displays content correctly

## 📝 Notes

- Both projects are configured with `netlify.toml`
- Build optimizations are enabled
- TypeScript errors are ignored for faster builds
- ESLint errors are ignored for faster builds
- Sanity images are optimized via CDN
