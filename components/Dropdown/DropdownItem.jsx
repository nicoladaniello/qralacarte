import React from "react";
import classNames from "classNames";

const DropdownItem = ({ href, className, children, onClick, ...rest }) => {
  return (
    <li {...rest}>
      <button
        type="button"
        className={classNames(className, "dropdown-item")}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};

export default DropdownItem;
