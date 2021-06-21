import Link from "next/link";
import React from "react";

const DropdownLink = ({ href, as, children, ...rest }) => {
  return (
    <li {...rest}>
      <Link href={href} as={as}>
        <a className="dropdown-item">{children}</a>
      </Link>
    </li>
  );
};

export default DropdownLink;
