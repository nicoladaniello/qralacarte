import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const MenuSectionCard = ({ section, className, children, onEdit }) => {
  const { title, description } = section || {};

  return (
    <div className={classnames(className, "card")}>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title mb-0">{title}</h5>
          <button className="btn btn-link" onClick={() => onEdit(section)}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        </div>
        <p className="card-text text-muted">{description}</p>
        {children}
      </div>
    </div>
  );
};

MenuSectionCard.propTypes = {
  section: PropTypes.object,
  className: PropTypes.string,
  onEdit: PropTypes.func,
};

MenuSectionCard.defaultProps = {
  section: {},
  onEdit: () => {},
};

export default MenuSectionCard;
