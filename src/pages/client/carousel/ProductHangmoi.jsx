import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useContext, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function ProductHangmoi() {
  const products = useContext(ProductsContext);
  const [imgHover, setImgHover] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative w-full lg:w-1/2">
        <div className="flex justify-between items-center rounded-tl-md rounded-tr-md bg-gradient-to-r from-[#7D150F] via-[#3D0504] to-[#9F0E0B]  p-2 text-white">
          <h2 className="text-xl font-bold border-l-4 border-white pl-3">
            ÁO THUN
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
            {products.slice(0, 10).map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/detail/${item.id}`}>
                  <div className="relative mt-3 bg-white shadow-md hover:shadow-xl transition overflow-hidden">
                    <img
                      src={item.imgUrls[`${imgHover == item.id ? 0 : 1}`]}
                      alt={item.name}
                      onMouseEnter={() => setImgHover(item.id)}
                      onMouseLeave={() => setImgHover(null)}
                      className="w-full"
                    />
                    <div className="p-3">
                      <h3 className="text-xs font-semibold min-h-[40px] leading-5">
                        {item.name}
                      </h3>

                      <span className="text-xs bg-gray-100 border rounded px-2 py-1 inline-block mt-2">
                        Hàng Mới
                      </span>

                      <p className="text-red-600 font-bold text-lg mt-2">
                        {parseInt(item.price).toLocaleString("vi-VN")}₫
                      </p>

                      <p className="text-gray-400 text-xs line-through -mt-1">
                        349,000₫
                      </p>
                    </div>

                    {/* --- CART ICON --- */}
                    <div className="absolute bottom-3 right-3 text-gray-600">
                      <MdOutlineShoppingCart size={20} />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="relative w-full lg:w-1/2">
        <div className="flex justify-between items-center rounded-tl-md rounded-tr-md bg-gradient-to-r from-[#7D150F] via-[#3D0504] to-[#9F0E0B] p-2 text-white">
          <h2 className="text-xl font-bold border-l-4 border-white pl-3">
            ÁO THUN
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
            {products.slice(0, 10).map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/detail/${item.id}`}>
                  <div className="relative mt-3 bg-white shadow-md hover:shadow-xl transition overflow-hidden">
                    <img
                      src={item.imgUrls[`${imgHover == item.id ? 0 : 1}`]}
                      alt={item.name}
                      onMouseEnter={() => setImgHover(item.id)}
                      onMouseLeave={() => setImgHover(null)}
                      className="w-full"
                    />
                    <div className="p-3">
                      <h3 className="text-xs font-semibold min-h-[40px] leading-5">
                        {item.name}
                      </h3>

                      <span className="text-xs bg-gray-100 border rounded px-2 py-1 inline-block mt-2">
                        Hàng Mới
                      </span>

                      <p className="text-red-600 font-bold text-lg mt-2">
                        {parseInt(item.price).toLocaleString("vi-VN")}₫
                      </p>

                      <p className="text-gray-400 text-xs line-through -mt-1">
                        349,000₫
                      </p>
                    </div>

                    {/* --- CART ICON --- */}
                    <div className="absolute bottom-3 right-3 text-gray-600">
                      <MdOutlineShoppingCart size={20} />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
