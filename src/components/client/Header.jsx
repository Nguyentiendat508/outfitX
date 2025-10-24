import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import {
  FaBars,
  FaPlus,
  FaRegUserCircle,
  FaEnvelope,
  FaGoogle,
  FaLock,
} from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Link } from "react-router-dom";
import Login from "../../pages/client/auth/Login";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false); 

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <marquee> Free Ship</marquee>
      <div className="flex items-center bg-black text-white justify-between p-6 px-12">
        <div onClick={setIsOpen} className="text-2xl min-md:hidden">
          <FaBars />
        </div>
        <h1 className="cursor-pointer text-xl">outFitX</h1>

        <div className="relative max-md:hidden">
          <input
            className="w-100 p-2 rounded-xl bg-white text-black"
            type="text"
            placeholder="tìm kiếm"
          />
          <button className="p-2 rounded-xl cursor-pointer absolute bg-black top-1/2 right-1 -translate-y-1/2">
            <IoSearch />
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <FaMapLocationDot className="text-2xl cursor-pointer" />
          <FaRegUserCircle
            className="text-2xl cursor-pointer"
            onClick={handleClickOpen}
          />
          <FiShoppingCart className="text-2xl cursor-pointer" />
        </div>
      </div>
      <div
        className={` bg-white shadow-sm font-bold max-md:absolute max-md:font-bold max-md:h-screen flex gap-8 p-3 min-md:justify-center  max-md:flex-col max-md:w-full max-md:bg-black/80 max-md:text-white top-0 ${
          isOpen ? "" : "max-md:hidden"
        }`}
      >
        <div className="min-md:hidden flex items-center justify-between">
          <div></div>
          <h1>Logo</h1>
          <HiXMark onClick={() => setIsOpen(false)} className="font-bold" />
        </div>
        <li className="flex justify-between items-center gap-2">
          <p>Hàng mới</p> <FaPlus className="min-md:hidden" />
        </li>
        <li className="flex justify-between items-center gap-2">
          <p>Sản Phẩm</p> <FaPlus className="min-md:hidden" />
        </li>
        <li className="flex justify-between items-center gap-2">
          <p>Đồ Nam</p> <FaPlus className="min-md:hidden" />
        </li>
        <li className="flex justify-between items-center gap-2">
          <p>Đồ Nữ</p> <FaPlus className="min-md:hidden" />
        </li>
        <li className="flex justify-between items-center gap-2">
          <p>Set</p> <FaPlus className="min-md:hidden" />
        </li>
        <li className="flex justify-between items-center gap-2">
          <p>Phụ Kiện</p> <FaPlus className="min-md:hidden" />
        </li>
        <li className="flex justify-between items-center gap-2 text-red-500 max-md:bg-red-700 max-md:p-2 max-md:text-white">
          <p>Outlet</p>
        </li>
        <li className="flex justify-between items-center gap-2 ">
          <p>Tin Thời Trang</p> <FaPlus className="min-md:hidden" />
        </li>
        <li className="flex justify-between items-center gap-2">
          <p>Jean</p> <FaPlus className="min-md:hidden" />
        </li>
      </div>

    
        <Login open={open} handleClose={handleClose} />
    </header>
  );
}

export default Header;
