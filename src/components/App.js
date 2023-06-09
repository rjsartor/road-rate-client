import React, {useState } from 'react';
import { BrowserRouter, Route, Router, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RegistrationPage from './registration-page';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import LoginForm from './login-form';
import ClaimPlate from './claim-plate';
import PublicPlate from './public-plate';
import MyPlatesList from './my-plates-list';
import MyPlate from './my-plate';
import About from './about';
import MyReviews from './my-reviews'
import '../styles/App.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "../auth/Auth0Provider";

export const App = () => {
  const [user, setUser] = useState({ username: null });

  const { error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }
 
  const storeUser = user => {
    localStorage.getItem("user");
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser({ username: null });
  };
  
  const routes = createRoutesFromElements(
    <Route element={<Auth0Provider /> }>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route 
            path="/dashboard" 
            element={<Dashboard />}
        /> 
        {/* <Route exact path="/login" component={LoginForm} storeUser={storeUser} />
        <Route path="/plate" component={PublicPlate} />
        <Route exact path="/about" component={About} storeUser={storeUser} />
        <Route exact path="/claim-plate" component={ClaimPlate} storeUser={storeUser} />
        <Route exact path="/my-plates" component={MyPlatesList} storeUser={storeUser} /> 
        <Route path="/my-plates/id" component={MyPlate} storeUser={storeUser} />
        <Route exact path="/my-reviews" component={MyReviews} /> */}
    </Route>
  );    
  const router = createBrowserRouter(routes);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App;
