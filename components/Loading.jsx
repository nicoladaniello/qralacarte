import React from "react";
import classnames from "classnames";

const Loading = (className) => {
  return (
    <div
      className={classnames(className, "m-auto spinner-border")}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loading;
