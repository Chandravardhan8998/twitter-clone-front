/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./Navbar";
import { Link, Redirect } from "react-router-dom";
import Container from "../Components/Container";
import { isAuthenticated } from "../Helper/authHelper";
import Tweet from "../Components/Tweet";
import FollowingTab from "../Components/FollowingTab";
import { getProfile, getFollowers } from "../Helper/userHelper";
import { getTweets } from "../Helper/tweetHelper";
import UserProfile from "../Components/UserProfile";
import Loading from "../Components/Loading";
import Ring from "../Components/loader/Ring";

export default function UserBoard({ match }) {
  const [userData, setUserData] = useState({});
  const [userTweets, setUserTweets] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(false);
  const [loadingP, setLoadingP] = useState(false);
  const [loadingT, setLoadingT] = useState(false);
  const [loadingF, setLoadingF] = useState(false);
  const { user } = isAuthenticated();
  let username = match.params.username ? match.params.username : user.username;
  useEffect(() => {
    setLoadingP(true);
    setLoadingT(true);
    setLoadingF(true);
    if (isAuthenticated()) {
      getFollowers(username)
        .then((res) => {
          if (res.error) {
            setError(res.error);
            return console.log(res.error);
          }
          setFollowers(res);
          setLoadingF(false);
        })
        .catch((err) => {
          setLoadingF(false);
        });
      getTweets(username)
        .then((res) => {
          if (res.error) {
            setLoadingT(false);
            return console.log(res.error);
          }

          setUserTweets(res);
          setLoadingT(false);
        })
        .catch((err) => {
          setLoadingT(false);
        });
      getProfile(username)
        .then((res) => {
          if (res.error) {
            setLoadingP(false);
            setUserData(null);
            return console.log(res.error);
          }
          setUserData(res);
          setLoadingP(false);
        })
        .catch((err) => {
          setUserData(null);
          setLoadingP(false);
        });
    }
  }, [username]);

  const userInfo = () => {
    return (
      <div className="row">
        <div className="col-lg-2">
          <Navbar />
        </div>
        <div className="col-lg-10 ">
          {loadingP ? (
            <div className="row border border-top-0 border-bottom-0 border-dark bg-dark p-2">
              <Ring />
            </div>
          ) : userData ? (
            <UserProfile userData={userData} />
          ) : (
            <Redirect to="/me" />
          )}

          <div className="row  border border-top-0 border-bottom-0 border-dark p-0">
            <div className="col-lg-8 ">
              {loadingT ? (
                <Loading />
              ) : userTweets.length > 0 ? (
                userTweets.map((tweet) => (
                  <Tweet tweet={tweet} key={tweet._id} />
                ))
              ) : (
                <h1 className="text-white">No tweets found!!</h1>
              )}
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div
                  className="card rounded-lg border-0 my-2"
                  style={{ width: "100%" }}
                >
                  <div className="card-header bg-primary text-center text-white h4 ">
                    Following
                  </div>
                  {loadingF ? (
                    <div className="bg-dark">
                      <Ring />
                    </div>
                  ) : (
                    <Fragment>
                      <ul className="list-group list-group-flush">
                        {followers.map((follower) => (
                          <li
                            className="list-group-item bg-dark text-white"
                            key={follower._id}
                          >
                            <FollowingTab user={follower} />
                          </li>
                        ))}
                      </ul>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Container>
        {!isAuthenticated() ? (
          <div className="row justify-content-center text-center">
            <div className="col-2">
              <Navbar />
            </div>
            <div className="col-6">
              <img
                src="https://img.icons8.com/color/480/000000/twitter.png"
                alt=""
              />
              <div className="h1 text-white">Twitter</div>
              <Link to="/signin" className="btn btn-primary">
                Signin
              </Link>
            </div>
          </div>
        ) : (
          userInfo()
        )}
      </Container>
    </div>
  );
}
