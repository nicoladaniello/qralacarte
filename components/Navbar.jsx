import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar px-2 navbar-expand-lg navbar-light bg-transparent">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">
            <b>
              <span className="border-primary border-top border-bottom py-1">
                QR
              </span>
              alacarte
            </b>
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link">
                  How it works
                  {/* <span className="sr-only">(current)</span> */}
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Pricing</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">About us</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Contact</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
