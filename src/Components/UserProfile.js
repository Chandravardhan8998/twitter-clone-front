/* eslint-disable no-self-assign */
import React from "react";
import ProfilePic from "./Profile/ProfilePic";
import { isAuthenticated } from "../Helper/authHelper";
import { API } from "../backend";
import moment from "moment";
import { Link } from "react-router-dom";

export default function UserProfile({ userData }) {
  const { user, token } = isAuthenticated();
  let username = userData.username;
  const auth = user.username === username;

  const follow = () => {
    fetch(`${API}/follow/${username}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.error) {
        console.log(res.error);
      }
      window.location.href = window.location.href;
    });
  };

  return (
    <div className="row border border-top-0 border-bottom-0 border-dark bg-dark p-2 user-profile">
      <div className="col-lg-3">
        <ProfilePic
          className="p-1 rounded-circle"
          username={userData.username}
          resolution={{ width: "100%", minHeight: "100px" }}
        />
        {auth ? (
          <Link
            to="/upload/profile"
            className="btn btn-block btn-primary rounded-pill"
          >
            Upload Image
          </Link>
        ) : null}
      </div>
      <div className="col-lg-7 p-4">
        <div className="row">
          <div className="col-lg-12">
            {/* //name and username */}
            <span>
              <span className="text-white h3 p-1">{userData.name}</span>
              <span className="text-light h6 p-1">@{userData.username}</span>
            </span>
            {/* //name and username */}
          </div>
          <div className="col-lg-10">
            <p className="text-light p-1 py-2">{userData.bio}</p>
          </div>
          <div className="col-2">
            {!auth ? (
              <button
                onClick={follow}
                className="btn btn-primary rounded-pill my-2"
              >
                {userData.youFollow
                  ? "Unfollow"
                  : userData.followYou
                  ? "Follow Back"
                  : "Follow"}
              </button>
            ) : (
              <Link
                to={`/user/update/${username}`}
                className="btn btn-primary rounded-pill my-2"
              >
                Update
              </Link>
            )}
          </div>
          <div className="col-lg-12">
            <p className="text-info px-1 font-weight-bold">
              Birth : {moment(userData.birthdate).calendar()}
            </p>
            <p className="text-info px-1 font-weight-bold">
              Location : {userData.location}
            </p>
          </div>

          <div className="col-lg-12 px-4 py-1">
            <div className="row">
              <div className="col-lg-4 text-dark shadow-lg font-weight-bold bg-light py-1 text-center mx-1 rounded-pill my-1 ">
                Following
                <b> : {userData.following}</b>
              </div>
              <div className="col-lg-4 text-dark shadow-lg font-weight-bold bg-light p-1 text-center mx-1 rounded-pill my-1 ">
                Followers
                <b> : {userData.followers}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
