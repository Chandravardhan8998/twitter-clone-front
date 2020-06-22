import { API } from "../backend";
import { isAuthenticated } from "./authHelper";
const { user, token } = isAuthenticated();

export const getProfile = async (username) => {
  try {
    const res = await fetch(`${API}/profile/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    return console.log(err);
  }
};

export const editProfile = async (username, userData) => {
  try {
    const res = await fetch(`${API}/profile/${username}/edit`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

export const uploadProfilePic = async (picture) => {
  console.log(picture);
  try {
    const res = await fetch(`${API}/profile/${user.username}/upload/picture`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: picture,
    });
    return console.log(res);
  } catch (err) {
    return console.log(err);
  }
};

export const getFollowers = async (username) => {
  try {
    const res = await fetch(`${API}/following/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    return console.log(err);
  }
};
