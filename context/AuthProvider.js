// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({});

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [dd, setD] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Check if a token is stored in local storage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken, userType) => {
    setToken(newToken);
    setUserType(userType);
    localStorage.setItem("token", newToken);
    localStorage.setItem("usertype", userType);
  };
  const currentdd = (dd) => {
    setD(dd);
    localStorage.setItem("dd", dd);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, currentdd }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
