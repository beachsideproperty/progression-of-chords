import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  AuthForm,
  Home,
  Dashboard,
  CloudGame,
  CalendarPage,
  Meditate,
  Journal,
} from './components';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';

const routeConfig = [
  { path: '/login', element: <AuthForm mode='login' />, exact: true },
  { path: '/signup', element: <AuthForm mode='signup' />, exact: true },
  { path: '/meditate', element: <Meditate /> },
  { path: '/cloud', element: <CloudGame /> },
];

const userRoutes = [
  ...routeConfig,
  { path: '/journal', element: <Journal /> },
  { path: '/calendar', element: <CalendarPage /> },
  { path: '/dashboard', element: <Dashboard /> },
];

const Router = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getUserByToken());
    }
  }, []);

  const routes = user ? userRoutes : routeConfig;

  return (
    <Routes>
      {routes.map(({ path, element, exact }) => (
        <Route path={path} element={element} exact={exact} />
      ))}
      <Route path='*' element={<Home />} />
    </Routes>
  );
};

export default Router;
