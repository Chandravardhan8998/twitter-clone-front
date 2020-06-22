/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
import Container from "../Components/Container";
import Navbar from "./Navbar";
import { signin, isAuthenticated, authenticate } from "../Helper/authHelper";
import { Redirect, Link } from "react-router-dom";
import { Message } from "../Helper/utility";
import AuthLoader from "../Components/loader/AuthLoader";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "guest@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => console.log("Signin Failed!"));
  };
  //TODO - do a redirect
  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div>
      <Container>
        <div className="row justify-content-center">
          <div className="col-4">
            <form className="my-5">
              {error && Message(error, "Error")}
              <h1 className="text-center text-white my-5">Sign In</h1>
              {!loading ? (
                <Fragment>
                  <div className="form-group">
                    <label className="text-white">Email address</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange("email")}
                      className="form-control"
                      placeholder="Email"
                      required
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white">Password</label>
                    <input
                      required
                      name="password"
                      onChange={handleChange("password")}
                      placeholder="Password"
                      type="password"
                      value={password}
                      className="form-control"
                    />
                  </div>
                </Fragment>
              ) : (
                <AuthLoader />
              )}
              <button
                onClick={onSubmit}
                // type="submit"
                className="btn btn-lg btn-primary btn-block rounded-pill my-2 "
              >
                Sign In
              </button>
              {performRedirect()}
            </form>
            <Link
              to="/signup"
              className="btn btn-lg btn-secondary btn-block rounded-pill my-2 "
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
