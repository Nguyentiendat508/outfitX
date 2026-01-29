import React, { useContext } from "react";
import Carousel from "../carousel/Carousel";
import ProductSlider from "../carousel/ProductSlider";
import ProductHangmoi from "../carousel/ProductHangmoi";
import { HiOutlineFilter } from "react-icons/hi";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { CategoryTypesContext } from "../../../contexts/CategoryTypeProvider";
import { filterById } from "../../../services/reponsive";
import { BrandsContext } from "../../../contexts/BrandsProvider";
import { Link } from "react-router-dom";
import { BlogContext } from "../../../contexts/BlogProvider";

function Main() {
  const products = useContext(ProductsContext);
  const category_type = useContext(CategoryTypesContext);
  const brands = useContext(BrandsContext);
  const blogs = useContext(BlogContext);
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
                  href="/product"
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
        {" "}
        <div className="text-white font-semibold text-lg">
          Thương hiệu nổi bật
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {brands.map((item) => (
            <Link
              key={item.id}
              to={`/brand/${item.id}`}
              className="
        group
        p-[1px]
        rounded-xl
        bg-gradient-to-r from-amber-400 to-orange-500
      "
            >
              <div
                className="
          bg-black
          rounded-xl
          p-0.5
          flex
          items-center
          justify-center
        "
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="
          bg-white
          rounded-xl
            h-10
          "
                />
              </div>
            </Link>
          ))}
        </div>
        <div className="mb-6 mt-3 text-white flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">Hàng mới về</h2>
            <p className="text-sm ">Cập nhật mỗi tuần</p>
          </div>
          <a href="/product" className="text-sm font-semibold hover:underline">
            Xem tất cả
          </a>
        </div>
        <ProductSlider />
        <div className="mb-6 flex items-end justify-between">
          <h2 className=" mt-2 text-xl font-bold">Hàng thu đông</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <ProductHangmoi
            cateType={category_type?.[9]}
            data={filterById(products, "id_cate_type", category_type?.[9]?.id)}
          />
          <ProductHangmoi
            cateType={category_type?.[10]}
            data={filterById(products, "id_cate_type", category_type?.[10]?.id)}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6 flex items-end justify-between text-white">
          <div>
            <h2 className="text-xl font-bold">Blog thời trang</h2>
            <p className="text-sm text-neutral-400">
              Xu hướng & cảm hứng phối đồ mỗi tuần
            </p>
          </div>
          <Link to="/blog" className="text-sm font-semibold hover:underline">
            Xem tất cả
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Blog item */}
          {blogs.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={`/blogDetail/${item.id}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={item.imgUrl}
                alt="Blog 1"
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="mb-1 inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black">
                  Xu hướng
                </span>
                <h3 className="mt-2 text-lg font-bold group-hover:underline">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
