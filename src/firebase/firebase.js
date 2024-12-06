// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdgndMhBv61O5Oc2fE7u8UxWzE2UA4Q0",
  authDomain: "unihub-4c9c3.firebaseapp.com",
  projectId: "unihub-4c9c3",
  storageBucket: "unihub-4c9c3.firebasestorage.app",
  messagingSenderId: "769871070737",
  appId: "1:769871070737:web:d63fcebb7f34a8ac07d3b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;