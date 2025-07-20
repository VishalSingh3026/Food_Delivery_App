#!/bin/bash

# Food Delivery Server Deployment Script
echo "🚀 Deploying Food Delivery Server to Vercel..."

# Check if we're in the server directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the server directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "📦 Starting deployment..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔧 Don't forget to:"
echo "   1. Set up environment variables in Vercel dashboard"
echo "   2. Update frontend .env.production with your Vercel URL"
echo "   3. Ensure your MongoDB database allows external connections"
