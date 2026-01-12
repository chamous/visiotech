import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

interface ClientLogo {
  id: number;
  name: string;
  logo: string;
}

interface ClientLogoSliderProps {
  clientLogos: ClientLogo[];
}

const ClientLogoSlider: React.FC<ClientLogoSliderProps> = ({ clientLogos }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary-dark text-center mb-12">
          Trusted by Industry Leaders
        </h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className="mySwiper"
        >
          {clientLogos.map((client) => (
            <SwiperSlide key={client.id}>
              <motion.div
                className="flex justify-center items-center p-4 bg-gray-100 rounded-xl shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={client.logo} alt={client.name} className="max-h-20 object-contain" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientLogoSlider;