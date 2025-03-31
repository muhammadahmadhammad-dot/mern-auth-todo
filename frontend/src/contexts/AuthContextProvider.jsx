import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { toast } from "react-toastify";

const AuthContextProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const isAuthenticatedUser = JSON.parse(
    localStorage.getItem("isAuthenticated")
  );

  const [authUser, setAuthUser] = useState(
    user || {
      fname: "",
      lname: "",
      email: "",
      password: "",
    }
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    isAuthenticatedUser || false
  );

  useEffect(() => {
    localStorage.setItem("authUser", JSON.stringify(authUser));
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [authUser, isAuthenticated]);

  const logout = async () => {
    try {
      const sending = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!sending.ok) {
        console.log("Logout failed");
        return;
      }
      setAuthUser({ email: "", password: "" });
      setIsAuthenticated(false);
      localStorage.removeItem("authUser");
      localStorage.removeItem("isAuthenticated");
      toast("Logout Successfully")
    } catch (error) {
      console.log("error : ", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        authUser,
        logout,
        setAuthUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
