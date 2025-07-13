// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQL7BSEgPCgMe2xMSCRS8sP32Mim7CkuQ",
  authDomain: "eva4-71dca.firebaseapp.com",
  projectId: "eva4-71dca",
  storageBucket: "eva4-71dca.firebasestorage.app",
  messagingSenderId: "1044593481350",
  appId: "1:1044593481350:web:d9e6220e77a168cf51a307",
  measurementId: "G-WWDGQGSWRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);