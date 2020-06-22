/* eslint-disable no-self-assign */
import React, { useState } from "react";
import { createReply } from "../Helper/tweetHelper";

export default function ReplyInput({ tweetId }) {
  const [reply, setReply] = useState("");

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setReply(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (reply) {
      createReply(reply, tweetId)
        .then((res) => {
          if (res.error) {
            return console.log(res.error);
          }
          window.location.href = window.location.href;
        })
        .catch((err) => {
          return console.log("Reply fail");
        });
    }
  };

  return (
    <div className="col-11 bg-dark p-3 my-2 ">
      <div className="row justify-content-right">
        <div className="col-10">
          <div className="form-group">
            <textarea
              className="form-control bg-transparent border border-primary text-white"
              rows="2"
              maxLength="100"
              onChange={handleChange("tweet")}
              value={reply}
              placeholder="What's happning?"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row justify-content-right">
        <div className="col-3">
          <button className="btn btn-primary btn-block" onClick={onSubmit}>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
