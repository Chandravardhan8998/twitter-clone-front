import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../Helper/authHelper";
const currentTab = (history, path) => {
  return history.location.pathname === path
    ? { color: "#007bff" }
    : { color: "#FFFFFF" };
};
const Menu = ({ history }) => {
  const navLink = (title, route, currentTab, history) => (
    <div className="col-12 h5 p-2">
      <Link style={currentTab(history, route)} to={route}>
        {title}
      </Link>
    </div>
  );
  return (
    <div className="row rounded-lg shadow-lg bg-dark text-white text-center my-3 mx-1">
      {!isAuthenticated() && <Redirect to="signin" />}
      {navLink("Home", "/", currentTab, history)}
      {isAuthenticated()
        ? navLink(`Profile`, `/me`, currentTab, history)
        : null}
      {!isAuthenticated()
        ? navLink(`SignUp`, "/signup", currentTab, history)
        : null}
      {!isAuthenticated() ? (
        navLink("SignIn", "/signin", currentTab, history)
      ) : (
        <div
          className="h5 col-12 p-2 text-danger"
          onClick={() => {
            signout(() => {
              history.push("/");
            });
          }}
        >
          Logout
        </div>
      )}
    </div>
  );
};
export default React.memo(withRouter(Menu));
