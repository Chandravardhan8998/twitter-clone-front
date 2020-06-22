import React from "react";
import { API } from "../../backend";

export default function ProfilePic({ className, username, resolution }) {
  let pic = `${API}/profile/${username}/picture`;
  console.log(pic);
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
