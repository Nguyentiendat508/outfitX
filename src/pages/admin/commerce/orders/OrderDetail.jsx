import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { OrderContext } from "../../../../contexts/OrderProvider";
import { useLocation, useParams } from "react-router-dom";
import {
  filterById,
  formatTime,
  getOjectById,
} from "../../../../services/reponsive";
import { OrderDetailContext } from "../../../../contexts/OrderDetailProvider";
import { ProductsContext } from "../../../../contexts/ProductProvider";
import { ORDER_STATUSES } from "../../../../untils/Contants";

export default function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const orders = useContext(OrderContext);
  const orderDetail = useContext(OrderDetailContext);
  const products = useContext(ProductsContext);

  const [order, setOrder] = useState(location.state || null);
  useEffect(() => {
    const result = getOjectById(orders, id);
    setOrder(result);
  }, [orders, id]);

  // đổi trạng thái
  const handleChangeStatus = (e) => {
    setOrder({ ...order, status: e.target.value });
  };

  // Hàm lấy màu cho icon từ thuộc tính color trong constants
  const getIconColor = (colorString) => {
    // Nếu là "red" đơn giản
    if (colorString === "red") return "#ef4444";

    // Parse từ class Tailwind như "bg-blue-100 text-blue-800"
    if (colorString.includes("blue")) return "#3b82f6";
    if (colorString.includes("indigo")) return "#6366f1";
    if (colorString.includes("green")) return "#10b981";
    if (colorString.includes("red")) return "#ef4444";
    if (colorString.includes("pink")) return "#ec4899";
    if (colorString.includes("amber")) return "#f59e0b";

    return "#ffffff"; // mặc định màu trắng
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold ">📦 Chi tiết Đơn hàng</h1>

      <div class="grid grid-cols-[3fr_1fr] gap-4">
        <div>
          <h3>Danh sách sản phẩm</h3>
          <Card
            style={{
              marginTop: "10px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <CardContent>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      color: "white",
                      textAlign: "left",
                    }}
                  >
                    <th style={{ padding: "12px" }}>Hình ảnh</th>

                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Discount</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>

                <tbody className="text-white">
                  {filterById(orderDetail, "orderId", id).map((item) => {
                    const product = getOjectById(products, item.product_id);
                    const total =
                      product.price * item.quantity -
                      (product.price * item.quantity * product.discount) / 100;
                    return (
                      <tr style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "10px" }}>
                          <img
                            src={product?.imgUrls[0]}
                            alt=""
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "10px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td className="w-[250px]">
                          <b>{product?.name}</b>
                        </td>
                        <td>
                          {" "}
                          <b>
                            {" "}
                            {parseInt(product?.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </b>
                        </td>
                        <td className="">{item.quantity}</td>
                        <td>{product?.discount || 0} %</td>
                        <td>
                          <b>
                            {" "}
                            {parseInt(total).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </b>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div>
          <h1>Thông tin khách hàng</h1>
          <Card
            style={{
              color: "white",
              marginTop: "10px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <CardContent style={{ fontSize: "15px", lineHeight: "32px" }}>
              <p>
                <b>Mã đơn hàng:</b> {order?.id}
              </p>
              <p>
                <b>Ngày mua: {formatTime(order?.createAt)}</b>
                {}
              </p>
              <p>
                <b>Tên khách hàng: </b> {order?.name}
              </p>
              <p>
                <b>Địa chỉ: </b> {order?.address}
              </p>
              <p>
                <b>Tổng tiền:</b>{" "}
                <span style={{ color: "#2563eb", fontWeight: "700" }}>
                  {order?.total_amount.toLocaleString()} đ
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
        <div class="col-start-2">
          {/* Cập nhật trạng thái */}
          <h3
            style={{ marginTop: "30px", fontSize: "20px", fontWeight: "600" }}
          >
            Chuyển trạng thái đơn hàng
          </h3>

          <Card
            style={{
              marginTop: "10px",
              paddingBottom: "20px",
              borderRadius: "18px",
              color: "white",
              background: "rgba(255,255,255,00)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <CardContent>
              <FormControl fullWidth>
                <InputLabel
                  shrink
                  sx={{
                    color: "blue",
                    transform: "translateY(-20px)", // ⭐ đẩy label lên cao
                   
                  }}
                >
                  Trạng thái mới
                </InputLabel>

                <Select
                  value={order?.status || ""}
                  label="Trạng thái mới"
                  onChange={handleChangeStatus}
                  sx={{
                    borderRadius: 3,
                    color: "white",
                    border: "1px solid white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.4)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.6)",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "rgba(0, 0, 0, 0.9)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        "& .MuiMenuItem-root": {
                          color: "white",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                          },
                        },
                      },
                    },
                  }}
                >
                  {ORDER_STATUSES.map((e) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>
                        <ListItemIcon
                          sx={{
                            color: getIconColor(e.color),
                            minWidth: "40px",
                          }}
                        >
                          {e.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={e.title}
                          sx={{ color: "white" }}
                        />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <button className="w-full p-3 rounded-2xl mt-2 bg-blue-600">
                Cập nhật trạng thái
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
