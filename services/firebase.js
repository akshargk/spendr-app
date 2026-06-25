import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdle-dFHidGJgpQKLwKuLCtVW0PuKJQmg",
  authDomain: "spendr-dde3a.firebaseapp.com",
  projectId: "spendr-dde3a",
  storageBucket: "spendr-dde3a.firebasestorage.app",
  messagingSenderId: "808178169706",
  appId: "1:808178169706:web:fd2ecfa0bbba770c8b5713",
  measurementId: "G-VXSN37LMF0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);