// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG0RAd42YSzUs1SNiNdYyYon0VsqvQJbs",
  authDomain: "homenest-55731.firebaseapp.com",
  projectId: "homenest-55731",
  storageBucket: "homenest-55731.firebasestorage.app",
  messagingSenderId: "585591407739",
  appId: "1:585591407739:web:3b87a0bbe0f2ca88a54ede",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
