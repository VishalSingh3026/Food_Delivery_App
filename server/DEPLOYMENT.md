# Food Delivery Server - Vercel Deployment

This is the backend server for the Food Delivery App, configured for deployment on Vercel.

## Environment Variables

Before deploying, make sure to set up the following environment variables in your Vercel dashboard:

### Required Variables:
- `DATABASE_URL` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Port number (Vercel will set this automatically)

### Optional Variables (if using these services):
- `CLOUD_NAME` - Cloudinary cloud name
- `API_KEY` - Cloudinary API key  
- `API_SECRET` - Cloudinary API secret
- `STRIPE_SECRET_KEY` - Stripe secret key for payments
- `VITE_FRONTEND_URL` - Frontend URL for Stripe redirects

## Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the server directory**:
   ```bash
   cd server
   vercel
   ```

4. **Set Environment Variables**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add all required environment variables

5. **Redeploy** (if needed):
   ```bash
   vercel --prod
   ```

## Important Notes

- Make sure your MongoDB database is accessible from external IPs (use MongoDB Atlas for cloud hosting)
- The server is configured to handle file uploads using temporary files (`/tmp`)
- CORS is enabled for all origins - consider restricting this in production
- The server runs on the port specified by Vercel's environment

## API Endpoints

- `/api/user` - User authentication and management
- `/api/food` - Food items management
- `/api/cart` - Shopping cart operations
- `/api/order` - Order processing
- `/api/category` - Food categories
- `/api/promocode` - Promotional codes
- `/api/contact` - Contact form submissions

## Troubleshooting

1. **Database Connection Issues**: Ensure your DATABASE_URL is correct and the database allows external connections
2. **File Upload Issues**: Vercel has limitations on file uploads - consider using Cloudinary for image storage
3. **Environment Variables**: Double-check all environment variables are set correctly in Vercel dashboard
