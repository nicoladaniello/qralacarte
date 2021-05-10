import classnames from "classnames";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";

const Layout = ({ title, className, children }) => {
  return (
    <div
      className={classnames(className, "d-flex flex-column")}
      style={{ height: "100vh", overflow: "auto" }}
    >
      <Head>
        <title>QRalacarte | {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
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
