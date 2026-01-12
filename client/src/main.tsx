import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import HomePage from './pages/HomePage.tsx';
import SolutionsPage from './pages/SolutionsPage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';
import CaseStudiesPage from './pages/CaseStudiesPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import DashboardLayout from './components/DashboardLayout.tsx';
import ClientDashboardPage from './pages/dashboard/ClientDashboardPage.tsx';
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage.tsx';
import UsersPage from './pages/dashboard/UsersPage.tsx';
import ContentManagementPage from './pages/dashboard/ContentManagementPage.tsx';
import SettingsPage from './pages/dashboard/SettingsPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext.tsx';

// Placeholder for Unauthorized Page
const UnauthorizedPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 text-secondary-dark text-4xl font-bold">
    Unauthorized Access
  </div>
);

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'solutions',
        element: <SolutionsPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'case-studies',
        element: <CaseStudiesPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'unauthorized',
        element: <UnauthorizedPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        path: 'client',
        element: <ClientDashboardPage />,
      },
      {
        path: 'admin',
        element: <ProtectedRoute adminOnly={true}><AdminDashboardPage /></ProtectedRoute>,
      },
      {
        path: 'users',
        element: <ProtectedRoute adminOnly={true}><UsersPage /></ProtectedRoute>,
      },
      {
        path: 'content',
        element: <ProtectedRoute adminOnly={true}><ContentManagementPage /></ProtectedRoute>,
      },
      {
        path: 'settings',
        element: <ProtectedRoute adminOnly={true}><SettingsPage /></ProtectedRoute>,
      },
      {
        index: true,
        element: <ClientDashboardPage />, // Default dashboard view
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </AuthProvider>
  </React.StrictMode>,
);
