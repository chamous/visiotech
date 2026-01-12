import React from 'react';
import { motion } from 'framer-motion';
import {
  CogIcon,
  EyeIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: EyeIcon,
    title: 'Precision Visual Inspection',
    description: 'Leverage AI-powered computer vision for meticulous defect detection and quality assurance across all production stages.',
  },
  {
    icon: CogIcon,
    title: 'Smart Industrial Automation',
    description: 'Integrate intelligent automation systems that adapt and optimize industrial processes, enhancing efficiency and reducing manual errors.',
  },
  {
    icon: CubeTransparentIcon,
    title: 'Advanced AI Analytics',
    description: 'Gain actionable insights from your operational data with cutting-edge AI analytics, identifying trends and predicting potential issues.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Robust Security & Reliability',
    description: 'Ensure the integrity and security of your systems with our highly reliable and resilient AI inspection platforms.',
  },
];

const FeatureCards: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary-dark text-center mb-12">
          Key Features & Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-secondary-light p-8 rounded-xl shadow-xl flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.3)" }}
            >
              <feature.icon className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;