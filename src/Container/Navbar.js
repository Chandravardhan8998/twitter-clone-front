import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../Helper/authHelper";
const currentTab = (history, path) => {
  return history.location.pathname === path
    ? { color: "#007bff" }
    : { color: "#FFFFFF" };
};
const Menu = ({ history }) => {
  const NavLink = ({ title, route, currentTab, history }) => (
    <span className="col-lg-5 col-sm-4 col-md-4 h5 p-2">
      <Link style={currentTab(history, route)} to={route}>
        {title}
      </Link>
    </span>
  );
  return (
    <div className="row justify-content-center align-items-center rounded-lg shadow-lg bg-dark text-white text-center my-3 mx-1">
      {!isAuthenticated() && <Redirect to="signin" />}
      {
        <NavLink
          currentTab={currentTab}
          history={history}
          route="/"
          title="Home"
        />
      }
      {isAuthenticated() && (
        <NavLink
          currentTab={currentTab}
          history={history}
          route="/me"
          title="Profile"
        />
      )}
      {!isAuthenticated() && (
        <NavLink
          currentTab={currentTab}
          history={history}
          route="/signup"
          title="SignUp"
        />
      )}
      {!isAuthenticated() ? (
        <NavLink
          currentTab={currentTab}
          history={history}
          route="/signin"
          title="SignIn"
        />
      ) : (
        <div
          className="h5 col-lg-12 col-md-4 p-2 text-danger"
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
