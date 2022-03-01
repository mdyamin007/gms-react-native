import React, { createContext, useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { onAuthStateChanged } from "@firebase/auth";
import {
  query,
  equalTo,
  ref,
  get,
  orderByChild,
  child,
  children,
} from "@firebase/database";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [userType, setUserType] = useState();

  const dbRef = ref(database);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const users = query(
          ref(database, "users"),
          orderByChild("users/email"),
          equalTo(user.email)
        );
        console.log(users);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userType,
      }}
    >
      {!pending && children}
    </AuthContext.Provider>
  );
}
