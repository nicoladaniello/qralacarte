import Link from "next/link";
import React from "react";
import {
  Container,
  Nav,
  Navbar as BSNavbar,
  NavDropdown,
} from "react-bootstrap";
import useAuth from "./auth/useAuth";

const Navbar = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <BSNavbar bg="transparent" variant="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <BSNavbar.Brand>
            <b>
              <span className="border-primary border-top border-bottom py-1">
                QR
              </span>
              alacarte
            </b>
          </BSNavbar.Brand>
        </Link>
        <BSNavbar.Toggle aria-controls="top-navbar" />
        <BSNavbar.Collapse id="top-navbar">
          <Nav className="ml-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/" passHref>
              <Nav.Link>How it works</Nav.Link>
            </Link>
            <Link href="/" passHref>
              <Nav.Link>Pricing</Nav.Link>
            </Link>
            <Link href="/" passHref>
              <Nav.Link>About</Nav.Link>
            </Link>
            <Link href="/" passHref>
              <Nav.Link>Contact us</Nav.Link>
            </Link>
            {!currentUser && (
              <Link href="/signin" passHref>
                <Nav.Link>Sign in</Nav.Link>
              </Link>
            )}
            {currentUser && (
              <NavDropdown
                title={<b>{currentUser.displayName}</b>}
                id="navbar-dropdown-user"
              >
                <Link href="/admin" passHref>
                  <NavDropdown.Item>Admin</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
