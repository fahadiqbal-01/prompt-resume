// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCQZfjomVzNBJ6lF5Ax61m_X5o6Wej1Zw",
  authDomain: "promptresume-ab5c7.firebaseapp.com",
  projectId: "promptresume-ab5c7",
  storageBucket: "promptresume-ab5c7.firebasestorage.app",
  messagingSenderId: "741357983657",
  appId: "1:741357983657:web:703e618010c37af80c16b8",
  measurementId: "G-EQJGSFL21Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
