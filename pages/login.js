import PersistLogin from "@/components/keepon";
import withAuth from "@/components/keepon/withauth";
import Login from "@/components/login";
import React from "react";
import useAuth from "@/hooks/useAuth";

function LoginPage() {
  return <Login></Login>;
}

export default LoginPage;
