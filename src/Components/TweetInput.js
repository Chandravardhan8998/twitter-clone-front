/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../Helper/authHelper";
import { createTweet } from "../Helper/tweetHelper";
import ProfilePic from "./Profile/ProfilePic";

export default function TweetInput() {
  const [data, setData] = useState({
    tweet: "",
    picture: undefined,
    formData: "",
  });
  const { formData, picture, tweet } = data;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setError("");
    const value =
      name === "picture" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setData({ ...data, [name]: value });
  };

  const preload = () => {
    setData({ formData: new FormData() });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (tweet) {
      setLoading(true);
      createTweet(formData, user.username, token)
        .then((resp) => {
          if (resp.error) {
            setError(resp.error);
          }
          setLoading(false);
          setData({ ...data, tweet: "", picture: undefined });
          window.location.href = `/user/${user.username}`;
        })
        .catch((err) => {
          setLoading(false);
          setData({ ...data, tweet: "", picture: undefined });
        });
    }
  };

  return (
    <div className="row border border-right-0 border-left-0 border-dark py-2">
      <div className="col-lg-2 col-sm-2">
        <div className="col-lg-2 col-sm-2 ">
          <ProfilePic
            username={user.username}
            info="main"
            className={`rounded-circle`}
            resolution={{ maxWidth: "80px" }}
          />
        </div>
      </div>
      <div className="col-lg-10 col-sm-10">
        <form className="my-2">
          <div className="form-row align-items-center ">
            <div className="form-group col-md-12">
              <textarea
                className="form-control bg-transparent border border-dark text-white mx-1"
                rows="3"
                maxLength="200"
                onChange={handleChange("tweet")}
                value={tweet}
                placeholder="What's happning?"
              ></textarea>
            </div>
            <div className="form-group col-md-3">
              <div className="form-group  rounded-lg p-0 border border-primary">
                <input
                  type="file"
                  onChange={handleChange("picture")}
                  className="form-control p-1 bg-primary  border border-primary"
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              {loading ? (
                <span className="progress">
                  <span
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "100%" }}
                  ></span>
                </span>
              ) : (
                <p className="text-warning">{error}</p>
              )}
            </div>
            <div className="form-group col-md-3">
              <button
                onClick={(e) => onSubmit(e, user.username, token, tweet)}
                type="submit"
                className="btn btn-primary px-3 rounded-pill sub-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
