import React from "react";
import { API } from "../backend";

export default function ProfilePic({ className, tweetId, resolution }) {
  let pic = `${API}/tweet/${tweetId}/picture`;
  let image = pic ? pic : "https://img.icons8.com/color/480/000000/twitter.png";
  return (
    <img
      src={image}
      alt=""
      style={resolution}
      className={`mb-3 rounded ${className}`}
    />
  );
}
