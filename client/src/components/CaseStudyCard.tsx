import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface CaseStudyCardProps {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  metrics: { label: string; value: number; suffix?: string }[];
}

const AnimatedMetric: React.FC<{ value: number; label: string; suffix?: string }> = ({
  value,
  label,
  suffix = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start: DOMHighResTimeStamp | null = null;
    const animateCount = (timestamp: DOMHighResTimeStamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const duration = 1500; // milliseconds
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * value));
      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, isInView]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl font-bold text-primary mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-lg text-gray-200">{label}</p>
    </motion.div>
  );
};

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  beforeImage,
  afterImage,
  metrics,
}) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.div
      className="bg-secondary-light rounded-xl shadow-xl overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
    >
      <div className="relative p-6 text-white">
        <h3 className="text-3xl font-bold mb-3">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>

      <div className="relative w-full h-72 overflow-hidden">
        <motion.img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: showAfter ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: showAfter ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary-dark hover:bg-primary text-white py-2 px-4 rounded-full text-sm transition duration-300 z-10"
        >
          {showAfter ? 'Show Before' : 'Show After'}
        </button>
      </div>

      <div className="p-6 bg-secondary grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <AnimatedMetric key={index} {...metric} />
        ))}
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;