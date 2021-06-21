import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import useAuth from "../auth/useAuth";
import Dropdown from "../Dropdown";

const NavMenu = ({ className }) => {
  const { currentUser, signOut } = useAuth();

  return (
    <ul className={className}>
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
        <Dropdown as="li" className="nav-item">
          <Dropdown.Toggle className="nav-link">
            <strong>
              {currentUser.displayName} <FontAwesomeIcon icon={faCaretDown} />
            </strong>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Link href="/admin">Admin</Dropdown.Link>
            <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </ul>
  );
};

export default NavMenu;
