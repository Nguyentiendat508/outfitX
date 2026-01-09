import React, { useContext, useEffect, useState } from "react";
import {
  FiChevronDown,
  FiTruck,
  FiCreditCard,
  FiDollarSign,
  FiCheck,
} from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { CartItemContext } from "../../../contexts/CartItemProvider";
import { ProductsContext } from "../../../contexts/ProductProvider";
import {
  convertsize,
  filterById,
  getOjectById,
} from "../../../services/reponsive";
import { AuthContext } from "../../../contexts/AuthProvider";
import { TiTimes } from "react-icons/ti";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../services/firebaseService";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initialOptions } from "../../../untils/Contants";
const inner = {
  province_id: "",
  name: "",
  sdt: "",
  district_id: "",
  ward_id: "",
  address: "",
  note: "",
  userId: "",
  total_amount: "",
  createAt: new Date(),
  status: "Pending",
};
function Cartpay() {
  const [shippingMethod, setShippingMethod] = useState("free");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [order, setOrder] = useState(inner);
  const cartItems = useContext(CartItemContext);
  const products = useContext(ProductsContext);
  const { accountLogin } = useContext(AuthContext);
  const [listPay, setListPay] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    getAllProvince();
  }, []);
  useEffect(() => {
    getAllDistrict();
    getAllWard();
  }, [order]);

  const getAllProvince = async () => {
    try {
      const response = await axios.get(
        "https://api.vnappmob.com/api/v2/province/"
      );

      setProvince(response.data.results);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };
  const getAllDistrict = async () => {
    try {
      const response = await axios.get(
        `https://api.vnappmob.com/api/v2/province/district/${order.province_id}`
      );
      setDistrict(response.data.results);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };
  const getAllWard = async () => {
    try {
      const response = await axios.get(
        `https://api.vnappmob.com/api/v2/province/ward/${order.district_id}`
      );
      setWard(response.data.results);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const Paydeleted = async (item) => {
    await deleteDocument("cartItems", item);
  };
  const total = listPay.reduce((t, i) => {
    const price = getOjectById(products, i.product_id)?.price || 0;
    return t + price * i.quantity;
  }, 0);
  useEffect(() => {
    const list = filterById(cartItems, "user_id", accountLogin?.id);
    setListPay(list);
  }, [cartItems, accountLogin]);

  const handleQuantityChange = async (item) => {
    if (item.quantity < 10) {
      await updateDocument("cartItems", {
        ...item,
        quantity: item.quantity + 1,
      });
    }
  };
  const handleMinusQuantityChange = async (item) => {
    if (item.quantity > 1) {
      await updateDocument("cartItems", {
        ...item,
        quantity: item.quantity - 1,
      });
    }
  };
  const handleChangeInput = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
  const createSubscription = async () => {
    order.userId = accountLogin?.id;
    order.total_amount = total;
    const newOrder = await addDocument("orders", order);
    const payNew = {
      order_id: newOrder.id,
      paymentMethod: "Paypal",
      amount: total,
    };
    await addDocument("payments", payNew);
    await Promise.all(
      listPay.map((item) => deleteDocument("cartItems", item)),
      listPay.map((item) => {
        const { id, ...detail } = item;
        addDocument("orderDetails", { ...detail, orderId: newOrder.id });
      })
    );
  };
  //validation
  const validateOrder = () => {
    const newError = {};

    newError.name = order.name ? "" : "Vui lòng nhập họ tên";
    newError.sdt = /^0\d{9}$/.test(order.sdt)
      ? ""
      : "Số điện thoại không hợp lệ";
    newError.province_id = order.province_id
      ? ""
      : "Vui lòng chọn Tỉnh/Thành phố";
    newError.district_id = order.district_id ? "" : "Vui lòng chọn Quận/Huyện";
    newError.ward_id = order.ward_id ? "" : "Vui lòng chọn Phường/Xã";
    newError.address = order.address ? "" : "Vui lòng nhập địa chỉ";

    setError(newError);

    // return true = có lỗi
    return Object.values(newError).some((e) => e !== "");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  name="name"
                  onChange={handleChangeInput}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ và tên"
                />
                {error.name && (
                  <p className="text-red-500 text-sm">{error.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  name="sdt"
                  onChange={handleChangeInput}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                />
                <p className="text-red-500 text-sm">{error.sdt}</p>
              </div>

              <div className="relative">
                <select
                  onChange={handleChangeInput}
                  name="province_id"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Chọn Tỉnh/Thành phố</option>

                  {province.map((item) => (
                    <option key={item.province_id} value={item.province_id}>
                      {item.province_name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">{error.province_id}</p>
                <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quận/Huyện
                </label>
                <div className="relative">
                  <select
                    onChange={handleChangeInput}
                    name="district_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Chọn Quận/Huyện</option>
                    {district.map((item) => (
                      <option key={item.district_id} value={item.district_id}>
                        {item.district_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm">{error.district_id}</p>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phường/Xã
                </label>
                <div className="relative">
                  <select
                    onChange={handleChangeInput}
                    name="ward_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Chọn Phường/Xã</option>
                    {ward.map((item) => (
                      <option key={item.ward_id} value={item.ward_id}>
                        {item.ward_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm">{error.ward_id}</p>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ
                </label>

                <input
                  name="address"
                  onChange={handleChangeInput}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập địa chỉ cụ thể"
                />
                <p className="text-red-500 text-sm">{error.address}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú thêm (Ví dụ: giao hàng giờ hành chính)
                </label>
                <textarea
                  rows="3"
                  name="note"
                  onChange={handleChangeInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập ghi chú (không bắt buộc)"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Phương thức vận chuyển
            </h2>
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  className="h-4 w-4 text-blue-600"
                  checked={shippingMethod === "free"}
                  onChange={() => setShippingMethod("free")}
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <FiTruck className="text-gray-600 mr-2" />
                    <span className="font-medium">Freeship đơn hàng</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Hình thức thanh toán</h2>
            <div className="space-y-3">
              <label className="flex items-start p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="h-4 w-4 text-blue-600 mt-1"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-600 mr-2" />
                    <span className="font-medium">
                      Thanh toán khi giao hàng (COD)
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Khách hàng được kiểm tra hàng trước khi nhận hàng
                  </p>
                  <p className="text-sm text-blue-600">Freeship đơn từ 99K</p>
                </div>
              </label>

              <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="h-4 w-4 text-blue-600"
                  checked={paymentMethod === "vnpay"}
                  onChange={() => setPaymentMethod("vnpay")}
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <BsWallet2 className="text-gray-600 mr-2" />
                    <span className="font-medium">Ví điện tử VNPAY</span>
                  </div>
                </div>
              </label>

              <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="h-4 w-4 text-blue-600"
                  checked={paymentMethod === "momo"}
                  onChange={() => setPaymentMethod("momo")}
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <FiCreditCard className="text-gray-600 mr-2" />
                    <span className="font-medium">Thanh toán MoMo</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Giỏ hàng</h2>
              <span className="text-sm text-gray-500"> sản phẩm</span>
            </div>

            <div className="border-b pb-4 mb-4 overflow-y-scroll h-[465px] ">
              {listPay.map((item, index) => (
                <div className="flex space-x-4 mt-2  ">
                  <div className="w-35 h-35 bg-gray-200   rounded-md flex-shrink-0 ">
                    <img
                      key={index}
                      src={getOjectById(products, item.product_id)?.imgUrls[0]}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-3 justify-between items-start">
                      <h3 className="font-medium text-sm">
                        {getOjectById(products, item.product_id)?.name}
                      </h3>
                      <TiTimes size={25} onClick={() => Paydeleted(item)} />
                    </div>
                    <span className="text-red-500 font-bold border text-[10px] rounded-sm border-red-500 p-1">
                      Đổi ý 15 ngày
                    </span>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500"></span>
                      <div
                        className="mx-2 text-gray-300 p-2 border border-black "
                        style={{ background: item.color }}
                      ></div>
                      <span className="text-sm text-gray-500 border-l border-black pl-2 ">
                        {convertsize(item.size)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => handleMinusQuantityChange(item)}
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item)}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-medium">
                        {parseInt(
                          getOjectById(products, item.product_id)?.price
                        ).toLocaleString("vi-VN")}
                        đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start">
                <div className="bg-yellow-100 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck size={14} />
                </div>
                <div className="ml-2">
                  <div className="flex items-center">
                    <span className="font-medium">B+25</span>
                    <span className="mx-2">|</span>
                    <span className="text-sm">
                      Đơn hàng của bạn được giảm thêm 25.000đ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex mb-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Nhập mã giảm giá"
                />
                <button className="bg-gray-100 border border-r-0 text-gray-700 p-2 rounded-r-md hover:bg-gray-200">
                  Áp dụng Voucher
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span>
                  {" "}
                  <span>{total.toLocaleString()}đ</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Voucher giảm giá</span>
                <span>0 đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Chương trình khách hàng thân thiết
                </span>
                <span>0 đ</span>
              </div>
              <div className="border-t pt-3 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng</span>
                  <span className="text-red-600">
                    <span>{total.toLocaleString()}đ</span>
                  </span>
                </div>
              </div>
            </div>

            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  if (validateOrder()) {
                    return actions.reject(); // Ngăn PayPal mở popup
                  }
                  const pricePay = (total / 25000).toFixed(2);
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: pricePay,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const transactionId = details.id; // Lấy ID giao dịch từ PayPal
                    createSubscription(transactionId);
                  });
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                }}
              />
            </PayPalScriptProvider>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Bằng cách đặt hàng, bạn đồng ý với Điều khoản dịch vụ và Chính
              sách bảo mật của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpay;
