import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";

export default function ProductHangmoi({ cateType, data }) {
  const [imgHover, setImgHover] = useState(null);


const priceDiscount = (price,discount) => {
  return parseInt(price) - price*discount/100 ;
}
  return (
    <div className="relative w-full lg:w-1/2">
      <div className="flex justify-between items-center rounded-tl-md rounded-tr-md bg-gradient-to-r from-[#7D150F] via-[#3D0504] to-[#9F0E0B]  p-2 text-white">
        <h2 className="text-xl font-bold border-l-4 border-white pl-3">
          {cateType?.name}
        </h2>
        <button className=" absolute bg-black right-1 p-1.5 text-white text-xs rounded-md hover:bg-white hover:text-black hover:border">
          Xem tất cả »
        </button>
      </div>
      <div className="bg-white ">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <div className="relative mt-3 bg-white shadow-md hover:shadow-xl transition overflow-hidden">
                  <img
                    src={item.imgUrls[`${imgHover == item.id ? 0 : 1}`]}
                    alt={item.name}
                    onMouseEnter={() => setImgHover(item.id)}
                    onMouseLeave={() => setImgHover(null)}
                    className="w-50 h-50"
                  />
                  <div className="p-3">
                    <h3 className="text-xs font-semibold min-h-[40px] leading-5">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-gray-100 border rounded px-2 py-1 inline-block mt-2">
                        Hàng Mới
                      </span>
                      {/* --- CART ICON --- */}
                      <div className="bottom-3 right-3 text-gray-600">
                        <MdOutlineShoppingCart size={20} />
                      </div>
                    </div>
                    <div className="flex">
                      <p className="text-red-600 font-bold text-lg mt-2 relative">
                        {priceDiscount(item.price,item.discount).toLocaleString("vi-VN")}₫
                      </p>
                      <p className="text-red-400 text-xs">
                        {item.discount && <>{item.discount} %</>}
                      </p>
                    </div>
                    <p className="line-through font-bold text-xs ">
                      {parseInt(item.price).toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
