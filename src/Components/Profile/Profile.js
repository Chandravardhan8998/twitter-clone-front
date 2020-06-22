import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../Helper/authHelper";
import ProfilePic from "./ProfilePic";

const Profile = () => {
  const { user } = isAuthenticated();

  return (
    <div className="row justify-content-center ">
      <div className="col-12">
        <div
          className="card rounded-lg bg-dark shadow my-1"
          style={{ width: "18rem" }}
        >
          <ProfilePic
            username={user.username}
            className={"rounded-circle border border-primary"}
            resolution={{ width: "100%" }}
          />
          <div className="card-body text-white text-left">
            <h4 className="card-title">{user.name}</h4>
            <p className="card-text py-1">{user.bio}</p>
            <Link to={`/user/${user.username}`} className="h5 text-info">
              @{user.username}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
