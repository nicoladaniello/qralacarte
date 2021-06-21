import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import initAuth from "../features/auth/initAuth";

initAuth();

const Layout = ({ title, children }) => {
  return (
    <div
      className="overflow-auto d-flex flex-column"
      style={{ height: "100vh" }}
    >
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
