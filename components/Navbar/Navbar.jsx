import classnames from "classnames";
import Link from "next/link";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import Brand from "../Brand";
import NavMenu from "./NavMenu";
import SideNav from "./SideNav";

const Navbar = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState();

  return (
    <>
      {process.env.NEXT_PUBLIC_DEVELOPMENT && (
        <div className="py-1 small bg-dark text-white text-center">
          <small className=" text-center">
            Welcome to the development instance
          </small>
        </div>
      )}
      <SideNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <nav
        className={classnames(
          className,
          "navbar navbar-expand-lg navbar-light bg-white"
        )}
      >
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <Brand />
            </a>
          </Link>
          {children}
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <NavMenu className="navbar-nav ms-auto mb-2 mb-lg-0" />
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
};

export default Navbar;
