import React from "react";

export default function Spinner() {
  return (
    <>
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>
    </>
  );
}
