import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface AuthConfig {
  domain: string;
  clientId: string;
  redirectUri: string;
  // audience?: string; // Uncomment this if you plan to use the audience
}

const authConfig: AuthConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI || '',
  // audience: 'https://api.local.roadrate.com', // Uncomment this if you plan to use the audience
};

export default authConfig;
