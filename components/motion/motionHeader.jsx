import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const MotionHeader = () => {
  return (
    <div
      className="d-none d-lg-flex row position-lg-absolute align-items-center justify-content-center"
      style={{ top: "-30%", right: "5%", width: "90%" }}
    >
      <div className="col-12 col-lg-6">
        <div
          className="row no-gutters align-items-center bg-tertiary text-white small p-1"
          style={{ transform: "translate3D(20%, 0, 0)" }}
        >
          <div className="col-3 text-center">
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div className="col-9">Your digital menu with like a mobile App.</div>
        </div>
        <motion.img
          animate={{ translateY: [0, 5, 0] }}
          transition={{
            duration: 3,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            loop: Infinity,
          }}
          className="img-fluid"
          alt="mock1"
          src="images/app-qrcode.png"
        />
      </div>
      <div className="col-12 col-lg-6">
        <motion.img
          animate={{ translateY: [0, 5, 0] }}
          transition={{
            duration: 3,
            delay: 0.5,
            times: [0, 0.5, 1],
            ease: "easeInOut",
            loop: Infinity,
          }}
          className="img-fluid"
          alt="mock2"
          src="images/app-restaurant.png"
        />
        <div
          className="row no-gutters align-items-center bg-secondary text-white small p-1 mb-5"
          style={{ transform: "translate3D(-50%, 0, 0)" }}
        >
          <div className="col-3 text-center">
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div className="col-9">Customisable QR to match your brand.</div>
        </div>
      </div>
    </div>
  );
};

export default MotionHeader;
