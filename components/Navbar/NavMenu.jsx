import Link from "next/link";
import React from "react";
import useAuth from "../auth/useAuth";
import Dropdown from "../common/Dropdown";

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
        <Dropdown
          id="NavMenuDropdownUser"
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
  );
};

export default NavMenu;
