import { API } from "../backend";
export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signin = async (user) => {
  try {
    const res = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },
      body: JSON.stringify(user),
    });
    return res.json();
  } catch (err) {
    return console.log(err);
  }
};
export const signout = async (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    try {
      fetch(`${API}/signout`, {
        method: "GET",
      });
    } catch (err) {
      console.log(err);
    }
    next();
  }
};
export const signup = async (user) => {
  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return res.json();
  } catch (err) {
    return console.log(err);
  }
};
