import React from "react";
import classnames from "classnames";

const FormField = React.forwardRef(({ label, children, ...rest }, ref) => {
  return (
    <div {...rest} ref={ref}>
      {children}
    </div>
  );
});

const FormFieldLabel = React.forwardRef(({ children, ...rest }, ref) => {
  return (
    <label {...rest} ref={ref} className="form-label">
      {children}
    </label>
  );
});

const FormFieldInvalidFeedback = React.forwardRef(
  ({ children, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className="invalid-feedback">
        {children}
      </div>
    );
  }
);

const FormFieldInput = React.forwardRef(
  ({ invalid, children, ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        className={classnames("form-control", {
          "is-invalid": invalid,
        })}
      />
    );
  }
);

const FormFieldTextArea = React.forwardRef(
  ({ invalid, children, ...rest }, ref) => {
    return (
      <textarea
        {...rest}
        ref={ref}
        className={classnames("form-control", {
          "is-invalid": invalid,
        })}
      />
    );
  }
);

const FormFieldSelect = React.forwardRef(
  (
    { invalid, options, children, getOptionLabel, getOptionValue, ...rest },
    ref
  ) => {
    return (
      <select
        {...rest}
        ref={ref}
        className={classnames("form-select", {
          "is-invalid": invalid,
        })}
      >
        {!!options &&
          options.map((opt) => (
            <option key={getOptionValue(opt)} value={getOptionValue(opt)}>
              {getOptionLabel(opt)}
            </option>
          ))}
      </select>
    );
  }
);

FormField.Label = FormFieldLabel;
FormField.InvalidFeedback = FormFieldInvalidFeedback;
FormField.Input = FormFieldInput;
FormField.TextArea = FormFieldTextArea;
FormField.Select = FormFieldSelect;

export default FormField;
