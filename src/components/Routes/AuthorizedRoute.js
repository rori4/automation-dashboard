import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../../context/user-context";
const AuthorizedRoute = (props) => {
  const {isLoggedIn, roles, allowedRoles=[]} = props;
  const roleIsAllowed =
    !allowedRoles.length ||
    roles
      .some(role => allowedRoles.includes(role));

  if (!isLoggedIn || !roleIsAllowed) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

const AuthorizedRouteWithContext = props => {
  return (
    <UserConsumer>
      {({ isLoggedIn, roles }) => (
        <AuthorizedRoute {...props} roles={roles} isLoggedIn={isLoggedIn} allowedRoles={props.allowedRoles} />
      )}
    </UserConsumer>
  );
};

export { AuthorizedRoute };

export default AuthorizedRouteWithContext;
