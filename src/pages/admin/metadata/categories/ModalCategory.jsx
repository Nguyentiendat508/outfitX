import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Categories from "./Categories";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCategory({ open, handleClose, handleChangeInput, addCategory, category , error}) {
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
        <DialogTitle>
           {category.id ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
            <TextField error={!!error.name} helperText={error.name} value={category.name} fullWidth label="Name" variant="standard" name="name" onChange={handleChangeInput}/>
            <TextField error={!!error.description} helperText={error.description} multiline rows={2} value={category.description} fullWidth label="Decription" name="description" variant="standard" sx={{ mt : 2}} onChange={handleChangeInput} />
        </DialogContent>
        <DialogActions>
       <Button onClick={handleClose}  variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={addCategory} variant="contained" color="success">
            {category.id ? "edit" : "add"}
          </Button>       
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
