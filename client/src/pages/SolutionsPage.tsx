import React, { useState, useEffect } from 'react';
import SolutionSection from '../components/SolutionSection';
import { solutionsApi } from '../services/api';
import { getAbsoluteImageUrl } from '../utils/helpers'; // Import the helper

interface Solution {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Assuming API provides an image URL
}

const SolutionsPage: React.FC = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    solutionsApi.getAll()
      .then((response: any) => {
        // Assuming the API returns solutions with title, description, and an image URL
        // If not, you might need to construct imageUrl like in HomePage
        setSolutions(response.data.map((sol: any, index: number) => ({
          ...sol,
          imageUrl: sol.imageUrl || `https://picsum.photos/seed/${sol.id || index}/1920/1080`,
        })));
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Failed to load solutions.');
        setLoading(false);
        console.error('Error fetching solutions:', err);
      });
  }, []);

  if (loading) return <div className="text-center py-16 text-secondary-dark">Loading Solutions...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (solutions.length === 0) return <div className="text-center py-16 text-gray-500">No solutions available.</div>;

  return (
    <div>
      <div className="py-16 bg-secondary-dark text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Our Cutting-Edge Solutions</h1>
        <p className="text-xl max-w-2xl mx-auto">
          VisioTech's advanced AI and computer vision solutions drive efficiency, quality, and innovation across diverse industrial sectors.
        </p>
      </div>

      {solutions.map((solution, index) => (
        <SolutionSection
          key={solution.id}
          title={solution.title}
          description={solution.description}
          imageUrl={getAbsoluteImageUrl(solution.imageUrl)}
          reverse={index % 2 !== 0} // Alternate image/text position
        />
      ))}
    </div>
  );
};

export default SolutionsPage;
