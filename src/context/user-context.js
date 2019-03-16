import React, { createContext } from "react";

const defaultUserState = {
  roles: [],
  user: "",
  email: "",
  isLoggedIn: false,
  updateUser() {}
};
const AuthContext = createContext(defaultUserState);

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    const userFromStorage = window.localStorage.getItem("user");
    const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};
    const defaultUserState = {
      roles: [],
      username: "",
      email: "",
      isLoggedIn: false,
    };
    this.state = {
      user: {
        ...defaultUserState,
        ...parsedUser,
        updateUser: this.updateUser,
        logoutUser: this.logoutUser,
        loginUser: this.loginUser
      }
    };
  }

  loginUser = (token, user) => {
    window.localStorage.setItem("auth_token", token);
    window.localStorage.setItem(
      "user",
      JSON.stringify({ ...user, isLoggedIn: true })
    );
    this.updateUser({
      isLoggedIn: true,
      ...user
    });
  };

  updateUser = user => {
    this.setState({
      user: {
        ...user,
        updateUser: this.updateUser,
        logoutUser: this.logoutUser,
        loginUser: this.loginUser
      }
    });
  };

  logoutUser = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("auth_token");
    this.updateUser({
      ...defaultUserState
    });
  };

  render() {
    const { user } = this.state;
    return (
      <AuthContext.Provider value={user}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
const AuthConsumer = AuthContext.Consumer;

export {
  AuthConsumer as UserConsumer,
  AuthProvider as UserProvider,
  defaultUserState
};
