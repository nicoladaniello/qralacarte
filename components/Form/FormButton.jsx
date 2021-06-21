import React from "react";
import classNames from "classNames";

const FormButton = React.forwardRef(
  ({ className, block, children, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={classNames(className, "btn btn-light", {
          "btn-block": block,
        })}
      >
        {children}
      </button>
    );
  }
);

export default FormButton;
