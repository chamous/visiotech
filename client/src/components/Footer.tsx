import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VisioTechLogo from './VisioTechLogo';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-secondary text-white py-12 border-t border-gray-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info */}
        <motion.div variants={footerVariants}>
          <div className="mb-4 inline-block">
            <VisioTechLogo className="w-52 h-10" />
          </div>
          <p className="text-gray-400 mb-2">Pioneering AI for Industrial Excellence.</p>
          <p className="text-gray-400">123 Industrial Zone, Tunis, Tunisia</p>
          <p className="text-gray-400">info@visiotech.tn</p>
          <p className="text-gray-400">+216 71 123 456</p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={footerVariants}>
          <h3 className="text-2xl font-bold text-primary mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-primary-light transition-colors duration-200 block">Home</Link>
            </li>
            <li>
              <Link to="/solutions" className="text-gray-400 hover:text-primary-light transition-colors duration-200 block">Solutions</Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-primary-light transition-colors duration-200 block">Products</Link>
            </li>
            <li>
              <Link to="/case-studies" className="text-gray-400 hover:text-primary-light transition-colors duration-200 block">Case Studies</Link>
            </li>
          </ul>
        </motion.div>

        {/* Follow Us */}
        <motion.div variants={footerVariants}>
          <h3 className="text-2xl font-bold text-primary mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors duration-200 block">LinkedIn</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors duration-200 block">Twitter</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors duration-200 block">Facebook</a>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} VisioTech. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
