import React from "react";

const Footer = () => {
  return (
    <footer className="container-fluid bg-light">
      <div className="jumbotron text-center py-2">
        <p className="small mb-0">
          <small>Copyright © {new Date().getFullYear()} QRalacarte.com</small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
