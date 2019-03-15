function courseValidator(state) {
  const {
    url,
    title,
    instructorName,
    email,
    keywords,
    summary
  } = state;
  let regex = /udemy.com\/(.*?)\//gm;
  let result = regex.exec(url);
  let errors = {};
  url === undefined || url === "" || url.length === 0
    ? (errors.url = "Udemy URL is required")
    : delete errors.url;
  result === null
    ? (errors.url = "Please provide a valid Udemy URL")
    : delete errors.url;
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
  email === undefined || email === "" || email.length === 0
    ? (errors.email = "Instructor email are required")
    : delete errors.email;
  return errors;
}

export default courseValidator;

