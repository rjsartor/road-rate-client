import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginForm = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <section className="login-container">
       <button onClick={() => loginWithRedirect()}>Login</button>
    </section>
  );
};

export default LoginForm;
