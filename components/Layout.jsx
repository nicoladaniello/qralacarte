import Head from "next/head";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Slide, ToastContainer } from "react-toastify";
import useAuth from "./auth/useAuth";

const Layout = ({ title, children }) => {
  const { signIn, signOut, onAuthStateChanged } = useAuth();

  // Load user status to state when user changes.
  useEffect(
    () =>
      onAuthStateChanged(
        (user) => {
          // console.log("user changed.", user);
          if (user) signIn(user);
          else signOut();
        },
        (err) => {
          setUser();
          console.error(err);
        }
      ),
    []
  );

  const isClient = typeof window === "object";

  return (
    <div className="d-flex flex-column">
      <Head>
        <meta property="og:title" content={title} key="title" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
      <div id="modal-container"></div>
      <ToastContainer
        hideProgressBar
        newestOnTop
        position="bottom-center"
        limit={3}
        transition={Slide}
      />
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  column: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

// TODO: Set default page title
Layout.defaultProps = {
  title: "",
};

export default Layout;
