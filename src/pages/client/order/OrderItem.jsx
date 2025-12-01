import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiArrowLeft,
  HiCheckCircle,
  HiOutlineChatAlt2,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineLocationMarker,
  HiOutlineTruck,
} from "react-icons/hi";
import { OrderContext } from "../../../contexts/OrderProvider";
import { getOjectById } from "../../../services/reponsive";
import { ProvinceContext } from "../../../contexts/ProvinceProvider";
import axios from "axios";

const mockOrders = [
  {
    id: "2",
    code: "ORD-20251130-012",
    status: "Đang giao",
    updatedAt: "30/11/2025 • 15:30",
    timeline: [
      {
        key: "confirmed",
        label: "Xác nhận",
        time: "30/11 • 08:10",
        completed: true,
      },
      {
        key: "packing",
        label: "Đóng gói",
        time: "30/11 • 09:00",
        completed: true,
      },
      {
        key: "shipping",
        label: "Đang giao",
        time: "30/11 • 12:15",
        completed: true,
      },
      {
        key: "delivered",
        label: "Giao hàng",
        time: "Đang chờ",
        completed: false,
      },
    ],
    shipping: {
      name: "Trần Thị B",
      phone: "0912 456 789",
      address: "Ngõ 45 Hồ Tùng Mậu, Cầu Giấy, Hà Nội",
      note: "",
    },
    payment: {
      method: "Thanh toán khi nhận hàng",
      status: "Chờ thanh toán",
      transactionId: null,
      time: "—",
    },
    items: [
      {
        id: "P004",
        name: "Set đồ thể thao Spectrum",
        variant: "M • Xám",
        price: 520000,
        quantity: 1,
        thumbnail:
          "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=400",
      },
      {
        id: "P005",
        name: "Giày sneaker Runway Flex",
        variant: "42 • Trắng",
        price: 680000,
        quantity: 1,
        thumbnail:
          "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
      },
    ],
    totals: {
      subtotal: 1200000,
      shipping: 30000,
      discount: 60000,
    },
  },
];

const statusThemes = {
  "Đã giao": {
    badge: "bg-green-100 text-green-700",
    indicator: "border-green-500",
    dot: "bg-green-500",
  },
};

const OrderItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orders = useContext(OrderContext);
  const [order, setOrder] = useState({});
  const [province, setProvince] = useState([]);
  useEffect(() => {
    const ob = getOjectById(orders, id);
    setOrder(ob);
  }, [id, orders]);
  useEffect(() => {
    getAllProvince();
  }, []);
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

  const summaryCards = [
    {
      label: "Trạng thái",
      value: order?.status,
      icon: <HiCheckCircle className="text-xl text-green-500" />,
      accent: statusThemes[order?.status] || statusThemes["Đang giao"],
    },
    {
      label: "Cập nhật gần nhất",
      value: order?.createAt?.toDate().toLocaleString(),
      icon: <HiOutlineClock className="text-xl text-blue-500" />,
    },
    {
      label: "Mã đơn",
      value: order?.id,
      icon: <HiOutlineTruck className="text-xl text-amber-500" />,
    },
    {
      label: "Tổng tiền",
      value: order?.total_amount,
      icon: <HiOutlineCreditCard className="text-xl text-purple-500" />,
    },
  ];
  console.log(order);
  
  const getName = getOjectById(province, order?.province_id)?.province_name;
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition"
          >
            <HiArrowLeft />
            Quay lại đơn hàng
          </button>
          <div
            className={`text-xs font-semibold px-4 py-2 rounded-full ${
              statusThemes[order?.status]?.badge || "bg-gray-100 text-gray-600"
            }`}
          >
            {order?.status}
          </div>
        </div>
        {/* trạng thái */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 text-sm text-gray-500">
                {card.icon}
                <span>{card.label}</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Hành trình đơn hàng {getName }
              </p>
              <p className="text-sm text-gray-500">
                Theo dõi trạng thái xử lý theo thời gian thực
              </p>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              # {order?.id}
            </span>
          </div>
          {/* <div className="grid gap-4 md:grid-cols-4">
                <div
                  key={order.key}
                  className={`relative rounded-2xl border p-4 ${
                    order.completed
                      ? "border-black"
                      : "border-dashed border-gray-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                      order.completed
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {order.completed ? <HiCheckCircle /> : <HiOutlineClock />}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {order.label}
                  </p>
                </div>
            </div> */}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold text-gray-900">Sản phẩm</p>
              <span className="text-sm text-gray-500">mặt hàng</span>
            </div>
            {/* <div className="divide-y divide-gray-100">
               
                  <div key={order.id} className="py-4 flex gap-4">
                    <img
                      src={order.thumbnail}
                      alt={order.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {order.name}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {order.variant}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Số lượng: x{order.quantity}
                      </p>
                    </div>
                  </div>

              </div> */}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
                <HiOutlineLocationMarker />
                Địa chỉ giao hàng
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-900 font-semibold">{getName}</p>
                <p className="text-gray-500"></p>
                <p className="text-gray-600 leading-relaxed"></p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
                <HiOutlineCreditCard />
                Thanh toán
              </div>
              <div className="text-sm space-y-2">
                <p className="text-gray-900 font-semibold"></p>
                <p className="text-gray-500">Trạng thái: {order?.status}</p>
                <p className="text-gray-500">
                  Thời gian: {order?.createAt?.toDate().toLocaleString()}
                </p>
              </div>
              <div className="border-t border-dashed pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Tạm tính</span>
                  <span>
                    {" "}
                    {parseInt(order?.total_amount).toLocaleString("vi-VN")}₫
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span>Giảm giá</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
                  <span>Tổng cộng</span>
                  <span>
                    {parseInt(order?.total_amount).toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-black to-gray-900 rounded-3xl p-6 text-white flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Cần hỗ trợ thêm?</p>
            <p className="text-sm text-gray-200 mt-1">
              Đội ngũ TDSHOP luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc về đơn
              hàng.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/20 transition">
              <HiOutlineChatAlt2 className="text-lg" />
              Chat với CSKH
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 transition">
              <HiOutlineTruck className="text-lg" />
              Theo dõi vận chuyển
            </button>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default OrderItem;
