/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../index.css";
import Container from "../Components/Container";
import { isAuthenticated } from "../Helper/authHelper";
import TweetInput from "../Components/TweetInput";
import Profile from "../Components/Profile/Profile";
import { getTimeline } from "../Helper/tweetHelper";
import Tweet from "../Components/Tweet";
import FollowingTab from "../Components/FollowingTab";
import { getFollowers } from "../Helper/userHelper";
import { Redirect } from "react-router-dom";
import Loading from "../Components/Loading";
import Ring from "../Components/loader/Ring";
const Home = () => {
  const [timelineTweets, setTimelineTweets] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = isAuthenticated();

  const preload = () => {
    if (isAuthenticated()) {
      getFollowers(user.username).then((res) => {
        if (!res || res.error) {
          setLoading(false);
          return setError(res ? res.error : "Network Error!");
        }
        setFollowers(res);
      });

      getTimeline().then((res) => {
        if (res.error) {
          setLoading(false);
          setError(res.error);
        }
        setLoading(false);
        setTimelineTweets(res);
      });
    }
  };
  useEffect(() => {
    setLoading(true);
    preload();
  }, []);
  const timeline = () => {
    return (
      <div className="row">
        <div className="col-lg-2">
          <Navbar />
        </div>
        <div className="col-lg-6 ">
          <div className="row  border border-top-0 border-bottom-0 border-dark p-0">
            <div className="col-lg-12">
              <h4 className="text-white px-3 py-2">Home</h4>
              <TweetInput />
              {loading ? (
                <Loading />
              ) : timelineTweets.length > 0 ? (
                timelineTweets.map((tweet) => {
                  return <Tweet tweet={tweet} key={tweet._id} />;
                })
              ) : (
                <h1 className="text-white">{error}</h1>
              )}
            </div>
            <div className="col-lg-12"></div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row position-fixed">
            <div className="col-lg-12 ">{loading ? <Ring /> : <Profile />}</div>
            <div className="col-lg-12 my-2">
              <div
                className="card rounded-lg border-0"
                style={{ width: "18rem" }}
              >
                <div className="card-header bg-primary text-center text-white h4 ">
                  Following
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!user && <Redirect to="/signin" />}
      <Container>{user && timeline()}</Container>
    </div>
  );
};
export default Home;
