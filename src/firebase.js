// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-P0Md09ArGLvDd_A2cblOi_iunmjVrg0",
  authDomain: "shawnhooportfolio.firebaseapp.com",
  projectId: "shawnhooportfolio",
  storageBucket: "shawnhooportfolio.appspot.com",
  messagingSenderId: "249451919898",
  appId: "1:249451919898:web:900083b515a166f3326fa3",
  measurementId: "G-2S68TNVYRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);