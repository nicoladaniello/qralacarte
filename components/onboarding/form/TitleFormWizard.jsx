import classnames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";

const TitleFormWizard = ({ data, onSubmit }) => {
  const { formState, handleSubmit, register } = useForm();

  return (
    <>
      <h2 className="mb-0">Inserisci il nome dell'azienda.</h2>
      <p className="text-muted">Questo sarà il titolo del menú.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating mb-3">
          <input
            {...register("title", {
              required: "Inserisci un nome.",
              minLength: { value: 3, message: "Minimo 3 caratteri" },
            })}
            defaultValue={data.title}
            type="text"
            className={classnames("form-control d-inline", {
              "is-invalid": formState.errors.title,
            })}
            id="floatingInput"
            placeholder="Esempio: Ristorante Bellavista"
          />
          <div className="invalid-feedback">
            {formState.errors?.title?.message}
          </div>
          <label htmlFor="floatingInput">Nome</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          // disabled={!formState.isDirty || !formState.isValid}
        >
          Continua
        </button>
      </form>
    </>
  );
};

export default TitleFormWizard;
