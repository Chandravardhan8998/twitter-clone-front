/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
import Container from "../Components/Container";
import Navbar from "./Navbar";
import { signup, isAuthenticated, authenticate } from "../Helper/authHelper";
import { Redirect, Link } from "react-router-dom";
import { Message } from "../Helper/utility";
import AuthLoader from "../Components/loader/AuthLoader";

const SignUp = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, name, error, loading, didRedirect } = values;

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
    signup({ email, password, name })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({ ...values, didRedirect: true });
        }
      })
      .catch((err) => {
        setValues({ ...values, error: "SignUp Failed!" });
      });
  };
  //TODO - do a redirect
  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/signin" />;
    }
  };

  return (
    <div>
      <Container>
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <form className="my-5">
              {error && Message(error, "Error")}
              <h1 className="text-center text-white my-5">Sign Up</h1>
              {!loading ? (
                <Fragment>
                  <div className="form-group">
                    <label className="text-white">Name</label>
                    <input
                      type="text"
                      onChange={handleChange("name")}
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white">Email address</label>
                    <input
                      required
                      type="email"
                      onChange={handleChange("email")}
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-white">Password</label>
                    <input
                      onChange={handleChange("password")}
                      placeholder="Password"
                      type="password"
                      className="form-control"
                      required
                    />
                  </div>
                </Fragment>
              ) : (
                <AuthLoader />
              )}
              <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-lg btn-primary btn-block rounded-pill my-2 "
              >
                Sign Up
              </button>
              {performRedirect()}
            </form>
            <Link
              to="/signin"
              className="btn btn-lg btn-secondary btn-block rounded-pill my-2 "
            >
              Sign In
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default React.memo(SignUp);
