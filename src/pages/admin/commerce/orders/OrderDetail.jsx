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
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  filterById,
  formatTime,
  getOjectById,
} from "../../../../services/reponsive";
import { OrderDetailContext } from "../../../../contexts/OrderDetailProvider";
import { ProductsContext } from "../../../../contexts/ProductProvider";
import { ORDER_STATUSES } from "../../../../untils/Contants";
import { updateDocument } from "../../../../services/firebaseService";
import { useNotification } from "../../../../contexts/NotificationProvider";

export default function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orders = useContext(OrderContext);
  const orderDetail = useContext(OrderDetailContext);
  const products = useContext(ProductsContext);
  const showNotification = useNotification();
  const [orderStatus, setOrderStatus] = useState(ORDER_STATUSES[0]);
  const [order, setOrder] = useState(location.state || null);
  useEffect(() => {
    const result = getOjectById(orders, id);
    const a = getOjectById(ORDER_STATUSES, result?.status);
    setOrderStatus(a);
    setOrder(result);
  }, [orders, id]);

  // đổi trạng thái
  const handleChangeStatus = async (e) => {
    const nextStatus = e.target.value;
    const byStatus = getOjectById(ORDER_STATUSES, nextStatus);
    console.log(byStatus);

    switch (nextStatus) {
      case "Pending":
        if (byStatus.level < orderStatus.level) {
        
          showNotification("không trở về bước trước", "error");
        }
        break;
      case "Processing":
        if (byStatus.level < orderStatus.level) {
         
          showNotification("không trở về bước trước", "error");
        }else {
           setOrder({ ...order, status: nextStatus });
        }
        break;
      case "Shipped":
        if (byStatus.level < orderStatus.level) {
         
          showNotification("không trở về bước trước", "error");
        }else {
           setOrder({ ...order, status: nextStatus });
        }
        break;
      case "Delivered":
        if (byStatus.level < orderStatus.level) {
         
          showNotification("không trở về bước trước", "error");
        }else {
           setOrder({ ...order, status: nextStatus });
        }
        break;
      case "Cancelled":
        if (orderStatus.id == "Pending" || orderStatus.id == "Processing") {
          setOrder({ ...order, status: nextStatus });
          return;
        } else {
          showNotification("không thể hủy", "error");
        }
        break;
      case "Returned":
        if (orderStatus.id == "Delivered") {
          setOrder({ ...order, status: nextStatus });
          return;
        } else {
         
          showNotification("Đã giao mới được trả hàng", "error");
        }
        break;
      case "Refunded":
         if (orderStatus.id == "Returned") {
          setOrder({ ...order, status: nextStatus });
          return;
        } else {
          showNotification("Trả hàng mới được hoàn tiền", "error");
        }
        break;
    }
  };

  // Cập nhật trạng thái và chuyển về trang danh sách
  const updateStatus = async () => {
    if (!order?.id) return;
    try {
      await updateDocument("orders", { ...order, status: order.status });
      navigate("/admin/orders");
      showNotification("Đã cập nhật đơn hàng thành công", "info");
    } catch (err) {
      console.error("Cập nhật trạng thái đơn hàng thất bại:", err);
    }
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
           <div >
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
                        <div className="flex items-center">
                          <ListItemIcon
                            sx={{
                              color: e.color,
                              minWidth: "40px",
                            }}
                          >
                            {e.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={e.title}
                            sx={{ color: "white" }}
                          />
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <button
                onClick={updateStatus}
                className="w-full p-3 rounded-2xl mt-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
              >
                Cập nhật trạng thái
              </button>
            </CardContent>
          </Card>
        </div>
        </div>
       
      </div>
    </div>
  );
}
