// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmWH8bvzHOgO86jpvnX_HZJ7Xtc3Io428",
  authDomain: "acessibilidade-dev-chat.firebaseapp.com",
  projectId: "acessibilidade-dev-chat",
  storageBucket: "acessibilidade-dev-chat.appspot.com",
  messagingSenderId: "253036795203",
  appId: "1:253036795203:web:9050fb19fd4442ff214bf6",
  measurementId: "G-PNGNJQFY3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);