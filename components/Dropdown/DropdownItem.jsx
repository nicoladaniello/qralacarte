import React from "react";
import classnames from "classnames";

const DropdownItem = ({ href, className, children, onClick, ...rest }) => {
  return (
    <li {...rest}>
      <button
        type="button"
        className={classnames(className, "dropdown-item")}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};

export default DropdownItem;
