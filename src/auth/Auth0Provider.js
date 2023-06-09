import React from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { Auth0Provider as Provider} from "@auth0/auth0-react";
import authConfig from './auth0-config';


export const Auth0Provider = () => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  const props = {
    ...authConfig,
    onRedirectCallback,
    cacheLocation: "localstorage",
    useRefreshTokens: true,
  };

  return (
    <Provider {...props}>
      <Outlet />
    </Provider>
  );
};
