import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', password2: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.password !== userData.password2) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await register(userData);
      toast.success('Registered and logged in successfully!');
      navigate('/dashboard/client'); // Redirect to client dashboard on successful registration
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { scale: 1.02, borderColor: '#3B82F6' },
    focus: { borderColor: '#2563EB', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)' },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        <h2 className="text-4xl font-bold text-secondary-dark mb-8 text-center">Register for VisioTech</h2>

        <motion.div className="mb-4" variants={inputVariants}>
          <label htmlFor="name" className="block text-gray-600 text-sm font-bold mb-2">
            Name
          </label>
          <motion.input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
            required
            whileHover="hover"
            whileFocus="focus"
          />
        </motion.div>

        <motion.div className="mb-4" variants={inputVariants}>
          <label htmlFor="email" className="block text-gray-600 text-sm font-bold mb-2">
            Email
          </label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
            required
            whileHover="hover"
            whileFocus="focus"
          />
        </motion.div>

        <motion.div className="mb-4" variants={inputVariants}>
          <label htmlFor="password" className="block text-gray-600 text-sm font-bold mb-2">
            Password
          </label>
          <motion.input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
            required
            whileHover="hover"
            whileFocus="focus"
          />
        </motion.div>

        <motion.div className="mb-6" variants={inputVariants}>
          <label htmlFor="password2" className="block text-gray-600 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <motion.input
            type="password"
            id="password2"
            name="password2"
            value={userData.password2}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-200"
            required
            whileHover="hover"
            whileFocus="focus"
          />
        </motion.div>

        <motion.button
          type="submit"
          className="bg-primary-dark hover:bg-primary text-white font-bold py-3 px-6 rounded-full w-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </motion.button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-dark font-bold">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default RegisterPage;
