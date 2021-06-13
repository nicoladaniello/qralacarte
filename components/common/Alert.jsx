import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const Alert = ({ success, info, warning, danger, children }) => {
  const type = success
    ? "success"
    : info
    ? "info"
    : warning
    ? "warning"
    : danger
    ? "danger"
    : "";

  return (
    <div
      className={`alert alert-${type} d-flex align-items-center`}
      role="alert"
    >
      <div className="me-2">
        {warning || danger ? (
          <FontAwesomeIcon icon={faExclamationTriangle} />
        ) : success ? (
          <FontAwesomeIcon icon={faCheckCircle} />
        ) : info ? (
          <FontAwesomeIcon icon={faInfoCircle} />
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
};

Alert.propTypes = {
  success: PropTypes.bool,
  info: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  type: PropTypes.oneOf(["success", "info", "warning", "danger"]),
};

export default Alert;
