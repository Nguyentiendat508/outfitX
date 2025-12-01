import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useContext, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { CategoryTypesContext } from "../../../contexts/CategoryTypeProvider";
import { getOjectById } from "../../../services/reponsive";
import { Link } from "react-router-dom";

export default function ProductSlider() {
  const products = useContext(ProductsContext);
  const categoryTypes = useContext(CategoryTypesContext);
  const [imgHover, setImgHover] = useState(null);
  return (
    <div className="">
      <div className="w-full">
        <img
          src="https://cdn.hstatic.net/files/1000253775/file/banner_danh_muc_pc-02.jpg"
          alt=""
        />
      </div>
      <div className="p-5">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-6"
        >
          {products.slice(0, 10).map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <div className="bg-white shadow-2xl  rounded-sm overflow-hidden hover:shadow-2xl transition p-2">
                  <img
                    src={item.imgUrls[`${imgHover == item.id ? 0 : 1}`]}
                    alt={item.name}
                    onMouseEnter={() => setImgHover(item.id)}
                    className="w-full h-full object-cover "
                  />
                  <div className="mt-2">
                    <h3 className="font-semibold text-sm h-[48px]">
                      {item.name}
                    </h3>
                    <div className="flex gap-4">
                      <button className="rounded-sm p-1 text-sm border-2 border-[#e30e0e] text-red-700 ">
                        Hot Deal
                      </button>
                      <div className="relative">
                        <img
                          src="https://cdn.hstatic.net/files/1000253775/file/ticket__1__be9c14916cb24f4bb7a3b8915221cb83.png"
                          alt=""
                          className=" w-25 h-8"
                        />
                        <p className="absolute left-0 top-0 translate-1">
                          Voucher 11%
                        </p>
                      </div>
                    </div>
                    <p className="text-red-600 font-bold mt-2 ">
                      {parseInt(item.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <span className="text-sm text-gray-500">
                      {getOjectById(categoryTypes, item.id_cate_type).name}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Link to={"/product"} className="flex items-center justify-center h-20">
        <button className="bg-black text-md border border-b text-white rounded-md cursor-pointer p-2 hover:cursor-pointer">
          Xem tất cả »
        </button>
      </Link>
      <div className="mt-4">
      <div className="w-full">
        <img
          src="https://cdn.hstatic.net/files/1000253775/file/banner_danh_muc_pc-01.jpg"
          alt=""
        />
      </div>
      <div className="p-5">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-6"
        >
          {products.slice(0, 10).map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <div className="bg-white rounded-md shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200">
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] px-2 py-1 rounded-md font-bold">
                    10%
                  </div>
                  <img
                    src={item.imgUrls[`${imgHover == item.id ? 0 : 1}`]}
                    alt={item.name}
                    onMouseEnter={() => setImgHover(item.id)}
                    onMouseLeave={() => setImgHover(null)}
                    className="w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold leading-5 h-[40px]">
                      {item.name}
                    </h3>

                    <p className="text-red-600 font-bold text-lg mt-2">
                      {parseInt(item.price).toLocaleString("vi-VN")}₫
                    </p>

                    <p className="text-gray-400 text-xs line-through -mt-1">
                      349,000₫
                    </p>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-80">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
                      className="w-5 h-5"
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Link to={"/product"} className="flex items-center justify-center h-20">
        <button className="bg-black text-md border border-b text-white rounded-md cursor-pointer p-2 hover:cursor-pointer  ">
          Xem tất cả »
        </button>
      </Link>
    </div>
    </div>
    
  );
}
