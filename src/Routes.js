import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Container/Home";
import SignIn from "./Container/SignIn";
import SignUp from "./Container/SignUp";
import UserBoard from "./Container/UserBoard";
import UserProfileUpdate from "./Components/UserProfileUpdate";
import UploadProfile from "./Container/UploadProfile";
import { isAuthenticated } from "./Helper/authHelper";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />

        {isAuthenticated() && (
          <Route path="/user/:username" exact component={UserBoard} />
        )}
        {isAuthenticated() && <Route path="/me" exact component={UserBoard} />}
        {isAuthenticated() && (
          <Route path="/upload/profile" exact component={UploadProfile} />
        )}

        {isAuthenticated() && (
          <Route
            path="/user/update/:username"
            exact
            component={UserProfileUpdate}
          />
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
