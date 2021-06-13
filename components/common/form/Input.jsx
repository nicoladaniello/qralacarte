import classnames from "classnames";
import uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";

const Input = ({
  name,
  options,
  defaultValue,
  id,
  type,
  className,
  placeholder,
  ...rest
}) => {
  const { formState, register } = useFormContext();

  if (!id) id = uniqueId(`form-input-${name}-`);
  
  return (
    <input
      {...rest}
      {...register(name, options)}
      type={type}
      className={classnames(className, "form-control", {
        "is-invalid": formState.errors[name],
      })}
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  options: PropTypes.object,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  defaultValue: "",
};

export default Input;
