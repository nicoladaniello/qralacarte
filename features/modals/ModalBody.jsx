import classnames from "classnames";
import React from "react";

const ModalBody = ({ className, children }) => (
  <div className={classnames(className, "modal-body")}>{children}</div>
);

export default ModalBody;
