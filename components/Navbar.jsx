import classnames from "classnames";
import Link from "next/link";
import React from "react";
import useAuth from "./auth/useAuth";
import Brand from "./common/Brand";
import Dropdown from "./common/Dropdown";
import { PropTypes } from "prop-types";

const Navbar = ({ fluid, className }) => {
  const { currentUser, signOut } = useAuth();

  return (
    <>
      <nav
        className={classnames(
          className,
          "navbar navbar-expand-lg navbar-light bg-white"
        )}
      >
        <div
          className={classnames({
            "container-fluid": fluid,
            container: !fluid,
          })}
        >
          <Link href="/">
            <a className="navbar-brand">
              <Brand />
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={"false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link active" aria-current={"page"}>
                    Home
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/" passHref>
                  <a className="nav-link">How it works</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/" passHref>
                  <a className="nav-link">Pricing</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/" passHref>
                  <a className="nav-link">About</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/" passHref>
                  <a className="nav-link">Contact us</a>
                </Link>
              </li>
              {!currentUser && (
                <li className="nav-item">
                  <Link href="/signin" passHref>
                    <a className="nav-link">Sign in</a>
                  </Link>
                </li>
              )}

              {!!currentUser && (
                <Dropdown
                  id="navbarDropdownUser"
                  as="li"
                  className="nav-item"
                  title={<strong>{currentUser.displayName}</strong>}
                >
                  <li>
                    <Link href="/admin">
                      <a className="dropdown-item">Admin</a>
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={signOut}>
                      Sign out
                    </a>
                  </li>
                </Dropdown>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
};

export default Navbar;
