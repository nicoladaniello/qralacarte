import classnames from "classnames";
import Link from "next/link";
import React from "react";

const BreadcrumbItem = ({ as, href, className, children }) => {
  return (
    <li className={classnames(className, "breadcrumb-item")}>
      {href ? (
        <Link href={href} as={as}>
          <a className="text-secondary">{children}</a>
        </Link>
      ) : (
        children
      )}
    </li>
  );
};

export default BreadcrumbItem;
