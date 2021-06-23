import {
  faBars,
  faEllipsisV,
  faPencilAlt,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Dropdown from "../../../components/Dropdown";

const EditSectionCard = ({
  section,
  className,
  children,
  onAddProduct,
  onReorder,
  onEdit,
  onDelete,
}) => {
  const { title, description } = section || {};

  return (
    <div className={classnames(className, "card")}>
      <div className="card-body">
        <div className="row g-0 align-items-center mb-0">
          <div className="col-lg-4 order-lg-last mb-2 mb-lg-0">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-dark btn-sm me-2"
                onClick={() => onAddProduct(section)}
              >
                <FontAwesomeIcon className="me-1" icon={faPlus} /> add product
              </button>
              <Dropdown>
                <Dropdown.Toggle className="btn btn-link link-dark btn-sm">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="btn-sm" onClick={() => onReorder()}>
                    <FontAwesomeIcon className="me-1" icon={faBars} /> reorder
                    sections
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="btn-sm"
                    onClick={() => onEdit(section)}
                  >
                    <FontAwesomeIcon className="me-1" icon={faPencilAlt} /> edit
                    section
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="link-danger btn-sm"
                    onClick={() => onDelete(section)}
                  >
                    <FontAwesomeIcon className="me-1" icon={faTrash} /> delete
                    section
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="col-lg-8 pe-2">
            <h5 className="mb-0">{title}</h5>
            <p className="card-text text-muted text-truncate">
              {description || "No description provided."}
            </p>
          </div>
        </div>
        <hr className="mt-1" />
        {children}
      </div>
    </div>
  );
};

EditSectionCard.propTypes = {
  section: PropTypes.object,
  className: PropTypes.string,
  onEdit: PropTypes.func,
};

EditSectionCard.defaultProps = {
  section: {},
  onEdit: () => {},
};

export default EditSectionCard;
