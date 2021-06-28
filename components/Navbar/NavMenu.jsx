import {
  faCaretDown,
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import useAuth from "../../features/auth/useAuth";
import Dropdown from "../Dropdown";

const NavMenu = ({ className }) => {
  const { currentUser, signOut } = useAuth();

  const isLoggedIn = !!currentUser;
  const isUserAnonymous = currentUser?.signInProvider === "anonymous";

  return (
    <ul className={className}>
      {/* <li className="nav-item">
        <Link href="/">
          <a className="nav-link active" aria-current={"page"}>
            Home
          </a>
        </Link>
      </li> */}

      {/* <li className="nav-item">
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
      </li> */}
      {!isLoggedIn && (
        <li className="nav-item">
          <Link href="/signin" passHref>
            <a className="nav-link">Sign in</a>
          </Link>
        </li>
      )}
      {isLoggedIn && (
        <Dropdown as="li" className="nav-item">
          <Dropdown.Toggle className="nav-link d-flex align-items-center">
            <strong
              className="d-inline-block text-truncate"
              style={{ maxWidth: "250px" }}
            >
              {isUserAnonymous
                ? "Anonymous"
                : currentUser.displayName || currentUser.email}{" "}
            </strong>
            <FontAwesomeIcon className="ms-1" icon={faCaretDown} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Link href="/admin">
              <span className="me-1">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>{" "}
              Admin page
            </Dropdown.Link>
            {!isUserAnonymous && (
              <Dropdown.Item onClick={() => signOut()}>
                <span className="me-1">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </span>{" "}
                Sign out
              </Dropdown.Item>
            )}
            {isUserAnonymous && (
              <Dropdown.Link href="/signin">
                <span className="me-1">
                  <FontAwesomeIcon icon={faSignInAlt} />
                </span>{" "}
                Sign in
              </Dropdown.Link>
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </ul>
  );
};

export default NavMenu;
