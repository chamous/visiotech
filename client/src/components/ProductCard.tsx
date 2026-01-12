import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface ProductCardProps {
  name: string;
  description: string;
  images: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, images }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
    >
      <div className="relative h-60 w-full">
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${name} image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="p-6 flex flex-col">
        <h3 className="text-2xl font-bold text-secondary-dark mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <motion.button
          className="mt-auto bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;