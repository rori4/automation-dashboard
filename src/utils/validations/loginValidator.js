import { handleError } from "../customToast";

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function loginValidator(email, password) {
  if (!emailRegex.test(email) || email === "") {
    handleError("Please provide a correct email address");
    return false;
  }
  if (password.length < 8 || password === "") {
    handleError("Password must be at least 8 characters long");
    return false;
  }

  return true;
}

export default loginValidator;
