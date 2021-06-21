import {
  faMapMarkerAlt,
  faPencilAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import Link from "next/link";
import React from "react";
import AppImage from "../../components/AppImage";

const MenuCard = ({ menu, className }) => {
  const { _key, image, title, description, address, tel } = menu || {};

  return (
    <div className={classnames(className, "card")}>
      <div className="row g-0 align-items-center">
        <div className="col-sm-5 mb-3 mb-sm-0">
          <Link href="/admin/menus/[slug]" as={`/admin/menus/${_key}`}>
            <a>
              <AppImage src={image} />
            </a>
          </Link>
        </div>
        <div className="col-sm-7">
          <div className="card-body py-1">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">{title}</h5>
              <Link href="/admin/menus/[slug]" as={`/admin/menus/${_key}`}>
                <a className="small">
                  <FontAwesomeIcon icon={faPencilAlt} /> Edit
                </a>
              </Link>
            </div>
            <p className="card-text text-truncate" style={{ height: "2.2em" }}>
              {description ? description : "No description provided."}
            </p>
            <ul className="card-text fa-ul ms-3">
              <li className="list-inline-item col-12 d-flex align-items-center">
                <p className="text-muted text-truncate small mb-0">
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
                <p className="text-muted text-truncate small mb-0">
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

export default MenuCard;
