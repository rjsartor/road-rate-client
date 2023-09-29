import React, { FC } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import LandingPage from './Landing';
import LoginForm from './forms/LoginForm';
import ClaimPlate from './plates/ClaimPlate';
import MyPlates from './plates/MyPlates';
import About from './About';
import MyReviews from './MyReviews';
import Home from './Home';
import PlatePage from './plates/PlatePage';
import '../styles/App.css';

import { Auth0Provider } from '../auth/Auth0Provider';

interface RouteItem {
  path: string;
  element: JSX.Element;
}

const routesArray: RouteItem[] = [
  { path: '/', element: <LandingPage /> },
  // { path: "/register", element: <RegistrationPage /> },
  { path: '/dashboard', element: <Home /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/plate/id/:id', element: <PlatePage /> },
  { path: '/about', element: <About /> },
  { path: '/claim-plate', element: <ClaimPlate /> },
  { path: '/my-plates', element: <MyPlates /> },
  { path: '/my-plates/id/:id', element: <PlatePage /> },
  { path: '/my-reviews', element: <MyReviews /> },
];

const routes = createRoutesFromElements(
  <Route element={<Auth0Provider />}>
    {routesArray.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
    <Route path="*" element={<Navigate to="/" />} />
  </Route>
);

const router = createBrowserRouter(routes);

const App: FC = () => <RouterProvider router={router} />;

export default App;
