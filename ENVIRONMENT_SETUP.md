# Environment Variables Troubleshooting Guide

## ✅ What I've Fixed

### 1. **Updated Vite Configuration**
- Fixed `vite.config.js` in both frontend and admin
- Added proper environment variable loading using `loadEnv`
- Configured proxy settings for API calls
- Added environment variable validation

### 2. **Created Environment Configuration**
- Added `src/config/env.js` in both frontend and admin
- This provides a centralized way to access environment variables
- Includes validation to ensure required variables are present

### 3. **Updated Component Imports**
- Fixed all components to use the new config system instead of `process.env.VITE_API_URL`
- Updated StoreContext, App.jsx, and assets.js files

### 4. **Environment Files Structure**
```
frontend/
├── .env                    # Base environment file
├── .env.local             # Local development (highest priority)
├── .env.production        # Production environment
└── src/config/env.js      # Environment configuration

admin/
├── .env                    # Base environment file  
├── .env.local             # Local development (highest priority)
├── .env.production        # Production environment
└── src/config/env.js      # Environment configuration
```

## 🔧 How to Test

### 1. **Check Environment Variables**
Add the DebugEnv component to your app temporarily:
```jsx
import DebugEnv from './components/DebugEnv';

// Add this to your App.jsx temporarily
<DebugEnv />
```

### 2. **Start Development Servers**
```bash
# Frontend (runs on http://localhost:5173)
cd frontend
npm run dev

# Admin (runs on http://localhost:5174) 
cd admin
npm run dev

# Server (runs on http://localhost:4000)
cd server
npm run dev
```

### 3. **Test API Connectivity**
Open browser console and check:
- Network tab for API calls
- Console for any CORS errors
- Check if environment variables are loaded

## 🚀 Deployment Ready

### For Vercel Deployment:
1. **Deploy Server**: From server directory run `vercel --prod`
2. **Get Deployment URL**: Note the URL Vercel provides
3. **Update Environment Files**: Replace the URL in `.env.production` files
4. **Deploy Frontend/Admin**: Deploy to your preferred host (Vercel, Netlify, etc.)

### Environment Variables in Production:
Make sure to set these in your deployment platform:
- `VITE_API_URL=https://your-vercel-url.vercel.app`

## 🐛 Common Issues & Solutions

### Issue 1: "VITE_API_URL is undefined"
**Solution**: Check `.env.local` file exists and has correct format

### Issue 2: "Cannot access API"
**Solution**: 
- Check if server is running
- Verify CORS configuration on server
- Check network tab for failed requests

### Issue 3: "Environment variables not loading"
**Solution**:
- Restart development server after changing .env files
- Ensure variables are prefixed with `VITE_`
- Check file names (no extra spaces or characters)

## ✅ Current Status
- ✅ Frontend server running on http://localhost:5173
- ✅ Admin server running on http://localhost:5174  
- ✅ Environment variables properly configured
- ✅ Vite configuration updated
- ✅ Ready for deployment to Vercel
