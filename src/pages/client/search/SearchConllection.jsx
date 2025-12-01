import React, { useContext, useState } from "react";
import SlideShowCoverflow from "../carousel/SlideShowCoverflow";
import { ProductsContext } from "../../../contexts/ProductProvider";

function SearchConllection() {
  const products = useContext(ProductsContext);
  const [imgHover, setImgHover] = useState(null);
  return (
    <div className="mx-[10%]">
      <h1 className="text-black my-3  ml-11">Trang chu / Ao thun</h1>
      <SlideShowCoverflow />
      <div className="flex justify-end items-center gap-2 my-2">
        <h1 className="font-bold">Sap xep: </h1>
        <select className="border border-black p-2">
          <option value="">San pham noi bat</option>
          <option value="">name</option>
          <option value="">name</option>
          <option value="">name</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-3">
        {products.map((item) => (
          <div key={item.id} className="col-span-1">
            <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-xl transition duration-300 relative">
              <div className="relative">
                <img
                  src={item.imgUrls[imgHover === item.id ? 0 : 1]}
                  alt={item.name}
                  onMouseEnter={() => setImgHover(item.id)}
                  onMouseLeave={() => setImgHover(null)}
                  className="w-full h-[230px] object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                  -72%
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-[13px] h-[38px] leading-4 overflow-hidden">
                  {item.name}
                </h3>
                <span className="inline-block text-[10px] bg-red-100 text-red-600 px-2 py-[2px] rounded mt-1">
                  Hot Deal
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-red-600 font-bold text-lg">
                    {parseInt(item.price).toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-gray-400 line-through text-xs">
                    349,000đ
                  </span>
                </div>
                <div className="mt-3 text-gray-600 text-xs">
                  Đã bán 421 sản phẩm
                </div>
                <div className="w-full bg-gray-200 h-[6px] rounded-full mt-1">
                  <div
                    className="bg-red-500 h-[6px] rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
}

export default SearchConllection;
