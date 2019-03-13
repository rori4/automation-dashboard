function giveawayValidator(state) {
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

function decamelize(str, separator){
	separator = typeof separator === 'undefined' ? '_' : separator;
	let res = str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
        return res.charAt(0).toUpperCase() + res.slice(1);
}

export default giveawayValidator;