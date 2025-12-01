// src/components/client/Carousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const listImg = [
  "https://cdn.hstatic.net/files/1000253775/file/ngang_-_2048x813.jpg",
  "https://cdn.hstatic.net/files/1000253775/file/banner_web_pc_kv_pc_kv.jpg",
  "https://cdn.hstatic.net/files/1000253775/file/banner_wed_nang.jpg",
];
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
        {/* vòng lặp  */}
        {listImg.map((img, index) => (
          <SwiperSlide>
            <img
              src={img}
              alt={index}
              className="w-full h-[300px] rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
