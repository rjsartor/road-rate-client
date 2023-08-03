import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const authConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI
  // audience: 'https://api.local.roadrate.com',
};

export default authConfig;
