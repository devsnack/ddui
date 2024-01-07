import AddStore from "@/components/store/addstore";
import useAuth from "@/hooks/useAuth";
import withAuth from "@/components/keepon/withauth";

import React from "react";

function AddStorePage() {
  return <AddStore></AddStore>;
}

export default withAuth(AddStorePage);
