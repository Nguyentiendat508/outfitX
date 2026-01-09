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
import { RefundContext } from "../../../contexts/RefundProvider";

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
  const refunds = useContext(RefundContext);

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
    } else if (level == 4 || level == 6) {
      return "ĐÁNH GIÁ";
    }
  }, [order]);

  // Xử lý click vào button
  const handleStatusClick = () => {
    const level = getOjectById(ORDER_STATUSES, order?.status)?.level;
    if (level == 4 || level === 6) {
      // Navigate đến OrderReview với order
      navigate(`/review/${order.id}`);
    }
  };

  const getName = React.useMemo(() => {
    if (!province.length || !order?.province_id) return "";
    const found = province.find((p) => p.province_id == order.province_id);
    return found?.province_name || "";
  }, [province, order]);

   const checkRefund = (productId) => {
    const check = refunds.some(
      (r) => r.order_id == id && r.product_id == productId
    );
    return check;
  };

  const showData = useMemo(
    () => filterById(orderDetail, "orderId", id),
    [orderDetail, id]
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <HiArrowLeft className="text-gray-600 text-xl" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Chi tiết đơn hàng</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  card.icon.props.className.includes("text-")
                    ? ""
                    : "bg-gray-100"
                }`}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="font-medium">{card.value || "--"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold mb-4">Trạng thái đơn hàng</h2>
        <StepperPage status={order?.status} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white lg:col-span-3 p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4">Sản phẩm đã đặt</h2>
          <div className="divide-y divide-gray-200">
            {showData.map((item) => {
              const product = getOjectById(products, item.product_id);
              if (!product) return null;

              return (
                <div key={item.id} className="py-4 flex gap-4">
                  <img
                    src={getOjectById(products, item.product_id)?.imgUrls[0]}
                    alt=""
                    className="w-24 h-24 rounded-xl object-cover bg-gray-100"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-900">
                        {getOjectById(products, item.product_id)?.name}
                      </p>
                      <p className="font-medium">
                        {parseInt(product.price).toLocaleString("vi-VN")}₫
                      </p>
                    </div>

                    <div className="flex justify-between items-center gap-4 mt-2">
                      <div className="flex gap-3">
                          {item.color && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Màu:</span>
                          <div
                            className="w-5 h-5 rounded-full border"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      )}
                      {item.size && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Size:</span>
                          <span className="text-sm font-medium">
                            {convertsize(item.size)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Số lượng:</span>
                        <span className="text-sm font-medium">
                          x{item.quantity}
                        </span>
                      </div>
                      </div>
                      
                      <button
                    className={`rounded-md p-2 text-white text-sm ${
                      checkRefund(item.product_id)
                        ? "bg-amber-400"
                        :  item.product_id
                        ? "bg-green-600"
                        : ""
                    }`}
                  >
                    {checkRefund(item.product_id) ? "Đang trả hàng" : "Đã giao"}
                  </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white lg:col-span-1 p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
          <div className="bg-white rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
              <HiOutlineLocationMarker />
              Địa chỉ giao hàng
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-900 font-semibold">{getName}</p>
              <p className="text-gray-500"></p>
              <p className="text-gray-600 leading-relaxed"></p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold">
              <HiOutlineCreditCard />
              Thanh toán
            </div>
            <div className="text-sm space-y-2">
              <p className="text-gray-900 font-semibold"></p>
              <p className="text-gray-500">Trạng thái: {order?.status} </p>
              <p className="text-gray-500">
                Thời gian: {order?.createAt?.toDate().toLocaleString()}
                11
              </p>
            </div>
            <div className="border-t border-dashed pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Tạm tính</span>
                <span>
                  {" "}
                  {parseInt(order?.total_amount).toLocaleString("vi-VN")}₫{" "}
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
                  {parseInt(order?.total_amount).toLocaleString("vi-VN")}₫{" "}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleStatusClick}
            disabled={!activeStatus}
            className="p-2 mt-4 rounded-sm w-full bg-amber-300 text-white"
          >
            {activeStatus}
          </button>
        </div>
      </div>

      {/* Customer support */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <div className="flex items-center">
          <HiOutlineChatAlt2 className="text-blue-600 text-2xl mr-3" />
          <div>
            <h3 className="font-medium text-gray-900">Cần hỗ trợ?</h3>
            <p className="text-sm text-gray-600">
              Liên hệ chúng tôi nếu bạn có bất kỳ câu hỏi nào về đơn hàng của
              bạn
            </p>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
              Liên hệ hỗ trợ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
