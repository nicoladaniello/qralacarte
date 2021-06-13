import uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";

const Field = ({ label, name, id, className, children, ...rest }) => {
  React.Children.only(children);

  const { formState } = useFormContext();

  if (!id) id = uniqueId(`form-input-${name}-`);

  const child = React.cloneElement(children, { id, name });

  return (
    <div {...rest} className={className}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      {child}
      {formState.errors[name] && (
        <div className="invalid-feedback">{formState.errors[name].message}</div>
      )}
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};

Field.defaultProps = {
  type: "text",
  defaultValue: "",
};

export default Field;
