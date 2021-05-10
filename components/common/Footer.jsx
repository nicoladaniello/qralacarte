import React from "react";

const Footer = () => {
  return (
    <footer className="container">
      <div className="jumbotron text-center py-2">
        Copyright © {new Date().getFullYear()} QRalacarte
      </div>
    </footer>
  );
};

export default Footer;
