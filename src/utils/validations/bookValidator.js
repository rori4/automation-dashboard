function bookValidator(state) {
  const {
    url,
    title,
    authorName,
    synopsis,
    authorBio,
    keywords,
    email
  } = state;
  let regex = /dp\/(.*?)\//gm;
  let result = regex.exec(url);
  let errors = {};
  url === undefined || url === "" || url.length === 0
    ? (errors.url = "Amazon URL is required")
    : delete errors.url;
  result === null
    ? (errors.url = "Please provide a valid amazon URL")
    : delete errors.url;
  title === undefined || title === "" || title.length === 0
    ? (errors.title = "Title is required")
    : delete errors.title;
  authorName === undefined || authorName === "" || authorName.length === 0
    ? (errors.authorName = "Author Name is required")
    : delete errors.authorName;
  synopsis === undefined || synopsis === "" || synopsis.length === 0
    ? (errors.synopsis = "Synopsis is required")
    : delete errors.synopsis;
  authorBio === undefined || authorBio === "" || authorBio.length === 0
    ? (errors.authorBio = "Author Bio is required")
    : delete errors.authorBio;
  keywords === undefined || keywords === "" || keywords.length === 0
    ? (errors.keywords = "Keywords are required")
    : delete errors.keywords;
  email === undefined || email === "" || email.length === 0
    ? (errors.email = "Author email are required")
    : delete errors.email;
  return errors;
}

export default bookValidator;
