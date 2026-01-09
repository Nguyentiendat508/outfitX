import React from "react";
import TableOrder from "./TableOrder";
import Search from "../../../../components/admin/Search";

function Orders() {
  return (
    <div className="p-6 min-h-screen">
      <Search title={"List Order"} />
      <div className=" p-6 rounded-lg shadow-lg">
        <TableOrder />
      </div>
    </div>
  );
}

export default Orders;
