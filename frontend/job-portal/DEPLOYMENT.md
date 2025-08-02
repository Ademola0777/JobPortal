# Deployment Guide

## Environment Variables Setup

### For Local Development
Create a `.env.local` file in the root directory:
```
VITE_API_URL=http://localhost:8000
```

### For Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your deployed backend URL (e.g., `https://your-backend-domain.com`)
   - **Environment**: Production (and Preview if needed)

## Common Issues and Solutions

### 404 NOT_FOUND Error
This error typically occurs due to:
1. **Missing environment variables** - Ensure `VITE_API_URL` is set in Vercel
2. **API endpoint not found** - Verify your backend is deployed and accessible
3. **CORS issues** - Ensure your backend allows requests from your Vercel domain

### Routing Issues
The `vercel.json` file is configured to handle SPA routing. If you're still experiencing routing issues:
1. Ensure all routes redirect to `/index.html`
2. Check that your React Router configuration is correct

### Build Issues
If the build fails:
1. Check that all dependencies are properly installed
2. Verify that the build command in `package.json` is correct
3. Ensure all environment variables are properly configured

## Backend Deployment
Make sure your backend is deployed and accessible before deploying the frontend. The frontend will try to connect to the URL specified in `VITE_API_URL`. 