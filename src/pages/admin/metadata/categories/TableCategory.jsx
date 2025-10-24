import React, { useContext, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from "@mui/material/Button";
import { CategoriesContext } from "../../../../contexts/CategoryProvider";
import ModalDelete from "../../../../components/admin/ModalDeleted";
import { deleteDocument } from "../../../../services/firebaseService";
import PaginationTable from "../../../../components/admin/PaginationTable";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // nền đầu bảng mờ nhẹ
    color: "#fff", // chữ trắng
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#fff", // chữ trắng cho body
    backgroundColor: "transparent", // nền trong suốt
    fontSize: 14,
    borderColor: "rgba(255,255,255,0.2)", // viền mờ trắng
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableCategory({
  handleClickOpen,
  search = "",
  category,
  setCategory,
}) {
  const [openDeleted, setOpenDeleted] = useState(false);
  const categories = useContext(CategoriesContext);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleCloseDeleted = () => {
    setOpenDeleted(false);
  };

  const handleOpenDeleted = (row) => {
    setOpenDeleted(true);
    setCategory(row);
  };

  const visibleRows = useMemo(() => {
    if (!categories) return [];
    const q = (search || "").toLowerCase().trim();
    return q
      ? categories
          .slice((page - 1) * rowsPerPage, page * rowsPerPage)
          .filter((e) => (e.name || "").toLowerCase().includes(q))
      : categories;
  }, [categories, search]);

  const handleDeleted = async () => {
    await deleteDocument("categories", category);
    handleCloseDeleted();
  };
  const handleEdit = (row) => {
    handleClickOpen();
    setCategory(row);
  };
  return (
    <>
      <TableContainer component={Paper}
      sx={{
          backgroundColor: "transparent", // trong suốt hoàn toàn
          boxShadow: "none", // bỏ bóng
          border: "1px solid rgba(255,255,255,0.2)", // viền trắng mờ nhẹ
          color: "white",
          mt: 5,
        }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  Không có danh mục
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              visibleRows
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1 + rowsPerPage * (page - 1)}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex gap-1 justify-center ">
                        <Button
                          onClick={() => handleEdit(row)}
                          variant="contained"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => handleOpenDeleted(row)}
                          variant="contained"
                          color="error"
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
      <ModalDelete
        openDeleted={openDeleted}
        handleCloseDeleted={handleCloseDeleted}
        handleDeleted={handleDeleted}
      />
    </>
  );
}

export default TableCategory;
