import React from "react";
import NavBarAdmin from "../../../components/admin/NavBarAdmin";
import HeaderAdmin from "../../../components/admin/HeaderAdmin";
import Background from "../../../components/admin/Background";
import AdminRouters from "../../../routers/AdminRouters";

function HomeAdmin() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="min-md:flex relative z-10">
        <NavBarAdmin />
        <div className="flex-1">
          <HeaderAdmin />
          <div className="text-white">
             <AdminRouters />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
