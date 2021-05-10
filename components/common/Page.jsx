import { PropTypes } from "prop-types";
import React from "react";
import Layout from "../Layout";
import Navbar from "../Navbar";
import Footer from "./Footer";

const Page = ({ title, children }) => {
  return (
    <>
      <Layout title={title}>
        <Navbar />
        <main className="h-100">{children}</main>
      </Layout>
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
