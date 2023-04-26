// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtTDesPh_ioJOUb4OCWokD_R2PEHPXvKc",
  authDomain: "fir-practice-436a8.firebaseapp.com",
  projectId: "fir-practice-436a8",
  storageBucket: "fir-practice-436a8.appspot.com",
  messagingSenderId: "1007999261904",
  appId: "1:1007999261904:web:dcbeacb9f71505400212d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();