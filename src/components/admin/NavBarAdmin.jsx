import React, { useState } from "react";
import { GiMetalHand } from "react-icons/gi";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { LuCast } from "react-icons/lu";
import { MdContactless, MdDashboard, MdOutlinePermMedia } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { LISTMENU } from "../../untils/Contants";
import { Link } from "react-router-dom";
import { HiMiniUserGroup } from "react-icons/hi2";

function NavBarAdmin() {
  const [show, setShow] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const handleShow = (index) => {
    if (index == show) {
      setShow(null);
    } else {
      setShow(index);
    }
  };
  return (
    <div className="min-md:h-screen bg-transparent text-white p-2">
      <div className="flex gap-2 items-center justify-center cursor-pointer">
        <TfiMenuAlt onClick={() => setIsShow(!isShow)} />
        {isShow && (
          <h1 className="font-bold text-xl bg-gradient-to-r from-[#121FCF] to-[#CF1512] bg-clip-text text-transparent">
            TD SHOP{" "}
            <span className="bg-gradient-to-l from-[#00FF00] to-[#00FFFF] bg-clip-text text-transparent ">
              Admin
            </span>
          </h1>
        )}
      </div>
      <div className={isShow ? "" : "max-md:hidden"}>
        <div className="flex p-2 items-center gap-2 bg-gradient-to-l from-[#00FF00] to-[#00FFFF] bg-amber-50 rounded-xl text-black mt-3">
          <MdDashboard />
          {isShow && <h3>Dashboard</h3>}
        </div>
        {isShow && <h3 className="mt-2">Form and Data</h3>}
        {LISTMENU.map((e, index) => (
          <div
            className="mt-3 relative group cursor-pointer "
            onClick={() => handleShow(index)}
          >
            <div className="flex p-2 items-center gap-2 bg-gradient-to-l from-[#00FF00] to-[#00FFFF]  bg-amber-50 rounded-xl text-black">
              {e.icon}
              {isShow && <h3>{e.title}</h3>}
              {index == show ? (
                <IoMdArrowDropdown className="ml-auto" />
              ) : (
                <IoMdArrowDropright className="ml-auto" />
              )}
            </div>
            <div
              className={`mt-2 ${
                isShow
                  ? ""
                  : "absolute right-0 translate-x-full whitespace-nowrap top-0"
              }  ${index == show ? "" : "hidden"}`}
            >
              {e.items.map((a) => (
                <Link
                  to={a.path}
                  className="flex p-2 items-center bg-[linear-gradient(to_left,#FF0000_0%,#3911FF_50%,#FFD21F_100%)] hover:bg-amber-400 hover:text-white gap-2 mt-2 bg-amber-50 rounded-xl text-black ml-6"
                >
                  <h3>{a.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {isShow && <h3>Page</h3>}

        <Link
          to={"admin/accounts"}
          className="flex p-2 items-center gap-2 bg-gradient-to-l from-[#00FF00] to-[#00FFFF] bg-amber-50 rounded-xl text-black mt-2"
        >
          <HiMiniUserGroup />
          {isShow && <h3>Accounts</h3>}
        </Link>
      </div>
    </div>
  );
}

export default NavBarAdmin;
