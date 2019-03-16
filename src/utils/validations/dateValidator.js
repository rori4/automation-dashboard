import moment from "moment";

function startDateEndDateValidation(startDate, endDate) {
  let errors = {};
  let startAfterEnd = moment(startDate).isSameOrAfter(moment(endDate));
  if (
    startDate !== "" &&
    endDate !== "" &&
    startAfterEnd
  ) {
    errors.startDate = "Start date needs to be before the end date!";
  }
  return errors;
}

export { startDateEndDateValidation };
