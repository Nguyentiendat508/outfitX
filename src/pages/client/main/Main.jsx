import React from "react";
import Carousel from "../carousel/Carousel";
import ProductSlider from "../carousel/ProductSlider";
import ProductHangmoi from "../carousel/ProductHangmoi";
import { HiOutlineFilter } from "react-icons/hi";

function Main() {
  return (
    <main className="bg-black">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="grid items-center gap-10 grid-cols-1 py-12 md:grid-cols-2">
            <div className="col-span-1">
              <h1 className="text-3xl text-white sm:text-4xl md:text-5xl font-bold tracking-tight">
                Thời trang tối giản, tôn dáng mỗi ngày
              </h1>
              <p className="mt-4 text-white">
                Chất liệu thoáng mát, phom dáng chuẩn, dễ phối mọi hoàn cảnh. Bộ
                sưu tập mới đã lên kệ.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#new"
                  className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-black"
                >
                  Mua ngay
                </a>
                <a
                  href="#sale"
                  className="inline-flex text-black bg-white items-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold hover:bg-black hover:text-white"
                >
                  Ưu đãi tháng này
                </a>
              </div>
            </div>
            <div className="col-span-1">
              <Carousel />
            </div>
          </div>
        </div>
      </section>

      <section
        id="new"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="mb-5 flex gap-3">
          <button className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100">
            <HiOutlineFilter />
            Bộ lọc
          </button>
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.9q_MpEBq4FzuM1mHT6xlBgHaGB?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt=""
            className="rounded-xl w-15 h-10"
          />
        </div>
        <div className="mb-6 text-white flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">Hàng mới về</h2>
            <p className="text-sm ">Cập nhật mỗi tuần</p>
          </div>
          <a href="#" className="text-sm font-semibold hover:underline">
            Xem tất cả
          </a>
        </div>
        <ProductSlider />
        <div className="mb-6 flex items-end justify-between">
          <h2 className=" mt-2 text-xl font-bold">Hàng thu đông</h2>
        </div>
        <ProductHangmoi />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <a href="#men" className="group relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1640&auto=format&fit=crop"
              alt="Men"
              className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold">
              Bộ sưu tập Nam
            </span>
          </a>
          <a
            href="#women"
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1640&auto=format&fit=crop"
              alt="Women"
              className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold">
              Bộ sưu tập Nữ
            </span>
          </a>
          <a
            href="#sale"
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1640&auto=format&fit=crop"
              alt="Sale"
              className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold">
              Sale sốc
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default Main;
