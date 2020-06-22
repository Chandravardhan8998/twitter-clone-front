import React from "react";
import { Link } from "react-router-dom";

export default function FollowingTab({ user }) {
  return (
    <div className="row align-item-center my-1">
      <div className="col-12 ">
        <span className="font-weight-bold h6 text-white px-1">
          {user.to.name}
        </span>
        <Link className="text-secondary" to={`/user/${user.to.username}`}>
          @{user.to.username}
        </Link>
      </div>
    </div>
  );
}
