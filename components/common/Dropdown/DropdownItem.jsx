import Link from "next/link";
import React from "react";

const DropdownItem = ({ href, children }) => {
  return (
    <li>
      <Link href={href}>
        <a className="dropdown-item">{children}</a>
      </Link>
    </li>
  );
};

export default DropdownItem;
