import React from "react";
import classnames from "classnames";

const FormSubmit = React.forwardRef(
  ({ className, block, children, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="submit"
        className={classnames(className, "btn btn-primary", {
          "btn-block": block,
        })}
      >
        {children}
      </button>
    );
  }
);

export default FormSubmit;
