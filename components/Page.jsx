import classnames from "classnames";
import Head from "next/head";
import { PropTypes } from "prop-types";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NavMenu from "./Navbar/NavMenu";

const Page = ({ title, className, children }) => {
  return (
    <>
      <Head>{title && <title>QRalacarte | {title}</title>}</Head>
      <Navbar MenuComponent={NavMenu} />
      <main className={classnames(className, "flex-grow-1")}>{children}</main>
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
