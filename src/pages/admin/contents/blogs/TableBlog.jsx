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
import ModalDelete from "../../../../components/admin/ModalDeleted";
import { deleteDocument } from "../../../../services/firebaseService";
import PaginationTable from "../../../../components/admin/PaginationTable";
import { BrandsContext } from "../../../../contexts/BrandsProvider";
import { BlogContext } from "../../../../contexts/BlogProvider";
import { convertString } from "../../../../services/reponsive";

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

function TableBLog({handleClickOpen, search="", blogs, setBlog}) {
  const [openDeleted, setOpenDeleted] = useState(false);
  const blog = useContext(BlogContext);
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
    setBlog(row);
  };

  const visibleRows = useMemo(() => {
    if (!blog) return [];
    const q = (search || "").toLowerCase().trim();
    return q
      ? blog
          .slice((page - 1) * rowsPerPage, page * rowsPerPage)
          .filter((e) => (e.name || "").toLowerCase().includes(q))
      : blog;
  }, [blog, search]);

  const handleDeleted = async () => {
    await deleteDocument("blogs", blogs);
    handleCloseDeleted();
  };
  const handleEdit = (row) => {
    handleClickOpen();
    setBlog(row);
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
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="center">Content</StyledTableCell>
              <StyledTableCell align="center">Created_at</StyledTableCell>
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
                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="bg-white backdrop-blur-sm rounded-lg p-1 w-20 h-10 flex items-center justify-center">
                        <img
                          src={row.imgUrl}
                          alt={row.name}
                          className="max-w-full max-h-full object-contain brightness-125"
                        />
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {convertString(row.content)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.creatAt.toDate().toLocaleString()}
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

export default TableBLog;
