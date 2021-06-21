import classnames from "classnames";
import React, { createContext, useEffect, useRef } from "react";
import ClientOnlyPortal from "../../components/ClientOnlyPortal";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

const isClient = typeof window === "object";

// Modal context
export const modalContext = createContext({});

/**
 * Modal component
 */
const Modal = ({
  isOpen,
  scrollable,
  small,
  large,
  className,
  children,
  onClose,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    if (!isClient || !modalRef.current) return;

    const BSModal = require("bootstrap/js/dist/modal");
    let modal = BSModal.getInstance(modalRef.current);
    if (!modal) modal = new BSModal(modalRef.current);

    modalRef.current.addEventListener("hidden.bs.modal", onClose);

    return () => {
      if (modalRef.current)
        modalRef.current.removeEventListener("hidden.bs.modal", onClose);

      modal.dispose();
    };
  }, [modalRef.current]);

  useEffect(() => {
    if (!modalRef.current) return;

    const BSModal = require("bootstrap/js/dist/modal");
    let modal = BSModal.getInstance(modalRef.current);
    if (!modal) modal = new BSModal(modalRef.current);

    if (isOpen) modal.show();
    else modal.hide();
  }, [modalRef.current, isOpen]);

  return (
    <ClientOnlyPortal selector="#modal-container">
      <modalContext.Provider value={{ onClose }}>
        <div
          ref={modalRef}
          className="modal fade"
          tabIndex="-1"
          aria-hidden={isOpen}
          aria-modal="true"
          role="dialog"
        >
          <div
            className={classnames(
              className,
              "modal-dialog modal-dialog-centered",
              {
                "modal-dialog-scrollable": scrollable,
                "modal-sm": small,
                "modal-lg": large,
              }
            )}
          >
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </modalContext.Provider>
    </ClientOnlyPortal>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
