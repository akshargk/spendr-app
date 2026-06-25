import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../services/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Listen for login/logout changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setInitializing(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    user,
    initializing,

    signUp: (email, password) =>
      createUserWithEmailAndPassword(
        auth,
        email,
        password
      ),

    signIn: (email, password) =>
      signInWithEmailAndPassword(
        auth,
        email,
        password
      ),

    signOut: () => signOut(auth),

    sendPasswordReset: (email) =>
      sendPasswordResetEmail(auth, email),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside <AuthProvider>"
    );
  }

  return context;
}