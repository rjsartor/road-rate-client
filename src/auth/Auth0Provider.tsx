import React, { FC }from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import authConfig from './auth0-config';
import { API_BASE_URL } from '../config';
import { Auth0Provider as OriginalAuthProvider } from '@auth0/auth0-react';
import AxiosService from '../services/AxiosService';

interface ValidateEmailOptions {
  email: string;
}

const validateEmail = async ({ email }: ValidateEmailOptions): Promise<boolean> => {
  try {
    const response = await AxiosService.get(`users/?search=${email}`);
    const emails: string[] = response.data as string[];
    return !emails.length;
  } catch (error) {
    console.error('Error validating email:', error);
    throw error;
  }
};

interface FindOrCreateUserOptions {
  email: string;
  [key: string]: any; 
}

export const findOrCreateUser = async (options: FindOrCreateUserOptions): Promise<any> => {
  if (!await validateEmail(options)) {
    return false;
  }

  try {
    const { data } = await AxiosService.post(`users/user`, options);
    return data;
  } catch (error) {
    console.error('Error finding or creating user:', error);
    throw error;
  }
};

export const Auth0Provider: FC = () => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  const props = {
    ...authConfig,
    onRedirectCallback,
    // cacheLocation: 'localstorage',
    useRefreshTokens: true,
  };

  return (
    <OriginalAuthProvider {...props}>
      <Outlet />
    </OriginalAuthProvider>
  );
};
