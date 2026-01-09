import React, { useContext, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { OrderContext } from "../../../../contexts/OrderProvider";
import PaginationTable from "../../../../components/admin/PaginationTable";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ORDER_STATUSES } from "../../../../untils/Contants";
import { getOjectById } from "../../../../services/reponsive";
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: 14,
    borderColor: "rgba(255,255,255,0.2)",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: "transparent",
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
}));

function TableOrder({ search = "" }) {
  const navigate = useNavigate();

const handleDetail = (row) => {
  navigate(`/admin/orders/${row.id}`, { state: row });
};
  const orders = useContext(OrderContext);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const handleChange = (e, value) => setPage(value);
  const visibleRows = useMemo(() => {
    if (!orders) return [];
    const q = (search || "").toLowerCase().trim();
    const filtered = q
      ? orders.filter((e) => (e.name || "").toLowerCase().includes(q))
      : orders;
    return filtered;
  }, [orders, search, page]);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
          mt: 5,
        }}
        className="text-white"
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Mã đơn</StyledTableCell>
              <StyledTableCell>Khách hàng</StyledTableCell>
              <StyledTableCell>Tổng tiền</StyledTableCell>
              <StyledTableCell>Địa chỉ</StyledTableCell>
              <StyledTableCell>Ghi chú</StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>

              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={11}>Không có dữ liệu</StyledTableCell>
              </StyledTableRow>
            ) : (
              visibleRows
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>
                      {index + 1 + rowsPerPage * (page - 1)}
                    </StyledTableCell>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.total_amount.toLocaleString()}₫</StyledTableCell>
                    <StyledTableCell>{row.address}</StyledTableCell>
                    <StyledTableCell>{row.note}</StyledTableCell>
                    <StyledTableCell >
                         <div style={{ color : getOjectById(ORDER_STATUSES,row.status)?.color}}>{row.status}</div>  
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Button
                        variant="outlined"
                        sx={{
                          fontSize: "12px",
                          borderColor: "rgba(255,255,255,0.4)",
                          backdropFilter: "blur(4px)",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.2)",
                            borderColor: "rgba(255,255,255,0.7)",
                          },
                          background:
                            "linear-gradient(to right, #A7CFDF 0%, #23538A 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleDetail(row)}
                      >
                        Xem chi tiết
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTable
        data={visibleRows}
        handleChange={handleChange}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
}

export default TableOrder;
