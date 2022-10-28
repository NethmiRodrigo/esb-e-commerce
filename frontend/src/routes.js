import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import NotFound from './pages/Page404';
import MyItem from './pages/MyItem';
import { AddNewItems } from './pages/AddNewItems';
import { CardPayment } from './pages/CardPayment';
import { MobilePayment } from './pages/MobilePayment';
import Checkout from './pages/Checkout';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Products /> },
        { path: '/checkout', element: <Checkout /> },
        { path: '/my-item', element: <MyItem /> },
      ],
    },
    {
      path: '/my-item/new-item',
      element: <AddNewItems />,
    },

    {
      path: '/checkout/card-payment',
      element: <CardPayment />,
    },

    {
      path: '/checkout/mobile-payment',
      element: <MobilePayment />,
    },

    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
