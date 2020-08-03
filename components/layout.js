import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="container">
        <div className="jumbotron text-center py-2">
          Copyright © {new Date().getFullYear()} QRalacarte
        </div>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
