import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AppModal = ({ data, show, onHide }) => {
  const { img, title } = data;

  return (
    <AnimatePresence>
      {show && (
        <div className={"modal show d-block"}>
          <motion.div
            key="modal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: "backInOut" }}
            className="modal-dialog h-100"
          >
            <div className="modal-content rounded-0 h-100">
              <div className="card border-0">
                <div
                  className="p-1"
                  style={{
                    width: "100%",
                    height: "215px",
                    backgroundImage: `url('${img}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundPositionX: "center",
                    backgroundPositionY: "top",
                    backgroundSize: "contain",
                  }}
                >
                  <button
                    className="close bg-white shadow-lg rounded-circle"
                    style={{ width: "28px", height: "28px", opacity: 1 }}
                    type="button"
                    aria-label="Close"
                    onClick={onHide}
                  >
                    <span aria-hidden="true">
                      <FontAwesomeIcon
                        className="text-primary"
                        icon={faTimes}
                      />
                    </span>
                  </button>
                </div>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AppModal;
