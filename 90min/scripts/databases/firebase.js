import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAXwtTOFl3Mtw3ohfjmJi-lao50XAXAtU",
  authDomain: "projeto-90m.firebaseapp.com",
  projectId: "projeto-90m",
  storageBucket: "projeto-90m.firebasestorage.app",
  messagingSenderId: "1082182716367",
  appId: "1:1082182716367:web:e071e00176e38b011fe0ba",
  measurementId: "G-96GL6QFMJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;