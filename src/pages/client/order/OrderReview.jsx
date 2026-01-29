import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Rating,
  Divider,
} from "@mui/material";
import { HiOutlineLocationMarker, HiOutlinePhotograph } from "react-icons/hi";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { OrderContext } from "../../../contexts/OrderProvider";
import {
  convertsize,
  filterById,
  getOjectById,
} from "../../../services/reponsive";
import { useNavigate, useParams } from "react-router-dom";
import { OrderDetailContext } from "../../../contexts/OrderDetailProvider";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { ProvinceContext } from "../../../contexts/ProvinceProvider";
import { AuthContext } from "../../../contexts/AuthProvider";
import { addDocument, updateDocument } from "../../../services/firebaseService";
import { ORDER_STATUSES } from "../../../untils/Contants";
import { RefundContext } from "../../../contexts/RefundProvider";
const inner = {
  product_id: "",
  user_id: "",
  rate: 5,
  imgUrls: [],
  description: "",
  newDate: new Date(),
};
const rest = {
  product_id: "",
  order_id: "",
  imgUrls: [],
  description: "",
  newDate: new Date(),
  price: 0,
};
const OrderReview = () => {
  const [selectedItem, setSelectedItem] = useState(inner);
  const [refund, setRefund] = useState(rest);
  const [idProduct, setIdProduct] = useState(null);
  const [tab, setTab] = useState("review");
  const [order, setOrder] = useState({});
  const orders = useContext(OrderContext);
  const orderDetail = useContext(OrderDetailContext);
  const products = useContext(ProductsContext);
  const province = useContext(ProvinceContext);
  const refunds = useContext(RefundContext);
  const navigate = useNavigate();
  const { accountLogin } = useContext(AuthContext);
  const { id } = useParams();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const ob = getOjectById(orders, id);
    setOrder(ob);
  }, [id, orders]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImageUrls = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageUrls.push(e.target.result);
        if (newImageUrls.length === files.length) {
          setSelectedItem((prev) => ({
            ...prev,
            imgUrls: [...(prev.imgUrls || []), ...newImageUrls],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  //hoàn tiền
  const handleRefund = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImageUrls = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageUrls.push(e.target.result);
        if (newImageUrls.length === files.length) {
          setRefund((prev) => ({
            ...prev,
            imgUrls: [...(prev.imgUrls || []), ...newImageUrls],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const getName = React.useMemo(() => {
    if (!province.length || !order?.province_id) return "";
    const found = province.find((p) => p.province_id == order.province_id);
    return found?.province_name || "";
  }, [province, order]);

  //đánh giá
  const addReview = async () => {
    const payload = {
      ...selectedItem,
      user_id: accountLogin.id,
      newDate: new Date(),
      product_id: idProduct,
    };

    await addDocument("reviews", payload);

    navigate(`/detail/${selectedItem.product_id}`);
  };

  //trả hàng
  const addRefund = async () => {
    const payload = {
      ...refund,
      order_id: id,
      newDate: new Date(),
      status: "Waiting",
      product_id: idProduct,
      price: price,
    };
    await addDocument("refund", payload);
    await updateDocument("orders", { ...order, status: "Returned" });
    navigate("/");
  };

  const checkRefund = (productId) => {
    const check = refunds.some(
      (r) => r.order_id == id && r.product_id == productId,
    );
    return check;
  };

  const check = useMemo(() => {
    return refunds?.some((r) => r.product_id === idProduct);
  }, [idProduct, refunds]);

  return (
    <div className="grid grid-cols-5 gap-4 p-2 mt-4">
      <div className="col-span-1">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
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
        </div>
      </div>
      <div className="col-span-2">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          {filterById(orderDetail, "orderId", id).map((item) => (
            <div key={item.id} className=" flex gap-4">
              <img
                src={getOjectById(products, item.product_id)?.imgUrls[0]}
                alt=""
                className="w-24 h-24 rounded-xl object-cover bg-gray-100"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {getOjectById(products, item.product_id)?.name}
                  </h3>
                  <p className="font-semibold text-red-500 whitespace-nowrap">
                    {Number(
                      getOjectById(products, item.product_id)?.price || 0,
                    ).toLocaleString("vi-VN")}
                    ₫
                  </p>
                </div>
                <div className="flex justify-between gap-2 mt-2 text-sm">
                  <div className="flex items-center  gap-1 px-2 py-1 border rounded-full">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ background: item.color }}
                    ></div>
                    <div>Size: {convertsize(item.size)}</div>
                  </div>

                  <button
                    onClick={() => {
                      setIdProduct(item.product_id);

                      const product = getOjectById(products, item.product_id);
                      const totalPrice = (product?.price || 0) * item.quantity;

                      setPrice(totalPrice); // ✅ setPrice dùng ở đây
                    }}
                    className={`rounded-md p-2 text-white text-sm ${
                      checkRefund(item.product_id)
                        ? "bg-amber-400"
                        : idProduct == item.product_id
                          ? "bg-green-600"
                          : "bg-gray-400"
                    }`}
                  >
                    {checkRefund(item.product_id) ? "Đang trả hàng" : "Đã giao"}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-500">
                    Số lượng: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <Box
          sx={{
            p: 3,
            border: "1px solid #e5e7eb",
            borderRadius: 3,
          }}
        >
          <Typography>
            Đơn hàng : {getOjectById(products, idProduct)?.name}
          </Typography>
          {/* Tabs */}
          <Box sx={{ mt: 2, display: "flex", gap: 2, mb: 3 }}>
            <Button
              fullWidth
              variant={tab === "review" ? "contained" : "outlined"}
              onClick={() => setTab("review")}
            >
              Đánh giá
            </Button>

            <Button
              fullWidth
              color="error"
              variant={tab === "cancel" ? "contained" : "outlined"}
              onClick={() => setTab("cancel")}
              disabled={check}
            >
              {check ? "Đang trả hàng" : "Trả hàng & hoàn tiền"}
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* REVIEW */}
          {tab === "review" && (
            <Box>
              <Typography fontWeight={500} mb={1}>
                Đánh giá sản phẩm
              </Typography>

              <Rating
                size="large"
                onChange={(e, newValue) =>
                  setSelectedItem({ ...selectedItem, rate: newValue })
                }
              />
              {/* Upload image */}
              <Box sx={{ mt: 2 }}>
                <label htmlFor="upload-image">
                  <Box
                    sx={{
                      p: 2,
                      border: "1px dashed #d1d5db",
                      borderRadius: 2,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <HiOutlinePhotograph size={28} />
                    <Typography fontSize={12} color="gray">
                      Thêm ảnh minh họa
                    </Typography>
                  </Box>
                </label>

                <input
                  id="upload-image"
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Box>
              {selectedItem.imgUrls.length > 0 && (
                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  {selectedItem.imgUrls.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      width={70}
                      height={70}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                  ))}
                </Box>
              )}
              <TextField
                multiline
                rows={4}
                fullWidth
                sx={{ mt: 2 }}
                value={selectedItem.description}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    description: e.target.value,
                  })
                }
                placeholder="Viết nhận xét của bạn về sản phẩm..."
              />

              <Button
                onClick={addReview}
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                Gửi đánh giá
              </Button>
            </Box>
          )}

          {/* CANCEL / REFUND */}
          {tab === "cancel" && (
            <Box>
              <Typography fontWeight={600} mb={1}>
                Yêu cầu trả hàng & hoàn tiền
              </Typography>

              <Typography mt={2} mb={1}>
                Lý do
              </Typography>

              <TextField
                multiline
                rows={4}
                fullWidth
                onChange={(e) =>
                  setRefund({
                    ...refund,
                    description: e.target.value,
                  })
                }
                placeholder="Ví dụ: Sản phẩm lỗi, giao sai, không đúng mô tả..."
              />
              <Box sx={{ mt: 2 }}>
                <label htmlFor="upload-image">
                  <Box
                    sx={{
                      p: 2,
                      border: "1px dashed #d1d5db",
                      borderRadius: 2,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <HiOutlinePhotograph size={28} />
                    <Typography fontSize={12} color="gray">
                      Thêm ảnh minh họa
                    </Typography>
                  </Box>
                </label>

                <input
                  id="upload-image"
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleRefund}
                />
              </Box>
              {refund.imgUrls.length > 0 && (
                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  {refund.imgUrls.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      width={70}
                      height={70}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                  ))}
                </Box>
              )}

              <Button
                onClick={addRefund}
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                Trả Hàng
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default OrderReview;
