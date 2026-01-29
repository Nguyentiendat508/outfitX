import React, { useContext, useState } from "react";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { Link } from "react-router-dom";
import SlideView from "../carousel/SlideView";

function Product() {
  const products = useContext(ProductsContext);
  const [imgHover, setImgHover] = useState(null);
  if (!products || products.length === 0) {
    return <div className="text-center py-10">Không có sản phẩm nào</div>;
  }
  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
        <SlideView />
        <h1 className="text-3xl font-bold mb-6">Tất cả sản phẩm</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {products.map((products) => (
            <Link to={`/detail/${products.id}`}>
              <div
                key={products.id}
                className="border rounded-lg h-120 bg-white overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={products.imgUrls[`${imgHover == products.id ? 0 : 1}`]}
                  alt={products.name}
                  onMouseEnter={() => setImgHover(products.id)}
                  onMouseLeave={() => setImgHover(null)}
                  className="object-cover h-70 w-90"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{products.name}</h2>
                  <p className="text-red-600 font-bold text-lg mt-2">
                    {parseInt(products.price).toLocaleString("vi-VN")}₫
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/detail/${products.id}`}
                      className="flex-1 text-center bg-black border text-white px-3 py-2 rounded hover:bg-white hover:text-black transition"
                    >
                      Xem chi tiết
                    </Link>
                    <button className="flex-1 bg-white border text-black px-3 py-2 rounded hover:bg-black hover:text-white transition">
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <button className="bg-black mb-5 text-white border text-xs font-medium px-2 py-1 rounded-md ">
          Xem thêm
        </button>
      </div>
    </div>
  );
}

export default Product;
