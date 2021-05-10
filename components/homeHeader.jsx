import React from "react";
import Link from "next/link";

import MotionHeader from "./motion/motionHeader";

const HomeHeader = () => (
  <header className="container pt-lg-1 pb-lg-3">
    <div className="position-relative jumbotron mb-3 mb-lg-5">
      <div className="row">
        <div className="col-12 col-lg-5">
          <h1 className="display-lg-4">
            Your QR code,
            <br />
            served hot.
          </h1>
          <p className="mb-3">
            We provide modern looking, app-like digital menus for your business.
            Let customers scan your personalised QR code and bring their menu
            live on their devices without downloads.
          </p>
          <p>
            <Link href="/signup">
              <a className="btn btn-primary btn-lg">Get started now</a>
            </Link>
          </p>
        </div>
        <div className="col-12 col-lg-7">
          {/* <MotionHeader /> */}
        </div>
      </div>
    </div>
  </header>
);

export default HomeHeader;
