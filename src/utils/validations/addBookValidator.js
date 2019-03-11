const regex = /dp\/(.*?)\//gm;

function addBookValidator(state) {
    
  const {
    amazonUrl,
    title,
    authorName,
    synopsis,
    authorBio,
    keywords,
    authorEmail
  } = state;
  let result = regex.exec(amazonUrl);
  let error = {};
  amazonUrl === undefined || amazonUrl === "" || amazonUrl.length === 0
    ? (error.amazonUrl = "Amazon URL is required")
    : delete error.amazonUrl;
  result === null
    ? (error.amazonUrl = "Please provide a valid amazon URL")
    : delete error.amazonUrl;
  title === undefined || title === "" || title.length === 0
    ? (error.title = "Title is required")
    : delete error.title;
  authorName === undefined|| authorName === "" || authorName.length === 0
    ? (error.authorName = "Author Name is required")
    : delete error.authorName;
  synopsis === undefined || synopsis === "" || synopsis.length === 0
    ? (error.synopsis = "Synopsis is required")
    : delete error.synopsis;
  authorBio === undefined || authorBio === "" || authorBio.length === 0
    ? (error.authorBio = "Author Bio is required")
    : delete error.authorBio;
  keywords === undefined || keywords === "" || keywords.length === 0
    ? (error.keywords = "Keywords are required")
    : delete error.keywords;
  authorEmail === undefined || authorEmail === "" || authorEmail.length === 0
    ? (error.authorEmail = "Author email are required")
    : delete error.authorEmail;
  return error;
}

export default addBookValidator;
