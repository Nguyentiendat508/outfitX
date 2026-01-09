import React, { useState } from "react";
import TableAccounts from "./TableAccounts";
import Search from "../../../components/admin/Search";

function Accounts(props) {
  const [search, setSearch] = useState("");
  return (
    <div className="m-5">
      <Search
        title="List Accounts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableAccounts search={search} />
    </div>
  );
}

export default Accounts;
