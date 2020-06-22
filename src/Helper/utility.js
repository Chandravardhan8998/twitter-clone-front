import React from "react";
export const Message = (msg, type) => {
  return (
    <div
      className={
        type === "Error" ? "alert alert-danger" : "alert alert-success"
      }
    >
      <h5>{msg}</h5>
    </div>
  );
};
