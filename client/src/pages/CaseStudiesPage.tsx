import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import CaseStudyCard from '../components/CaseStudyCard';
import { caseStudiesApi } from '../services/api';
import { getAbsoluteImageUrl } from '../utils/helpers'; // Import the helper

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  metrics: { label: string; value: number; suffix?: string }[];
}

const CaseStudiesPage: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    caseStudiesApi.getAll()
      .then((response: any) => {
        setCaseStudies(response.data.map((cs: any, index: number) => {
          // Transform metrics object into an array of objects
          const transformedMetrics = cs.metrics ? Object.entries(cs.metrics).map(([label, value]) => ({
            label,
            value: parseFloat(String(value)), // Convert value to number
            suffix: String(value).includes('%') ? '%' : '', // Extract suffix if present
          })) : [];

          return {
            ...cs,
            // Placeholder images if not provided by API
            beforeImage: cs.beforeImage || `https://picsum.photos/seed/${cs.id || index}-before/1920/1080`,
            afterImage: cs.afterImage || `https://picsum.photos/seed/${cs.id || index}-after/1920/1080`,
            metrics: transformedMetrics,
          };
        }));
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Failed to load case studies.');
        setLoading(false);
        console.error('Error fetching case studies:', err);
      });
  }, []);

  if (loading) return <div className="text-center py-16 text-secondary-dark">Loading Case Studies...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (caseStudies.length === 0) return <div className="text-center py-16 text-gray-500">No case studies available.</div>;

  return (
    <div>
      <div className="py-16 bg-secondary-dark text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Real-World Impact: Case Studies</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Discover how VisioTech's solutions have driven tangible results and transformative outcomes for our industry partners.
        </p>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {caseStudies.map((caseStudy, index) => (
              <SwiperSlide key={caseStudy.id || index}>
                <CaseStudyCard
                  {...caseStudy}
                  beforeImage={getAbsoluteImageUrl(caseStudy.beforeImage)}
                  afterImage={getAbsoluteImageUrl(caseStudy.afterImage)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;