// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBxCYcxYX4q4M5v9rUtPO2tTvP9DKboPE",
  authDomain: "parkinson-s-disease-e26ba.firebaseapp.com",
  projectId: "parkinson-s-disease-e26ba",
  storageBucket: "parkinson-s-disease-e26ba.appspot.com",
  messagingSenderId: "827308496527",
  appId: "1:827308496527:web:e353f028030946d29442fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;