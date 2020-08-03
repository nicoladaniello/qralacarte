import React, { forwardRef } from "react";
import Link from "next/link";
import classnames from "classnames";

const AppMenuNavItem = forwardRef(({ id, title, active, onClick }, ref) => (
  <li ref={ref} className="nav-item">
    <a
      onClick={onClick}
      className={classnames(["nav-link badge px-2", { active }])}
    >
      {title}
    </a>
  </li>
));
export default AppMenuNavItem;
