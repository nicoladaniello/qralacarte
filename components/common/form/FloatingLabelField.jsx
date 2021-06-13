import classnames from "classnames";
import uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";

const FloatingLabel = ({ label, name, id, className, children, ...rest }) => {
  React.Children.only(children);

  const { formState } = useFormContext();

  if (!id) id = uniqueId(`form-input-${name}-`);
  const child = React.cloneElement(children, { id, name });

  return (
    <div {...rest} className={classnames(className, "form-floating")}>
      {child}
      <label htmlFor={id}>{label}</label>
      {formState.errors[name] && (
        <div className="invalid-feedback">{formState.errors[name].message}</div>
      )}
    </div>
  );
};

FloatingLabel.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default FloatingLabel;
