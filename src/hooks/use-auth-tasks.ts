import { useCallback, useEffect, useState } from 'react';
import { findOrCreateUser } from '../auth/Auth0Provider';
import { useNavigate } from 'react-router-dom';
import { useAuth0, User } from '@auth0/auth0-react';
import { UserType } from '../types/auth.types';


interface AuthTasksReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  userInfo: UserType | null;
  user: User | undefined;
  accessToken: string | null;
  loginWithRedirect: () => void;
  handleLogout: () => void;
}

export const useAuthTasks = (): AuthTasksReturn => {
  const {
    isAuthenticated,
    isLoading,
    user,
    getIdTokenClaims,
    logout,
    loginWithRedirect,
  } = useAuth0();

  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const getAccessToken = useCallback(async () => {
    try {
      const idTokenClaims = await getIdTokenClaims();
      if (idTokenClaims) {
        const accessToken = idTokenClaims.__raw;
        localStorage.setItem('accessToken', accessToken);
      }
    } catch (error) {
      console.error('Failed to get access token:', error);
    }
  }, []);

  const fetchUserInfo = useCallback(async () => {
    try {
      if (user && user.email) {
        const _user: UserType = await findOrCreateUser({
          email: user.email,
          username: user.nickname,
          name: `${user?.given_name} ${user?.family_name}`,
        });

        setUserInfo(_user);
        localStorage.setItem('user', JSON.stringify(_user));
        localStorage.setItem('userId', _user.id || "");
      }
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  useEffect(() => {
    if (isLoading || accessToken || !user) return;

    getAccessToken();
    fetchUserInfo();
  }, [isLoading, isAuthenticated, accessToken, navigate, getAccessToken, fetchUserInfo]);

  return {
    isAuthenticated,
    isLoading,
    userInfo,
    user,
    accessToken,
    loginWithRedirect,
    handleLogout,
  };
};
