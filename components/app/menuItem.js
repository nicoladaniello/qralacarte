import React from "react";

const MenuItem = ({ data, onClick, ...rest }) => {
  const {
    name,
    description,
    price,
    pricePerPerson,
    priceForGrams,
    preordered,
    img,
  } = data;

  return (
    <a
      {...rest}
      onClick={onClick}
      className="list-group-item px-1 list-group-item-action rounded-0"
    >
      <div className="row no-gutters align-items-center">
        <div className="col">
          <p className="mb-0">{name}</p>
          <p className="small text-muted">{description}</p>
          <p className="small text-muted mb-0">
            {!!price && <>€{price}</>}
            {!!pricePerPerson && <> per persona</>}
            {!!priceForGrams && <> per {priceForGrams} grammi</>}
            {!!preordered && <>su ordinazione</>}
          </p>
        </div>
        {!!img && (
          <div className="col-auto ml-auto">
            <img className="img-fluid" alt={name} src={img} />
          </div>
        )}
      </div>
    </a>
  );
};

export default MenuItem;
