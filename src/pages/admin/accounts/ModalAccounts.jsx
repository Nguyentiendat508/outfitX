import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { ROLES } from "../../../untils/Contants";
import { updateDocument } from "../../../services/firebaseService";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAccounts({ open, account, handleClose, status, setStatus }) {
  const updateStatus = async () => {
    await updateDocument ("accounts", {...account, role: status});
    handleClose();
  }
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Account</DialogTitle>
        <DialogContent>
          <TextField
            value={account?.name}
            fullWidth
            label="Name"
            name="name"
            sx={{ mt: 2 }}
          />
          <TextField
            value={account?.email}
            fullWidth
            label="Email"
            name="email"
            disabled
            sx={{ mt: 2 }}
          />
          <TextField
            value={account?.password}
            fullWidth
            label="Password"
            name="Password"
            type="password"
            sx={{ mt: 2 }}
          />
          <Autocomplete
            options={Object.values(ROLES)}
            getOptionLabel={(option) => option}
            disablePortal
            fullWidth
            sx={{ mt: 2 }}
            value={status}
             onChange={(event, value) => setStatus(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find the Role"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
           <Button onClick={updateStatus} disabled={account?.role==status}  variant="contained" color="warning" >
          Update
        </Button>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
