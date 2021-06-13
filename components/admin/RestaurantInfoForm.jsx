import firebase from "firebase/app";
import React from "react";
import { useForm } from "react-hook-form";

const RestaurantInfoForm = ({ values }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data);

    firebase.database().ref(`restaurants/${values.slug}`).set({});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row align-items-center mb-3">
        <label htmlFor="profile-img" className="col-sm-2 col-form-label">
          Immagine del profilo
        </label>
        <div className="col-sm-10 text-center">
          <img
            id="profile-img"
            className="img-fluid img-thumbnail"
            style={{ width: "180px" }}
            src={values.img}
          />
        </div>
        <input type="hidden" {...register("img")} defaultValue={values.img} />
      </div>
      <div className="row align-items-center mb-3">
        <label htmlFor="title" className="col-sm-2 col-form-label">
          Nome
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="title"
            className="form-control"
            {...register("title")}
            defaultValue={values.title}
          />
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <label htmlFor="title" className="col-sm-2 col-form-label">
          URL
        </label>
        <div className="col-sm-10">
          <span className="lead">
            qralacarte.com/r/
            <span className="fw-bold">{values.slug}</span>
          </span>
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <label htmlFor="email" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email")}
            defaultValue={values.email}
          />
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <label htmlFor="tel" className="col-sm-2 col-form-label">
          Telefono
        </label>
        <div className="col-sm-10">
          <input
            type="tel"
            id="tel"
            className="form-control"
            {...register("tel")}
            defaultValue={values.tel}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Modifica
      </button>
    </form>
  );
};

export default RestaurantInfoForm;
