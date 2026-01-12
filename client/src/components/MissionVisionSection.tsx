import React from 'react';
import { motion } from 'framer-motion';
import { LightBulbIcon, AcademicCapIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface MissionVisionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const MissionVisionCard: React.FC<MissionVisionCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="bg-gray-50 p-8 rounded-xl shadow-xl flex flex-col items-center text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0,0,0,0.2)" }}
    >
      <Icon className="h-16 w-16 text-primary mb-4" />
      <h3 className="text-xl font-bold text-secondary-dark mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const MissionVisionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary-dark text-center mb-12">
          Our Mission, Vision, & Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MissionVisionCard
            icon={LightBulbIcon}
            title="Our Mission"
            description="To empower industries with intelligent vision solutions that enhance quality, efficiency, and safety, driving the next generation of industrial automation."
          />
          <MissionVisionCard
            icon={AcademicCapIcon}
            title="Our Vision"
            description="To be the global leader in AI-driven computer vision and smart industrial automation, setting new benchmarks for innovation and technological excellence."
          />
          <MissionVisionCard
            icon={ShieldExclamationIcon}
            title="Our Values"
            description="Innovation, Integrity, Excellence, Collaboration, and Customer Centricity are the core principles guiding every aspect of our work and relationships."
          />
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;