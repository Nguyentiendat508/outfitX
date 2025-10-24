import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FaEnvelope, FaGoogle, FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(8),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Register({ open, handleClose }) {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <div className="relative bg-white text-gray-800 rounded shadow-2xl w-full p-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

            <label className="text-sm font-medium">Username</label>
            <div className="relative mt-1 mb-3">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-1 mb-3">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="e.g. example@mail.com"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1 mb-3">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="e.g. Example2006"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1 mb-4">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="Re-enter your password"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button className="w-20 justify-center items-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Sign Up
            </button>

            <div className="text-sm text-center mt-3 mb-3">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>

            <div className="flex items-center justify-center mb-3">
              <div className="h-px w-1/4 bg-gray-300" />
              <span className="text-gray-500 mx-2 text-sm">Or</span>
              <div className="h-px w-1/4 bg-gray-300" />
            </div>

            <button className="w-full bg-[#db4437] text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#c23321] transition">
              <FaGoogle /> Continue with Google
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-xs text-center mt-1 text-gray-400">
              Need help?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
