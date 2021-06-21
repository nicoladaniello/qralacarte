import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import useAuth from "./useAuth";

const withAuth = (Component) => {
  const Auth = (props) => {
    const { currentUser } = useAuth();

    const router = useRouter();

    useEffect(() => {
      if (currentUser === null) {
        router.replace("/signin");
      }
    }, [currentUser, router]);

    return !currentUser ? (
      <Loading />
    ) : (
      <Component {...props} currentUser={currentUser} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
