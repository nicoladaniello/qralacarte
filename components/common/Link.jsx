import classnames from "classnames";
import NTLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { PropTypes } from "prop-types";

const Link = ({ href, className, activeClassName, children }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NTLink href={href}>
      <a
        className={classnames(className, { [activeClassName]: isActive })}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </a>
    </NTLink>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Link.defaultProps = {
  activeClassName: "active",
};

export default Link;
