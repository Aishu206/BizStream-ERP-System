import MinimalLayout from '@/layout/MinimalLayout';
import NavMotion from '@/layout/NavMotion';
import Loadable from '@/ui-component/Loadable';
import GuestGuard from '@/utils/route-guard/GuestGuard';
import { lazy } from 'react';

// project imports

// login routing
const Login = Loadable(
  lazy(() => import('../authentication/authentication/Login'))
);
const Register = Loadable(
  lazy(() => import('../authentication/authentication/Register'))
);
const ForgotPassword = Loadable(
  lazy(() => import('../authentication/authentication/ForgotPassword'))
);

// ==============================|| AUTH ROUTING ||============================== //

const PublicRoutes = {
  path: '/',
  element: (
    <NavMotion>
      <GuestGuard>
        <MinimalLayout />
      </GuestGuard>
    </NavMotion>
  ),
  children: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/forgot',
      element: <ForgotPassword />,
    },
  ],
};

export default PublicRoutes;
