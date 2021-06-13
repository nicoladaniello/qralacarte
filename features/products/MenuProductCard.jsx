import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import ProductImageManager from "./ProductImageManager";

const MenuProductCard = ({ product, className, onEdit }) => {
  const { _key, image, title, description, price } = product || {};

  return (
    <div className={classnames(className, "card")}>
      <div className="card-body">
        <div className="row g-0 align-items-stretch">
          <div className="col-3">
            <ProductImageManager
              image={image}
              alt={title}
              menuId={"TODO"}
              productId={_key}
            />
          </div>
          <div className="col-8 px-2">
            <h6 className="card-title mb-0">{title}</h6>
            <p
              className="card-text text-muted small"
              style={{ lineHeight: 1.3 }}
            >
              <small>{description}</small>
            </p>
            <p className="card-text text-muted small">€{price}</p>
          </div>
          <div className="col-1 d-flex align-items-center">
            <button className="btn btn-link" onClick={() => onEdit(product)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuProductCard.propTypes = {
  product: PropTypes.object,
  onEdit: PropTypes.func,
  className: PropTypes.string,
};

MenuProductCard.defaultProps = {
  product: {},
  onEdit: () => {},
};

export default MenuProductCard;
