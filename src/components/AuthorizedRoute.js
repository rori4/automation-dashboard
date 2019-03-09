import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../context/user-context";

const AuthorizedRoute = (
  isLoggedIn,
  allowedRoles = [],
  roles,
  ...otherProps
) => {
  const roleIsAllowed =
    !allowedRoles.length ||
    roles
      .map(role => role.toLowerCase())
      .some(role => allowedRoles.includes(role));

  if (!isLoggedIn || !roleIsAllowed) {
    return <Redirect to="/login" />;
  }
  return <Route {...otherProps} />;
};

const AuthorizedRouteWithContext = props => {
  return (
    <UserConsumer>
      {({ isLoggedIn, roles }) => (
        <AuthorizedRoute {...props} role={roles} isLoggedIn={isLoggedIn} />
      )}
    </UserConsumer>
  );
};

export { AuthorizedRoute };

export default AuthorizedRouteWithContext;
