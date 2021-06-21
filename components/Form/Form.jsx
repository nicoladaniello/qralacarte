import React, { forwardRef } from "react";
import FormButton from "./FormButton";
import FormField from "./FormField";
import FormSubmit from "./FormSubmit";

const Form = forwardRef(({ children, ...rest }, ref) => {
  return (
    <form ref={ref} {...rest}>
      {children}
    </form>
  );
});

Form.Field = FormField;
Form.Submit = FormSubmit;
Form.Button = FormButton;

export default Form;
