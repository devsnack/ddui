import withAuth from "@/components/keepon/withauth";
import VisiteStore from "@/components/store/addcheck";
import useAuth from "@/hooks/useAuth";
import React from "react";

function AddStorePage() {
  return <VisiteStore></VisiteStore>;
}

export default withAuth(AddStorePage);
