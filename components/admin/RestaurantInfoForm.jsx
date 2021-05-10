import React from "react";
import firebase from "firebase/app";

const RestaurantInfoForm = ({ data }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    firebase.database().ref(`restaurants/${data.slug}`).set({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row align-items-center mb-3">
        <label for="profile-img" className="col-sm-2 col-form-label">
          Immagine del profilo
        </label>
        <div className="col-sm-10 text-center">
          <img
            id="profile-img"
            className="img-fluid img-thumbnail"
            style={{ width: "180px" }}
            src={data.img}
          />
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <label for="title" className="col-sm-2 col-form-label">
          Nome
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            id="title"
            className="form-control"
            value={data.title}
          />
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <label for="title" className="col-sm-2 col-form-label">
          URL
        </label>
        <div className="col-sm-10">
          <div className="input-group">
            <span className="input-group-text" id="url-prefix">
              qralacarte.com/r/
            </span>
            <input
              type="text"
              className="form-control"
              id="slug"
              aria-describedby="url-prefix"
              value={data.slug}
            />
          </div>
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <label for="email" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            id="email"
            className="form-control"
            value={data.email}
          />
        </div>
      </div>
      <div className="row align-items-center mb-3">
        <label for="tel" className="col-sm-2 col-form-label">
          Telefono
        </label>
        <div className="col-sm-10">
          <input
            type="tel"
            id="tel"
            className="form-control"
            value={data.phone}
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
