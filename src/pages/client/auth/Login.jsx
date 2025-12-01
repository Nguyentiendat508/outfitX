import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";
import { AccountContext } from "../../../contexts/AccountProvider";
import { AuthContext } from "../../../contexts/AuthProvider";
import ButtonGoogle from "./ButtonGoogle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiPaper-root": {
    borderRadius: "16px",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
  },
}));
const inner = {name : "" , password : ""};

export default function Login({ open, handleClose, handleOpenRegister }) {
 const [login, setLogin] = React.useState(inner);
 const [error, setError] = React.useState (inner);
  const accounts = React.useContext(AccountContext);
  const { saveLogin } = React.useContext(AuthContext);
  const handleChangeInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    if(validation()){ 
      return;
    }
     const accountLogin = accounts.find(e => e.email == login.name || e.name == login.name && e.password == login.password);
     if(accountLogin){
       saveLogin(accountLogin);
       handleClose()
     }else {
      console.log("Sai email hoặc mật khẩu");
     }
  }
  const validation = () => {
    const newError = {};
    newError.name = login.name ? " " : "Vui lòng nhập name"
    newError.name = login.password ? "" : "Vui long nhập password"
    setError(newError);
    return Object.values(newError).some(e => e !== ""); // nếu có lỗi thì true
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogContent dividers>
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <label className="text-sm font-medium">Email or Username</label>
        <div className="relative mt-1 mb-3">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. example@mail.com or your username"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            name="name"
            onChange={handleChangeInput}
            value={login.name}
          />
          <p className="text-red-500">{error.name}</p>
        </div>

        <label className="text-sm font-medium">Password</label>
        <div className="relative mt-1 mb-2">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="e.g. Example2006"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            name="password"
            onChange={handleChangeInput}
            value={login.password}
          />
            <p className="text-red-500">{error.name}</p>
        </div>

        <div className="flex gap-2 items-center justify-center text-sm mb-4">
          <a href="#" className="text-neutral-500 hover:underline">
            Forgot password?
          </a>
          <button onClick={handleLogin} className="bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition">
            Login
          </button>
        </div>

        <div className="text-sm text-center mb-3">
          Don’t have an account?{" "}
          <button
            onClick={handleOpenRegister}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </div>

        <div className="flex items-center justify-center mb-3">
          <div className="h-px w-1/4 bg-gray-300" />
          <span className="text-gray-500 mx-2 text-sm">Or</span>
          <div className="h-px w-1/4 bg-gray-300" />
        </div>
       <ButtonGoogle handleClose={handleClose} />
        <p className="text-xs text-gray-500 text-center mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <p className="text-xs text-center mt-1 text-gray-400">
          Need help?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact Support
          </a>
        </p>
      </DialogContent>
    </BootstrapDialog>
  );
  }
