function courseValidator(state) {
  const {
    udemyUrl,
    title,
    instructorName,
    instructorEmail,
    keywords,
    summary
  } = state;
  let regex = /udemy.com\/(.*?)\//gm;
  let result = regex.exec(udemyUrl);
  let errors = {};
  udemyUrl === undefined || udemyUrl === "" || udemyUrl.length === 0
    ? (errors.udemyUrl = "Udemy URL is required")
    : delete errors.udemyUrl;
  result === null
    ? (errors.udemyUrl = "Please provide a valid Udemy URL")
    : delete errors.udemyUrl;
  title === undefined || title === "" || title.length === 0
    ? (errors.title = "Title is required")
    : delete errors.title;
  instructorName === undefined || instructorName === "" || instructorName.length === 0
    ? (errors.instructorName = "Instructor Name is required")
    : delete errors.instructorName;
  summary === undefined || summary === "" || summary.length === 0
    ? (errors.summary = "summary is required")
    : delete errors.summary;
  keywords === undefined || keywords === "" || keywords.length === 0
    ? (errors.keywords = "Keywords are required")
    : delete errors.keywords;
  instructorEmail === undefined || instructorEmail === "" || instructorEmail.length === 0
    ? (errors.instructorEmail = "Instructor email are required")
    : delete errors.instructorEmail;
  return errors;
}

export default courseValidator;

