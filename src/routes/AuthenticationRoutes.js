import MinimalLayout from '@/layout/MinimalLayout';
import Loadable from '@/ui-component/Loadable';
import { lazy } from 'react';

// project imports

// login routing
const AuthLogin = Loadable(
  lazy(() => import('../authentication/authentication/Login'))
);
const AuthRegister = Loadable(
  lazy(() => import('../authentication/authentication/Register'))
);
const AuthForgotPassword = Loadable(
  lazy(() => import('../authentication/authentication/ForgotPassword'))
);
const AuthCheckMail = Loadable(
  lazy(() => import('../authentication/authentication/CheckMail'))
);
const AuthResetPassword = Loadable(
  lazy(() => import('../authentication/authentication/ResetPassword'))
);
const AuthCodeVerification = Loadable(
  lazy(() => import('../authentication/authentication/CodeVerification'))
);

// maintenance routing
const MaintenanceError = Loadable(
  lazy(() => import('../views/pages/maintenance/Error'))
);
const MaintenanceComingSoon1 = Loadable(
  lazy(() => import('../views/pages/maintenance/ComingSoon/ComingSoon1'))
);
const MaintenanceComingSoon2 = Loadable(
  lazy(() => import('../views/pages/maintenance/ComingSoon/ComingSoon2'))
);
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import('../views/pages/maintenance/UnderConstruction'))
);

// landing & contact-us routing
const PagesLanding = Loadable(lazy(() => import('../views/pages/landing')));
const PagesContactUS = Loadable(
  lazy(() => import('../views/pages/contact-us'))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />,
    },
    {
      path: '/register',
      element: <AuthRegister />,
    },
    {
      path: '/forgot-password',
      element: <AuthForgotPassword />,
    },
    {
      path: '/check-mail',
      element: <AuthCheckMail />,
    },
    {
      path: '/reset-password',
      element: <AuthResetPassword />,
    },
    {
      path: '/code-verification',
      element: <AuthCodeVerification />,
    },

    {
      path: '/pages/error',
      element: <MaintenanceError />,
    },
    {
      path: '/pages/coming-soon1',
      element: <MaintenanceComingSoon1 />,
    },
    {
      path: '/pages/coming-soon2',
      element: <MaintenanceComingSoon2 />,
    },
    {
      path: '/pages/under-construction',
      element: <MaintenanceUnderConstruction />,
    },

    {
      path: '/pages/landing',
      element: <PagesLanding />,
    },
    {
      path: '/pages/contact-us',
      element: <PagesContactUS />,
    },
  ],
};

export default AuthenticationRoutes;
