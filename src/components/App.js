import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LandingPage from './Landing';
import LoginForm from './forms/LoginForm';
import ClaimPlate from './plates/ClaimPlate';
import PublicPlate from './plates/PublicPlate';
import MyPlatesList from './plates/MyPlates';
import MyPlate from './plates/MyPlate';
import About from './About';
import MyReviews from './MyReviews';
import Home from './Home';
import '../styles/App.css';

import { Auth0Provider } from '../auth/Auth0Provider';


const routesArray = [
  { path: '/', element: <LandingPage /> },
  // { path: "/register", element: <RegistrationPage /> },
  { path: '/dashboard', element: <Home /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/plate', element: <PublicPlate /> },
  { path: '/plate/id/:id', element: <PublicPlate /> },
  { path: '/about', element: <About /> },
  { path: '/claim-plate', element: <ClaimPlate /> },
  { path: '/my-plates', element: <MyPlatesList /> },
  { path: '/my-plates/id/:id', element: <MyPlate /> },
  { path: '/my-reviews', element: <MyReviews /> }
];

const routes = createRoutesFromElements(
  <Route element={<Auth0Provider /> }>
    {routesArray.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
  </Route>
);

const router = createBrowserRouter(routes);

export const App = () => (<RouterProvider router={router} />);
