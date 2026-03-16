import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA63xRdfoLjw3YiRsnzj7FdK2FHNoKEXpE",
  authDomain: "portfolio-dda80.firebaseapp.com",
  projectId: "portfolio-dda80",
  storageBucket: "portfolio-dda80.firebasestorage.app",
  messagingSenderId: "1039204165457",
  appId: "1:1039204165457:web:d39840226cee8e82105570",
  measurementId: "G-DXQSMGHWVJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
