import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion'; // Added missing import

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface IndustrialUseCase {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface IndustrialUseCaseSliderProps {
  industrialUseCases: IndustrialUseCase[];
}

const IndustrialUseCaseSlider: React.FC<IndustrialUseCaseSliderProps> = ({ industrialUseCases }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary-dark text-center mb-12">
          Industrial Use Cases
        </h2>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper rounded-xl shadow-2xl overflow-hidden"
        >
          {industrialUseCases.map((useCase) => (
            <SwiperSlide key={useCase.id}>
              {/* Added missing closing tag for motion.div below */}
              <motion.div
                className="relative h-96 cursor-grab active:cursor-grabbing"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-10 rounded-lg">
                  <h3 className="text-4xl font-bold text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-xl text-gray-200">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default IndustrialUseCaseSlider;