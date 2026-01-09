import { GiMetalHand } from "react-icons/gi";
import { MdContactless, MdOutlineBrandingWatermark } from "react-icons/md";
import {
  HiOutlineClock,
  HiOutlineCog,
  HiOutlineTruck,
  HiCheckCircle,
  HiOutlineXCircle,
  HiArrowCircleLeft,
  HiOutlineRefresh,
} from "react-icons/hi";

export const LISTMENU = [
     {
        title : "Meta Data",
        icon :  <GiMetalHand />,
        items : [
            {
                path : "/admin/categories",
                name : "Categories"
            },
            {
                path : "/admin/category_type",
                name : "Category Type"
            },
        ]
     },
     {
        title : "Commerce",
        icon : <MdOutlineBrandingWatermark />,
        items : [
            {
                path: "/admin/brands",
                name : "Brands"
            },
            {
                path : "/admin/products",
                name : "Products"
            },
            {
                path : "/admin/orders",
                name : "Orders"
            }
        ]
     },
     {
      title : "Contents",
      icon :<MdContactless />,
      items : [
        {
            path: "admin/refund",
            name: "Refund"
        },
        {
            path: "/blogs",
            name: "Blogs"
        },
        {
            path: "/contacts",
            name: "Contacts"
        }
      ]
     },
]
export const ROLES = {
  ADMIN: 'admin',        // Quản trị viên 
  USER: 'user',          // Người dùng 
};

export const initialOptions = {
  "client-id": "AaBT7rjezkngPk0A4wBqWzzOBjSt9Kj9-b0ZvGtm4Egnuf9AIG_G6Y4ML0t83K3x22FB-M3vB01nzXQW",
  currency: "USD",
  intent: "capture"
};

export const ORDER_STATUSES = [
  {
    id: "Pending",
    title: "Chờ xử lý",
    icon: <HiOutlineClock />,                // lưu component (thực thi: <HiOutlineClock />)
    color: "#ef4444", // các lớp Tailwind để áp cho badge
    level : 1,
  },
  {
    id: "Processing",
    title: "Đang xử lý",
    icon: <HiOutlineCog />,
    color: "#3b82f6",
    level : 2,
  },
  {
    id: "Shipped",
    title: "Đã giao cho đơn vị vận chuyển",
    icon: <HiOutlineTruck />,
    color: "#6366f1",
    level : 3,
  },
  {
    id: "Delivered",
    title: "Đã giao",
    icon: <HiCheckCircle />,
    color: "#10b981",
    level : 4,
  },
  {
    id: "Cancelled",
    title: "Đã hủy",
    icon: <HiOutlineXCircle />,
    color: "gray",
    level : 5,
  },
  {
    id: "Returned",
    title: "Trả hàng",
    icon: <HiArrowCircleLeft />,
    color: "#ec4899",
    level : 6,
  },
  {
    id: "Refunded",
    title: "Hoàn tiền",
    icon: < HiOutlineRefresh />,
    color: "#f59e0b",
    level : 7,
  },
];