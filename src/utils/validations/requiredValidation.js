import { decamelize } from '../stringUtil';

function requiredValidation(state) {
  let errors = {};
  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      state[key] === undefined || state[key] === "" || state[key].length === 0
        ? (errors[key] = decamelize(key , " ") + " is required")
        : delete errors[key];
    }
  }
  return errors;
}

export default requiredValidation;