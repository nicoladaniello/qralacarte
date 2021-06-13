import classnames from "classnames";
import uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";

const Select = ({
  name,
  options,
  defaultValue,
  id,
  className,
  children,
  ...rest
}) => {
  const { formState, register, setValue } = useFormContext();

  if (!id) id = uniqueId(`form-select-${name}-`);

  return (
    <>
      <select
        {...rest}
        {...register(name, options)}
        className={classnames(className, "form-select", {
          "is-invalid": formState.errors[name],
        })}
        id={id}
        defaultValue={defaultValue}
      >
        {children}
      </select>
    </>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.object,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  id: PropTypes.string,
  className: PropTypes.string,
};

Select.defaultProps = {
  defaultValue: "",
};

export default Select;
