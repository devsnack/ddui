import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useRefreshToken from "@/hooks/useRefreshToken";
import { REFRESH_TOKEN } from "@/utils/api";
import React, { useEffect, useState } from "react";

function Dash() {
  //   const refresh = useRefreshToken();
  //   const { auth } = useAuth();
  useEffect(() => {
    // // refresh().then((r) => {
    // //   //   console.log(r);
    // // }
    // );
  }, []);
  return <div>welcome</div>;
}

export default Dash;
