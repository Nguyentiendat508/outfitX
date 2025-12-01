import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { FaEnvelope, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { addDocument } from "../../../services/firebaseService";
import { AccountContext } from "../../../contexts/AccountProvider";
import { ROLES } from "../../../untils/Contants";
import ButtonGoogle from "./ButtonGoogle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiPaper-root": {
    borderRadius: "16px",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    width: "30vw", // 👈 Thêm dòng này
    maxWidth: "none", // 👈 Đảm bảo không bị giới hạn bởi mặc định của MUI
  },
}));

const inner = { name: "", email: "", password: "", confirm_password: "", role:ROLES.USER};

export default function Register({
  openRegister,
  handleCloseRegister,
  handleClickOpen,

}) {
  const [register, setRegister] = React.useState(inner);
  const [error, setError] = React.useState(inner);

  const handleChangeInput = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const accounts = React.useContext(AccountContext);
  const handleRegister = async () => {
    if(validation()){
      console.log(error);  
      return;
    }
    const { confirm_password , ...newAccount} = register ;
       await addDocument("accounts", newAccount);
       handleCloseRegister();
       setRegister(inner);
    }

  const validation = () => {
    const newError = {};
    newError.name = register.name ? "" : "Vui long nhap name";
    const checkEmail = accounts.some(e => e.email == register.email);
    newError.email = register.email ? checkEmail ? "Email đã được sử dụng" : "" : "Vui long nhap email";
    newError.password = register.password ? "" : "Vui long nhap password";
    newError.confirm_password = register.confirm_password == register.password
      ? ""
      : "Mật khẩu không trùng khớp";
    setError(newError);
    return Object.values(newError).some(e => e !== ""); // nếu có lỗi thì true
  };


  return (
    <BootstrapDialog
      onClose={handleCloseRegister}
      aria-labelledby="customized-dialog-title"
      open={openRegister}
    >
      <DialogContent dividers>
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <label className="text-sm font-medium">Username</label>
        <div className="relative mt-1 mb-3">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter your username"
            value={register.name}
            onChange={handleChangeInput}
            name="name"
            className={`w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${error.name ? "border border-red-500" : ""}`}
          />
          <p className="text-red-500">{error.name}</p>
        </div>

        <label className="text-sm font-medium">Email</label>
        <div className="relative mt-1 mb-3">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="e.g. example@mail.com"
            className= {`w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${error.email ? "border border-red-500" : ""}`}
            name="email"
            value={register.email}
            onChange={handleChangeInput}
          />
          <p className="text-red-500">{error.email}</p>
        </div>

        <label className="text-sm font-medium">Password</label>
        <div className="relative mt-1 mb-3">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="e.g. Example2006"
              className= {`w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${error.password ? "border border-red-500" : ""}`}
            name="password"
            value={register.password}
            onChange={handleChangeInput}
          />
          <p className="text-red-500">{error.password}</p>
        </div>

        <label className="text-sm font-medium">Confirm Password</label>
        <div className="relative mt-1 mb-4">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Re-enter your password"
             className= {`w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${error.confirm_password ? "border border-red-500" : ""}`}
            name="confirm_password"
            value={register.confirm_password}
            onChange={handleChangeInput}
          />
          <p className="text-red-500">{error.confirm_password}</p>
        </div>
        <div className="text-center">
          <button
            onClick={handleRegister}
            className="bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition cursor-pointer"
          >
            Sign up
          </button>
        </div>

        <div className="text-sm text-center mt-3 mb-3 flex justify-center gap-1">
          Already have an account?{" "}
          <div
            onClick={handleClickOpen}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </div>
        </div>

        <div className="flex items-center justify-center mb-3">
          <div className="h-px w-1/4 bg-gray-300" />
          <span className="text-gray-500 mx-2 text-sm">Or</span>
          <div className="h-px w-1/4 bg-gray-300" />
        </div>
        <ButtonGoogle />
      </DialogContent>
    </BootstrapDialog>
  );
}
