import React from "react";

export default function Loading() {
  return (
    <span className="progress m-3">
      <span
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: "100%" }}
      ></span>
    </span>
  );
}
