import React, { useContext, useMemo, useState } from "react";
import {
  Button,
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
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import ModalRefund from "./ModalRefund";
import { getOjectById } from "../../../../services/reponsive";
import { OrderContext } from "../../../../contexts/OrderProvider";
import { deleteDocument } from "../../../../services/firebaseService";
import ModalDelete from "../../../../components/admin/ModalDeleted";

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
  const orders = useContext(OrderContext);
  const [openDeleted, setOpenDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [refund, setRefund] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(null);
  const rowsPerPage = 5;
  const handleChange = (e, value) => {
    setPage(value);
  };
  const OpenDelete = (row) => {
    setRefund(row);
    setOpenDeleted(true);
  };
  const handleSubmitDeleted = async () => {
    await deleteDocument("refund", refund);
    setOpenDeleted(false);
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
  
  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
    setStatus(row.status);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
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
              <StyledTableCell>Tên Khách Hàng</StyledTableCell>
              <StyledTableCell align="right">Số tiền</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell>Ngày yêu cầu</StyledTableCell>
              <StyledTableCell>Accsion</StyledTableCell>
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
              visibleRows
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>
                      {index + 1 + rowsPerPage * (page - 1)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {getOjectById(orders, row.order_id)?.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Number(row.price).toLocaleString("vi-VN")}₫
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.status}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.newDate.toDate().toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex gap-1 justify-center">
                        <Button
                          onClick={() => handleOpen(row)}
                          variant="contained"
                          className="!bg-blue-600 hover:!bg-blue-700"
                        >
                          <GrView />
                        </Button>
                        <Button
                          onClick={() => OpenDelete(row)}
                          variant="contained"
                          color="error"
                          className="!bg-red-600 hover:!bg-red-700"
                        >
                          <MdDelete />
                        </Button>
                      </div>
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
      <ModalRefund
        open={open}
        data={selectedRow}
        onClose={handleClose}
        status={status}
        setStatus={setStatus}
      />
      <ModalDelete
        openDeleted={openDeleted}
        handleCloseDeleted={() => setOpenDeleted(false)}
        handleDeleted={handleSubmitDeleted}
        
      />
    </>
  );
}

export default TableRefund;
