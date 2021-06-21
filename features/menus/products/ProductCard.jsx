import React from "react";
import AppImage from "../../../components/AppImage";

const ProductCard = ({ product, onClick }) => {
  const { image, title, description, price } = product || {};

  return (
    <div className="card h-100" onClick={() => onClick(product)}>
      <div className="card-body">
        <div className="row g-0">
          <div className="col">
            <h5 className="card-title mb-1">{title}</h5>
            <p
              className="card-text text-muted mb-1"
              style={{ lineHeight: 1.3 }}
            >
              {description}
            </p>
            <p className="card-text text-muted">€{price}</p>
          </div>
          {!!image && (
            <div className="col-3">
              <AppImage alt={title} src={image} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
