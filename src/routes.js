import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import CvList from './pages/CvList';
import CvUpload from './pages/CvUpload';
import NotFound from './pages/Page404';
import EntityViewer from './pages/EntityViewer';
import Settings from './pages/settings';
import UserManage from './pages/UserManage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'cv-list', element: <CvList /> },
        { path: 'cv-upload', element: <CvUpload /> },
        { path: 'entity-viewer', element: <EntityViewer /> },
        { path: 'settings', element: <Settings /> },
        { path: 'user/manage', element: <UserManage /> },
        { path: 'products', element: <Products /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
