import classNames from "classNames";
import React from "react";

const DropdownMenu = ({ id, className, children }) => {
  return (
    <ul className={classNames(className, "dropdown-menu")} aria-labelledby={id}>
      {children}
    </ul>
  );
};

export default DropdownMenu;
