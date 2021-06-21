import Link from "next/link";
import React from "react";
import Page from "../components/Page";

const NotFoundPage = () => {
  return (
    <Page className="container d-flex">
      <div
        className="card m-auto text-center border-0"
        style={{ maxWidth: "500px" }}
      >
        <img className="img-fluid" src="/images/illustrations/404.svg" />
        <div className="card-body pt-0">
          <h1 className="card-title">Risorsa non trovata!</h1>
          <p className="card-text">
            Non siamo riusciti a trovare la risorsa che cercavi.
          </p>
          <p className="card-text">
            <Link href="/">
              <a className="btn btn-primary">Torna alla homepage</a>
            </Link>
          </p>
        </div>
      </div>
    </Page>
  );
};

export default NotFoundPage;
