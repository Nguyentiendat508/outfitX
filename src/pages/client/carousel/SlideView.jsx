// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useContext } from "react";
import { ProductsContext } from "../../../contexts/ProductProvider";

export default function SlideView() {
    const products = useContext(ProductsContext);
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper w-full h-90"
    >
      {products.map((p) => (
                <SwiperSlide>
                  <img src={p.imgUrls[0]} />
                </SwiperSlide>
              ))}
              ;
    </Swiper>
  );
}
