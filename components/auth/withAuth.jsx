import React from "react";
import Loading from "../Loading";
import SignIn from "./SignIn";
import useAuth from "./useAuth";

const withAuth = (Component) => {
  const Auth = (props) => {
    const { currentUser } = useAuth();

    return currentUser === undefined ? (
      <Loading />
    ) : !currentUser ? (
      <SignIn />
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
