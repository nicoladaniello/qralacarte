import React from "react";
import Modal from ".";

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  danger,
  children,
  onConfirm,
  ...rest
}) => {
  return (
    <Modal {...rest} isOpen={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-light" onClick={onClose}>
          Dismiss
        </button>
        <button
          type="button"
          className={`btn btn-${danger ? "danger" : "primary"}`}
          onClick={() => onConfirm()}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
