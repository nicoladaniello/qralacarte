import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import useAuth from "./useAuth";

const Authenticated = ({ children }) => {
  const { status } = useAuth({ redirectTo: "/signin" });
  const { isSignedIn, isAnonymous } = status;
  const router = useRouter();

  useEffect(() => {
    if (isAnonymous) router.push("/signin");
  }, [isAnonymous]);

  return isSignedIn ? children : <Loading />;
};

export default Authenticated;
