import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
