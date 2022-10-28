import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import MyItem from './pages/MyItem';
import { AddNewItems } from './pages/AddNewItems';
import { CardPayment } from './pages/CardPayment';
import { MobilePayment } from './pages/MobilePayment';
import Checkout from './pages/Checkout';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Products /> },
        { path: '/checkout', element: <Checkout /> },
        // { path: 'products', element: <Products /> },
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
