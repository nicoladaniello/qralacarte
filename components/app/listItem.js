import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ data, isLink, ...rest }) => {
  const { icon, iconClass, title, description } = data;

  return (
    <a
      {...rest}
      className="list-group-item list-group-item-action px-1 rounded-0"
    >
      <div className="row no-gutters align-items-center">
        {!!icon && (
          <div className="col-1">
            <FontAwesomeIcon
              className={iconClass ? iconClass : ""}
              icon={icon}
            />
          </div>
        )}
        <div className="col">
          <p className="mb-0">{title}</p>
          <p className="mb-0 small text-muted">{description}</p>
        </div>
        {!!isLink && (
          <div className="col-1">
            <span className="float-right">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        )}
      </div>
    </a>
  );
};

export default ListItem;
