import classnames from "classnames";
import React from "react";

const DropdownMenu = ({ id, className, children }) => {
  return (
    <ul className={classnames(className, "dropdown-menu")} aria-labelledby={id}>
      {children}
    </ul>
  );
};

export default DropdownMenu;
