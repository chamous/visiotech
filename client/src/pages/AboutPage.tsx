import React from 'react';
import CompanyTimeline from '../components/CompanyTimeline';
import TeamCard from '../components/TeamCard';
import MissionVisionSection from '../components/MissionVisionSection';

const teamMembers = [
  {
    name: 'Dr. Ahmed Ben Salah',
    role: 'CEO & Co-founder',
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Ahmed',
  },
  {
    name: 'Eng. Fatma Zohra',
    role: 'CTO & Co-founder',
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Fatma',
  },
  {
    name: 'Mr. Karim El Fassi',
    role: 'Head of AI Research',
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Karim',
  },
  {
    name: 'Ms. Lilia Hamdi',
    role: 'Lead UX/UI Designer',
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Lilia',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div>
      <div className="py-16 bg-secondary-dark text-white text-center">
        <h1 className="text-5xl font-bold mb-4">About VisioTech</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Pioneering the future of industrial automation with advanced AI and computer vision.
        </p>
      </div>

      <MissionVisionSection />
      <CompanyTimeline />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Meet Our Visionary Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
