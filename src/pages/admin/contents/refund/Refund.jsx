import React, { useState } from 'react';
import Search from '../../../../components/admin/Search';
import TableRefund from './TableRefund';

function Refund(props) {
   const [search, setSearch] = useState("");
  return (
    <div className="m-8">
      <Search
        title="List Refund"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableRefund search={search} />
    </div>
  );
}

export default Refund;