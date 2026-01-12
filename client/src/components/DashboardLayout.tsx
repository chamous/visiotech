import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  CogIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon, // For sidebar toggle
  Bars3Icon, // For mobile menu toggle
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';


interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void; // Optional click handler for mobile
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, isCollapsed, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center space-x-3 p-3 rounded-lg text-lg font-medium transition-colors duration-200 ` +
        (isActive ? 'bg-primary-dark text-white shadow-md' : 'text-gray-300 hover:bg-primary-light hover:text-white') +
        (isCollapsed ? ' justify-center' : '')
      }
    >
      <Icon className="h-6 w-6 shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

const DashboardLayout: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); // For desktop collapse
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // For mobile sidebar

  // Effect to prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen]);


  const handleLogout = () => {
    logout();
    toast.info('You have been logged out.');
    navigate('/login');
  };

  const sidebarWidth = isCollapsed ? '5rem' : '18rem';
  const mobileSidebarWidth = '18rem'; // Fixed width for mobile sidebar when open


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: '18rem' }}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, type: "spring", stiffness: 120, damping: 14 }}
        style={{ position: 'fixed', top: 0, bottom: 0, left: 0 }}
        className="hidden md:flex bg-gradient-to-br from-secondary-dark to-secondary text-white p-6 flex-col space-y-6 shadow-2xl z-20"
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-secondary-dark"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </motion.div>
        </button>

        <div className={`text-3xl font-extrabold text-primary mb-8 ${isCollapsed ? 'text-center' : 'text-left'}`}>
          {!isCollapsed && "VisioTech Admin"}
          {isCollapsed && <span className="text-4xl">VT</span>} {/* Abbreviation when collapsed */}
        </div>
        
        <nav className="flex-grow space-y-3 overflow-y-auto pr-2">
          {!isAdmin && ( // Only show Client Overview if not Admin
            <SidebarLink to="/dashboard/client" icon={HomeIcon} label="Client Overview" isCollapsed={isCollapsed} />
          )}
          {isAdmin && (
            <>
              <SidebarLink to="/dashboard/admin" icon={ChartBarIcon} label="Admin Overview" isCollapsed={isCollapsed} />
              <SidebarLink to="/dashboard/users" icon={UserGroupIcon} label="Users Management" isCollapsed={isCollapsed} />
              <SidebarLink to="/dashboard/content" icon={DocumentTextIcon} label="Content Management" isCollapsed={isCollapsed} />
              <SidebarLink to="/dashboard/settings" icon={CogIcon} label="Settings" isCollapsed={isCollapsed} />
            </>
          )}
        </nav>
        <motion.button
          onClick={handleLogout}
          className={`mt-auto flex items-center space-x-3 p-3 rounded-lg text-lg font-medium bg-red-600 hover:bg-red-700 transition-colors duration-200 w-full shadow-md ${isCollapsed ? 'justify-center' : ''}`}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </motion.button>
      </motion.aside>

      {/* Mobile Sidebar Overlay (visible only on small screens) */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="fixed inset-y-0 left-0 w-72 bg-gradient-to-br from-secondary-dark to-secondary text-white p-6 flex flex-col space-y-6 shadow-2xl z-50 md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="text-3xl font-extrabold text-primary">VisioTech Admin</div>
                <button
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-secondary-dark"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-grow space-y-3 overflow-y-auto pr-2">
                {!isAdmin && (
                  <SidebarLink to="/dashboard/client" icon={HomeIcon} label="Client Overview" isCollapsed={false} onClick={() => setIsMobileSidebarOpen(false)} />
                )}
                {isAdmin && (
                  <>
                    <SidebarLink to="/dashboard/admin" icon={ChartBarIcon} label="Admin Overview" isCollapsed={false} onClick={() => setIsMobileSidebarOpen(false)} />
                    <SidebarLink to="/dashboard/users" icon={UserGroupIcon} label="Users Management" isCollapsed={false} onClick={() => setIsMobileSidebarOpen(false)} />
                    <SidebarLink to="/dashboard/content" icon={DocumentTextIcon} label="Content Management" isCollapsed={false} onClick={() => setIsMobileSidebarOpen(false)} />
                    <SidebarLink to="/dashboard/settings" icon={CogIcon} label="Settings" isCollapsed={false} onClick={() => setIsMobileSidebarOpen(false)} />
                  </>
                )}
              </nav>
              <motion.button
                onClick={handleLogout}
                className="mt-auto flex items-center space-x-3 p-3 rounded-lg text-lg font-medium bg-red-600 hover:bg-red-700 transition-colors duration-200 w-full shadow-md"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 shrink-0" />
                <span>Logout</span>
              </motion.button>
            </motion.div>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>


      {/* Main Content */}
      <motion.div
        animate={{ marginLeft: isMobileSidebarOpen ? '0' : (isCollapsed ? '5rem' : '18rem') }} // Animate desktop margin-left, reset for mobile
        transition={{ duration: 0.3, type: "spring", stiffness: 120, damping: 14 }}
        className="flex-grow flex flex-col md:ml-0" // md:ml-0 to override desktop margin on small screens
      >
        <header className="bg-white shadow-xl p-4 flex items-center justify-between">
          <button
            className="md:hidden text-secondary-dark hover:text-primary-dark p-2 rounded-lg"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
          <h1 className="text-4xl font-semibold text-secondary-dark flex-grow text-center md:text-left">Dashboard</h1>
          {/* User profile/notifications can go here */}
        </header>
        <main className="flex-grow p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
