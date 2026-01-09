import React, { useContext } from "react";

import { getOjectById } from "../../../services/reponsive";

import { ProductsContext } from "../../../contexts/ProductProvider";
import { Link, Navigate } from "react-router-dom";

function Cart({ openCart, listCart }) {
  const products = useContext(ProductsContext);
  const PayProduct = () => {
    Navigate("/pay");
  };

  //tong tien
  const total = listCart.reduce((t, i) => {
    const price = getOjectById(products, i.product_id)?.price || 0;
    return t + price * i.quantity;
  }, 0);

  if (!openCart) return null;
  return (
    <>
      <div className="absolute z-100 cartd  shadow-2xl right-0 -bottom-2 translate-y-full bg-white w-[420px]  z-50 p-2 ">
        <div className="w-5 h-5 bg-white absolute z-100 top-0 right-4 -translate-1 rotate-45"></div>
        <div className="text-center pb-3 border-b">
          <h2 className=" text-black text-lg ">GIỎ HÀNG</h2>
        </div>
        <div className="h-[220px] overflow-y-scroll">
          {/* Sản phẩm */}
          {listCart.map((item, index) => (
            <div
              key={index}
              className="py-4 flex gap-3 border border-b-gray-500  "
            >
              <img
                src={getOjectById(products, item.product_id)?.imgUrls[0]}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-black text-sm">
                  {getOjectById(products, item.product_id)?.name}
                </p>
                <p className="text-xs text-gray-500"></p>
                <p className="text-red-600 font-bold">
                  {parseInt(
                    getOjectById(products, item.product_id)?.price
                  ).toLocaleString("vi-VN")}
                  đ
                </p>
                <p className="text-sm text-black">x{item.quantity}</p>
                <p className="text-amber-600 text-sm flex items-center gap-1">
                  🎁 Sản phẩm giảm giá
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 text-black">
          <div className="flex justify-between text-sm">
            <span>Tạm tính:</span>
            <span>{total.toLocaleString()}đ</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span>Giảm giá:</span>
            <span>0đ</span>
          </div>

          <div className="flex justify-between font-bold text-lg text-red-600 mt-2">
            <span>Tổng tiền:</span>
            <span>{total.toLocaleString()}đ</span>
          </div>

          <div className="flex p-2 gap-2 mt-4">
            <button className="flex-1 p-1 border text-sm font-semibold hover:bg-black hover:text-white">
              CHỈNH SỬA GIỎ HÀNG
            </button>
            <Link
              to={"/pay"}
              className="flex-1 text-sm bg-black text-center text-white px-4 py-2 font-semibold hover:bg-white hover:text-black"
            >
              THANH TOÁN
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
