import { GiMetalHand } from "react-icons/gi";
import { MdContactless, MdOutlineBrandingWatermark } from "react-icons/md";

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
            }
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
                path : "/orders",
                name : "Orders"
            }
        ]
     },
     {
      title : "Contents",
      icon :<MdContactless />,
      items : [
        {
            path: "/rate",
            name: "Rate"
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
     }
]