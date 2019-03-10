const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function registerValidator(state) {
  const { username, email, password, repeatPassword } = state;
  let error = {};
  username === undefined || username.length === 0
    ? (error.username = "Username is required")
    : (delete error.username);
  password !== repeatPassword && password.length !== 0 && repeatPassword.length !== 0
    ? (error.repeatPassword = "Passwords do not match")
    : (delete error.repeatPassword);
  password.length < 8 && password.length !== 0
    ? (error.password = "Password must be at least 8 characters")
    : (delete error.password);
  !emailRegex.test(email) && email.length !== 0
    ? (error.email = "Please provide a correct email address")
    : (delete error.email);
  return error;
}

export default registerValidator;
