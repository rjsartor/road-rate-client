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

import { Auth0Provider } from "../auth/Auth0Provider";

export const App = () => {
  const routes = createRoutesFromElements(
    <Route element={<Auth0Provider /> }>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/register" element={<RegistrationPage />} /> */}
        <Route 
            path="/dashboard" 
            element={<Dashboard />}
        /> 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/plate" element={<PublicPlate />} />
        <Route path="/plate/id/:id" element={<PublicPlate />} />
        <Route path="/about" element={<About />} />
        <Route path="/claim-plate" element={<ClaimPlate />} />
        <Route path="/my-plates" element={<MyPlatesList />} /> 
        <Route path="/my-plates/id/:id" element={<MyPlate />} />
        <Route path="/my-reviews" element={<MyReviews />} />
    </Route>
  );    
  const router = createBrowserRouter(routes);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App;
