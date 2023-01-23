import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE901NP5iyvkt7KwmJsv_8za8qG8dRWH0",
  authDomain: "secquraise-task-4a3fc.firebaseapp.com",
  projectId: "secquraise-task-4a3fc",
  storageBucket: "secquraise-task-4a3fc.appspot.com",
  messagingSenderId: "1007779569082",
  appId: "1:1007779569082:web:dc7c25e621365742641183",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
