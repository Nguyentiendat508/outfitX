import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { FaAngleDoubleUp, FaImage } from "react-icons/fa";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalBrands({
  open,
  handleClose,
  handleChangeInput,
  addBrands,
  brand,
  error,
  setBrand,
  upload
}) {
 
   const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBrand({ ...brand, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{brand.id ? "Edit Brands" : "Add Brands"}</DialogTitle>
        <DialogContent>
          <TextField
            error={!!error.name}
            helperText={error.name}
            value={brand.name}
            fullWidth
            label="Name"
            variant="standard"
            name="name"
            onChange={handleChangeInput}
          />
          <TextField
            error={!!error.description}
            helperText={error.description}
            multiline
            rows={2}
            value={brand.description}
            fullWidth
            label="Decription"
            name="description"
            variant="standard"
            sx={{ mt: 2 }}
            onChange={handleChangeInput}
          />
          <div className="flex gap-2 justify-between">
            {/* Chọn file */}
            <Button variant="outlined" component="label" sx={{ mt: 2 }} style={{ height : "50px"}}>
              <FaImage className="text-2xl text-blue-600" />
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            {/* Hiển thị preview ảnh */}
            <div>
              <img
                src={brand.imgUrl}
                alt="Preview"
                style={{ width: 150, height: "auto", borderRadius: 8 }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button   disabled={upload}  onClick={addBrands} variant="contained" color="success">
             {upload ? <FaAngleDoubleUp  className="rotate-180" /> :  <>{brand.id ? "edit" : "add"}</> }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
