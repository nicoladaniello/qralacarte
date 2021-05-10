import React from "react";
import Layout from "../Layout";
import SignIn from "./SignIn";
import useAuth from "./useAuth";

const withAuth = (Component) => {
  const Auth = (props) => {
    const { isLoading, currentUser } = useAuth();

    return isLoading ? (
      <Layout>loading...</Layout>
    ) : !currentUser ? (
      <Layout>
        <SignIn />
      </Layout>
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
