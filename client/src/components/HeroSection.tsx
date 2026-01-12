import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen bg-secondary-dark flex items-center justify-center overflow-hidden">
      {/* Background AI-vision imagery */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1596547671043-41a4a4b1b3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="AI Vision Background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      {/* Subtle animated overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
        className="absolute inset-0 z-0 bg-primary-dark mix-blend-multiply"
      ></motion.div>


      <div className="relative z-10 text-center text-white p-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold mb-4"
        >
          Pioneering AI for Industrial Excellence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-3xl mb-8 max-w-4xl mx-auto"
        >
          VisioTech specializes in computer vision, AI inspection systems, and smart industrial automation to transform manufacturing processes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex justify-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-primary-dark hover:bg-primary text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Explore Solutions
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Request a Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;