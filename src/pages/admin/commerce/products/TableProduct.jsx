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
import { ProductsContext } from "../../../../contexts/ProductProvider";
import { convertString, getOjectById } from "../../../../services/reponsive";
import { CategoryTypesContext } from "../../../../contexts/CategoryTypeProvider";
import { BrandsContext } from "../../../../contexts/BrandsProvider";

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

function TableProduct({ handleClickOpen, search = "", setProduct, product }) {
  const categoryTypes = useContext(CategoryTypesContext);
  const brands = useContext(BrandsContext);
  const [openDeleted, setOpenDeleted] = useState(false);
  const products = useContext(ProductsContext);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  console.log(products);
  
  const handleChange = (e, value) => setPage(value);
  const handleCloseDeleted = () => setOpenDeleted(false);

  const handleOpenDeleted = (row) => {
    setOpenDeleted(true);
    setProduct(row);
  };
  const visibleRows = useMemo(() => {
    if (!products) return [];
    const q = (search || "").toLowerCase().trim();
    const filtered = q
      ? products.filter((e) => (e.name || "").toLowerCase().includes(q))
      : products;
    return filtered;
  }, [products, search, page]);

  const handleDeleted = async () => {
    await deleteDocument("products", product);
    handleCloseDeleted();
  };

  const handleEdit = (row) => {
    handleClickOpen();
    setProduct(row);
  };
console.log(visibleRows);

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
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="left">Discount</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Brand</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={11} align="center">
                  Không có sản phẩm
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              visibleRows.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    {index + 1 + rowsPerPage * (page - 1)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <img src={row.imgUrls[0]} className="w-10 h-10" alt="" />
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>

                  <StyledTableCell align="left">{row.price}₫</StyledTableCell>
                  <StyledTableCell align="center">{row.stock}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.discount}%
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {" "}
                    {getOjectById(categoryTypes, row.id_cate_type)?.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {getOjectById(brands, row.id_brand)?.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.size?.join(", ")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex gap-2">
                      {row.color.map((e, index) => (
                        <div
                          style={{ background: e }}
                          className="w-8 h-8  rounded-full"
                          key={index}
                        ></div>
                      ))}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {convertString(row.description)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex gap-1 justify-center">
                      <Button
                        onClick={() => handleEdit(row)}
                        variant="contained"
                        className="!bg-blue-600 hover:!bg-blue-700"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => handleOpenDeleted(row)}
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
      <ModalDelete
        openDeleted={openDeleted}
        handleCloseDeleted={handleCloseDeleted}
        handleDeleted={handleDeleted}
      />
    </>
  );
}

export default TableProduct;
