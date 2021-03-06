import { decamelize } from '../stringUtil';

function giveawayValidator(state) {
  delete state.promotions
  let errors = {};
  for (var key in state) {
    if (state.hasOwnProperty(key)) {
      console.log(key + " -> " + state[key]);
      state[key] === undefined || state[key] === "" || state[key].length === 0
        ? (errors[key] = decamelize(key , " ") + " is required")
        : delete errors[key];
    }
  }
  return errors;
}

export default giveawayValidator;