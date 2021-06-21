import {
  faMapMarkerAlt,
  faPencilAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React from "react";
import AppImage from "../../components/AppImage";

const MenuInfo = ({ menu, className, onEdit }) => {
  const { image, title, description, address, tel } = menu || {};

  return (
    <div className={classnames(className, "card")}>
      <div className="row g-0 align-items-center">
        <div className="col-lg-5 mb-3 mb-lg-0">
          <AppImage src={image} />
        </div>
        <div className="col-lg-7">
          <div className="card-body">
            <div className="h6 d-flex align-items-center mb-0">
              <span className="text-muted me-auto">Menu information</span>
              <button
                className="btn btn-link btn-sm"
                onClick={() => onEdit(menu)}
              >
                <FontAwesomeIcon className="me-1" icon={faPencilAlt} />
                Edit info
              </button>
            </div>
            <hr className="mt-1" />

            <h1 className="card-title h2">{title}</h1>
            <p className="card-text mb-4">
              {description ? description : "No description provided."}
            </p>

            <ul className="card-text fa-ul ms-3">
              <li className="list-inline-item col-12 d-flex align-items-center">
                <p className="text-muted text-truncate mb-0">
                  <span className="fa-li">
                    <FontAwesomeIcon className="me-1" icon={faMapMarkerAlt} />
                  </span>
                  {!!address ? (
                    <a
                      className="text-reset"
                      href={`http://maps.google.com/?q=${address}`}
                    >
                      {address}
                    </a>
                  ) : (
                    "No address provided"
                  )}
                </p>
              </li>
              <li className="list-inline-item col-12">
                <p className="text-muted text-truncate mb-0">
                  <span className="fa-li">
                    <FontAwesomeIcon className="me-1" icon={faPhone} />
                  </span>
                  {!!tel ? (
                    <a className="text-reset" href={`tel:0039${tel}`}>
                      +39 {tel}
                    </a>
                  ) : (
                    "No phone number provided"
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuInfo;
