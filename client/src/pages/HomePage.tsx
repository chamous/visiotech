import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import IndustrialUseCaseSlider from '../components/IndustrialUseCaseSlider';
import FeatureCards from '../components/FeatureCards';
import StatsCounter from '../components/StatsCounter';
import ClientLogoSlider from '../components/ClientLogoSlider';
import { solutionsApi, mediaAssetsApi } from '../services/api';

const HomePage: React.FC = () => {
  const [industrialUseCases, setIndustrialUseCases] = useState([]);
  const [clientLogos, setClientLogos] = useState([]);

  useEffect(() => {
    // Fetch industrial use cases (solutions)
    solutionsApi.getAll()
      .then((response: any) => {
        // Map solutions to the format expected by IndustrialUseCaseSlider
        const mappedUseCases = response.data.map((sol: any) => ({
          id: sol.id,
          title: sol.title,
          description: sol.description,
          image: `https://picsum.photos/seed/${sol.id}/1920/1080`, // Placeholder image
        }));
        setIndustrialUseCases(mappedUseCases);
      })
      .catch((error: any) => console.error('Error fetching solutions:', error));

    // Fetch client logos (media assets tagged as client logos)
    mediaAssetsApi.getAll()
      .then((response: any) => {
        // Filter media assets that are client logos
        const mappedClientLogos = response.data.filter((asset: any) =>
          asset.altText.toLowerCase().includes('client logo')
        ).map((asset: any) => ({
          id: asset.id,
          name: asset.altText,
          logo: asset.url,
        }));
        setClientLogos(mappedClientLogos);
      })
      .catch((error: any) => console.error('Error fetching media assets:', error));
  }, []);

  return (
    <div>
      <HeroSection />
      {industrialUseCases.length > 0 && <IndustrialUseCaseSlider industrialUseCases={industrialUseCases} />}
      <FeatureCards />
      <StatsCounter />
      {clientLogos.length > 0 && <ClientLogoSlider clientLogos={clientLogos} />}
      {/* Other sections of the home page will go here */}
    </div>
  );
};

export default HomePage;