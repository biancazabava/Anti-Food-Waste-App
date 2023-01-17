import React from "react";

const NotFound = () => {
  return (
    <div className="not-found-container d-flex d-flex justify-content-center">
      <div className="not-found-card card p-5 shadow w-50 align-items-center">
        <h1 className="not-found-h4 fs-1 fw-bold my-3">404</h1>
        <p className="not-found-p fs-3 fw-bold text-secondary mb-3">
          Ups.. aceasta pagina nu exista :(
        </p>
      </div>
    </div>
  );
};

export default NotFound;
