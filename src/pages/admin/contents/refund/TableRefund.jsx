import React, { useContext, useMemo, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";
import { RefundContext } from "../../../../contexts/RefundProvider";
import PaginationTable from "../../../../components/admin/PaginationTable";
import { getOjectById } from "../../../../services/reponsive";
import { ProductsContext } from "../../../../contexts/ProductProvider";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableRefund({ search = "" }) {
  const refunds = useContext(RefundContext);
  const products = useContext(ProductsContext);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const handleChange = (e, value) => {
    setPage(value);
  };
  const visibleRows = useMemo(() => {
    if (!refunds) return [];
    const q = (search || "").toLowerCase().trim();
    return q
      ? refunds
          .slice((page - 1) * rowsPerPage, page * rowsPerPage)
          .filter((e) => (e.name || "").toLowerCase().includes(q))
      : refunds;
  }, [refunds, search]);

  const STATUS_COLOR = {
  Pending: "#f59e0b",   // vàng
  Approved: "#22c55e",  // xanh
  Rejected: "#ef4444",  // đỏ
};


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
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Mã đơn</StyledTableCell>
              <StyledTableCell>Sản phẩm</StyledTableCell>
              <StyledTableCell>Lý do</StyledTableCell>
              <StyledTableCell align="right">Số tiền</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell>Ngày yêu cầu</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  Không có yêu cầu trả hàng
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              visibleRows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    {index + 1 + rowsPerPage * (page - 1)}
                  </StyledTableCell>
                  <StyledTableCell>{row.order_id}</StyledTableCell>
                  <StyledTableCell>{getOjectById(products, row.product_id)?.name}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell align="right">
                    {Number(row.amount).toLocaleString("vi-VN")}₫
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell>{row.newDate.toDate().toLocaleString()}</StyledTableCell>
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

export default TableRefund;
