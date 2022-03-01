// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQmlBi9CcX_zPXuV2OeF364DlFXuBWUc8",
  authDomain: "garbagems-be22a.firebaseapp.com",
  projectId: "garbagems-be22a",
  storageBucket: "garbagems-be22a.appspot.com",
  messagingSenderId: "24064726090",
  appId: "1:24064726090:web:16eec93e3357b526f142b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export { auth, database };
