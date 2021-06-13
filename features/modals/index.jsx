import classnames from "classnames";
import uniqueId from "lodash/uniqueId";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Ensure we are running on a browser.
const isClient = typeof window !== "undefined";
// Modals container parent.
const parent = isClient ? document.getElementById("__next") : null;
// Modals container.
const root = isClient ? document.createElement("div") : null;
if (root) root.setAttribute("id", "modal-root-container");
// Modal ID
const modalId = uniqueId("modal-");

const context = createContext({});

/**
 *
 */
const Modal = ({ isOpen, onClose, fullScreen, children }) => {
  const ref = useRef();

  // Listener for backdrop click
  useEffect(() => {
    if (!isClient) return;

    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };

    document.addEventListener("mousedown", onClick);
    return () => void document.removeEventListener("mousedown", onClick);
  }, [ref]);

  // Initialize modal container
  useEffect(() => {
    if (parent && !parent.contains(root)) parent.appendChild(root);
    return () => {
      if (parent && parent.contains(root)) parent.removeChild(root);
    };
  }, []);

  return !isClient
    ? null
    : createPortal(
        <context.Provider value={{ onClose }}>
          {isOpen && (
            <>
              <div
                className="modal show d-block"
                tabIndex="-1"
                aria-labelledby={`${modalId}-label`}
                aria-hidden={isOpen}
                aria-modal="true"
                role="dialog"
              >
                <div
                  ref={ref}
                  className={classnames("modal-dialog", {
                    "modal-fullscreen-sm-down": fullScreen,
                  })}
                >
                  <div className="modal-content">{children}</div>
                </div>
              </div>
              <div
                className="modal-backdrop show"
                onClick={() => onClose()}
              ></div>
            </>
          )}
        </context.Provider>,
        root
      );
};

Modal.Header = ({ closable = true, children }) => {
  const { onClose } = useContext(context);

  return (
    <div className="modal-header">
      <h6 className="modal-title" id={`${modalId}-label`}>
        {children}
      </h6>
      {closable && (
        <button
          type="button"
          className="btn-close"
          onClick={() => onClose()}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
};

Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;

Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;

export default Modal;
