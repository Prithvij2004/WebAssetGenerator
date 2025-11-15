import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { WorkspacePage } from './pages/WorkspacePage';
import { AssetsPage } from './pages/AssetsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'workspace',
        element: <WorkspacePage />,
      },
      {
        path: 'assets',
        element: <AssetsPage />,
      },
    ],
  },
]);
