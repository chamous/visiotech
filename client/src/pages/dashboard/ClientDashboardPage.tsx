import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline';
import { projectsApi } from '../../services/api'; // Import projectsApi
import { useAuth } from '../../context/AuthContext'; // Import useAuth

interface ProjectCardProps {
  title: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled';
  progress: number;
  description: string;
  startDate?: string;
  endDate?: string;
}

const getStatusColor = (status: ProjectCardProps['status']) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500';
    case 'In Progress':
      return 'bg-primary';
    case 'Pending':
      return 'bg-yellow-500';
    case 'On Hold':
      return 'bg-orange-500';
    case 'Cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusIcon = (status: ProjectCardProps['status']) => {
  switch (status) {
    case 'Completed':
      return <CheckCircleIcon className="h-5 w-5 text-white" />;
    case 'In Progress':
      return <PlayIcon className="h-5 w-5 text-white" />;
    case 'Pending':
      return <ClockIcon className="h-5 w-5 text-white" />;
    default:
      return null;
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, status, progress, description, startDate, endDate }) => {
  return (
    <motion.div
      className="bg-gray-50 rounded-xl shadow-xl p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-secondary-dark">{title}</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold text-white flex items-center space-x-1 ${getStatusColor(status)}`}>
          {getStatusIcon(status)}
          <span>{status}</span>
        </div>
      </div>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <motion.div
          className={`${getStatusColor(status)} h-2.5 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">{progress}% Complete</p>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Start: {startDate ? new Date(startDate).toLocaleDateString() : 'N/A'}</span>
        <span>End: {endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}</span>
      </div>
    </motion.div>
  );
};

const ClientDashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get logged-in user info

  useEffect(() => {
    if (!user) {
      setError('User not authenticated.');
      setLoading(false);
      return;
    }

    // Fetch projects for the logged-in client
    projectsApi.getAll()
      .then((response: any) => {
        // Filter projects by clientId (already handled by backend if role is CLIENT)
        // However, if an admin somehow lands here, they would see all projects.
        // The backend's projectsApi.getAll() already filters by clientId for CLIENT role.
        setProjects(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Failed to load projects.');
        setLoading(false);
        console.error('Error fetching client projects:', err);
      });
  }, [user]);

  if (loading) return <div className="text-center py-16 text-secondary-dark">Loading Projects...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (projects.length === 0) return <div className="text-center py-16 text-gray-500">No projects assigned to you.</div>;

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-xl shadow-xl mb-8"
      >
        <h2 className="text-4xl font-bold mb-2">Welcome Back, {user?.name || 'Client'}!</h2>
        <p className="text-lg">Here's an overview of your active projects and recent updates.</p>
      </motion.div>

      <h3 className="text-3xl font-bold text-secondary-dark mb-6">Your Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            status={project.status}
            progress={project.progress}
            description={project.description}
            startDate={project.startDate}
            endDate={project.endDate}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientDashboardPage;
