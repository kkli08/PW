// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlU_15If3MaYQzlTIXrrcyh0aJ3UakwFE",
  authDomain: "my-homepage-414320.firebaseapp.com",
  projectId: "my-homepage-414320",
  storageBucket: "my-homepage-414320.appspot.com",
  messagingSenderId: "390005410252",
  appId: "1:390005410252:web:ed8983e35177969eb53569",
  measurementId: "G-R8RB5R2B1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);