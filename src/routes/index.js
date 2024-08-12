import Loadable from '@/ui-component/Loadable';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import MaintenenceRoutes from './MaintenenceRoutes';

const PagesLanding = Loadable(lazy(() => import('../views/pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    { path: '/', element: <PagesLanding /> },
    AuthenticationRoutes,
    PublicRoutes,
    PrivateRoutes,
    MaintenenceRoutes,
  ]);
}
