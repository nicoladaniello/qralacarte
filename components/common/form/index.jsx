import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Field from "./Field";
import FloatingLabelField from "./FloatingLabelField";
import Input from "./Input";
import Select from "./Select";

const Form = ({ defaultValues, onSubmit, children, ...rest }) => {
  const methods = useForm({ defaultValues });

  const handleSubmit = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form {...rest} onSubmit={methods.handleSubmit(handleSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

Form.Input = Input;
Form.Select = Select;
Form.Field = Field;
Form.FloatingLabelField = FloatingLabelField;

export default Form;
