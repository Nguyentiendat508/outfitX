import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import Autocomplete from "@mui/material/Autocomplete";
import { CategoryTypesContext } from "../../../../contexts/CategoryTypeProvider";
import Popper from "@mui/material/Popper";
import { BrandsContext } from "../../../../contexts/BrandsProvider";
import { MdDelete } from "react-icons/md";
import { FaAngleDoubleUp, FaImage } from "react-icons/fa";
import logo2 from "../../../../assets/logo2.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function CustomPopper(props) {
  return <Popper {...props} placement="top-start" />;
}
export default function ModalProduct({
  handleClose,
  open,
  handleChangeInput,
  product,
  addProduct,
  upload,
  error,
  setProduct,
}) {
  const categoryType = React.useContext(CategoryTypesContext);
  const brands = React.useContext(BrandsContext);
  const [size, setSize] = React.useState(0);
  const [color, setColor] = React.useState({ color: "" });

  const addSize = () => {
    setProduct((pre) => ({ ...product, size: [...pre.size, size] }));
    setSize(0);
  };
  const deleteSize = (size) => {
    setProduct((pre) => ({
      ...product,
      size: pre.size.filter((e) => e !== size),
    }));
  };

  const addColor = () => {
    if (!color) {
      return;
    }
    setProduct((pre) => ({
      ...product,
      color: [...pre.color, color],
    }));
    setColor("");
  };

  const deleteColor = (color) => {
    setProduct((pre) => ({
      ...product,
      color: pre.color.filter((e) => e !== color),
    }));
  };
  const deleteImgUrl = (img) => {
    setProduct((pre) => ({
      ...product,
      imgUrls: pre.imgUrls.filter((e) => e !== img),
    }));
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImageUrls = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageUrls.push(e.target.result);
        if (newImageUrls.length === files.length) {
          setProduct((prev) => ({
            ...prev,
            imgUrls: [...(prev.imgUrls || []), ...newImageUrls],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div>
      <Dialog
  open={open}
  onClose={handleClose}
  keepMounted
  slots={{ transition: Transition }}
  aria-describedby="alert-dialog-slide-description"
  sx={{
    "& .MuiDialog-container": {
       backdropFilter: "blur(6px)",      // Làm mờ nền phía sau
            background: "rgba(0,0,0,0.25)"    // Nền tối mờ
    },
    "& .MuiDialog-paper": {
      width: "80%",
      maxWidth: "none",
      background: "rgba(255, 255, 255, 0.7)", 
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    },
  }}
>
        <DialogTitle className="">{product.id ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <div className="grid md:grid-cols-2  grid-cols-1 gap-4">
            <div className="col-span-1 ">
              <TextField
                error={!!error.name}
                helperText={error.name}
                fullWidth
                label="Name"
                variant="standard"
                name="name"
                value={product.name}
                onChange={handleChangeInput}
             
              />
              <TextField
                error={!!error.description}
                helperText={error.description}
                multiline
                rows={2}
                fullWidth
                className="t-white"
                label="Decription"
                name="description"
                value={product.description}
                onChange={handleChangeInput}
                variant="standard"
                sx={{ mt: 2 }}
              />
              <TextField
                error={!!error.price}
                helperText={error.price}
                fullWidth
                value={product.price}
                onChange={handleChangeInput}
                name="price"
                label="Price"
                variant="standard"
                type="number"
                sx={{ mt: 2 }}
              />
              <TextField
                error={!!error.stock}
                helperText={error.stock}
                fullWidth
                label="Stock"
                value={product.stock}
                onChange={handleChangeInput}
                name="stock"
                variant="standard"
                type="number"
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Discount"
                variant="standard"
                type="number"
                value={product.discount}
                onChange={handleChangeInput}
                name="discount"
                sx={{ mt: 2 }}
              />
              <Autocomplete
                options={categoryType}
                getOptionLabel={(option) => option.name}
                disablePortal
                fullWidth
                sx={{ mt: 2 }}
                value={
                  categoryType.find((s) => s.id === product.id_cate_type) ||
                  null
                }
                onChange={(event, value) =>
                  handleChangeInput({
                    target: { name: "id_cate_type", value: value.id },
                  })
                }
                PopperComponent={CustomPopper}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Find the categoryType"
                    error={!!error.id_cate_type}
                    helperText={error.id_cate_type}
                  />
                )}
              />
              <Autocomplete
                options={brands}
                getOptionLabel={(option) => option.name}
                disablePortal
                fullWidth
                sx={{ mt: 2 }}
                value={brands.find((s) => s.id === product.id_brand) || null}
                onChange={(event, value) =>
                  handleChangeInput({
                    target: { name: "id_brand", value: value.id },
                  })
                }
                PopperComponent={CustomPopper}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Find the Brands"
                    error={!!error.id_brand}
                    helperText={error.id_brand}
                  />
                )}
              />
            </div>

            <div className="col-span-1">
              <div className="flex items-end gap-3">
                <h1 className="font-bold text-xl">Size :</h1>
                <TextField
                  label="Size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  variant="standard"
                  type="number"
                />
                <Button variant="contained" color="success" onClick={addSize}>
                  ADD SIZE
                </Button>
              </div>
              <div className="flex gap-3 mt-3">
                {product.size.map((row, index) => (
                  <Button
                    variant="contained"
                    color="warning"
                    className="relative"
                    key={index}
                  >
                    <MdDelete
                      onClick={() => deleteSize(row)}
                      className="absolute top-0 right-0 text-2xl translate-x-1/3 -translate-y-1/3 text-red-300 hover:text-red-600 "
                    />
                    {row}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 mt-5 ">
                <TextField
                  value={color}
                  type="color"
                  label="Chọn màu"
                  sx={{ width: 150 }}
                  onChange={(e) => setColor(e.target.value)}
                />
                <Button variant="contained" color="success" onClick={addColor}>
                  ADD Color
                </Button>
                <div className="flex gap-2 items-center">
                  {product.color.map((row, index) => (
                    <div
                      style={{ background: row }}
                      className="w-12 h-12 relative rounded-full"
                      key={index}
                    >
                      <MdDelete
                        onClick={() => deleteColor(row)}
                        className="absolute top-1/2 left-1/2  text-xl -translate-x-1/2 -translate-y-1/2 text-black-300 hover:text-red-600 "
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className=" gap-2 ">
                {/* Chọn file */}
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 2 }}
                  style={{ height: "50px" }}
                >
                  <FaImage className="text-2xl text-blue-600" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                  />
                </Button>

                {/* Hiển thị preview ảnh */}
                <div className="mt-2 flex gap-2 flex-wrap">
                  {product.imgUrls.length > 0 ? (
                    <>
                      {product.imgUrls.map((e) => (
                        <di v className="relative group">
                          <div className="absolute w-full h-full z-5 hidden group-hover:block" style={{ backgroundColor: "rgba(0,0,0,0.5)"}}>
                          </div>
                          <img
                            src={e}
                            alt="Preview"
                            style={{
                              width: 100,
                              height: "auto",
                              borderRadius: 8,
                            }}
                            className="relative"
                          />
                           <MdDelete
                           onClick={() => deleteImgUrl(e)}
                            className="absolute z-10 text-white text-3xl top-1/2 left-1/2 hidden group-hover:block  -translate-x-1/2 -translate-y-1/2 text-black-300 hover:text-red-600 "
                      />
                        </di>
                      ))}
                    </>
                  ) : (
                    <img
                      src={logo2}
                      alt="Preview"
                      style={{ width: 100, height: "auto", borderRadius: 8 }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            disabled={upload}
            onClick={addProduct}
            variant="contained"
            color="success"
          >
            {upload ? (
              <FaAngleDoubleUp className="rotate-180" />
            ) : (
              <>{product.id ? "edit" : "add"}</>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
