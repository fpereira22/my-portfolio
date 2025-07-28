import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJcLBWM_kn_abqW2SckCzZb8V9OfNHFgU",
  authDomain: "mi-intranet-cbbbc.firebaseapp.com",
  projectId: "mi-intranet-cbbbc",
  storageBucket: "mi-intranet-cbbbc.firebasestorage.app", // This is the correct value.
  messagingSenderId: "892777647230",
  appId: "1:892777647230:web:9f2b248127a9e863921c2f",
  measurementId: "G-6MHZ8M3YRH"
};

// Initialize Firebase correctly
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };