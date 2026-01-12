import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StatProps {
  value: number;
  label: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const Stat: React.FC<StatProps> = ({ value, label, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start: DOMHighResTimeStamp | null = null;
    const animateCount = (timestamp: DOMHighResTimeStamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * value));
      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, duration, isInView]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-5xl font-bold text-primary mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-xl text-gray-200">{label}</p>
    </motion.div>
  );
};

const StatsCounter: React.FC = () => {
  const stats = [
    { value: 150, label: 'Projects Completed', suffix: '+' },
    { value: 99, label: 'Client Satisfaction', suffix: '%' },
    { value: 10, label: 'Years of Experience', suffix: '+' },
    { value: 20, label: 'Patents Filed', suffix: '+' },
  ];

  return (
    <section className="py-16 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Achievements in Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Stat key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;