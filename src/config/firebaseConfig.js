import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB60To63e7f4Xq8KtAjNdG_wZATMvuITu0",
  authDomain: "outfitx-19306.firebaseapp.com",
  projectId: "outfitx-19306",
  storageBucket: "outfitx-19306.firebasestorage.app",
  messagingSenderId: "873404300012",
  appId: "1:873404300012:web:5d9981f72699c4db5ec3c9",
  measurementId: "G-C7XYC58M0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();