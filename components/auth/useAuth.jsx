import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../../firebase/firebaseClient";

const authContext = createContext();

const useAuth = () => useContext(authContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoading: true });

  const signOut = () => {
    firebase.auth().signOut();
  };

  const value = {
    ...auth,
    signOut,
  };

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(
        (user) =>
          void setAuth({
            currentUser: user,
            isLoading: false,
          }),
        (err) => console.error(err)
      ),
    []
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default useAuth;
export { AuthProvider };
