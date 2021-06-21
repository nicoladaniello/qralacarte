import React from "react";
import classNames from "classNames";

const FormSubmit = React.forwardRef(
  ({ className, block, children, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="submit"
        className={classNames(className, "btn btn-primary", {
          "btn-block": block,
        })}
      >
        {children}
      </button>
    );
  }
);

export default FormSubmit;
