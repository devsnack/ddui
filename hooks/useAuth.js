import { useContext, useDebugValue } from "react";
import AuthContext from "@/context/AuthProvider";

// const useAuth = () => {
//   const { auth } = useContext(AuthContext);
//   useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
//   return useContext(AuthContext);
// };

// export default useAuth;

// useAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login", undefined, {
        shallow: true,
        state: { from: router.pathname },
      });
      // router.push("/login"); // Redirect to login if no token is found
    } else {
      if (router.pathname.toLocaleLowerCase() == "/login") {
        setToken(storedToken);
        router.push("/");
      } else {
        setToken(storedToken);
      }
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login"); // Redirect to login after logout
  };

  return { token, logout };
};

export default useAuth;
