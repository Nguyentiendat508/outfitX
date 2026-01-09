import React, { useContext, useEffect, useMemo, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaMapLocationDot, FaRegUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaBars, FaPlus } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { Link } from "react-router-dom";
import Login from "../../pages/client/auth/Login";
import Register from "../../pages/client/auth/Register";
import { AuthContext } from "../../contexts/AuthProvider";
import { CategoriesContext } from "../../contexts/CategoryProvider";
import { CategoryTypesContext } from "../../contexts/CategoryTypeProvider";
import Cart from "../../pages/client/cart/Cart";
import SearchPage from "../../pages/client/search/SearchPage";
import { OrderDetailContext } from "../../contexts/OrderDetailProvider";
import { CartItemContext } from "../../contexts/CartItemProvider";
import { filterById } from "../../services/reponsive";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Header({ openCart, setOpenCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { accountLogin, handleLogout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = useContext(CategoriesContext);
  const categoryTypes = useContext(CategoryTypesContext);
  const [listCart, setListCart] = useState([]);
  const cartItems = useContext(CartItemContext);
  const totalQuantity = useMemo(() => {
    if (!listCart) return 0;
    return listCart.reduce((sum, item) => sum + item.quantity, 0);
  }, [listCart]);
  const [query, setQuery] = useState("");
  const handleOpenRegister = () => {
    setOpenRegister(true);
    setOpen(false);
  };

  useEffect(() => {
    const list = filterById(cartItems, "user_id", accountLogin?.id);
    setListCart(list);
  }, [cartItems, accountLogin]);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleClickOpen = () => {
    setOpen(true);
    setOpenRegister(false);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
      if (!e.target.closest(".category-item")) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="bg-gradient-to-r from-[#7D150F] via-[#3D0504] to-[#9F0E0B] ">
        <marquee
          className="text-white  font-medium"
          behavior="scroll"
          direction="left"
          scrollamount="10"
        >
          <span className="mx-24 text-[10px]">
            ⚡️Đồng giá lớn nhất năm 99K, 149K, 199K
          </span>
          <span className="relative text-[12px] mx-24 ">
            🔥Ưu đãi 10% toàn bộ hàng mới
          </span>
          <span className="relative text-[12px] mx-24 ">
            🔥Voucher 50K (đơn từ 599K)
          </span>
          <span className="relative text-[12px] mx-24 ">
            🔥Cộng dồn membership đến 15%
          </span>
          <span className="relative text-[12px] mx-24 ">
            🚚 Freeship đơn hàng từ 99k
          </span>
          <span className="relative text-[12px] mx-24 ">
            🔥 Xé Redtag Trúng Xe Vinfast
          </span>
        </marquee>
      </div>

      {/* TOP HEADER */}
      <div className="flex items-center h-16  bg-black text-white justify-between px-[10%]">
        <div
          onClick={() => setIsOpen(true)}
          className="text-2xl md:hidden cursor-pointer"
        >
          <FaBars />
        </div>

        <Link to="/" className="cursor-pointer flex items-center">
          <img
            src="/src/assets/logo3.png"
            alt="OutfitX Logo"
            className="h-20 object-contain"
          />
        </Link>

        {/* SEARCH */}
        <div className="relative hidden md:block w-1/3">
          <input
            className="w-full p-2 rounded-md bg-white text-black"
            type="text"
            placeholder="Tìm kiếm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="py-2 px-4 rounded-md cursor-pointer absolute bg-black top-1/2 right-1 -translate-y-1/2">
            <IoSearch />
          </button>
          <SearchPage query={query} setQuery={setQuery} />
        </div>

        {/* ACTION ICONS */}
        <div className="flex gap-4 items-center">
          <div>
            <FaMapLocationDot className="text-xl m-auto cursor-pointer" />
            <p>Cửa Hàng</p>
          </div>

          {/* USER */}
          {accountLogin ? (
            <div className="relative dropdown">
              <img
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-5 m-auto h-5 rounded-full cursor-pointer"
                src={
                  accountLogin.imgUrl
                    ? accountLogin.imgUrl
                    : "https://img7.thuthuatphanmem.vn/uploads/2023/10/15/anh-avatar-khong-hinh-dep_094008525.jpg"
                }
                alt="avatar"
              />
              <p>{accountLogin.name}</p>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Tài khoản
                  </Link>
                  <Link
                    to="orderpage"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đơn hàng
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <FaRegUser
                className="text-xl m-auto cursor-pointer"
                onClick={handleClickOpen}
              />
              <p>Đăng Nhập</p>
            </div>
          )}

          {/* CART */}
          <div className="relative" onClick={() => setOpenCart(!openCart)}>
            <FiShoppingCart
              className={`text-xl m-auto cursor-pointer ${
                openCart ? "text-amber-400" : ""
              }`}
            />
            <Cart openCart={openCart} listCart={listCart} />
            <p className={openCart ? "text-amber-300" : ""}>Giỏ Hàng</p>
            <p className="absolute flex justify-center text-[10px] right-1/2 translate-x-3.5 items-center w-4 h-4 rounded-full bg-white text-black top-0 -translate-y-2">
              {totalQuantity}
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div
        className={`bg-black shadow-sm font-bold md:justify-center md:flex gap-6 p-1 
        md:static md:h-auto md:flex-row md:bg-white md:text-black
        absolute md:relative top-0 left-0 w-full h-screen flex flex-col bg-black/80 text-white transition-all
        ${isOpen ? "" : "hidden md:flex"}`}
      >
        <div className="md:hidden flex items-center justify-between mb-4">
          <div></div>
          <h1 className="text-lg font-semibold">Menu</h1>
          <HiXMark
            onClick={() => setIsOpen(false)}
            className="text-2xl cursor-pointer"
          />
        </div>

        <Link
          to={"/product"}
          className="flex cursor-pointer justify-between items-center gap-2"
        >
          <p>Tất cả sản phẩm</p> <FaPlus className="md:hidden" />
        </Link>

        {/* CATEGORY + DROPDOWN */}
        {categories.length > 0 &&
          categories.map((category) => (
            <li
              key={category.id}
              className="category-item relative group"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="flex items-center gap-1 px-3 py-2 cursor-pointer hover:text-amber-600">
                <p>{category.name}</p>
                <FaPlus className="md:hidden" />
                <MdOutlineKeyboardArrowDown className="font-bold hidden md:block" />
              </div>

              {/* Dropdown Menu */}
              <div
                className={`
                  absolute left-0 bottom-0 translate-y-full hidden md:block
                  bg-white shadow-xl rounded-md p-2 w-45
                  ${activeCategory === category.id ? "md:block" : "md:hidden"}
                `}
              >
                <div className="flex flex-col gap-1">
                  {categoryTypes
                    .filter((type) => type.cateId === category.id)
                    .map((type) => (
                      <div key={type.id} className="list-none">
                        <Link
                          to={`/searchconllection/${type.id}`}
                          className="
                            block text-sm font-medium text-gray-700 py-2 px-3 rounded-md
                            hover:bg-gray-100 hover:text-red-600 transition-colors
                          "
                          onClick={() => setIsOpen(false)}
                        >
                          {type.name}
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </li>
          ))}
      </div>

      <Login
        open={open}
        handleClose={handleClose}
        handleOpenRegister={handleOpenRegister}
      />
      <Register
        openRegister={openRegister}
        handleClickOpen={handleClickOpen}
        handleCloseRegister={handleCloseRegister}
      />
    </header>
  );
}

export default Header;
