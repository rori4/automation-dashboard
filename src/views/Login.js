import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import Auth from "../utils/auth";
import loginValidator from "../utils/validations/loginValidator";
import AuthenticationService from "../services/authentication-service";
import { handleError } from "../utils/customToast";
import { UserConsumer } from "../context/user-context";

class Login extends Component {
  static service = new AuthenticationService();
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (Auth.isUserAuthenticated()) {
      this.props.history.push("/");
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  };

  handleSubmit = async e => {
    console.log("Logging");
    e.preventDefault();
    const { email, password } = this.state;
    const { loginUser } = this.props;
    const credentials = {
      email,
      password
    };
    this.setState(
      {
        error: ""
      },
      async () => {
        if (!loginValidator(this.state.email, this.state.password)) return;
        try {
          const result = await Login.service.login(credentials);
          !result.success
            ? handleError(result.message)
            : loginUser(result.token, result.user);
        } catch (error) {
          console.log(error);
          this.setState({
            error: error.message
          });
          handleError(error.message);
        }
      }
    );
  };

  render() {
    const { email, password, error } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const LoginWithContext = props => {
  return (
    <UserConsumer>
      {user => (
        <Login
          {...props}
          isLoggedIn={user.isLoggedIn}
          loginUser={user.loginUser}
        />
      )}
    </UserConsumer>
  );
};
export default LoginWithContext;
