import React, { useContext } from "react";
import { modalContext } from "./Modal";

const ModalHeader = ({ closable, onClose, children }) => {
  return (
    <div className="modal-header">
      <h6 className="modal-title">{children}</h6>
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

ModalHeader.defaultValues = {
  closable: true,
};

export default ModalHeader;
