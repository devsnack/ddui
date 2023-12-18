// withAuth.js
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { token } = useAuth();

    const router = useRouter();

    useEffect(() => {
      if (!token) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    }, [token, router]);

    if (!token) {
      // Render loading or a redirect message while checking authentication
      return <div>Loading...</div>;
    }

    // Render the protected component
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
