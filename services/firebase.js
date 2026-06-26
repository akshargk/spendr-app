import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});