import classnames from "classnames";
import React from "react";
import AppImage from "../../../components/AppImage";

const ProductCard = ({ product, className, onClick }) => {
  const { image, title, description, price } = product || {};

  return (
    <div
      className={classnames(className, "card")}
      onClick={() => onClick(product)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body p-2 p-lg-3">
        <div className="row g-0">
          <div className="col-9 pe-2">
            <h6 className="card-title mb-1">{title}</h6>
            <p className="card-text text-muted text-truncate small lh-sm mb-1">
              {description}
            </p>
            <p className="card-text text-muted small">€{price}</p>
          </div>
          {!!image && (
            <div className="col-3">
              <AppImage className="rounded" squared alt={title} src={image} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
