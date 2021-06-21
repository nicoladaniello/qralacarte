import {
  faEllipsisV,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React from "react";
import AppImage from "../../../components/AppImage";
import Dropdown from "../../../components/Dropdown";

const EditProductCard = ({ product, className, onEdit, onDelete }) => {
  const { _key, image, title, description, price } = product || {};

  return (
    <div className={classnames(className, "card")}>
      <div className="row g-0 align-items-center">
        <div className="col-lg-4">
          <AppImage alt={title} src={image} />
        </div>
        <div className="col-lg-8">
          <div className="card-body py-1">
            <div className="row g-0 align-items-center mb-0">
              <div className="col-lg-4 order-lg-last text-lg-end">
                <Dropdown>
                  <Dropdown.Toggle className="btn btn-link link-dark btn-sm">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="btn-sm"
                      onClick={() => onEdit(product)}
                    >
                      <FontAwesomeIcon className="me-1" icon={faPencilAlt} />
                      edit product
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="link-danger btn-sm"
                      onClick={() => onDelete(product)}
                    >
                      <FontAwesomeIcon className="me-1" icon={faTrash} />
                      delete product
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="col-lg-8 pe-lg-2">
                <h5 className="text-truncate mb-0">{title}</h5>
              </div>
            </div>

            <p className="card-text text-muted text-truncate small mb-0">
              {description || "No description provided."}
            </p>
            <p className="card-text text-muted text-truncate small">
              {price ? `€${price}` : "No price provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductCard;
