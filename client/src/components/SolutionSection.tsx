import React from 'react';
import { motion } from 'framer-motion';

interface SolutionSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean; // To alternate image/text position
}

const SolutionSection: React.FC<SolutionSectionProps> = ({
  title,
  description,
  imageUrl,
  reverse = false,
}) => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div
        className={`container mx-auto px-4 flex flex-col ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center gap-8`}
      >
        <motion.div
          className="md:w-1/2"
          initial={{ x: reverse ? 100 : -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ x: reverse ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-4xl font-bold text-secondary-dark mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;