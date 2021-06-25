import classnames from "classnames";
import React, { useContext } from "react";
import { modalContext } from "./Modal";

const ModalHeader = ({ closable, as: Tag, className, children }) => {
  const { onClose } = useContext(modalContext);
  return (
    <div className="modal-header">
      <Tag className={classnames(className, "modal-title")}>{children}</Tag>
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

ModalHeader.defaultProps = {
  closable: true,
  as: "h6",
};

export default ModalHeader;
