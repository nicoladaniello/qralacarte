import React from "react";
import NavItem from "./NavItem";
import classNames from "classNames";

const Nav = ({ className, children }) => {
  return (
    <nav className={classNames(className, "nav nav-pills small")}>
      {children}
    </nav>
  );
};

Nav.Item = NavItem;

export default Nav;
