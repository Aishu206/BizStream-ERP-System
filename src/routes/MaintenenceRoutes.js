import { lazy } from 'react';

// project imports
//import GuestGuard from '../utils/route-guard/GuestGuard';

import Loadable from '@/ui-component/Loadable';
import NavMotion from '@/layout/NavMotion';
import MinimalLayout from '@/layout/MinimalLayout';

// maintenance routing
const MaintenanceError = Loadable(
  lazy(() => import('../views/pages/maintenance/Error'))
);

// const MaintenanceComingSoon1 = Loadable(
//   lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon1'))
// );
// const MaintenanceComingSoon2 = Loadable(
//   lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2'))
// );
// const MaintenanceUnderConstruction = Loadable(
//   lazy(() => import('views/pages/maintenance/UnderConstruction'))
// );

// ==============================|| Maintenence ROUTING ||============================== //

const MaintenenceRoutes = {
  path: '/',
  element: (
    <NavMotion>
      <MinimalLayout />
    </NavMotion>
  ),
  children: [
    {
      path: '*',
      element: <MaintenanceError />,
    },
  ],
};

export default MaintenenceRoutes;
