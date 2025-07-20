// Environment configuration
const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
}

// Validate that required environment variables are present
if (!config.API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

export default config;
