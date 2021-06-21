import React from "react";
import classnames from "classnames";

const FormButton = React.forwardRef(
  ({ className, block, children, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={classnames(className, "btn btn-light", {
          "btn-block": block,
        })}
      >
        {children}
      </button>
    );
  }
);

export default FormButton;
