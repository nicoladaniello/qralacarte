import classnames from "classnames";
import React, { useEffect, useRef } from "react";

const isClient = typeof window !== "undefined";

const DropdownToggle = ({ id, className, children, ...rest }) => {
  const ref = useRef();

  // Initialize bootstrap dropdown
  useEffect(() => {
    if (!isClient || !ref.current) return;
    const BSDropdown = require("bootstrap/js/dist/dropdown");
    let instance = BSDropdown.getInstance(ref.current);
    if (!instance) instance = new BSDropdown(ref.current);
  }, [ref]);

  return (
    <a
      {...rest}
      ref={ref}
      id={id}
      className={classnames(className, "dropdown-toggle")}
      role="button"
      href="#"
      // data-bs-toggle is required
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {children}
    </a>
  );
};

export default DropdownToggle;
