import classNames from "classNames";
import { PropTypes } from "prop-types";
import React from "react";
import Navbar from "./Navbar";
import NavMenu from "./Navbar/NavMenu";
import Footer from "./Footer";

const Page = ({ className, children }) => {
  return (
    <>
      <Navbar MenuComponent={NavMenu} />
      <main className={classNames(className, "flex-grow-1")}>{children}</main>
      <Footer />
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Page;
