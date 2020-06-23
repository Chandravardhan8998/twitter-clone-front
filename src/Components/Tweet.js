/* eslint-disable no-self-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./Profile/ProfilePic";
import { API } from "../backend";
import { isAuthenticated } from "../Helper/authHelper";
import moment from "moment";
import Reply from "./Reply";
import { getReplies } from "../Helper/tweetHelper";
import ReplyInput from "./ReplyInput";
import TweetImage from "../Components/TweetImage";
import Heart from "./loader/Heart";
export default function Tweet({ tweet }) {
  const [tweetDetials, setTweetDetials] = useState({
    liked: tweet.liked,
    likes: tweet.likes,
  });
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const { liked, likes } = tweetDetials;
  const { user, token } = isAuthenticated();
  const [loadingReply, setLoadingReply] = useState(false);
  const [loadinglike, setLoadinglike] = useState(false);

  useEffect(() => {
    setLoadingReply(true);
    showReply &&
      getReplies(tweet._id)
        .then((res) => {
          if (res.error) {
            return console.log(res.error);
          }
          setLoadingReply(false);
          return setReplies(res.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
  }, [showReply, likes]);

  const likeTweet = () => {
    setLoadinglike(true);
    fetch(`${API}/tweet/${tweet._id}/react`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        setTweetDetials({
          likes: !liked ? likes + 1 : likes - 1,
          liked: !liked,
        });
        setLoadinglike(false);
      })
      .catch((err) => console.log(err));
  };

  const seeReply = () => {
    setShowReply(!showReply);
  };
  const deleteTweet = async () => {
    const res = await fetch(`${API}/tweet/${tweet._id}/delete`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.error) {
      return console.log(res.error);
    }
    window.location.href = window.location.href;
  };

  return (
    <div className="row border-bottom border-secondary py-2 justify-content-center tweet">
      <div className="col-lg-1 col-md-1  col-sm-1">
        <ProfilePic
          className="rounded-circle"
          username={tweet.userId.username}
          resolution={{ maxWidth: "40px", maxHeight: "40px" }}
        />
      </div>
      <div className="col-lg-11 col-md-11 col-sm-11">
        <div className="row align-item-center px-2">
          <div className="col-12">
            <Link
              className="font-weight-bold h5 text-white "
              to={`/user/${tweet.userId.username}`}
            >
              {tweet.userId.name}
            </Link>

            <span className="text-white-50 px-1">@{tweet.userId.username}</span>

            <Link
              to={`/${tweet.userId.username}/tweets/${tweet._id}`}
              className="text-white-50 px-2"
            >
              {moment(tweet.createdAt).format("LLL")}
            </Link>

            {tweet.userId._id === user._id && (
              <span
                className=" material-icons text-secondary m-1"
                onClick={deleteTweet}
              >
                delete
              </span>
            )}
          </div>
          <div className="col-12 py-2">
            <p className="text-white">{tweet.tweet}</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-10 py-1 mx-5">
              <TweetImage tweetId={tweet._id} resolution={{ width: "100%" }} />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className=" offset-1 col-3 ">
              <span onClick={seeReply} className="text-white-50 mx-4">
                <span class="material-icons text-primary my-1">
                  mode_comment
                </span>
              </span>
            </div>
            <div
              onClick={likeTweet}
              className={`col-4 mx-4 my-1   ${
                liked ? "text-danger" : "text-white-50"
              }`}
            >
              <p>
                {loadinglike ? (
                  <Heart />
                ) : (
                  <Fragment>
                    <span class={`material-icons`}>
                      {liked ? "favorite" : "favorite_border"}
                    </span>
                    {likes ? likes : ""}
                  </Fragment>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      {showReply && (
        <Fragment>
          <ReplyInput tweetId={tweet._id} />
          {loadingReply ? (
            <p className="text-primary h5">Loading...</p>
          ) : (
            replies.map((reply) => {
              return <Reply reply={reply} key={reply._id} />;
            })
          )}
        </Fragment>
      )}
    </div>
  );
}
