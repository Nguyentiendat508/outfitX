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

export default function ModalBlog({
  open,
  handleClose,
  handleChangeInput,
  addBlog,
  blog,
  error,
  setBlog,
  upload
}) {
 
   const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBlog({ ...blog, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        maxWidth="xs"
fullWidth
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"

      >
        <DialogTitle>{blog.id ? "Edit Blog" : "Add Blog"}</DialogTitle>
        <DialogContent>
          <TextField
            error={!!error.title}
            helperText={error.title}
            value={blog.title}
            fullWidth
            label="Title"
            variant="standard"
            name="title"
            onChange={handleChangeInput}
          />
          <div className="flex gap-2 mt-2 justify-between items-center">
            {/* Chọn file */}
            <Button variant="outlined" component="label" sx={{ mt: 2 }} style={{ height : "50px"}}>
              <FaImage className="text-2xl text-blue-600" />
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            {/* Hiển thị preview ảnh */}
            <div>
              <img
                src={blog.imgUrl}
                alt="Preview"
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
            </div>
          </div>
          <TextField
            error={!!error.content}
            helperText={error.content}
            value={blog.content}
            fullWidth
            rows={4}
            label="Conten"
            variant="standard"
            name="content"
            onChange={handleChangeInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button   disabled={upload}  onClick={addBlog} variant="contained" color="success">
             {upload ? <FaAngleDoubleUp  className="rotate-180" /> :  <>{blog.id ? "edit" : "add"}</> }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
