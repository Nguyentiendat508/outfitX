import { signInWithPopup } from "firebase/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { auth, googleProvider } from "../../../config/firebaseConfig";
import { ROLES } from "../../../untils/Contants";
import { AccountContext } from "../../../contexts/AccountProvider";
import { addDocument } from "../../../services/firebaseService";
import { AuthContext } from "../../../contexts/AuthProvider";

function ButtonGoogle({handleClose}) {
  const { saveLogin } = React.useContext(AuthContext);
  const accounts = React.useContext(AccountContext);
  // Google sign-in
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const existingCustomer = accounts.find(
        (customer) => customer.email === user.email
      );
      let loggedInCustomer;

      if (!existingCustomer) {
        const newCustomer = {
          name: user.displayName,
          imgUrl: user.photoURL,
          role: ROLES.USER,
        };
        const accLogin = await addDocument("accounts", newCustomer);
        loggedInCustomer = accLogin;
      } else {
        loggedInCustomer = existingCustomer;
      }
       saveLogin(loggedInCustomer);
       handleClose();
    } catch (error) {
      console.error("Đăng nhập thất bại. Vui lòng thử lại.", error);
    }
  };
  return (
    <button
      onClick={signInWithGoogle}
      className="w-full bg-gradient-to-r from-[#121FCF] to-[#CF1512] text-white font-medium py-2 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition"
    >
      <FaGoogle /> Continue with Google
    </button>
  );
}

export default ButtonGoogle;
