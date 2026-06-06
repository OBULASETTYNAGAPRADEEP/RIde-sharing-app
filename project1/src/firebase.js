import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Define firebaseConfig BEFORE using it
const firebaseConfig = {
  apiKey: "AIzaSyAD8tBeOcO1wOZ7AS7e75C5w3pLj3_bpcQ",
  authDomain: "project1-ee092.firebaseapp.com",
  projectId: "project1-ee092",
  storageBucket: "project1-ee092.appspot.com",  // ✅ Fixed incorrect domain
  messagingSenderId: "959302847414",
  appId: "1:959302847414:web:97f69b7f674f7173e18f17"
};

// ✅ Initialize Firebase AFTER defining firebaseConfig
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };  // ✅ Ensure `auth` is exported properly
