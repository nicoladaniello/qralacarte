import React from "react";
import PirceTag from "./priceTag";

const MenuItem = ({ data, onClick, ...rest }) => {
  const { name, description, images } = data;

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
          <PirceTag data={data} />
        </div>
        {!!images && (
          <div className="col-auto ml-auto">
            <div
              className="app-item-thumb"
              style={{ backgroundImage: `url(${images.thumb})` }}
            ></div>
          </div>
        )}
      </div>
    </a>
  );
};

export default MenuItem;
