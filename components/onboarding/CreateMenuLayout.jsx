import React from "react";

const CreateMenuLayout = ({ children }) => {
  React.Children.toArray(children).map(x => console.log(x.name));
  return (
    <div className="row no-gutters align-items-center h-100">
      <div className="col-lg-5">
        <div className="container">
          <div className="d-flex justify-content-center">
            <h1 className="display-4 mb-4">
              Crea
              <br />
              un menu digitale
              <br />
              per il tuo locale
            </h1>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default CreateMenuLayout;
