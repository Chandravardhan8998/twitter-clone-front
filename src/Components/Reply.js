/* eslint-disable no-self-assign */
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ProfilePic from "./Profile/ProfilePic";
import { isAuthenticated } from "../Helper/authHelper";
import { API } from "../backend";

export default function Reply({ reply }) {
  const { user, token } = isAuthenticated();
  const deleteReply = async () => {
    try {
      const res = await fetch(`${API}/reply/${reply._id}/delete`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.error) {
        return console.log(res.error);
      }
      return (window.location.href = window.location.href);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-11 bg-dark p-3 my-1 ">
      <div className="row justify-content-right">
        <div className="col-1">
          <ProfilePic
            username={reply.userId.username}
            className="rounded-circle border border-white"
            resolution={{ width: "25px", height: "25px" }}
          />
        </div>
        <div className="col-10">
          <Link
            className="font-weight-bold h6 text-white mx-1"
            to={`/user/${reply.userId.username}`}
          >
            {reply.userId.name}
          </Link>
          <span className="text-white-50 ">
            {moment(reply.createdAt).format("lll")}
          </span>
          {(reply.userId._id === user._id || reply.to === user._id) && (
            <span
              className="m-1 material-icons text-danger"
              onClick={deleteReply}
            >
              delete
            </span>
          )}
        </div>
      </div>
      <div className="row justify-content-center mx-2 ">
        <div className="col-10 text-white">
          <p>{reply.text}</p>
        </div>
      </div>
    </div>
  );
}
