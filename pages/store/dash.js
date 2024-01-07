import Ddash from "@/components/dash/ddash";
import withAuth from "@/components/keepon/withauth";
import React from "react";

function Dash() {
  return <Ddash></Ddash>;
}

export default withAuth(Dash);
