function bookValidator(state) {
  const {
    amazonUrl,
    title,
    authorName,
    synopsis,
    authorBio,
    keywords,
    authorEmail
  } = state;
  let regex = /dp\/(.*?)\//gm;
  let result = regex.exec(amazonUrl);
  let errors = {};
  amazonUrl === undefined || amazonUrl === "" || amazonUrl.length === 0
    ? (errors.amazonUrl = "Amazon URL is required")
    : delete errors.amazonUrl;
  result === null
    ? (errors.amazonUrl = "Please provide a valid amazon URL")
    : delete errors.amazonUrl;
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
  authorEmail === undefined || authorEmail === "" || authorEmail.length === 0
    ? (errors.authorEmail = "Author email are required")
    : delete errors.authorEmail;
  return errors;
}

export default bookValidator;
