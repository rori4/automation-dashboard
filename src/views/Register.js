import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import AuthenticationService from "./../services/authentication-service";
import {handleError} from "../utils/customToast";
import registerValidator from "../utils/validations/registerValidator";
import { UserConsumer } from "../context/user-context";

class Register extends Component {
  static service = new AuthenticationService();
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatPassword: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  };

  handleBlur = () => {
    let errors = registerValidator(this.state);
    this.setState({
      errors
    });
  };

  handleSubmit = async e => {
    console.log("Logging");
    e.preventDefault();
    const { username, email, password, errors } = this.state;
    const { updateUser } = this.props;
    const credentials = {
      username,
      email,
      password
    };
    try {
      const result = await Register.service.register(credentials);
      if (!result.success) {
        handleError(result.message);
        return;
      }
      window.localStorage.setItem("auth_token", result.token);
      window.localStorage.setItem(
        "user",
        JSON.stringify({ ...result.user, isLoggedIn: true })
      );
      updateUser({
        isLoggedIn: true,
        ...result.user
      });
    } catch (errors) {
      console.log(errors);
      this.setState({
        errors: errors.message
      });
      handleError(errors.message);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className={errors.username ? "is-invalid" : ""}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                      />
                      <div class="invalid-feedback">{errors.username}</div>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className={errors.email ? "is-invalid" : ""}
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                      />
                      <div class="invalid-feedback">{errors.email}</div>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className={errors.password ? "is-invalid" : ""}
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="password"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                      />
                      <div class="invalid-feedback">{errors.password}</div>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className={errors.repeatPassword ? "is-invalid" : ""}
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        name="repeatPassword"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                      />
                      <div class="invalid-feedback">
                        {errors.repeatPassword}
                      </div>
                    </InputGroup>
                    <Button color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const RegisterWithContext = props => {
  return (
    <UserConsumer>
      {(user) => (
        <Register
          {...props}
          isLoggedIn={user.isLoggedIn}
          updateUser={user.updateUser}
        />
      )}
    </UserConsumer>
  );
};

export default RegisterWithContext;
