# Netlify Deployment Guide

This guide will help you deploy your Toilet QR Feedback App to Netlify.

## 🚀 Quick Deployment

### Method 1: Deploy from GitHub (Recommended)

1. **Go to [netlify.com](https://netlify.com)** and sign in
2. **Click "New site from Git"**
3. **Choose "GitHub"** and authorize Netlify
4. **Select your repository**: `Amankrishan14/Toilet-Qr`
5. **Configure build settings**:
   - **Build command**: `npm run netlify-build`
   - **Publish directory**: `.next`
   - **Node version**: 18 (or latest)
6. **Click "Deploy site"**

### Method 2: Deploy with Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your project directory
netlify deploy --prod --dir=.next
```

## ⚙️ Environment Variables

If you want to connect to Supabase later, add these environment variables in Netlify:

1. Go to **Site settings** → **Environment variables**
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

## 🔧 Build Configuration

The app is configured with:
- **netlify.toml**: Main configuration file
- **Build command**: `npm run netlify-build` (generates QR codes + builds)
- **Publish directory**: `.next`
- **Node version**: 18

## 📱 Features After Deployment

- **QR Codes**: Available at `https://your-site.netlify.app/qr-codes`
- **Feedback Forms**: `https://your-site.netlify.app/toilet/toilet_1` (etc.)
- **Admin Dashboard**: `https://your-site.netlify.app/admin`
- **Home Page**: `https://your-site.netlify.app`

## 🎯 Custom Domain

1. Go to **Domain settings** in your Netlify dashboard
2. Click **Add custom domain**
3. Enter your domain name
4. Follow DNS configuration instructions

## 🔄 Automatic Deployments

- **Automatic**: Every push to main branch triggers a new deployment
- **Preview**: Pull requests get preview deployments
- **Manual**: Deploy from any branch manually

## 🐛 Troubleshooting

### Build Fails
- Check Node version is 18+
- Ensure all dependencies are in package.json
- Check build logs in Netlify dashboard

### QR Codes Not Showing
- Verify QR codes are generated during build
- Check `/qr-codes` path is accessible
- Ensure images are in `public/qr-codes/` directory

### Routing Issues
- Check `_redirects` file in public directory
- Verify `netlify.toml` redirects configuration

## 📊 Performance

The app is optimized for Netlify with:
- Static site generation (SSG)
- Optimized images and assets
- Proper caching headers
- CDN distribution

## 🔒 Security

- HTTPS enabled by default
- Security headers configured
- No sensitive data in client-side code

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Verify environment variables
3. Test locally with `npm run build`
4. Check this guide for common solutions

