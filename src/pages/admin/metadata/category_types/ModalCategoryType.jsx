import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { CategoriesContext } from "../../../../contexts/CategoryProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function CustomPopper(props) {
  return <Popper {...props} placement="top-start" />;
}
export default function ModalCategoryType({ open, handleClose, handleChangeInput, addCategoryType, categoryType , error}) {
      const categories = React.useContext(CategoriesContext);
         console.log(categoryType);
         
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
            {categoryType.id ? "Edit CategoryType" : "Add CategoryType"}
        </DialogTitle>
        <DialogContent>
            <TextField error={!!error.name} helperText={error.name} value={categoryType.name} fullWidth label="Name" variant="standard" name="name" onChange={handleChangeInput}/>
            <TextField error={!!error.description} helperText={error.description} multiline rows={2} value={categoryType.description} fullWidth label="Decription" name="description" variant="standard" sx={{ mt : 2}} onChange={handleChangeInput} />
            <Autocomplete
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    disablePortal
                    fullWidth
                    sx={{ mt: 2 }}
                    value={categories.find(s => s.id === categoryType.cateId) || null}
                    onChange={(event, value) =>
                       handleChangeInput({target : { name : "cateId", value : value.id}})
                    }
                    PopperComponent={CustomPopper}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Find the Category"
                        />
                    )}
                />
        </DialogContent>
        <DialogActions>
       <Button onClick={handleClose}  variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={addCategoryType} variant="contained" color="success">
            {categoryType.id ? "edit" : "add"}
          </Button>       
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
