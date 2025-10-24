// src/components/client/Carousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full"
      >
        <SwiperSlide>
          <img
            src="https://cdn.hstatic.net/files/1000253775/file/khung_flash_sale_pc_5f9dd4feb858435b9f43d4908088bfb1.jpg"
            alt="Slide 1"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.hstatic.net/files/1000253775/file/banner-do-dong-pc.jpg"
            alt="Slide 2"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.hstatic.net/files/1000253775/file/banner_wed_nang.jpg"
            alt="Slide 3"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
