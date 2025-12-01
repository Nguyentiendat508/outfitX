// OrderPage.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiArrowSmRight,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineCreditCard,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { OrderContext } from "../../../contexts/OrderProvider";
import { AuthContext } from "../../../contexts/AuthProvider";
import { filterById} from "../../../services/reponsive";
import { Link } from "react-router-dom";

const statusThemes = {
  "Đã thanh toán": {
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  "Chưa thanh toán": {
    badge: "bg-red-100 text-red-600",
    dot: "bg-red-500",
  },
  "Đang xử lý": {
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
};

const formatCurrency = (value) => `${value.toLocaleString("vi-VN")} đ`;

const OrderPage = () => {
  const orders = useContext(OrderContext);
  const { accountLogin } = useContext(AuthContext);
  const [orderShow, setOrderShow] = useState([]);
  useEffect(() => {
    const list = filterById(orders, "userId", accountLogin?.id);
    setOrderShow(list);
  }, [orders, accountLogin]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Quản lý đơn hàng
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 mt-1">
              Lịch sử mua sắm của bạn
            </h1>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
              + Đặt hàng mới
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Tổng đơn hàng</p>
            <p className="text-3xl font-semibold text-gray-900 mt-2">
              {orderShow.length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Trong tháng 12/2025</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Đã thanh toán</p>
            <p className="text-3xl font-semibold text-emerald-600 mt-2">
              bfdbd
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Tăng 8% so với tuần trước
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Đang xử lý</p>
            <p className="text-3xl font-semibold text-amber-600 mt-2">vfvsdf</p>
            <p className="text-xs text-gray-400 mt-1">Bao gồm chờ thanh toán</p>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 text-xs font-semibold text-gray-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">
                Tất cả
              </span>
              <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 hover:bg-gray-100 cursor-pointer">
                Đã thanh toán
              </span>
              <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 hover:bg-gray-100 cursor-pointer">
                Chưa thanh toán
              </span>
              <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 hover:bg-gray-100 cursor-pointer">
                Đang xử lý
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {orderShow.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-gray-100 p-5 hover:shadow-lg transition bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-gray-200 px-4 py-2">
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Mã đơn
                      </p>
                    </div>
                    <div className="text-sm font-bold-500 flex items-center gap-2">
                      {p.userId}
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold ${
                      statusThemes[p.status]?.badge ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        statusThemes[p.status]?.dot || "bg-gray-500"
                      }`}
                    ></span>
                    {p.status}
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <HiOutlineUser className="text-lg text-gray-400" />
                    <div>
                      <p className="text-xs uppercase text-gray-400">
                        Khách hàng
                      </p>
                      <p className="font-semibold text-gray-900">{p.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <HiOutlineCalendar className="text-lg text-gray-400" />
                    <div>
                      <p className="text-xs uppercase text-gray-400">
                        Ngày đặt
                      </p>
                      <p className="font-semibold text-gray-900">
                        {p.createAt?.toDate().toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <HiOutlineCreditCard className="text-lg text-gray-400" />
                    <div>
                      <p className="text-xs uppercase text-gray-400">
                        Tổng tiền
                      </p>
                      <p className="font-semibold text-gray-900">
                          {parseInt(p.total_amount).toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Link
                      to={`/orderitem/${p.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
                    >
                      Xem chi tiết
                      <HiArrowSmRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
