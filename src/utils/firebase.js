// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhYjLCeF1SDCzCJtapIETTkidokpmQZE4",
  authDomain: "netflixgpt-93171.firebaseapp.com",
  projectId: "netflixgpt-93171",
  storageBucket: "netflixgpt-93171.firebasestorage.app",
  messagingSenderId: "989065040326",
  appId: "1:989065040326:web:eb5df5b6c2af867fa3a2c7",
  measurementId: "G-TMFFSVPQQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();