import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../../contexts/ProductProvider";

export default function SearchPage({  query, setQuery }) {
      const products = useContext(ProductsContext);
      const navigate = useNavigate();
  if (!query) return null;

  const resultProducts = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  const handleSearch = (id) => {
        navigate(`/detail/${id}`);
        setQuery("");
  }
  return (
    <div className="absolute shadow-2xl z-50 bottom-0 bg-white translate-y-full  w-full">
          <h2 className="text-center text-xl p-2 text-black font-bold mt-2">
            KẾT QUẢ TÌM KIẾM
          </h2>
          <div className="flex text-black  justify-between p-2  bg-gray-300 font-semibold">
            <span>SẢN PHẨM</span>
            <Link to={`/search?q=${query}`} className="text-blue-600">
              Xem tất cả {resultProducts.length} sản phẩm
            </Link>
          </div>

          <div className="max-h-80 overflow-y-auto pr-2">
            {resultProducts.length === 0 ? (
              <p className="text-gray-500 p-3">Không tìm thấy sản phẩm.</p>
            ) : (
              resultProducts.map((item) => (
                <div
                  onClick={() => handleSearch(item.id)}
                  key={item.id}
                  className="flex gap-3 py-3"
                >
                  <img
                    src={item.imgUrls?.[0]}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-black ">{item.name}</p>
                    <p className="text-red-600 font-bold">
                      {parseInt(item.price)?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
    </div>
  );
}
