import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VisioTechLogo from './VisioTechLogo';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Import hamburger and close icons


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/solutions", label: "Solutions" },
    { to: "/products", label: "Products" },
    { to: "/case-studies", label: "Case Studies" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -3, transition: { duration: 0.2 } },
    underlineInitial: { scaleX: 0 },
    underlineHover: { scaleX: 1 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="fixed top-0 left-0 right-0 z-50 bg-secondary text-white py-6 shadow-2xl border-b border-gray-700"
    >
      <nav className="container mx-auto flex justify-between items-center px-4">
        <NavLink to="/" className="flex items-center space-x-2 group">
          <VisioTechLogo className="w-52 h-10 mr-6" />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative flex items-center px-4 py-2 rounded-lg text-xl font-medium transition-colors duration-300 ${
                    isActive ? 'text-primary bg-secondary-light' : 'hover:bg-secondary-light hover:text-primary-light text-gray-300'
                  }`
                }
              >
                <motion.span variants={linkVariants} whileHover="hover">{link.label}</motion.span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  initial="underlineInitial"
                  whileHover="underlineHover"
                  transition={{ duration: 0.3 }}
                />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg"
          onClick={() => setIsMenuOpen(true)}
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="fixed inset-0 bg-secondary-dark z-50 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <VisioTechLogo className="w-48 h-9" />
              <button
                className="text-gray-300 hover:text-white p-2 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-grow space-y-6 py-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative block text-3xl font-bold transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'hover:text-primary-light text-gray-300'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  >
                    {link.label}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                      initial="underlineInitial"
                      whileHover="underlineHover"
                      transition={{ duration: 0.3 }}
                    />
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
