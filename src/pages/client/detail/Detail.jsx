import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { convertsize, getOjectById } from "../../../services/reponsive";
import { CategoryTypesContext } from "../../../contexts/CategoryTypeProvider";
import { addDocument, updateDocument } from "../../../services/firebaseService";
import { AuthContext } from "../../../contexts/AuthProvider";
import { CartItemContext } from "../../../contexts/CartItemProvider";
import { IoMdStar } from "react-icons/io";
import { ReviewContext } from "../../../contexts/ReviewProvider";
import { Rating } from "@mui/material";

const inner = { product_id: "", quantity: 1, user_id: "", color: "", size: "" };
function Detail() {
  const products = useContext(ProductsContext);
  const categoryTypes = useContext(CategoryTypesContext);
  const review = useContext(ReviewContext);
  const { accountLogin } = useContext(AuthContext);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState({});
  const [cartItem, setCartItem] = useState(inner);
  const [error, setError] = useState(inner);
  const cartItems = useContext(CartItemContext);
  const [tab, setTab] = useState("mo-ta");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const ob = getOjectById(products, id);
    setProduct(ob || {});
  }, [id, products]);

  const giam = () => {
    if (cartItem.quantity > 1)
      setCartItem((pre) => ({ ...cartItem, quantity: pre.quantity - 1 }));
  };
  const tang = () => {
    setCartItem((pre) => ({ ...cartItem, quantity: pre.quantity + 1 }));
  };

  const validation = () => {
    const newError = {};
    if (!accountLogin) {
      alert("vui long dang nhap !");
      return;
    }
    newError.color = cartItem.color ? "" : "vui lòng chọn màu sắc";
    newError.size = cartItem.size ? "" : "vui lòng chọn size";
    setError(newError);
    return Object.values(newError).some((b) => b !== "");
  };
  const addToCart = async () => {
    if (validation()) {
      return;
    }
    cartItem.user_id = accountLogin.id;
    cartItem.product_id = id;
    const checkProduct = cartItems.find(
      (e) => e.user_id == accountLogin.id && e.product_id == id
    );
    if (checkProduct) {
      console.log({
        ...cartItem,
        quantity: cartItem.quantity + checkProduct.quantity,
      });
      await updateDocument("cartItems", {
        ...cartItem,
        quantity: cartItem.quantity + checkProduct.quantity,
        id: checkProduct.id,
      });
    } else {
      await addDocument("cartItems", cartItem);
    }
  };
  const buyProduct = () => {
    if (validation()) {
      return;
    }
    addToCart();
    navigate("/pay");
  };

  const productReviews = review.filter((r) => r.product_id === id);
  productReviews.reduce((sum, r) => sum + r.rate, 0) /
    (productReviews.length || 1);

  return (
    <div className="bg-black">
      <h3 className="text-white text-xs">
        Trang chủ CT IT ALL PRODUCT TEST Áo Sơ Mi Nam Tay Dài ICONDENIM Rogne
        Bear
      </h3>
      <div className="max-w-7xl mt-2 bg-white mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            {product?.imgUrls?.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt=""
                  className="w-full h-[500px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={10}
            watchSlidesProgress
            className="mt-4"
          >
            {product?.imgUrls?.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt=""
                  className="w-full h-20 object-cover rounded-md border cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product?.name}</h1>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-yellow-400 text-xl">★★★★☆</span>
            <span className="text-gray-500 text-sm"> đánh giá</span>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            Loại: {getOjectById(categoryTypes, product?.id_cate_type)?.name} |
            MSP: JGID0070-01
          </p>

          <p className="text-4xl font-bold text-red-500 mt-4">
            {parseInt(product?.price)?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <div className=" border p-4 rounded-xl mt-5">
            <p className="font-semibold mb-3">🎁 KHUYẾN MÃI – ƯU ĐÃI</p>

            <ul className="text-sm space-y-1">
              <li>
                🔥 Nhập mã <b>NOV15</b> giảm 15K đơn từ 299K
              </li>
              <li>
                🔥 Nhập mã <b>NOV40</b> giảm 40K đơn từ 599K
              </li>
              <li>
                🔥 Nhập mã <b>NOV70</b> giảm 70K đơn từ 999K
              </li>
              <li>
                🔥 Nhập mã <b>NOV120</b> giảm 120K đơn từ 1299K
              </li>
              <li>🚚 FREESHIP đơn từ 399K</li>
            </ul>
          </div>
          <div className="mt-5">
            <p className="font-semibold mb-2">Màu sắc:</p>
            <div className="flex gap-2">
              {product?.color?.map((e, index) => (
                <button
                  onClick={() => setCartItem({ ...cartItem, color: e })}
                  style={{ background: e }}
                  className={`w-8 h-8 border border-black rounded-full ${
                    cartItem.color == e ? "border border-2 border-blue-700" : ""
                  }`}
                  key={index}
                ></button>
              ))}
            </div>
            {error.color && <p className="text-red-500">{error.color}</p>}
          </div>
          <div className=" flex mt-2 justify-between">
            <span>bảng size</span>
            <span>hướng dẫn chọn size</span>
          </div>
          <div className="mt-4">
            <p className="font-semibold mb-2">Size:</p>
            <div className="flex gap-2">
              {product?.size?.map((s) => (
                <button
                  onClick={() => setCartItem({ ...cartItem, size: s })}
                  key={s}
                  className={`px-4 py-2 rounded-md border   cursor-pointer ${
                    cartItem.size == s ? "bg-green-800 text-white" : ""
                  }`}
                >
                  {convertsize(s)}
                </button>
              ))}
            </div>
            {error.size && <p className="text-red-500">{error.size}</p>}
          </div>
          <div className="flex gap-4 mt-7">
            <div className="flex items-center border rounded p-2  w-fit select-none">
              <button onClick={giam} className="px-3 text-xl font-bold">
                -
              </button>
              <span className="px-4 text-lg">{cartItem.quantity}</span>
              <button onClick={tang} className="px-3 text-xl font-bold">
                +
              </button>
            </div>
            <button
              onClick={addToCart}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-white  hover:text-black  hover:border"
            >
              THÊM VÀO GIỎ
            </button>

            <div
              onClick={buyProduct}
              className="px-6 py-3 bg-white border border-black rounded-lg 
             hover:bg-black hover:text-white transition-all duration-300"
            >
              MUA NGAY
            </div>
          </div>
          <div className="grid grid-cols-4 text-center mt-10 text-sm text-gray-700">
            <div>
              <div className="text-2xl">📦</div>
              Đổi trả 15 ngày
            </div>
            <div>
              <div className="text-2xl">🚚</div>
              Miễn phí ship
            </div>
            <div>
              <div className="text-2xl">🛡️</div>
              Bảo hành 30 ngày
            </div>
            <div>
              <div className="text-2xl">⭐</div>
              Tích điểm thành viên
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  ">
        <div className="mt-10 bg-white">
          {/* ------- TAB HEADER ------- */}
          <div className="border-b border-gray-200">
            <div className="flex px-6 md:px-12">
              {/* MÔ TẢ */}
              <button
                onClick={() => setTab("mo-ta")}
                className={`px-6 py-4  font-medium ${
                  tab === "mo-ta"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                MÔ TẢ
              </button>
              <button
                onClick={() => setTab("danhgia")}
                className={`px-6 py-4 font-medium ${
                  tab === "danhgia"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                ĐÁNH GIÁ
              </button>

              {/* CHÍNH SÁCH GIAO HÀNG */}
              <button
                onClick={() => setTab("giao-hang")}
                className={`px-6 py-4 font-medium ${
                  tab === "giao-hang"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                CHÍNH SÁCH GIAO HÀNG
              </button>

              {/* CHÍNH SÁCH ĐỔI HÀNG */}
              <button
                onClick={() => setTab("doi-hang")}
                className={`px-6 py-4 font-medium ${
                  tab === "doi-hang"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                CHÍNH SÁCH ĐỔI HÀNG
              </button>
            </div>
          </div>

          {/* -------- TAB CONTENT -------- */}
          <div className="p-6 px-6 md:px-12 text-gray-700">
            {/* TAB: MÔ TẢ */}
            {tab === "mo-ta" && (
              <div>
                <p className="mb-4 text-gray-700">{product.description}</p>
              </div>
            )}
            {/* Đánh Gía*/}
            {tab === "danhgia" && (
              <div className="max-w-4xl">
                <h2 className="text-2xl font-semibold mb-8">
                  TẤT CẢ ĐÁNH GIÁ ({productReviews.length})
                </h2>

                <div className="space-y-10">
                  {productReviews.map((e) => (
                    <div key={e.id} className="border-t pt-6">
                      {/* STAR */}
                      <Rating value={e.rate} readOnly size="small" />

                      {/* USER + DATE */}
                      <p className="mt-2 text-sm font-bold text-gray-900">
                        {e.user_id?.slice(0, 10)}***{" "}
                        <span className="font-normal text-black">
                          – {e.newDate?.toDate?.().toLocaleDateString("vi-VN")}
                        </span>
                      </p>

                      {/* CONTENT */}
                      <p className="mt-2 italic text-gray-800 leading-relaxed max-w-3xl">
                        {e.description}
                      </p>

                      {/* IMAGES */}
                      {e.imgUrls?.length > 0 && (
                        <div className="mt-4 flex gap-4">
                          {e.imgUrls.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt=""
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CHÍNH SÁCH GIAO HÀNG */}
            {tab === "giao-hang" && (
              <div>
                <h3 className="font-bold text-lg mb-2">Chính sách giao hàng</h3>
                <p className="text-gray-600">
                  - Giao hàng toàn quốc
                  <br />
                  - Thời gian 2–5 ngày tùy khu vực
                  <br />- Miễn phí ship cho đơn từ 500.000đ
                </p>
              </div>
            )}

            {/* TAB: CHÍNH SÁCH ĐỔI HÀNG */}
            {tab === "doi-hang" && (
              <div>
                <h3 className="font-bold text-lg mb-2">Chính sách đổi hàng</h3>
                <p className="text-gray-600">
                  - Đổi hàng trong 7 ngày
                  <br />
                  - Sản phẩm chưa qua sử dụng
                  <br />- Giữ nguyên tag và hóa đơn
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
