import React, { useContext, useEffect, useMemo, useState } from "react";
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
import {
  convertsize,
  filterById,
  getOjectById,
} from "../../../services/reponsive";
import { ProvinceContext } from "../../../contexts/ProvinceProvider";
import { OrderDetailContext } from "../../../contexts/OrderDetailProvider";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { Stepper } from "@mui/material";
import StepperPage from "./StepperPage";
import { ORDER_STATUSES } from "../../../untils/Contants";

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
  const province = useContext(ProvinceContext);
  const orderDetail = useContext(OrderDetailContext);
  const products = useContext(ProductsContext);

  useEffect(() => {
    const ob = getOjectById(orders, id);
    setOrder(ob);
  }, [id, orders]);

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
      value: `${parseInt(order?.total_amount).toLocaleString("vi-VN")}₫`,
      icon: <HiOutlineCreditCard className="text-xl text-purple-500" />,
    },
  ];

  const activeStatus = useMemo(() => {
    const level = getOjectById(ORDER_STATUSES, order?.status)?.level;
    if (level <= 2) {
      return "HỦY ĐƠN HÀNG";
    } else if (level == 3) {
      return "XEM TIẾN TRÌNH";
    }else if (level == 4) {
      return "ĐÁNH GIÁ";
    }
  },[order]);

  const getName = React.useMemo(() => {
    if (!province.length || !order?.province_id) return "";
    const found = province.find((p) => p.province_id == order.province_id);
    return found?.province_name || "";
  }, [province, order]);
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
                Hành trình đơn hàng
              </p>
              <p className="text-sm text-gray-500">
                Theo dõi trạng thái xử lý theo thời gian thực
              </p>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              # {order?.id}
            </span>
          </div>
          <StepperPage status={order?.status} />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold text-gray-900">Sản phẩm</p>
              <span className="text-sm text-gray-500">mặt hàng</span>
            </div>
            <div className="divide-y divide-gray-100">
              {filterById(orderDetail, "orderId", id).map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <img
                    src={getOjectById(products, item.product_id)?.imgUrls[0]}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover bg-gray-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {getOjectById(products, item.product_id)?.name}
                        </p>
                        <div className="flex gap-3">
                          <div
                            className="w-5 h-5 rounded-full mt-1 border"
                            style={{ background: item.color }}
                          ></div>
                          <p className="mt-1">size: {convertsize(item.size)}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900"></p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Số lượng: x{item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
                <button className="p-3 bg-orange-600 text-sm border w-full rounded">{activeStatus}</button>
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
// tạo modal xác nhận hủy đơn hàng 