// withAuth.js
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import Link from "next/link";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { token } = useAuth();

    const router = useRouter();

    // useEffect(() => {
    //   if (!token) {
    //     // Redirect to login if not authenticated
    //     router.push("/login");
    //   }
    // }, [token]);

    if (!token) {
      // Render loading or a redirect message while checking authentication
      return (
        <div>
          Loading...{" "}
          <button className="btn btn-primary">
            <Link href="/login" style={{ color: "white" }}>
              S'identifier
            </Link>
          </button>
        </div>
      );
    }

    // Render the protected component
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
