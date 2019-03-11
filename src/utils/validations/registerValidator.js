const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function registerValidator(state) {
  const { username, email, password, repeatPassword } = state;
  let errors = {};
  username === undefined || username.length === 0
    ? (errors.username = "Username is required")
    : (delete errors.username);
  password !== repeatPassword && password.length !== 0 && repeatPassword.length !== 0
    ? (errors.repeatPassword = "Passwords do not match")
    : (delete errors.repeatPassword);
  password.length < 8 && password.length !== 0
    ? (errors.password = "Password must be at least 8 characters")
    : (delete errors.password);
  !emailRegex.test(email) && email.length !== 0
    ? (errors.email = "Please provide a correct email address")
    : (delete errors.email);
  return errors;
}

export default registerValidator;
