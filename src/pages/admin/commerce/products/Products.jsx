import React, { useState } from "react";
import Search from "../../../../components/admin/Search";
import ModalProduct from "./ModalProduct";
import {
  addDocument,
  updateDocument,
} from "../../../../services/firebaseService";
import TableProduct from "./TableProduct";

const inner = {
  name: "",
  description: "",
  price: "",
  stock: '',
  discount: "",
  id_cate_type: "",
  id_brand: "",
  imgUrls: [], 
  size: [],
  color: [],
};
function Products() {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState(inner);
  const [error, setError] = useState(inner);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [upload, setUpload] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setProduct(inner);
    setError(inner);
  };
  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const validation = () => {
    const newError = {};
    newError.name = product.name ? "" : "Vui long nhap name";
    newError.description = product.description
      ? ""
      : "vui long nhap description";
    newError.price = product.price
      ? ""
      : "vui long nhap gia";
      newError.stock = product.stock ? "" : "Vui long nhap stock";
      newError.cateType = product.id_cate_type ?"" : "Vui long chon danh muc";
      newError.brand = product.id_brand ? "" : "Vui long chon the loai";
      newError.size = product.size ? "" : "Vui long nhap size";
      newError.color = product.color ? "" : "Vui long nhap mau";
    setError(newError);
    return Object.values(newError).some((e) => e !== "");
  };
  const addProduct = async () => {
    if (validation()) {
      console.log(error);     
      return;
    }
    setUpload(true);
    if (product.id) {
      await updateDocument("products", product);
    } else {
      await addDocument("products", product);
    }
    setUpload(false);
    setProduct(inner);
    handleClose();
  };

  return (
    <div className="m-5">
      <Search handleClickOpen={handleClickOpen} title={"List Product"} />
      <ModalProduct
        setProduct={setProduct}
        addProduct={addProduct}
        upload={upload}
        handleOpen={handleOpen}
        handleClose={handleClose}
        product={product}
        error={error}
        open={open}
        handleChangeInput={handleChangeInput}
      />
      <TableProduct handleClickOpen={handleClickOpen} product={product} setProduct={setProduct} />
    </div>
  );
}

export default Products;
