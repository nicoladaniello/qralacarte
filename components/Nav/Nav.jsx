import React from "react";
import NavItem from "./NavItem";
import classnames from "classnames";

const Nav = ({ className, children }) => {
  return (
    <nav className={classnames(className, "nav nav-pills small")}>
      {children}
    </nav>
  );
};

Nav.Item = NavItem;

export default Nav;
