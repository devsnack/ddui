import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthProvider";
// import useAuth from "@/hooks/useAuth";
// import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "@/utils/api";
import { LOGIN_URL } from "@/utils/api";

const Login = () => {
  const { login, currentdd } = useAuth();
  const router = useRouter();
  const from = router.query.from || "/";
  console.log(from);
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        { userName: user, userPass: pwd }
        // {
        //   headers: { "Content-Type": "application/json" },
        //   withCredentials: true,
        // }
      );

      const accessToken = response?.data?.token;
      const roles = response?.data?.data.user?.userType;

      login(accessToken, roles);
      currentdd(response?.data?.data.user?._id);
      setUser("");
      setPwd("");
      //   navigate(from, { replace: true });
      router.replace(from);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/");
  }, []);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>CARTANA Com</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <br></br>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <br></br>
        <button className="btn btn-dark mt-3">Se Connecter</button>
      </form>
    </section>
  );
};

export default Login;
