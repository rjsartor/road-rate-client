import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LandingPage from './Landing';
import LoginForm from './forms/LoginForm';
import ClaimPlate from './plates/ClaimPlate';
import MyPlatesList from './plates/MyPlates';
import About from './About';
import MyReviews from './MyReviews';
import Home from './Home';
import PlatePage from './plates/PlatePage';
import '../styles/App.css';

import { Auth0Provider } from '../auth/Auth0Provider';

const routesArray = [
  { path: '/', element: <LandingPage /> },
  // { path: "/register", element: <RegistrationPage /> },
  { path: '/dashboard', element: <Home /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/plate/id/:id', element: <PlatePage /> },
  { path: '/about', element: <About /> },
  { path: '/claim-plate', element: <ClaimPlate /> },
  { path: '/my-plates', element: <MyPlatesList /> },
  { path: '/my-plates/id/:id', element: <PlatePage /> },
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
