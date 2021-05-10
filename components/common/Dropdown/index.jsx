// import { Dropdown as BSDropdown } from "bootstrap";
import classnames from "classnames";
import { PropTypes } from "prop-types";
import React, { useEffect, useRef } from "react";
import DropdownItem from "./DropdownItem";

const isClient = typeof window !== "undefined";

const Dropdown = ({
  id,
  title,
  as: Component,
  className,
  linkClassName,
  listClassName,
  children,
}) => {
  const dropdownRef = useRef();

  // Initialize bootstrap dropdown
  useEffect(() => {
    if (!isClient) return;
    // Require it here as top import couses bug in SSR.
    const BSDropdown = require("bootstrap/js/dist/dropdown");
    let instance = BSDropdown.getInstance(dropdownRef.current);
    if (!instance) instance = new BSDropdown(dropdownRef.current);
  }, [dropdownRef]);

  // UI
  return (
    <Component className={classnames(className, "dropdown")}>
      <a
        ref={dropdownRef}
        id={id}
        className={classnames(linkClassName, "nav-link dropdown-toggle")}
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </a>

      <ul
        className={classnames(listClassName, "dropdown-menu")}
        aria-labelledby={id}
      >
        {children}
      </ul>
    </Component>
  );
};

Dropdown.Item = DropdownItem;

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  as: PropTypes.elementType,
  className: PropTypes.string,
  linkClassName: PropTypes.string,
};

Dropdown.defaultProps = {
  as: "div",
};

export default Dropdown;
