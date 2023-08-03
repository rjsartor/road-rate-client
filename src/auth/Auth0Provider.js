import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Auth0Provider as Provider } from '@auth0/auth0-react';
import authConfig from './auth0-config';
import { API_BASE_URL } from '../config';

// move to utils
const validateEmail = async (email) => {
  const res = await fetch(
    `${API_BASE_URL}/users/?search=${email}`
  );

  // Pull out the data from response
  const emails = await res.json();

  // if the username exists in the DB
  return !emails.length;
};

export const findOrCreateUser = async (options) => {
  if (!validateEmail(options.email)) {
    return false;
  }

  return fetch(`${API_BASE_URL}/users/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(options)
  })
    .then(res => {
      return res.json();
    }).then(user => {
      return user;
    })
    .catch(err => {
      if (err === 'TypeError: Failed to fetch') {
        return Promise.reject(err);
      }
    });
};

export const Auth0Provider = () => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  const props = {
    ...authConfig,
    onRedirectCallback,
    cacheLocation: 'localstorage',
    useRefreshTokens: true
  };

  return (
    <Provider {...props}>
      <Outlet />
    </Provider>
  );
};
