import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Loadable from "react-loadable";
import "./App.scss";
import { UserProvider, defaultUserState } from "./context/user-context";
import Logout from './views/Logout';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Login
const Login = Loadable({
  loader: () => import("./views/Login"),
  loading
});

// Register
const Register = Loadable({
  loader: () => import("./views/Register"),
  loading
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        ...defaultUserState,
        updateUser: this.updateUser
      }
    };
  }

  updateUser = user => {
    this.setState({ user });
  };
  render() {
    const { user } = this.state;
    return (
      <Router>
        <Fragment>
          <UserProvider value={user}>
            <ToastContainer />
            <Switch>
              <Route exact path="/login" name="Login Page" component={Login} />
              <Route
                exact
                path="/register"
                name="Register Page"
                component={Register}
              />
              <Route exact path="/logout" name="Logout" component={Logout} />
            </Switch>
          </UserProvider>
        </Fragment>
      </Router>
    );
  }
}

export default App;
