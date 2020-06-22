import { API } from "../backend";
import { isAuthenticated } from "./authHelper";
const { user, token } = isAuthenticated();
export const createTweet = async (tweet, username, token) => {
  try {
    const res = await fetch(`${API}/tweet/create/${username}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: tweet,
    });
    return res.json();
  } catch (err) {}
};

export const getTimeline = async () => {
  try {
    const res = await fetch(`${API}/timeline/${user.username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getTweets = async (username) => {
  try {
    const res = await fetch(`${API}/tweets/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getReplies = async (tweetId) => {
  try {
    const res = await fetch(`${API}/tweet/${tweetId}/replies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    return console.log(err);
  }
};

export const createReply = async (reply, tweetId) => {
  try {
    const res = await fetch(`${API}/tweet/${tweetId}/reply`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: reply }),
    });
    return res.json();
  } catch (err) {}
};
