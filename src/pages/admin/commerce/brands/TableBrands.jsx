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
import { BrandsContext } from "../../../../contexts/BrandsProvider";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableBrands({ handleClickOpen, search = "", brand, setBrand }) {
  const [openDeleted, setOpenDeleted] = useState(false);
  const brands = useContext(BrandsContext);
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
    setBrand(row);
  };

  const visibleRows = useMemo(() => {
    if (!brands) return [];
    const q = (search || "").toLowerCase().trim();
    return q
      ? brands
          .slice((page - 1) * rowsPerPage, page * rowsPerPage)
          .filter((e) => (e.name || "").toLowerCase().includes(q))
      : brands;
  }, [brands, search]);

  const handleDeleted = async () => {
    await deleteDocument("brands", brand);
    handleCloseDeleted();
  };
  const handleEdit = (row) => {
    handleClickOpen();
    setBrand(row);
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
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Logo</StyledTableCell>
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
                    <StyledTableCell align="left">
                      <div className="bg-white backdrop-blur-sm rounded-lg p-1 w-20 h-10 flex items-center justify-center">
                        <img
                          src={row.imgUrl}
                          alt={row.name}
                          className="max-w-full max-h-full object-contain brightness-125"
                        />
                      </div>
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

export default TableBrands;
