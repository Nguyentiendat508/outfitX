import React, { useContext, useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CategoryTypesContext } from "../../../../contexts/CategoryTypeProvider";
import ModalDelete from "../../../../components/admin/ModalDeleted";
import { deleteDocument } from "../../../../services/firebaseService";
import { getOjectById } from "../../../../services/reponsive";
import { CategoriesContext } from "../../../../contexts/CategoryProvider";
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

function TableCategory({ handleClickOpen, categoryType, setCategoryType, search = "" }) {
  const [openDeleted, setOpenDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const categoryTypes = useContext(CategoryTypesContext);
  const categories = useContext(CategoriesContext);

  const handleChange = (e, value) => setPage(value);
  const handleCloseDeleted = () => setOpenDeleted(false);

  const handleOpenDeleted = (row) => {
    setOpenDeleted(true);
    setCategoryType(row);
  };

  const handleDeleted = async () => {
    await deleteDocument("category_Types", categoryType);
    handleCloseDeleted();
  };

  const handleEdit = (row) => {
    handleClickOpen();
    setCategoryType(row);
  };

  // Lọc và phân trang
  const visibleRows = useMemo(() => {
    if (!categoryTypes) return [];
    const q = (search || "").toLowerCase().trim();
    return q
    ? categoryTypes
      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
          .filter((e) => (e.name || "").toLowerCase().includes(q))
    : categoryTypes
  }, [categoryTypes, search]);
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
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.length > 0 ? (
                visibleRows
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) =>  (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    {(page - 1) * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>
                    {getOjectById(categories, row.cateId)?.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex gap-1 justify-center">
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
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  Không có dữ liệu
                </StyledTableCell>
              </StyledTableRow>
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
