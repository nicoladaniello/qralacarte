import React from "react";
import { useForm } from "react-hook-form";

const baseUrl = "https://qralacarte.com/";

const UrlFormWizard = ({ data, onSubmit }) => {
  const { handleSubmit, register } = useForm();

  return (
    <>
      <h2 className="mb-0">Inserisci un indirizzo.</h2>
      <p className="text-muted">Questo sarà l'URL del tuo menu digitale.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating mb-3">
          <input
            {...register("slug")}
            defaultValue={data.slug}
            type="text"
            className="form-control d-inline fw-bold"
            style={{ paddingLeft: "11rem" }}
            id="floatingInput"
            placeholder="il-nome-del-tuo-locale"
          />
          <span
            className="text-muted"
            style={{
              position: "absolute",
              left: 0,
              padding: "1.45rem 0.75rem",
            }}
          >
            {baseUrl}
          </span>
          <label
            htmlFor="floatingInput"
            style={{
              opacity: "0.65",
              transform: "scale(0.85) translateY(-0.5rem) translateX(0.15rem)",
            }}
          >
            URL
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Crea URL
        </button>
      </form>
    </>
  );
};

export default UrlFormWizard;
