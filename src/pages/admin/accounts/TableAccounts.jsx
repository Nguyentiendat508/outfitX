import React, { useMemo, useState } from "react";
import { AccountContext } from "../../../contexts/AccountProvider";
import {
  Button,
  Pagination,
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
import PaginationTable from "../../../components/admin/PaginationTable";
import { FiEdit, FiEyeOff } from "react-icons/fi";
import ModalAccounts from "./ModalAccounts";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function TableAccounts({ search = "" }) {
  const accounts = React.useContext(AccountContext);
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [status, setStatus] = useState(null)
  const handleChange = (e, value) => {
    setPage(value);
  };
  const visibleRows = useMemo(() => {
    if (!accounts) return [];
    const q = (search || "").toLowerCase().trim();
    return q
      ? accounts
          .slice((page - 1) * rowsPerPage, page * rowsPerPage)
          .filter((e) => (e.name || "").toLowerCase().includes(q))
      : accounts;
  }, [accounts, search]);
  const handleEdit = (row) => {
    setOpen(true);
    setAccount(row);
    setStatus(row.role)
  }
  const handleClose = () => {
    setOpen(false);
    setAccount(null);
  }
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
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Password</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Accsion</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  Không có tài khoản
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              visibleRows
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={row.id || index}>
                    <StyledTableCell>
                      {index + 1 + rowsPerPage * (page - 1)}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.password ? <div className="flex gap-2"><FiEyeOff /> <FiEyeOff /> <FiEyeOff /></div>  : <div className="google">  Login với Google</div> }</StyledTableCell>
                    <StyledTableCell align="center">{row.role}</StyledTableCell>
                    <StyledTableCell>
                      <div className="flex gap-1 justify-center">
                        <Button
                         onClick={() => handleEdit(row)}
                          variant="contained"
                          className="!bg-blue-600 hover:!bg-blue-700"
                        >
                          <FiEdit />
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
      <ModalAccounts open={open} account={account} setAccount={setAccount} handleClose={handleClose} status={status} setStatus={setStatus} />
    </>
  );
}

export default TableAccounts;
