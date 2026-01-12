import React from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  socialLinks?: { icon: React.ElementType; url: string }[];
}

const TeamCard: React.FC<TeamMemberProps> = ({ name, role, imageUrl }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col items-center text-center p-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-40 h-40 rounded-full object-cover mb-4 border-8 border-primary"
      />
      <h3 className="text-xl font-bold text-secondary-dark mb-1">{name}</h3>
      <p className="text-primary font-semibold">{role}</p>
      {/* Social links can be added here */}
    </motion.div>
  );
};

export default TeamCard;
