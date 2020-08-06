import React from "react";
import Link from "next/link";

const AppFooter = () => {
  return (
    <footer>
      <div className="card">
        <div className="card-body text-center">
          <p className="font-weight-bold mb-0">Hosted by</p>
          <h2 className="mb-0">
            <Link href="/">
              <a>QRalacarte.com</a>
            </Link>
          </h2>
        </div>
        <div className="card-footer border-0 bg-white">
          <p className="mb-0 text-center small">
            Copyright © {new Date().getFullYear()} QRalacarte
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
