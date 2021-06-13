import classnames from "classnames";
import Link from "next/link";
import { PropTypes } from "prop-types";
import React from "react";
import { useState } from "react";
import Brand from "../common/Brand";
import NavMenu from "./NavMenu";
import SideNav from "./SideNav";

const Navbar = ({ fluid, className }) => {
  const [isOpen, setIsOpen] = useState();

  return (
    <>
      <SideNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <nav
        className={classnames(
          className,
          "navbar navbar-expand-lg navbar-light bg-white"
        )}
      >
        <div
          className={classnames({
            "container-fluid": fluid,
            "container g-3": !fluid,
          })}
        >
          <Link href="/">
            <a className="navbar-brand">
              <Brand />
            </a>
          </Link>
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
