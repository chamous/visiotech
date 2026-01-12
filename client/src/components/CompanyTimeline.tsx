import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
  isLeft?: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ year, title, description, isLeft }) => {
  return (
    <div className={`flex items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
      <div className="w-5/12">
        {isLeft && (
          <motion.div
            className="bg-gray-50 p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-secondary-dark mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        )}
      </div>
      <div className="w-1/12 flex justify-center">
        <div className="w-6 h-6 rounded-full bg-primary z-10 flex items-center justify-center">
          <span className="text-white text-xs font-bold">{year.slice(2)}</span>
        </div>
      </div>
      <div className="w-5/12">
        {!isLeft && (
          <motion.div
            className="bg-gray-50 p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-secondary-dark mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const CompanyTimeline: React.FC = () => {
  const timelineEvents = [
    { year: '2015', title: 'Founded VisioTech', description: 'VisioTech was established with a vision to revolutionize industrial automation through advanced computer vision.' },
    { year: '2017', title: 'First AI Inspection System', description: 'Launched our first AI-powered inspection system for a major automotive client, marking a significant milestone in our journey.' },
    { year: '2019', title: 'Expanded to Pharmaceutical Sector', description: 'Successfully adapted our technology to the pharmaceutical industry, providing critical quality control solutions for drug packaging.' },
    { year: '2022', title: 'Robotics Integration', description: 'Introduced integrated vision solutions for industrial robots, enhancing precision and efficiency in manufacturing processes.' },
    { year: '2024', title: 'Global Recognition', description: 'Received international awards for innovation in industrial AI, solidifying our position as a leader in the field.' },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary-dark text-center mb-12">
          Our Journey: A Timeline of Innovation
        </h2>
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={index}
              year={event.year}
              title={event.title}
              description={event.description}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;