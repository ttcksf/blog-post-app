// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuYNZOi0r62HyuKSzhF00RHFXk5sb9LAU",
  authDomain: "blog-post-app-1e6fe.firebaseapp.com",
  projectId: "blog-post-app-1e6fe",
  storageBucket: "blog-post-app-1e6fe.appspot.com",
  messagingSenderId: "253858592822",
  appId: "1:253858592822:web:cd12c4a5d7a165654c0097",
  measurementId: "G-RD2C7MM16Y",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();

export { db, auth, provider, storage };
