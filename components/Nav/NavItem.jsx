import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavItem = ({ href, as, className, children, ...rest }) => {
  const router = useRouter();

  const active = router.asPath === (as ? encodeURI(as) : href);

  return (
    <Link href={href} as={as}>
      <a
        {...rest}
        className={classnames(
          className,
          "nav-link",
          active ? "active" : "text-secondary"
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavItem;
