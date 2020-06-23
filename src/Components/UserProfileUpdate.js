/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-self-assign */
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../Helper/authHelper";

import moment from "moment";

import { getProfile, editProfile } from "../Helper/userHelper";
import { Redirect, Link } from "react-router-dom";
import Ring from "./loader/Ring";

export default function UserProfile({ match }) {
  const [error, seterror] = useState("");
  const { user } = isAuthenticated();
  const [userData, setUserData] = useState({});
  const [loading, setloading] = useState(false);
  const [redirect, setredirect] = useState(false);
  const auth = match.params.username === user.username;

  useEffect(() => {
    setloading(true);
    getProfile(user.username)
      .then((res) => {
        if (res.error) {
          return console.log(res.error);
        }
        setUserData(res);
        setloading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    seterror("");
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const update = () => {
    editProfile(user.username, userData)
      .then((res) => {
        if (res.error) {
          seterror("Failed ! ( Username is Taken )");
          return console.log(res.err);
        }
        console.log("Updated");

        let localData = JSON.parse(localStorage.getItem("jwt"));
        localData.user = {
          ...localData.user,
          bio: userData.bio,
          username: userData.username,
          name: userData.name,
          location: userData.location,
          birthdate: userData.birthdate,
        };
        localStorage.setItem("jwt", JSON.stringify(localData));
        return setredirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return auth ? (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-lg-12">
          <h5 className=" text-white text-center">{error}</h5>
        </div>
        <div className="col-lg-4"></div>
        {loading ? (
          <Ring />
        ) : (
          <div className="col-lg-4  border border-primary p-4 text-left text-white">
            <div className="row">
              <div className="col-lg-12 py-2">
                <label>Name : </label>
                <input
                  type="text"
                  value={userData.name}
                  className="form-control"
                  onChange={handleChange("name")}
                />
              </div>
              <div className="col-lg-12 py-2">
                <label>Username : </label>
                <input
                  type="text"
                  value={userData.username}
                  className="form-control"
                  onChange={handleChange("username")}
                />
              </div>
              <div className="col-lg-12 py-2">
                <label className="text-light p-1 py-2">Bio</label>
                <textarea
                  onChange={handleChange("bio")}
                  className="form-control"
                  value={userData.bio}
                  rows="3"
                ></textarea>
              </div>
              <div className="col-lg-12 py-2">
                <label>Birth : {moment(userData.birthdate).calendar()}</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={handleChange("birthdate")}
                />
              </div>
              <div className="col-lg-12 py-2">
                <label>Location </label>
                <input
                  type="text"
                  value={userData.location}
                  className="form-control"
                  onChange={handleChange("location")}
                />
              </div>
              <div className="col-lg-12 py-2">
                <button
                  onClick={update}
                  className="btn btn-primary btn-block rounded-pill my-2"
                >
                  Update
                </button>
                <Link
                  to={`/user/${match.params.username}`}
                  className="btn btn-warning btn-block rounded-pill my-2"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {redirect && <Redirect path="/me" />}
    </div>
  ) : (
    <Redirect to={`/user/${user.username}`} />
  );
}
