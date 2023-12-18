import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useRefreshToken from "@/hooks/useRefreshToken";
import useAuth from "@/hooks/useAuth";
import Login from "../login";

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const tk = await refresh();
        setToken(tk);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    verifyRefreshToken();

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    // !auth?.accessToken &&
    //   router.push("/login", undefined, {
    //     shallow: true,
    //     state: { from: router.pathname },
    //   });
    // console.log(auth);
  }, []);

  //   useEffect(() => {
  //     console.log(`isLoading: ${isLoading}`);
  //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  //   }, [isLoading]);
  if (!token) return <Login></Login>;
  return <>{children}</>;
};

export default PersistLogin;
// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };
// function success(pos) {
//   const crd = pos.coords;

//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);
